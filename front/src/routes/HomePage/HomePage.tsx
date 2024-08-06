import { useState } from 'react';
import { Paper, styled, Typography, Box, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#333',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#555',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#777',
    },
    body1: {
      fontSize: '1rem',
      color: '#666',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#888',
    },
  },
});

const CarouselContainer = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '1200px',
  margin: 'auto',
  padding: theme.spacing(2),
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))',
  boxShadow: theme.shadows[10],
}));

const CarouselWrapper = styled('div')({
  display: 'flex',
  transition: 'transform 0.5s ease',
});

const CarouselItem = styled('div')({
  flex: '0 0 25%',
  padding: '0 10px',
  boxSizing: 'border-box',
  position: 'relative',
});

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
});

const NavButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0,0,0,0.7)',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  '&:focus': {
    outline: 'none',
  },
  '&.prev': {
    left: theme.spacing(2),
  },
  '&.next': {
    right: theme.spacing(2),
  },
}));

const StatsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: '#f4f4f4',
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  boxShadow: theme.shadows[3],
  borderRadius: '8px',
  margin: theme.spacing(2),
}));

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/photos/homePage/picture1.png',
    '/photos/homePage/picture2.png',
    '/photos/homePage/picture3.png',
    '/photos/homePage/picture4.png',
    '/photos/homePage/picture5.png',
    '/photos/homePage/picture6.png',
    '/photos/homePage/picture7.png',
  ];

  const itemsToShow = 4;
  const totalItems = images.length;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? totalItems - itemsToShow : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= totalItems - itemsToShow ? 0 : prev + 1
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <StatsSection>
          <Typography variant='h2' component='h1'>
            Watch World
          </Typography>
          <Typography variant='h6' component='p'>
            Your Journey Through Time Starts Here.
          </Typography>
          <Grid container spacing={3} justifyContent='center'>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <Typography variant='h2'>1,200+</Typography>
                <Typography variant='body1'>Registered Users</Typography>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <Typography variant='h2'>300+</Typography>
                <Typography variant='body1'>Products in Our Store</Typography>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <Typography variant='h2'>50,000+</Typography>
                <Typography variant='body1'>Page Visit Monthly</Typography>
              </StatCard>
            </Grid>
          </Grid>
        </StatsSection>

        <CarouselContainer elevation={3}>
          <CarouselWrapper
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            }}
          >
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <Image
                  src={src}
                  alt={`image${index + 1}`}
                  sx={{ objectFit: 'contain', width: '100%' }}
                  loading='eager'
                />
              </CarouselItem>
            ))}
          </CarouselWrapper>
          <NavButton className='prev' onClick={handlePrev}>
            ‹
          </NavButton>
          <NavButton className='next' onClick={handleNext}>
            ›
          </NavButton>
        </CarouselContainer>
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
