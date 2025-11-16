import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../hooks/useAuth';
import { apiCoupons, ICoupon } from '../api/coupons';

const MyCoupons: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyCoupons();
  }, []);

  const fetchMyCoupons = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCoupons.getMyCoupons();
      setCoupons(data);
    } catch (err) {
      console.error('Failed to fetch coupons:', err);
      setError('Failed to load your coupons');
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
        <Typography variant="h4">My Coupons</Typography>
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
      
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" gutterBottom>
              Your Assigned Coupons
            </Typography>
            <Button onClick={fetchMyCoupons} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Refresh'}
            </Button>
          </Box>
          {loading && coupons.length === 0 ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : coupons.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
              You don't have any assigned coupons yet.
            </Typography>
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
                          label="Assigned to you" 
                          color="secondary" 
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
      
      <Box mt={3} textAlign="center">
        <Button 
          variant="contained" 
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default MyCoupons;