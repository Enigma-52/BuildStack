#!/bin/bash

# Colors and formatting
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Config file to store tokens
TOKEN_CONFIG=".doppler-tokens.conf"

# Progress indicator function
show_progress() {
    local duration=0.1
    local width=20
    local progress=0
    while [ $progress -le 100 ]; do
        echo -ne "\r[${YELLOW}"
        local current=$((${width} * ${progress} / 100))
        for ((i = 0; i < current; i++)); do echo -n "▇"; done
        for ((i = current; i < width; i++)); do echo -n " "; done
        echo -n "${NC}] ${progress}%"
        progress=$((progress + 5))
        sleep $duration
    done
    echo
}

# Enhanced echo functions
print_step() {
    echo -e "\n${BLUE}${BOLD}$1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to save token
save_token() {
    local config=$1
    local token=$2
    # Create config file if it doesn't exist
    touch "$TOKEN_CONFIG"
    # Remove existing entry if it exists
    sed -i.bak "/^${config}=/d" "$TOKEN_CONFIG"
    # Add new token
    echo "${config}=${token}" >> "$TOKEN_CONFIG"
    rm -f "${TOKEN_CONFIG}.bak"
    print_success "Token saved for future use"
}

# Function to get saved token
get_token() {
    local config=$1
    if [ -f "$TOKEN_CONFIG" ]; then
        grep "^${config}=" "$TOKEN_CONFIG" | cut -d'=' -f2
    fi
}

# Function to check and install Doppler CLI
install_doppler() {
    if ! command -v doppler &> /dev/null; then
        print_step "🔍 Doppler CLI not found. Installing..."
        if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$OSTYPE" == "win64" ]]; then
            print_step "🪟 Windows system detected"
            winget install doppler.doppler
        else
            print_step "🍎 macOS/Linux system detected"
            brew install doppler
        fi
        print_success "Doppler CLI installed successfully!"
    else
        print_success "Doppler CLI already installed"
    fi
}

# Function to handle environment setup
setup_environment() {
    local env_name=$1
    local config=$2
    local dir=$3
    local type=$4
    
    print_step "📥 Setting up ${env_name} Environment"
    
    # Check for saved token
    local saved_token=$(get_token "$config")
    local token=""
    
    if [ -n "$saved_token" ]; then
        print_success "Using saved token for ${config}"
        token=$saved_token
    else
        echo -e "${YELLOW}Enter token for ${config}:${NC}"
        read token  
        echo -e "${YELLOW}Saving token for future use...${NC}"
        save_token "$config" "$token"
    fi
    
    file_name="$dir/.env"
    if [[ "$type" == "test" ]]; then
        file_name="$dir/.env.test"
    fi
    
    # Create directory if it doesn't exist
    mkdir -p "$(dirname "$file_name")"
    
    # Proceed with environment setup regardless of file existence
        echo -e "\n${BOLD}Configuring token...${NC}"
        doppler configure set token "$token" --scope ./
        show_progress
        
        print_step "Downloading environment variables..."
        doppler secrets download --project buildstack --config "$config" --format env --no-file > "$file_name"
        show_progress
        
        print_success "✨ ${env_name} environment setup complete!"
}

# Fancy banner
echo -e "${BLUE}${BOLD}"
echo "╔══════════════════════════════════════════╗"
echo "║     🌟 Doppler Environment Fetcher 🌟    ║"
echo "╚══════════════════════════════════════════╝${NC}"

# Install Doppler if needed
install_doppler

# Setup each environment
setup_environment "Product Service" "dev_product_env" "./backend/microservices/product-service/functions" dev
setup_environment "User Service" "dev_user_env" "./backend/microservices/user-service/functions" dev
setup_environment "Frontend" "dev_frontend_env" "./frontend" dev
setup_environment "RabbitMQ" "dev_rabbitmq_env" "./backend/microservices/rabbitmq-service/functions" dev
setup_environment "Product Service Tests" "dev_test_env" "./backend/microservices/user-service/functions" test
setup_environment "User Service Tests" "dev_test_env" "./backend/microservices/product-service/functions" test

# Final summary
echo -e "\n${GREEN}${BOLD}🎉 All environments have been successfully configured!${NC}"
echo -e "\n${BOLD}📁 Environment files location:${NC}"
echo -e "${BLUE}• Product Service:  ${NC}packages/product/.env"
echo -e "${BLUE}• User Service: ${NC}packages/frontend/.env"
echo -e "${BLUE}• Frontend: ${NC}packages/frontend/.env"
echo -e "${BLUE}• RabbitMQ: ${NC}packages/rabbitmq/.env"

echo -e "\n${YELLOW}${BOLD}Don't forget to add your .env files and ${TOKEN_CONFIG} to your .gitignore!${NC}"