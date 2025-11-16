import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../hooks/useAuth';
import { apiCoupons, ICoupon } from '../api/coupons';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
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
      setError('Failed to load coupon statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Calculate statistics
  const totalCoupons = coupons.length;
  const assignedCoupons = coupons.filter(c => c.is_assigned).length;
  const unassignedCoupons = coupons.filter(c => !c.is_assigned).length;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Dashboard</Typography>
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
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Coupons
              </Typography>
              {loading ? (
                <Box display="flex" justifyContent="center" my={2}>
                  <CircularProgress size={30} />
                </Box>
              ) : (
                <>
                  <Typography variant="h4" color="primary">
                    {totalCoupons}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available coupons in the system
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Assigned Coupons
              </Typography>
              {loading ? (
                <Box display="flex" justifyContent="center" my={2}>
                  <CircularProgress size={30} />
                </Box>
              ) : (
                <>
                  <Typography variant="h4" color="secondary">
                    {assignedCoupons}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Coupons assigned to users
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Unassigned Coupons
              </Typography>
              {loading ? (
                <Box display="flex" justifyContent="center" my={2}>
                  <CircularProgress size={30} />
                </Box>
              ) : (
                <>
                  <Typography variant="h4" color="success.main">
                    {unassignedCoupons}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Coupons available for assignment
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box mt={2}>
              <Button 
                variant="contained" 
                sx={{ mr: 2 }}
                onClick={() => navigate('/coupons')}
              >
                Manage Coupons
              </Button>
              <Button 
                variant="outlined"
                sx={{ mr: 2 }}
                onClick={() => navigate('/my-coupons')}
              >
                View My Coupons
              </Button>
              <Button 
                variant="outlined"
                onClick={() => navigate('/assign-coupons')}
              >
                Assign Coupons
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;