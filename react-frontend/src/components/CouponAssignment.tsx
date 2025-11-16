import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../hooks/useAuth';
import { apiCoupons, ICoupon, ICouponAssign } from '../api/coupons';

const CouponAssignment: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [selectedCoupons, setSelectedCoupons] = useState<number[]>([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchUnassignedCoupons();
  }, []);

  const fetchUnassignedCoupons = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCoupons.getAllCoupons();
      const unassignedCoupons = data.filter(coupon => !coupon.is_assigned);
      setCoupons(unassignedCoupons);
    } catch (err) {
      console.error('Failed to fetch coupons:', err);
      setError('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCoupon = (couponId: number) => {
    if (selectedCoupons.includes(couponId)) {
      setSelectedCoupons(selectedCoupons.filter(id => id !== couponId));
    } else {
      setSelectedCoupons([...selectedCoupons, couponId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedCoupons.length === coupons.length) {
      setSelectedCoupons([]);
    } else {
      setSelectedCoupons(coupons.map(coupon => coupon.id));
    }
  };

  const handleAssignCoupons = async () => {
    if (selectedCoupons.length === 0 || !userId) return;
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const assignData: ICouponAssign = {
        coupon_ids: selectedCoupons,
        user_id: parseInt(userId)
      };
      
      await apiCoupons.assignCoupons(assignData);
      
      setSuccess('Coupons assigned successfully!');
      setSelectedCoupons([]);
      setUserId('');
      
      // Refresh coupons list
      await fetchUnassignedCoupons();
    } catch (err) {
      console.error('Failed to assign coupons:', err);
      setError('Failed to assign coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Coupon Assignment</Typography>
        <Box>
          <Typography variant="subtitle1" sx={{ display: 'inline-block', mr: 2 }}>
            Welcome, {user?.username}
          </Typography>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
      
      {error && (
        <Box mb={2}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
      
      {success && (
        <Box mb={2}>
          <Typography color="success">{success}</Typography>
        </Box>
      )}
      
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Assign Coupons to User
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="User ID"
              variant="outlined"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              margin="normal"
              type="number"
            />
            
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={handleAssignCoupons}
                disabled={selectedCoupons.length === 0 || !userId || loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Assign Coupons'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      <Box mt={4}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Available Coupons</Typography>
              <Button onClick={fetchUnassignedCoupons} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Refresh'}
              </Button>
            </Box>
            {loading && coupons.length === 0 ? (
              <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCoupons.length === coupons.length && coupons.length > 0}
                          onChange={handleSelectAll}
                          inputProps={{ 'aria-label': 'select all coupons' }}
                        />
                      </TableCell>
                      <TableCell>Brand</TableCell>
                      <TableCell>Tag</TableCell>
                      <TableCell>Code</TableCell>
                      <TableCell>Expiration Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {coupons.map((coupon) => (
                      <TableRow 
                        key={coupon.id} 
                        selected={selectedCoupons.includes(coupon.id)}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedCoupons.includes(coupon.id)}
                            onChange={() => handleSelectCoupon(coupon.id)}
                            inputProps={{ 'aria-label': `select coupon ${coupon.id}` }}
                          />
                        </TableCell>
                        <TableCell>{coupon.brand}</TableCell>
                        <TableCell>{coupon.tag}</TableCell>
                        <TableCell>{coupon.code}</TableCell>
                        <TableCell>
                          {coupon.expiration_date || 'No expiration'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CouponAssignment;