import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, type SessionData } from '@/lib/session';
import { getAdminClient } from '@/lib/supabase';

async function requireAuth() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  if (!session.isLoggedIn) throw new Error('Unauthorized');
}

export async function GET() {
  try {
    await requireAuth();
    const db = getAdminClient();
    const { data, error } = await db.from('media').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const altText = formData.get('alt_text') as string | null;

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    const db = getAdminClient();
    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();

    const { data: uploadData, error: uploadError } = await db.storage
      .from('mindwave-media')
      .upload(filename, arrayBuffer, { contentType: file.type });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = db.storage.from('mindwave-media').getPublicUrl(filename);

    const { data: mediaRecord, error: dbError } = await db
      .from('media')
      .insert({
        filename: file.name,
        url: publicUrl,
        size: file.size,
        mime_type: file.type,
        alt_text: altText || '',
      })
      .select()
      .single();

    if (dbError) throw dbError;
    return NextResponse.json(mediaRecord, { status: 201 });
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const db = getAdminClient();
    const { data: media } = await db.from('media').select('url').eq('id', id).single();
    
    if (media?.url) {
      const filename = media.url.split('/').pop();
      if (filename) await db.storage.from('mindwave-media').remove([filename]);
    }

    const { error } = await db.from('media').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}