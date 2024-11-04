import { Box, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddLandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', marginTop: '30px' }}>
      <Container maxWidth="sm">
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 4,
            alignItems: 'center',
            mt: 4,
            p: 4,
            bgcolor: '#eceef8',
            borderRadius: '16px'
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/add-domain')}
            sx={{ 
              width: '80%',
              height: '60px',
              bgcolor: '#b4bce3',
              color: 'inherit',
              '&:hover': {
                bgcolor: '#9aa3d3'
              }
            }}
          >
            Add Single Domain
          </Button>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/bulk-import')}
            sx={{ 
              width: '80%',
              height: '60px',
              bgcolor: '#b4bce3',
              color: 'inherit',
              '&:hover': {
                bgcolor: '#9aa3d3'
              }
            }}
          >
            Bulk Import
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ 
              bgcolor: '#b4bce3',
              '&:hover': {
                bgcolor: '#9aa3d3'
              }
            }}
          >
            Cancel
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AddLandingPage;