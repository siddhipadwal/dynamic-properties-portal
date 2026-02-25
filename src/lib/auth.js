import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production';

// Generate JWT token
export function generateToken(admin) {
  return jwt.sign(
    { 
      id: admin.id, 
      username: admin.username 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Auth middleware for API routes
export function withAuth(handler) {
  return async function(request) {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Add user info to the request
    request.admin = decoded;
    
    return handler(request);
  };
}

// Hash password using bcryptjs
export async function hashPassword(password) {
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare password with hash
export async function comparePassword(password, hashedPassword) {
  const bcrypt = require('bcryptjs');
  
  // If the stored password is not a bcrypt hash (less than 60 characters), compare directly
  // This is for backwards compatibility during setup only
  if (hashedPassword && hashedPassword.length < 60) {
    return password === hashedPassword;
  }
  
  return bcrypt.compare(password, hashedPassword);
}
