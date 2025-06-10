/**
 * @file src/app/api/ai-roles/[roleId]/route.ts
 * @description API route handler for managing individual AI Roles by ID.
 * This endpoint provides operations to update and delete specific AI Role resources.
 * 
 * @route PUT /api/ai-roles/[roleId] - Update an existing AI Role
 * @route DELETE /api/ai-roles/[roleId] - Delete an AI Role
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
 * Interface for the request context provided by Next.js route handlers.
 * Contains the dynamic route parameters.
 */
interface RequestContext {
  /** Promise that resolves to an object containing route parameters */
  params: Promise<{
    /** The ID of the AI Role being accessed */
    roleId: string;
  }>;
}

/**
 * Interface defining the structure of the request body for updating an AI Role.
 * Only includes fields that are allowed to be updated by the client.
 */
interface UpdateAiRolePayload {
  /** The new title for the AI Role */
  title?: string;
  
  /** The new description for the AI Role */
  description?: string;
  
  /** The new system prompt text that defines the AI's behavior */
  systemPromptText?: string;
  
  /** The new category for the AI Role */
  category?: string;
  
  /** The new array of tags for the AI Role */
  tags?: string[];
  
  // Note: version might be handled by the backend or incremented based on logic
}

/**
 * Handles PUT requests to update an existing AI Role.
 * 
 * @async
 * @function PUT
 * @param {Request} request - The incoming HTTP request object
 * @param {RequestContext} context - The request context containing route parameters
 * @returns {Promise<NextResponse>} Response containing the updated AI Role or an error message
 * 
 * @example
 * // Request body
 * {
 *   "title": "Updated Role Title",
 *   "description": "Updated description",
 *   "tags": ["productivity", "updated"]
 * }
 * 
 * @example
 * // Successful response (200 OK)
 * {
 *   "id": "507f1f77bcf86cd799439011",
 *   "title": "Updated Role Title",
 *   // ...other updated fields
 * }
 * 
 * @example
 * // Error response (400 Bad Request)
 * {
 *   "message": "Title must be a non-empty string"
 * }
 */
export async function PUT(request: Request, context: RequestContext) {
  // Resolve the route parameters
  const resolvedParams = await context.params;
  const { roleId } = resolvedParams;

  // Validate roleId is provided
  if (!roleId) {
    return NextResponse.json({ message: 'Role ID is required' }, { status: 400 });
  }

  try {
    // Ensure database connection is established
    await dbConnect();

    // Parse the request body
    const body: UpdateAiRolePayload = await request.json();

    // Validate request body is not empty
    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { message: 'Request body cannot be empty' }, 
        { status: 400 }
      );
    }
    
    // Validate title if provided
    if (body.title !== undefined && (typeof body.title !== 'string' || body.title.trim() === '')) {
      return NextResponse.json(
        { message: 'Title must be a non-empty string' }, 
        { status: 400 }
      );
    }
    // Note: Additional field validations can be added here as needed

    // Find and update the AI Role document
    const updatedAiRole = await AiRole.findByIdAndUpdate(
      roleId,
      { $set: body }, // Use $set to update only the provided fields
      { 
        new: true, // Return the updated document
        runValidators: true // Run schema validators on update
      }
    );

    // Handle case where role was not found
    if (!updatedAiRole) {
      return NextResponse.json(
        { message: 'AI Role not found' }, 
        { status: 404 }
      );
    }

    // Return the updated role with 200 OK status
    return NextResponse.json(updatedAiRole.toJSON() as IAiRole, { status: 200 });

  } catch (error: any) {
    // Log the error for server-side debugging
    console.error(`Failed to update AI role ${roleId}:`, error);
    
    // Handle specific error types
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          message: 'Validation failed', 
          errors: error.errors 
        }, 
        { status: 400 }
      );
    }
    
    // Handle invalid ObjectId format
    if (error.name === 'CastError' && error.path === '_id') {
      return NextResponse.json(
        { message: 'Invalid Role ID format' }, 
        { status: 400 }
      );
    }
    
    // Generic error response (with details in development)
    return NextResponse.json(
      {
        message: 'Failed to update AI role',
        error: process.env.NODE_ENV === 'development' 
          ? error.message 
          : 'An internal server error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * Handles DELETE requests to remove an AI Role.
 * 
 * @async
 * @function DELETE
 * @param {Request} request - The incoming HTTP request object
 * @param {RequestContext} context - The request context containing route parameters
 * @returns {Promise<NextResponse>} Response confirming deletion or an error message
 * 
 * @example
 * // Successful response (200 OK)
 * {
 *   "message": "AI Role deleted successfully",
 *   "deletedRoleId": "507f1f77bcf86cd799439011"
 * }
 * 
 * @example
 * // Error response (404 Not Found)
 * {
 *   "message": "AI Role not found"
 * }
 */
export async function DELETE(request: Request, context: RequestContext) {
  // Resolve the route parameters
  const resolvedParams = await context.params;
  const { roleId } = resolvedParams;

  // Validate roleId is provided
  if (!roleId) {
    return NextResponse.json(
      { message: 'Role ID is required' }, 
      { status: 400 }
    );
  }

  try {
    // Ensure database connection is established
    await dbConnect();

    // Attempt to find and delete the AI Role
    const deletedAiRole = await AiRole.findByIdAndDelete(roleId);

    // Handle case where role was not found
    if (!deletedAiRole) {
      return NextResponse.json(
        { message: 'AI Role not found' }, 
        { status: 404 }
      );
    }

    // Return success response with 200 OK
    return NextResponse.json(
      { 
        message: 'AI Role deleted successfully', 
        deletedRoleId: roleId 
      }, 
      { status: 200 }
    );
    
    // Alternative: Return 204 No Content without a response body
    // return new NextResponse(null, { status: 204 });

  } catch (error: any) {
    // Log the error for server-side debugging
    console.error(`Failed to delete AI role ${roleId}:`, error);
    
    // Handle invalid ObjectId format
    if (error.name === 'CastError' && error.path === '_id') {
      return NextResponse.json(
        { message: 'Invalid Role ID format' }, 
        { status: 400 }
      );
    }
    
    // Generic error response (with details in development)
    return NextResponse.json(
      {
        message: 'Failed to delete AI role',
        error: process.env.NODE_ENV === 'development' 
          ? error.message 
          : 'An internal server error occurred',
      },
      { status: 500 }
    );
  }
}
