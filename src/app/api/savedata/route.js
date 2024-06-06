import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
    const client = await db.connect();
  try {
      await client.sql`CREATE TABLE IF NOT EXISTS AllData ( TIME varchar(255), SIZE varchar(255),COUNT varchar(255),SUM varchar(255) );`;
      const data = ["02.10","200","3","256"];
      await client.sql`INSERT INTO AllData (TIME,SIZE,COUNT,SUM) VALUES (${data[0]},${data[1]},${data[2]},${data[3]});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const users = await client.sql`SELECT * FROM AllData;`;
  return NextResponse.json({ users: users.rows }, { status: 200 });
}