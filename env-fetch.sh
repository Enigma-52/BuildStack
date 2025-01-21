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

# Progress tracking variables
TOTAL_STEPS=0
CURRENT_STEP=0
LAST_LINE_COUNT=0
MESSAGE_BUFFER=""

# Terminal handling
clear_lines() {
    local lines=$1
    for ((i=0; i<lines; i++)); do
        tput cuu1   # Move cursor up
        tput el     # Clear line
    done
}

# Save initial cursor position
save_initial_position() {
    tput sc
}

# Restore to initial cursor position
restore_initial_position() {
    tput rc
    tput ed
}

# Calculate number of lines a message will take
count_lines() {
    local text="$1"
    echo "$text" | wc -l
}

# Print message and maintain progress bar
print_message() {
    local message="$1"
    local force_update="${2:-false}"
    
    # Add message to buffer
    MESSAGE_BUFFER="${MESSAGE_BUFFER}${message}\n"
    
    # Only redraw if forced or if it's been a while since last update
    if [[ "$force_update" == "true" ]]; then
        redraw_screen
    fi
}

# Redraw entire screen content
redraw_screen() {
    restore_initial_position
    
    # Print all buffered messages
    echo -en "${MESSAGE_BUFFER}"
    
    # Draw progress bar at bottom
    draw_progress_bar
}

# Initialize progress tracking
init_progress() {
    TOTAL_STEPS=$1
    CURRENT_STEP=0
    save_initial_position
    draw_progress_bar
}

# Draw the progress bar
draw_progress_bar() {
    local progress=$((CURRENT_STEP * 100 / TOTAL_STEPS))
    local width=50
    local current=$((width * progress / 100))
    
    # Create progress bar string
    local bar="["
    for ((i = 0; i < current; i++)); do bar+="▇"; done
    for ((i = current; i < width; i++)); do bar+=" "; done
    bar+="]"
    
    # Add percentage and status
    local status="${progress}% Complete"
    if [ $progress -eq 100 ]; then
        status+=" ✨"
    fi
    
    # Print the bar with proper formatting
    echo -e "\n${YELLOW}${bar}${NC} ${status}"
}

# Update progress and redraw
update_progress() {
    CURRENT_STEP=$((CURRENT_STEP + 1))
    redraw_screen
}

# Enhanced echo functions with proper progress bar handling
print_step() {
    print_message "\n${BLUE}${BOLD}$1${NC}" true
}

print_success() {
    print_message "${GREEN}✓ $1${NC}" true
}

print_error() {
    print_message "${RED}✗ $1${NC}" true
}

print_warning() {
    print_message "${YELLOW}! $1${NC}" true
}

# Function to save token
save_token() {
    local config=$1
    local token=$2
    touch "$TOKEN_CONFIG"
    sed -i.bak "/^${config}=/d" "$TOKEN_CONFIG"
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
    update_progress
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
        print_warning "Token required for ${config}"
        echo -ne "${YELLOW}Enter token:${NC} "
        read -s token
        echo  # Add newline after silent read
        print_message "${YELLOW}Token saved for future use...${NC}"
        save_token "$config" "$token"
    fi
    
    file_name="$dir/.env"
    if [[ "$type" == "test" ]]; then
        file_name="$dir/.env.test"
    fi
    
    print_message "\n${BOLD}Configuring token...${NC}"
    doppler configure set token "$token" --scope ./
    
    print_step "Downloading secrets for ${env_name}..."
    if ! doppler secrets download --project buildstack --config "$config" --format env --no-file > "$file_name"; then
        print_error "Failed to download secrets for ${env_name}"
        return 1
    fi
    
    print_success "✨ ${env_name} environment setup complete!"
    update_progress
}

# Clear screen and show banner
clear
echo -e "${BLUE}${BOLD}"
MESSAGE_BUFFER+="╔══════════════════════════════════════════╗\n"
MESSAGE_BUFFER+="║     🌟 Doppler Environment Fetcher 🌟    ║\n"
MESSAGE_BUFFER+="╚══════════════════════════════════════════╝${NC}\n"

# Define environments
declare -a environments=(
    "Product Service:dev_product_env:./backend/microservices/product-service/functions:dev"
    "User Service:dev_user_env:./backend/microservices/user-service/functions:dev"
    "Frontend:dev_frontend_env:./frontend:dev"
    "RabbitMQ:dev_rabbitmq_env:./backend/microservices/rabbitmq-service/functions:dev"
    "Product Service Tests:dev_test_env:./backend/microservices/user-service/functions:test"
    "User Service Tests:dev_test_env:./backend/microservices/product-service/functions:test"
)

# Calculate total steps (Doppler install + environments)
TOTAL_TASKS=$((${#environments[@]} + 1))

# Initialize progress with total number of tasks
init_progress $TOTAL_TASKS

# Install Doppler if needed
install_doppler

# Setup each environment
for env in "${environments[@]}"; do
    IFS=':' read -r name config dir type <<< "$env"
    setup_environment "$name" "$config" "$dir" "$type" || {
        print_error "Failed to setup ${name}. Continuing with remaining environments..."
        update_progress
        continue
    }
done

# Final summary
print_message "\n${GREEN}${BOLD}🎉 All environments have been successfully configured!${NC}"
print_message "\n${BOLD}📁 Environment files location:${NC}"
print_message "${BLUE}• Product Service:  ${NC}packages/product/.env"
print_message "${BLUE}• User Service: ${NC}packages/frontend/.env"
print_message "${BLUE}• Frontend: ${NC}packages/frontend/.env"
print_message "${BLUE}• RabbitMQ: ${NC}packages/rabbitmq/.env"

print_message "\n${YELLOW}${BOLD}Don't forget to add your .env files and ${TOKEN_CONFIG} to your .gitignore!${NC}"
redraw_screen