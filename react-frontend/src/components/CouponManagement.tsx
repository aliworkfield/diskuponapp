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
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../hooks/useAuth';
import { apiCoupons, ICoupon, ICouponUpload } from '../api/coupons';

const CouponManagement: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [brand, setBrand] = useState('');
  const [tag, setTag] = useState('');
  const [code, setCode] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCoupons.getAllCoupons();
      setCoupons(data);
    } catch (err) {
      console.error('Failed to fetch coupons:', err);
      setError('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCoupon = async () => {
    if (!brand || !tag || !code) return;
    
    setLoading(true);
    setError(null);
    try {
      const couponData: ICouponUpload = {
        brand,
        tag,
        code,
        expiration_date: expirationDate || undefined
      };
      
      await apiCoupons.uploadCoupons([couponData]);
      
      // Reset form
      setBrand('');
      setTag('');
      setCode('');
      setExpirationDate('');
      
      // Refresh coupons list
      await fetchCoupons();
    } catch (err) {
      console.error('Failed to add coupon:', err);
      setError('Failed to add coupon');
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
        <Typography variant="h4">Coupon Management</Typography>
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
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Add New Coupon
              </Typography>
              <Box component="form" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Brand"
                  variant="outlined"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Tag"
                  variant="outlined"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Code"
                  variant="outlined"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Expiration Date (Optional)"
                  type="date"
                  variant="outlined"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddCoupon}
                  disabled={!brand || !tag || !code || loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Add Coupon'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistics
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                <Box textAlign="center">
                  <Typography variant="h4" color="primary">
                    {coupons.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Coupons
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h4" color="secondary">
                    {coupons.filter(c => c.is_assigned).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Assigned
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h4" color="success.main">
                    {coupons.filter(c => !c.is_assigned).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box mt={4}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">All Coupons</Typography>
              <Button onClick={fetchCoupons} disabled={loading}>
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
                      <TableCell>Brand</TableCell>
                      <TableCell>Tag</TableCell>
                      <TableCell>Code</TableCell>
                      <TableCell>Expiration Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {coupons.map((coupon) => (
                      <TableRow key={coupon.id}>
                        <TableCell>{coupon.brand}</TableCell>
                        <TableCell>{coupon.tag}</TableCell>
                        <TableCell>{coupon.code}</TableCell>
                        <TableCell>
                          {coupon.expiration_date || 'No expiration'}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={coupon.is_assigned ? 'Assigned' : 'Available'} 
                            color={coupon.is_assigned ? 'secondary' : 'primary'} 
                            size="small"
                          />
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

export default CouponManagement;