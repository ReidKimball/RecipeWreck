/**
 * @file src/app/api/subscribe/route.ts
 * @description API Route Handler for subscribing users to the MailerLite waitlist.
 *              This endpoint receives an email address, validates it, and then uses the MailerLite
 *              SDK to add the subscriber to a pre-configured group specified by MAILERLITE_GROUP_ID
 *              in the environment variables.
 * @requires mailerlite/mailerlite-nodejs - The official MailerLite Node.js SDK.
 * @requires next/server - For Next.js API route functionalities (Request, Response).
 * @author Cascade
 * @date 2025-06-13
 */

import MailerLite from '@mailerlite/mailerlite-nodejs'; // Official MailerLite Node.js SDK for interacting with their API.

const mailerlite = new MailerLite({ 
  api_key: process.env.MAILERLITE_API_KEY || ''
});

/**
 * Handles POST requests to subscribe an email address to the MailerLite waitlist.
 * It expects a JSON body with an 'email' property.
 *
 * @async
 * @route POST /api/subscribe
 * @param {Request} request - The incoming Next.js API request object. Expected to contain a JSON body with an 'email' field.
 * @returns {Promise<Response>} A Next.js Response object.
 *   - Returns a 200 or 201 status with subscriber data on successful subscription or update.
 *   - Returns a 400 status if the email is missing, invalid, or improperly formatted.
 *   - Returns a 500 status if API keys/Group ID are not configured or if an unexpected server error occurs during the MailerLite API call.
 * @throws Will catch and log errors from MailerLite SDK or other unexpected issues, returning a 500 response.
 *
 * @example
 * // Client-side fetch request:
 * fetch('/api/subscribe', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ email: 'test@example.com' })
 * })
 * .then(res => res.json())
 * .then(data => console.log(data));
 */
export async function POST(request: Request) {
  if (!process.env.MAILERLITE_API_KEY) {
    return new Response(JSON.stringify({ message: 'MailerLite API key not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!process.env.MAILERLITE_GROUP_ID) {
    return new Response(JSON.stringify({ message: 'MailerLite Group ID not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ message: 'Email is required and must be a string.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate email format (basic)
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return new Response(JSON.stringify({ message: 'Invalid email format.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

        const params = {
      email: email,
      groups: [process.env.MAILERLITE_GROUP_ID!], // Group ID is checked for existence above
      status: 'active' as const, // Use 'as const' for type safety with literal unions
      // You can add more fields here if needed, like 'name'
      // fields: {
      //   name: 'John Doe',
      // }
    };

    const response = await mailerlite.subscribers.createOrUpdate(params);

    // MailerLite API v2 returns a 200 (updated) or 201 (created) on success.
    // The SDK response structure is AxiosResponse<SingleSubscriberResponse>.
    // response.data is SingleSubscriberResponse { data: Subscriber }
    // response.data.data is Subscriber { id: string, ... }
    if (response.data && response.data.data && response.data.data.id) {
      return new Response(JSON.stringify({ message: 'Successfully subscribed!', data: response.data.data }), {
        status: response.status, // Use actual status from MailerLite response (200 or 201)
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // This case should ideally not be hit if MailerLite API behaves as expected on success.
      // It's a fallback for unexpected successful (2xx) responses lacking the ID.
      console.error('MailerLite API success response (status ' + response.status + '), but unexpected data structure:', response.data);
      return new Response(JSON.stringify({ message: 'Subscription processed, but unexpected response structure from MailerLite.', data: response.data }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (error: any) {
    console.error('MailerLite API Error:', error.response ? error.response.data : error.message);
    
    let errorMessage = 'Failed to subscribe. Please try again later.';
    let statusCode = 500;

    if (error.response && error.response.data) {
      // Attempt to parse MailerLite specific error messages
      if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      if (error.response.data.errors) {
        // If there are multiple errors, concatenate them or pick the first one
        const firstErrorKey = Object.keys(error.response.data.errors)[0];
        if (firstErrorKey && error.response.data.errors[firstErrorKey] && error.response.data.errors[firstErrorKey].length > 0) {
          errorMessage = error.response.data.errors[firstErrorKey][0];
        }
      }
      statusCode = error.response.status || 500;
    }

    return new Response(JSON.stringify({ message: errorMessage, details: error.response ? error.response.data : null }), {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
