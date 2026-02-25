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

// GET all properties (public - no auth required)
export async function GET(request) {
  try {
    // Get all properties without sorting (order handled by frontend via localStorage)
    const [rows] = await pool.query('SELECT * FROM properties ORDER BY created_at DESC');
    return NextResponse.json({ properties: rows }, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

// POST new property (admin only)
export async function POST(request) {
  try {
    // Check authentication
    const auth = checkAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }
    
    const body = await request.json();
    
    const sql = `
      INSERT INTO properties (name, location, image, images, video, pricePerSqFt, areaMin, areaMax, possessionDate, description, category, status, addedDate, isBestChoice, latitude, longitude)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      body.name,
      body.location,
      body.image || '/assets/images/latest-properties/properties1.jpg',
      body.images || null,
      body.video || null,
      body.pricePerSqFt,
      body.areaMin,
      body.areaMax,
      body.possessionDate || null,
      body.description,
      body.category || 'Residential',
      body.status || 'Under Construction',
      new Date().toISOString().split('T')[0],
      body.isBestChoice || false,
      body.latitude || null,
      body.longitude || null
    ];
    
    const [result] = await pool.query(sql, values);
    
    const [newProperty] = await pool.query('SELECT * FROM properties WHERE id = ?', [result.insertId]);
    
    return NextResponse.json({ property: newProperty[0], message: 'Property created successfully' });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}

// PATCH - Update property sort order (admin only)
export async function PATCH(request) {
  try {
    // Check authentication
    const auth = checkAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }
    
    const body = await request.json();
    const { properties } = body;
    
    if (!properties || !Array.isArray(properties)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    
    // Check if sort_order column exists
    let hasSortOrder = false;
    try {
      await pool.query('SELECT sort_order FROM properties LIMIT 1');
      hasSortOrder = true;
    } catch (e) {
      // Column doesn't exist - skip database update
      hasSortOrder = false;
    }
    
    // Try to update sort_order in database if column exists
    if (hasSortOrder) {
      try {
        for (const prop of properties) {
          await pool.query('UPDATE properties SET sort_order = ? WHERE id = ?', [prop.sort_order, prop.id]);
        }
        return NextResponse.json({ message: 'Sort order updated successfully' });
      } catch (e) {
        console.error('Error updating sort_order:', e);
        // Continue - frontend has localStorage backup
      }
    }
    
    // Even if database update fails, return success (frontend uses localStorage)
    return NextResponse.json({ message: 'Sort order saved (localStorage)' });
  } catch (error) {
    console.error('Error updating sort order:', error);
    return NextResponse.json({ error: 'Failed to update sort order' }, { status: 500 });
  }
}
