#!/usr/bin/env python3
"""
Development setup script for the Coupon Management System
This script helps with initial setup and configuration.
"""

import os
import shutil
import sys

def check_prerequisites():
    """Check if required tools are installed"""
    print("Checking prerequisites...")
    
    # Check if Docker is installed
    import subprocess
    try:
        result = subprocess.run(["docker", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✓ Docker: {result.stdout.strip()}")
        else:
            print("✗ Docker is not installed or not in PATH")
            return False
    except FileNotFoundError:
        print("✗ Docker is not installed or not in PATH")
        return False
    
    # Check if Docker Compose is available
    try:
        result = subprocess.run(["docker", "compose", "version"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✓ Docker Compose: {result.stdout.strip()}")
        else:
            print("✗ Docker Compose is not available")
            return False
    except FileNotFoundError:
        print("✗ Docker Compose is not available")
        return False
    
    return True

def setup_env_file():
    """Set up the .env file"""
    print("\nSetting up environment variables...")
    
    if os.path.exists(".env"):
        print("✓ .env file already exists")
        return True
    
    if os.path.exists(".sample.env"):
        try:
            shutil.copy(".sample.env", ".env")
            print("✓ Created .env file from .sample.env")
            print("  Please review and modify .env as needed")
            return True
        except Exception as e:
            print(f"✗ Failed to create .env file: {str(e)}")
            return False
    else:
        print("✗ .sample.env file not found")
        return False

def show_next_steps():
    """Show next steps for running the application"""
    print("\n" + "=" * 50)
    print("NEXT STEPS")
    print("=" * 50)
    print("1. Review and modify .env file as needed")
    print("2. Start the application:")
    print("   docker compose up -d")
    print("3. Monitor the startup process:")
    print("   docker compose logs -f")
    print("4. Wait 2-3 minutes for all services to initialize")
    print("5. Verify setup:")
    print("   python verify_setup.py")
    print("6. Access the application at http://localhost")

def main():
    """Main setup function"""
    print("Coupon Management System - Development Setup")
    print("=" * 50)
    
    # Check prerequisites
    if not check_prerequisites():
        print("\n⚠️  Prerequisites check failed.")
        print("Please install Docker Desktop and ensure it's running.")
        sys.exit(1)
    
    # Set up environment file
    if not setup_env_file():
        print("\n⚠️  Environment setup failed.")
        sys.exit(1)
    
    # Show next steps
    show_next_steps()
    
    print("\n🎉 Development setup completed successfully!")

if __name__ == "__main__":
    main()