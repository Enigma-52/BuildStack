#!/bin/bash

# Color codes for better visibility
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to log with timestamp
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

# Function to check if a directory exists
check_directory() {
    if [ ! -d "$1" ]; then
        echo -e "${RED}Error: Directory $1 not found${NC}"
        exit 1
    fi
}

# Function to install dependencies
install_dependencies() {
    log "${YELLOW}Installing dependencies in $(pwd)...${NC}"
    npm install
}

# Store the root directory
ROOT_DIR=$(pwd)

# Define service paths
FRONTEND_PATH="./frontend"
USER_SERVICE_PATH="./backend/microservices/user-service"
PRODUCT_SERVICE_PATH="./backend/microservices/product-service"

# Array of service paths
declare -a SERVICE_PATHS=("$FRONTEND_PATH" "$USER_SERVICE_PATH" "$PRODUCT_SERVICE_PATH")

# Kill existing processes on ports (adjust port numbers as needed)
log "Cleaning up existing processes..."
lsof -ti:5173 | xargs kill -9 2>/dev/null  # Frontend
lsof -ti:3001 | xargs kill -9 2>/dev/null  # User service
lsof -ti:3002 | xargs kill -9 2>/dev/null  # Product service

# Check if all directories exist first
for service_path in "${SERVICE_PATHS[@]}"; do
    check_directory "$service_path"
done

# Install dependencies and generate Prisma clients for all services
log "Setting up Frontend..."
cd "$ROOT_DIR/$FRONTEND_PATH"
install_dependencies

log "Setting up User Service..."
cd "$ROOT_DIR/$USER_SERVICE_PATH"
install_dependencies
npm run prisma:generate

log "Setting up Product Service..."
cd "$ROOT_DIR/$PRODUCT_SERVICE_PATH"
install_dependencies
npm run prisma:generate

# Function to run a service
run_service() {
    local service_path=$1
    local service_name=$2
    cd "$ROOT_DIR/$service_path"
    log "Starting $service_name..."
    npm run dev &
    sleep 2 # Give some time for the service to start
}

# Launch all services
run_service "$FRONTEND_PATH" "frontend"
run_service "$USER_SERVICE_PATH" "user-service"
run_service "$PRODUCT_SERVICE_PATH" "product-service"

# Display service URLs
echo -e "\n${BLUE}=== Services URLs ===${NC}"
echo -e "${YELLOW}Frontend:${NC}         http://localhost:5173"
echo -e "${YELLOW}User Service:${NC}     http://localhost:3001"
echo -e "${YELLOW}Product Service:${NC}  http://localhost:3002"
echo -e "${BLUE}===================${NC}\n"

# Keep the script running and show logs
log "All services started. Press Ctrl+C to stop all services."

# Cleanup on script exit
cleanup() {
    log "Shutting down all services..."
    pkill -f "npm run dev"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Wait for all background processes
wait