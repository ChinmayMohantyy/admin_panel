import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';


const client = await db.connect();

export async function POST(req, res) {
    try {
        const reqBody = await req.json();
        const { username, password } = reqBody;
        const result = await client.query(`SELECT * FROM Admin WHERE email = $1`, [username]);
        const admin = result.rows[0];
        if (!admin) {
            return Response.json("Admin Doesn't exist", { status: 400 })
        }
        // //check password
        if (password !== admin.password) {
            return Response.json("password incorrect please check", { status: 400 })
        }
        return Response.json("Login Succesfully", { status: 200 })
    } catch (error) {
        console.log(error, "error");
        return Response.json({
            error: error.message
        },
            { status: 500 })
    }
}
