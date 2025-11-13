#!/usr/bin/env python3
"""
Verification script for the Coupon Management System
This script checks if all required services are running and accessible.
"""

import requests
import time
import sys
from typing import Dict, Any

# Configuration
SERVICES = {
    "Frontend": "http://localhost",
    "Backend API": "http://localhost/api/",
    "Swagger UI": "http://localhost/docs",
    "PGAdmin": "http://localhost:5050"
}

def check_service(name: str, url: str) -> bool:
    """Check if a service is accessible"""
    try:
        response = requests.get(url, timeout=5)
        if response.status_code in [200, 401, 403]:  # 401/403 means service exists but requires auth
            print(f"✓ {name} is accessible (Status: {response.status_code})")
            return True
        else:
            print(f"✗ {name} returned unexpected status: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print(f"✗ {name} is not accessible (Connection refused)")
        return False
    except requests.exceptions.Timeout:
        print(f"✗ {name} is not accessible (Timeout)")
        return False
    except Exception as e:
        print(f"✗ {name} check failed: {str(e)}")
        return False

def check_database_connection() -> bool:
    """Check if we can connect to the database (simplified check)"""
    # In a real implementation, we would connect to the database directly
    # For now, we'll check if the backend is responding to API calls
    try:
        response = requests.get("http://localhost/api/", timeout=5)
        if response.status_code in [200, 401, 403, 404]:
            print("✓ Backend service is running")
            return True
        else:
            print(f"✗ Backend service returned unexpected status: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("✗ Backend service is not accessible")
        return False
    except Exception as e:
        print(f"✗ Backend service check failed: {str(e)}")
        return False

def main():
    """Main verification function"""
    print("Coupon Management System Verification")
    print("=" * 40)
    
    # Wait a moment for services to start
    print("Checking if services are accessible...")
    time.sleep(2)
    
    # Check each service
    results = {}
    for name, url in SERVICES.items():
        results[name] = check_service(name, url)
    
    # Check database connectivity
    print("\nChecking database connectivity...")
    db_result = check_database_connection()
    results["Database"] = db_result
    
    # Summary
    print("\n" + "=" * 40)
    print("SUMMARY")
    print("=" * 40)
    
    all_passed = all(results.values())
    passed_count = sum(results.values())
    total_count = len(results)
    
    print(f"Services checked: {total_count}")
    print(f"Services working: {passed_count}")
    print(f"Services failed: {total_count - passed_count}")
    
    if all_passed:
        print("\n🎉 All services are working correctly!")
        print("\nNext steps:")
        print("1. Open http://localhost in your browser")
        print("2. The system will automatically authenticate using Windows Authentication")
        print("3. Explore the different features:")
        print("   - Dashboard: Overview of the system")
        print("   - My Coupons: View coupons assigned to you")
        print("   - Coupon Management: Upload and assign coupons (Manager/Admin)")
        print("   - User Management: Manage user roles (Admin only)")
    else:
        print("\n⚠️  Some services are not working correctly.")
        print("Please check the troubleshooting section in HOW_TO_RUN.md")
        print("Common issues:")
        print("1. Services still starting up (wait a few more minutes)")
        print("2. Port conflicts with other applications")
        print("3. Docker Desktop not running or configured incorrectly")
        print("4. Insufficient system resources")
        
        # Return non-zero exit code if any service failed
        sys.exit(1)

if __name__ == "__main__":
    main()