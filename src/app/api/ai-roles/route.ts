/**
 * @file src/app/api/ai-roles/route.ts
 * @description API route handler for managing AI Roles.
 * This endpoint provides CRUD operations for AI Role resources, allowing clients to
 * list all roles and create new ones.
 * 
 * @route GET /api/ai-roles - List all AI Roles
 * @route POST /api/ai-roles - Create a new AI Role
 * 
 * @requires next/server - Next.js server utilities
 * @requires @/lib/mongodb - Database connection utility
 * @requires @/models/AiRole - AI Role Mongoose model and interfaces
 * 
 * @author Cascade
 * @date 2025-06-08
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AiRole, { IAiRole } from '@/models/AiRole';

/**
 * Handles GET requests to retrieve a list of all AI Roles.
 * Returns roles sorted by creation date (newest first).
 * 
 * @async
 * @function GET
 * @param {Request} request - The incoming HTTP request object
 * @returns {Promise<NextResponse>} Response containing an array of AI Role objects or an error message
 * 
 * @example
 * // Successful response
 * [
 *   {
 *     id: '507f1f77bcf86cd799439011',
 *     title: 'Productivity Assistant',
 *     description: 'Helps with task management and productivity',
 *     // ...other role properties
 *   },
 *   // ...more roles
 * ]
 * 
 * @example
 * // Error response
 * {
 *   message: 'Failed to fetch AI roles',
 *   error: 'Error message details'
 * }
 */
export async function GET(request: Request) {
  try {
    // Ensure database connection is established
    await dbConnect();

    // Fetch all roles, sorted by creation date (newest first)
    const aiRoles = await AiRole.find({}).sort({ createdAt: -1 });

    // Convert Mongoose documents to plain JavaScript objects
    const plainAiRoles = aiRoles.map(role => role.toJSON() as IAiRole);

    // Return the list of roles with 200 OK status
    return NextResponse.json(plainAiRoles, { status: 200 });
  } catch (error: any) {
    // Log the error for server-side debugging
    console.error('Failed to fetch AI roles:', error);
    
    // Return error response with 500 status code
    return NextResponse.json(
      {
        message: 'Failed to fetch AI roles',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Note: The POST handler for creating new AI roles is not implemented in this file.
// It might be handled elsewhere or will be implemented in the future.
