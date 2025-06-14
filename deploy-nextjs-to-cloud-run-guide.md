# Developer Guide: Deploying a Next.js App to Google Cloud Run with Docker

This guide walks you through the process of containerizing a Next.js application using Docker and deploying it to Google Cloud Run, leveraging Google Artifact Registry for image storage. This process assumes you have a Next.js application ready for deployment.

## Prerequisites

Before you begin, ensure you have the following installed and configured:

1.  **A Next.js Application:** Your application code should be ready.
2.  **Node.js and npm/yarn:** For managing Next.js dependencies and running build scripts. (LTS version recommended).
3.  **Docker Desktop:** Installed and running on your local machine. ([Download Docker](https://www.docker.com/products/docker-desktop/))
4.  **Google Cloud SDK (`gcloud` CLI):** Installed and initialized. ([Install gcloud CLI](https://cloud.google.com/sdk/docs/install))
    *   Authenticate `gcloud`: Run `gcloud auth login` and `gcloud auth application-default login`.
    *   Set your default project: `gcloud config set project [YOUR_PROJECT_ID]` (replace `[YOUR_PROJECT_ID]` with your actual Google Cloud Project ID).
5.  **Google Cloud Project:** A Google Cloud Platform project with billing enabled.

## Step 1: Create a Dockerfile

The `Dockerfile` contains instructions to build your Next.js application into a Docker image. Create a file named `Dockerfile` (no extension) in the root directory of your Next.js project with the following content:

```dockerfile
# Stage 1: Install dependencies and build the application
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and lock file (package-lock.json or yarn.lock)
# This leverages Docker's layer caching. If these files haven't changed,
# Docker won't re-run npm install in subsequent builds.
COPY package*.json ./

# Install dependencies based on the lock file found
# If you use yarn, change this to 'RUN yarn install --frozen-lockfile'
RUN npm install

# Copy the rest of the application code
COPY . .

# Optional: Ignore linting and typecheck errors during the build process
# Useful for CI/CD pipelines or if you handle these checks separately.
# ENV NEXTJS_IGNORE_ESLINT_ERRORS=1
# ENV NEXTJS_IGNORE_TYPECHECK_ERRORS=1

# Build the Next.js application for production
# This will create an optimized build in the .next folder.
# Ensure your package.json has a "build" script: "next build"
RUN npm run build

# Stage 2: Production image - copy only necessary artifacts
# Use a slim base image for a smaller final image size.
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy the standalone Next.js output from the builder stage.
# This includes only the necessary files to run the app, significantly reducing image size.
# Ensure your next.config.js has `output: 'standalone'` set.
# Example next.config.js:
# /** @type {import('next').NextConfig} */
# const nextConfig = {
#   output: 'standalone',
# };
# module.exports = nextConfig;
COPY --from=builder /app/.next/standalone ./

# Copy the .next/static folder (contains optimized static assets like JS, CSS, images)
COPY --from=builder /app/.next/static ./.next/static

# Copy the public folder (if you have static assets in /public)
COPY --from=builder /app/public ./public

# Expose the port the app runs on. 
# Next.js standalone server listens to the PORT environment variable (default 3000 if not set).
# Cloud Run will provide a PORT environment variable (usually 8080).
EXPOSE 3000

# Command to run the application.
# The standalone output includes a server.js file to start the Next.js server.
CMD ["node", "server.js"]
```

**Key `Dockerfile` points:**
*   **Multi-stage build:** Uses a `builder` stage to install dependencies and build the app, and a `runner` stage to create a lean production image.
*   **`output: 'standalone'`:** Crucial for Next.js. Ensure your `next.config.js` includes `output: 'standalone',` to generate a minimal server. The Dockerfile copies from `/app/.next/standalone`.
*   **`EXPOSE 3000`:** Documents the port Next.js defaults to, though Cloud Run will inject its own `PORT` environment variable (typically 8080) which the `server.js` in standalone mode will automatically use.
*   **`CMD ["node", "server.js"]`:** The command that starts your Next.js application in the container.

## Step 2: Build the Docker Image Locally

Navigate to your project's root directory (where the `Dockerfile` is) in your terminal and run:

```bash
docker build -t [YOUR_APP_IMAGE_NAME] .
```

*   Replace `[YOUR_APP_IMAGE_NAME]` with a name for your image (e.g., `my-nextjs-app`, `recipewreck-app`).
*   The `.` at the end specifies the current directory as the build context.

This command will build your Docker image. It might take a few minutes the first time.

## Step 3: Set Up Google Artifact Registry

Artifact Registry is Google Cloud's recommended service for storing and managing container images and other artifacts.

1.  **Enable the Artifact Registry API:**
    If not already enabled for your project, run:
    ```bash
    gcloud services enable artifactregistry.googleapis.com --project=[YOUR_PROJECT_ID]
    ```
    Replace `[YOUR_PROJECT_ID]` with your Google Cloud Project ID.

2.  **Create an Artifact Registry Docker Repository:**
    Repositories in Artifact Registry are regional. Choose a region (e.g., `us-central1`, `europe-west1`).
    ```bash
    gcloud artifacts repositories create [REPOSITORY_NAME] \
        --repository-format=docker \
        --location=[REGION] \
        --description="Docker repository for my Next.js app" \
        --project=[YOUR_PROJECT_ID]
    ```
    *   Replace `[REPOSITORY_NAME]` (e.g., `my-app-repo`, `recipewreck-repo`).
    *   Replace `[REGION]` (e.g., `us-central1`).
    *   Replace `[YOUR_PROJECT_ID]`.

## Step 4: Tag and Push the Docker Image to Artifact Registry

1.  **Tag your local Docker image:**
    The tag needs to point to your Artifact Registry repository.
    ```bash
    docker tag [YOUR_APP_IMAGE_NAME] [REGION]-docker.pkg.dev/[YOUR_PROJECT_ID]/[REPOSITORY_NAME]/[YOUR_APP_IMAGE_NAME]:latest
    ```
    *   Replace `[YOUR_APP_IMAGE_NAME]` with the name you used in Step 2.
    *   Replace `[REGION]`, `[YOUR_PROJECT_ID]`, and `[REPOSITORY_NAME]` with the values from Step 3.
    *   `:latest` is a common tag for the most recent version.

2.  **Configure Docker authentication for Artifact Registry:**
    This command configures your Docker client to use `gcloud` credentials to authenticate with Artifact Registry in the specified region.
    ```bash
    gcloud auth configure-docker [REGION]-docker.pkg.dev --project=[YOUR_PROJECT_ID]
    ```
    You only need to run this once per region unless your credentials change.

3.  **Push the image to Artifact Registry:**
    ```bash
    docker push [REGION]-docker.pkg.dev/[YOUR_PROJECT_ID]/[REPOSITORY_NAME]/[YOUR_APP_IMAGE_NAME]:latest
    ```
    This uploads your tagged image to your private repository in Artifact Registry.

## Step 5: Deploy to Google Cloud Run

Google Cloud Run is a fully managed serverless platform that automatically scales your containerized applications.

Run the following command to deploy your image:

```bash
gcloud run deploy [SERVICE_NAME] \
    --image=[REGION]-docker.pkg.dev/[YOUR_PROJECT_ID]/[REPOSITORY_NAME]/[YOUR_APP_IMAGE_NAME]:latest \
    --region=[REGION] \
    --platform=managed \
    --allow-unauthenticated \
    --project=[YOUR_PROJECT_ID]
```

*   **`[SERVICE_NAME]`**: Choose a name for your Cloud Run service (e.g., `my-nextjs-service`, `recipewreck-app`). This will be part of your service's URL.
*   **`--image`**: The full path to your image in Artifact Registry.
*   **`--region`**: The Google Cloud region where your service will run. It's often best to co-locate this with your Artifact Registry repository.
*   **`--platform=managed`**: Specifies the fully managed Cloud Run environment (default).
*   **`--allow-unauthenticated`**: Makes your service publicly accessible. Omit this if you want to restrict access and manage authentication through IAM.
*   **`--project`**: Your Google Cloud Project ID.

`gcloud` will prompt you to confirm settings. After deployment, it will output the **Service URL** where your application is accessible.

## Step 6: Verify Deployment

Once the deployment is complete, `gcloud` will provide a URL (e.g., `https://[SERVICE_NAME]-[HASH]-[REGION].a.run.app`).

Open this URL in your web browser to see your Next.js application running live!

## Congratulations!

You have successfully containerized your Next.js application and deployed it to Google Cloud Run. Your application is now scalable, serverless, and globally accessible.

## Further Steps (Optional)

*   **Custom Domains:** Map a custom domain to your Cloud Run service.
*   **Environment Variables:** Configure environment variables for your service (e.g., API keys).
*   **Secrets Management:** Use Secret Manager for sensitive data.
*   **CI/CD:** Set up a Continuous Integration/Continuous Deployment pipeline (e.g., using Cloud Build and GitHub Actions) to automate builds and deployments.
*   **Monitoring and Logging:** Utilize Cloud Logging and Cloud Monitoring to observe your application's behavior.
