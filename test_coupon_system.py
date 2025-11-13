#!/usr/bin/env python3
"""
Test script for the Coupon Management System
"""

import requests
import os
from typing import Dict, Any

# Configuration
BASE_URL = "http://localhost/api/v1"
WINDOWS_USERNAME = "testuser@example.com"
ADMIN_USERNAME = os.getenv("FIRST_SUPERUSER", "admin@diskuponapp.com")
ADMIN_PASSWORD = os.getenv("FIRST_SUPERUSER_PASSWORD", "changethis")

# Session for making requests
session = requests.Session()


def test_windows_authentication() -> str | None:
    """Test Windows Authentication endpoint"""
    print("Testing Windows Authentication...")
    
    # Set Windows username in header (simulating IIS)
    headers = {"X-Windows-Username": WINDOWS_USERNAME}
    
    response = session.post(
        f"{BASE_URL}/login/windows",
        headers=headers
    )
    
    if response.status_code == 200:
        data = response.json()
        print("✓ Windows Authentication successful")
        return data["access_token"]
    else:
        print(f"✗ Windows Authentication failed: {response.status_code}")
        print(response.text)
        return None


def test_get_user_profile(token: str) -> Dict[str, Any] | None:
    """Test getting user profile"""
    print("Testing User Profile Retrieval...")
    
    headers = {"Authorization": f"Bearer {token}"}
    response = session.get(f"{BASE_URL}/users/", headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        print("✓ User Profile Retrieval successful")
        return data
    else:
        print(f"✗ User Profile Retrieval failed: {response.status_code}")
        print(response.text)
        return None


def test_upload_coupons(token: str) -> bool:
    """Test coupon upload (Manager/Admin only)"""
    print("Testing Coupon Upload...")
    
    headers = {"Authorization": f"Bearer {token}"}
    coupon_data = {
        "coupons": [
            {
                "brand": "Nike",
                "tag": "nikeOctober1",
                "code": "nike1"
            },
            {
                "brand": "Nike",
                "tag": "nikeOctober1",
                "code": "nike2"
            }
        ]
    }
    
    response = session.post(
        f"{BASE_URL}/coupons/upload",
        headers=headers,
        json=coupon_data
    )
    
    if response.status_code == 200:
        print("✓ Coupon Upload successful")
        return True
    else:
        print(f"✗ Coupon Upload failed: {response.status_code}")
        print(response.text)
        return False


def test_get_coupons(token: str) -> bool:
    """Test getting coupons"""
    print("Testing Coupon Retrieval...")
    
    headers = {"Authorization": f"Bearer {token}"}
    response = session.get(f"{BASE_URL}/coupons/", headers=headers)
    
    if response.status_code == 200:
        print("✓ Coupon Retrieval successful")
        return True
    else:
        print(f"✗ Coupon Retrieval failed: {response.status_code}")
        print(response.text)
        return False


def main():
    """Main test function"""
    print("Starting Coupon Management System Tests...\n")
    
    # Test Windows Authentication
    token = test_windows_authentication()
    if not token:
        return
    
    # Test User Profile
    user_profile = test_get_user_profile(token)
    if not user_profile:
        return
    
    # Test Coupon Operations (would require Manager/Admin role)
    # For now, we'll just show the functions exist
    print("\nNote: Coupon upload/assignment requires Manager or Admin role")
    print("Regular users can only view their assigned coupons\n")
    
    # Test Get Coupons (available to all users)
    test_get_coupons(token)
    
    print("\nAll tests completed!")


if __name__ == "__main__":
    main()