import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken, comparePassword, hashPassword } from '@/lib/auth';

// POST - Change password
export async function POST(request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword, token } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Verify token from Authorization header
    const authHeader = request.headers.get('authorization');
    const authToken = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : token;

    if (!authToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(authToken);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get admin from database
    const [rows] = await pool.query(
      'SELECT * FROM admin WHERE id = ?',
      [decoded.id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }

    const admin = rows[0];

    // Verify current password
    const isValidPassword = await comparePassword(currentPassword, admin.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password in database
    await pool.query(
      'UPDATE admin SET password = ? WHERE id = ?',
      [hashedPassword, decoded.id]
    );

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    );
  }
}
