import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// Helper function to check authentication
function checkAuth(request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  
  if (!token) {
    return { authorized: false, error: 'Authentication required' };
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    return { authorized: false, error: 'Invalid or expired token' };
  }
  
  return { authorized: true, admin: decoded };
}

// GET all partners (public)
export async function GET(request) {
  try {
    const [rows] = await pool.query('SELECT * FROM partners ORDER BY created_at DESC');
    return NextResponse.json({ partners: rows });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

// POST new partner (admin only)
export async function POST(request) {
  try {
    // Check authentication
    const auth = checkAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }
    
    const body = await request.json();
    
    const sql = `
      INSERT INTO partners (name, logo)
      VALUES (?, ?)
    `;
    
    const values = [
      body.name,
      body.logo || '/assets/images/brands/brand1.png'
    ];
    
    const [result] = await pool.query(sql, values);
    
    const [newPartner] = await pool.query('SELECT * FROM partners WHERE id = ?', [result.insertId]);
    
    return NextResponse.json({ partner: newPartner[0], message: 'Partner created successfully' });
  } catch (error) {
    console.error('Error creating partner:', error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}

// DELETE a partner (admin only)
export async function DELETE(request) {
  try {
    // Check authentication
    const auth = checkAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Partner ID is required' }, { status: 400 });
    }
    
    // Delete the partner
    await pool.query('DELETE FROM partners WHERE id = ?', [id]);
    
    return NextResponse.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}
