/**
 * @file src/app/api/test-db/route.ts
 * @description API route handler for testing database connectivity.
 * This endpoint verifies the connection to MongoDB and is primarily used for development and debugging purposes.
 * 
 * @route GET /api/test-db
 * @access Public
 * 
 * @requires next/server - Next.js server utilities
 * @requires @/lib/mongodb - Database connection utility
 * 
 * @author Cascade
 * @date 2025-06-08
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

/**
 * Handles GET requests to test the database connection.
 * 
 * @async
 * @function GET
 * @returns {Promise<NextResponse>} Response indicating success or failure of the database connection
 * 
 * @example
 * // Successful response
 * {
 *   status: 'success',
 *   message: 'Successfully connected to MongoDB!'
 * }
 * 
 * @example
 * // Error response
 * {
 *   status: 'error',
 *   message: 'Failed to connect to MongoDB',
 *   error: 'Error message'
 * }
 */
export async function GET() {
  try {
    // Attempt to establish a connection to MongoDB
    await dbConnect();
    
    // Return success response if connection is successful
    return NextResponse.json({ 
      status: 'success',
      message: 'Successfully connected to MongoDB!' 
    });
  } catch (error) {
    // Log the error for server-side debugging
    console.error('Database connection error:', error);
    
    // Return error response with appropriate status code
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to connect to MongoDB',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
