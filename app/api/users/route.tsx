import { NextResponse } from 'next/server';
import { getUsers, createUser } from '../../controllers/userController';

export async function GET() {
    const users = await getUsers();
    return NextResponse.json(users, {
        status: 200,
        headers: {
            'Cache-Control': 'public, max-age=60'
        }
    });
}

export async function POST(request: Request) {
    const userData = await request.json();
    const newUser = await createUser(userData);
    return NextResponse.json(newUser, { status: 201 });
}
