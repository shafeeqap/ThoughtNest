import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    (await cookies()).set("token", "", {maxAge: 0})
    return NextResponse.json({msg: "Logged out"})
}