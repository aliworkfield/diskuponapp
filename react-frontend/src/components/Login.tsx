import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../hooks/useAuth';
import { apiCoupons } from '../api/coupons';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username) return;
    
    setLoading(true);
    try {
      // Call the Windows authentication API
      const response = await apiCoupons.windowsAuth(username);
      
      // Store the token in localStorage
      localStorage.setItem('authToken', response.token);
      
      // Call the login function from useAuth hook
      login(username);
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (show message to user)
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ minWidth: 300, maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="center">
            Coupon Management System
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom align="center">
            Windows Authentication
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Windows Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              placeholder="DOMAIN\username or email"
              disabled={loading}
            />
            
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading || !username}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;