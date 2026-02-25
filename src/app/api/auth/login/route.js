import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { generateToken, comparePassword } from '@/lib/auth';

// POST admin login
export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }
    
    const [rows] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const admin = rows[0];
    
    // Check password using bcrypt comparison
    const isValidPassword = await comparePassword(password, admin.password);
    
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Generate JWT token
    const token = generateToken(admin);
    
    // Return token and admin info (without password)
    return NextResponse.json({ 
      success: true, 
      message: 'Login successful',
      token,
      admin: { 
        id: admin.id,
        username: admin.username 
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
