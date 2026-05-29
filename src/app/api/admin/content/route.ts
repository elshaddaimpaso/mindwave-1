import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, type SessionData } from '@/lib/session';
import { getAdminClient } from '@/lib/supabase';
import { contentSchema } from '@/lib/validations/admin';

async function requireAuth() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  if (!session.isLoggedIn) throw new Error('Unauthorized');
}

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    const db = getAdminClient();
    const { data, error } = await db
      .from('site_content')
      .select('*')
      .order('section')
      .order('key');

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const parsed = contentSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    const db = getAdminClient();
    const { data, error } = await db
      .from('site_content')
      .upsert({ ...parsed.data, updated_at: new Date().toISOString() }, { onConflict: 'section,key' })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}