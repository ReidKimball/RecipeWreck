/**
 * @file src/models/AiRole.ts
 * @description Defines the Mongoose schema and TypeScript interfaces for AI Roles in the Creator Space application.
 * This model represents the structure and validation rules for AI assistant roles that users can create and manage.
 * 
 * @requires mongoose - MongoDB object modeling tool
 * @requires Document - Mongoose document type
 * @requires Schema - Mongoose schema constructor
 * @requires Types - Mongoose types for type definitions
 * 
 * @author Cascade
 * @date 2025-06-08
 */

import mongoose, { Document, Schema, Types } from 'mongoose';

/**
 * Interface representing an AI Role document in MongoDB.
 * Extends Mongoose's Document type to include our custom fields.
 * 
 * @interface IAiRole
 * @extends {Document}
 * @property {string} id - Unique identifier (converted from MongoDB's _id)
 * @property {string} title - The name/title of the AI role (required, max 100 chars)
 * @property {string} description - Description of what the AI role does (required, max 500 chars)
 * @property {string} systemPromptText - The system prompt text that defines the AI's behavior (required, max 10000 chars)
 * @property {string} category - Category of the AI role (e.g., 'Productivity', 'Creative', etc.)
 * @property {string[]} tags - Array of tags for categorization and search
 * @property {number} version - Version number for optimistic concurrency control
 * @property {Date} createdAt - Timestamp when the role was created
 * @property {string} createdBy - Identifier for the user who created the role
 */
export interface IAiRole extends Document {
  id: string;
  title: string;
  description: string;
  systemPromptText: string;
  category: string;
  tags: string[];
  version: number;
  createdAt: Date;
  createdBy: string;
}

/**
 * Mongoose schema definition for AI Roles.
 * Defines the structure, validation rules, and options for AI Role documents.
 * 
 * @constant {Schema} AiRoleSchema
 */
const AiRoleSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  systemPromptText: {
    type: String,
    required: [true, 'System prompt text is required'],
    trim: true,
    maxlength: [10000, 'System prompt is too long']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: [
      'Productivity', 
      'Creative', 
      'Education', 
      'Development', 
      'Entertainment', 
      'Health & Wellness',
      'Custom'
    ],
    default: 'Custom'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  version: {
    type: Number,
    default: 1,
    min: [1, 'Version must be at least 1']
  },
  createdBy: {
    type: String,
    required: [true, 'Created by is required'],
    trim: true
  }
}, {
  timestamps: { 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt' 
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

/**
 * Virtual getter for 'id' that returns the string representation of _id.
 * Ensures consistent ID field naming in the API responses.
 * 
 * @name AiRoleSchema.virtual.id.get
 * @returns {string} The hexadecimal string representation of the document's _id
 */
AiRoleSchema.virtual('id').get(function(this: Document & IAiRole) {
  // Explicitly cast _id to mongoose.Types.ObjectId to help TypeScript
  return (this._id as Types.ObjectId).toHexString();
});

/**
 * Configure JSON serialization of the schema.
 * Ensures virtuals are included and removes MongoDB-specific fields from the output.
 * 
 * @name AiRoleSchema.set
 * @param {string} 'toJSON' - The schema option being configured
 * @param {Object} options - Options for JSON serialization
 * @param {boolean} options.virtuals - Include virtuals in JSON output
 * @param {boolean} options.versionKey - Exclude version key (__v) from output
 * @param {Function} options.transform - Transform function that runs during JSON serialization
 * @param {any} options.transform.doc - The Mongoose document being serialized
 * @param {Record<string, any>} options.transform.ret - The plain object representation of the document
 */
AiRoleSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: Record<string, any>) {
    // Remove MongoDB internal fields from the output
    delete ret._id;
    delete ret.__v;
  }
});

/**
 * The Mongoose model for AI Roles.
 * Uses the singleton pattern to prevent model recompilation during hot module replacement in development.
 * 
 * @constant {Model<IAiRole>} AiRole
 * @example
 * // Import and use the model
 * import AiRole from '@/models/AiRole';
 * const roles = await AiRole.find({ category: 'Productivity' });
 */
const AiRole = mongoose.models.AiRole || 
  mongoose.model<IAiRole>('AiRole', AiRoleSchema, 'ai_roles');

export default AiRole;
