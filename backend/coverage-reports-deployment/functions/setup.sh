#!/bin/bash

# Create directory for files if it doesn't exist
mkdir -p public/user-service
mkdir -p public/product-service

# Copy entire coverage directories
cp -r ../../../backend/microservices/product-service/functions/coverage/* ./public/product-service/
cp -r ../../../backend/microservices/user-service/functions/coverage/* ./public/user-service/

# Check if main HTML files exist
if [ ! -f "./public/user-service/index.html" ] || [ ! -f "./public/product-service/index.html" ]; then
    echo "Error: Failed to copy coverage files"
    exit 1
fi

echo "Files copied successfully"

echo "Starting GCP deployment"
# Run npm deploy command
npm run deploy

echo "Deployment completed"