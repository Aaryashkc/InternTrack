import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { signupController } from '@/controllers/authController';

export async function POST(req: Request) {
  try {
    const userData = await req.json();
    
    // Connect to MongoDB
    await connectDB();

    const result = await signupController(userData);

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: result.user,
        token: result.token
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: error.message === 'User already exists' ? 400 : 500 }
    );
  }
} 