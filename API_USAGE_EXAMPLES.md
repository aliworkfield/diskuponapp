# API Usage Examples

## Windows Authentication
```bash
# Simulate Windows Authentication (in real environment, this would be handled by IIS)
curl -X POST "http://localhost/api/v1/login/windows" \
  -H "X-Windows-Username: testuser@example.com"
```

## Get Current User Profile
```bash
# Get current user profile (requires authentication token)
curl -X GET "http://localhost/api/v1/users/" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Upload Coupons (Manager/Admin only)
```bash
# Upload coupons via JSON
curl -X POST "http://localhost/api/v1/coupons/upload" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "coupons": [
      {
        "brand": "Nike",
        "tag": "nikeOctober1",
        "code": "nike1",
        "expiration_date": "2025-12-31"
      },
      {
        "brand": "Adidas",
        "tag": "adidasNovember1",
        "code": "adidas1"
      }
    ]
  }'
```

## Assign Coupons (Manager/Admin only)
```bash
# Assign coupons to users
curl -X POST "http://localhost/api/v1/coupons/assign" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "Nike",
    "tag": "nikeOctober1",
    "target_type": "all",
    "exclude_users": "3,5"
  }'
```

## Get All Coupons
```bash
# Get all coupons (Manager/Admin see all, regular users see only assigned)
curl -X GET "http://localhost/api/v1/coupons/" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Get My Coupons
```bash
# Get coupons assigned to current user
curl -X GET "http://localhost/api/v1/coupons/my-coupons" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Get All Assignments (Manager/Admin only)
```bash
# Get all coupon assignments
curl -X GET "http://localhost/api/v1/coupons/assignments" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Get All Users (Manager/Admin only)
```bash
# Get all users
curl -X GET "http://localhost/api/v1/users-extended/" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Update User Role (Admin only)
```bash
# Update user role
curl -X PATCH "http://localhost/api/v1/users-extended/1" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "role_id": 2
  }'
```