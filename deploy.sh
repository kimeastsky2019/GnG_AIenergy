#!/bin/bash

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting deployment."
    exit 1
fi

# Configuration
SERVER_HOST="agent.gngmeta.com"
SERVER_USER="metal" # Default user based on nginx config, override with first argument
REMOTE_PATH="/var/www/html/aienergy/"

if [ ! -z "$1" ]; then
    SERVER_USER=$1
fi

# Using specific PEM key provided by user
PEM_KEY="/Users/donghokim/Documents/GnG_Tour/GnGTour/energy-orchestrator-platform.pem"

echo "🚀 Deploying to ${SERVER_USER}@${SERVER_HOST}:${REMOTE_PATH} using key ${PEM_KEY}..."

# Fix permissions on server (requires passwordless sudo)
echo "🔧 Fixing permissions on remote directory..."
ssh -i "$PEM_KEY" ${SERVER_USER}@${SERVER_HOST} "sudo chown -R ${SERVER_USER}:${SERVER_USER} ${REMOTE_PATH}"

# Deploy using scp (since rsync is missing on server)
# -r: recursive
# -i: specify identity file
echo "📡 Uploading files via SCP..."
scp -i "$PEM_KEY" -r dist/* ${SERVER_USER}@${SERVER_HOST}:${REMOTE_PATH}

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
else
    echo "❌ Deployment failed. Please check your SSH keys and permissions."
    echo "Tip: You can specify a different user by running: ./deploy.sh <username>"
fi
