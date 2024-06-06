import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
    const client = await db.connect();
  try {
      await client.sql`CREATE TABLE IF NOT EXISTS Admin ( NAME varchar(255), EMAIL varchar(255),PASSWORD varchar(255),STATUS varchar(255) );`;
      const data = ["Chinmay","chinmay@123","12345678",true];
      await client.sql`INSERT INTO Admin (NAME,EMAIL,PASSWORD,STATUS) VALUES (${data[0]},${data[1]},${data[2]},${data[3]});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const users = await client.sql`SELECT * FROM Admin;`;
  return NextResponse.json({ users: users.rows }, { status: 200 });
}