# Stage 1: Install dependencies and build the application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and lock file
COPY package.json yarn.lock* pnpm-lock.yaml* ./

# Install dependencies based on the lock file found
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
    else npm ci; \
    fi

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production image - copy only necessary artifacts
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Automatically determine correct Next.js output standalone folder
# and copy the server files, public folder, and .next/static folder.
# This handles different Next.js output configurations (standalone or not).
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
