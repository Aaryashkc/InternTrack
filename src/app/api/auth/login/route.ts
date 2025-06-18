import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { loginController } from '@/controllers/authController';

export async function POST(req: Request) {
  try {
    const credentials = await req.json();
    
    // Connect to MongoDB
    await connectDB();

    const result = await loginController(credentials);

    return NextResponse.json(
      { 
        message: 'Login successful',
        user: result.user,
        token: result.token
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: error.message === 'Invalid email or password' ? 401 : 500 }
    );
  }
} 