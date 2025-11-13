# Testing the Coupon Management Application

## Automated Testing

### Setup Verification
Run the verification script to check if all services are running:
```bash
python verify_setup.py
```

### API Testing
Use the provided test script to test core functionality:
```bash
python test_coupon_system.py
```

## Manual Testing

### 1. User Authentication
1. Open http://localhost in your browser
2. The system should automatically authenticate using Windows Authentication
3. Check that the user is created in the database with the default "User" role

### 2. User Roles
Test different user roles by setting different values in the `X-Windows-Username` header:

1. **Regular User**: 
   - Set header: `X-Windows-Username: user@example.com`
   - Should only see "My Coupons" and "Dashboard"

2. **Manager User**:
   - First, log in as admin and promote a user to Manager role
   - Manager should see "Coupon Management" in navigation

3. **Admin User**:
   - Use credentials from .env file
   - Should see "User Management" in navigation

### 3. Coupon Management
1. **Upload Coupons** (Manager/Admin only):
   - Navigate to "Coupon Management"
   - Use the upload form to add new coupons
   - Verify coupons appear in the coupon list

2. **Assign Coupons** (Manager/Admin only):
   - Use the assignment form to distribute coupons
   - Verify assignments appear in the assignments list

3. **View Coupons** (All users):
   - Regular users should see only their assigned coupons in "My Coupons"
   - Manager/Admin should see all coupons in "Coupon Management"

### 4. User Management
1. **View Users** (Manager/Admin only):
   - Navigate to "User Management"
   - Verify user list is displayed

2. **Update User Role** (Admin only):
   - Select a user and change their role
   - Verify the role change takes effect

## API Endpoint Testing

### Using Swagger UI
1. Open http://localhost/docs
2. Try different endpoints with appropriate authentication
3. Verify responses match expected formats

### Using Curl
Examples are provided in `API_USAGE_EXAMPLES.md`

## Database Verification

### Using PGAdmin
1. Open http://localhost:5050
2. Log in with credentials from .env file
3. Connect to the database
4. Verify tables exist:
   - users
   - roles
   - coupons
   - user_coupons
5. Verify data is being stored correctly

### Using Direct Database Access
```bash
docker compose exec db psql -U postgres -d app
```

## Error Handling Testing

1. **Invalid Authentication**:
   - Try accessing protected endpoints without authentication
   - Verify appropriate error responses

2. **Insufficient Permissions**:
   - Try accessing Manager/Admin endpoints as regular user
   - Verify access is denied

3. **Invalid Data**:
   - Try uploading invalid coupon data
   - Verify validation works correctly

## Performance Testing

1. **Load Testing**:
   - Test with multiple concurrent users
   - Verify system performance is acceptable

2. **Large Data Sets**:
   - Upload large numbers of coupons
   - Verify system handles them correctly

## Security Testing

1. **SQL Injection**:
   - Try SQL injection attacks in form inputs
   - Verify inputs are properly sanitized

2. **Cross-Site Scripting**:
   - Try XSS attacks in form inputs
   - Verify inputs are properly escaped

3. **Authentication Bypass**:
   - Try to access protected resources without authentication
   - Verify access controls work correctly

## Browser Compatibility Testing

Test the application in different browsers:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari (if available)

## Mobile Responsiveness Testing

1. Test the application on different screen sizes
2. Verify the UI is responsive and usable on mobile devices
3. Check that all functionality works on touch devices

## Test Data

The system includes seed data for testing:
- 3 roles (User, Manager, Admin)
- Sample users (created on first login)
- Sample coupons (can be uploaded via the UI)

## Test Results Documentation

Record test results including:
- Test case descriptions
- Expected vs actual results
- Screenshots for UI tests
- Error messages for failed tests
- Performance metrics