import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const client = await db.connect();
    const users = await client.sql`SELECT * FROM AllData;`;
    return NextResponse.json({ users: users.rows }, { status: 200 });
}