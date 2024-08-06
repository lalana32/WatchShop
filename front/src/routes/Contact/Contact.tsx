import { Grid, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import Map from '../../components/Map/Map';

const Contact = () => {
  return (
    <div style={{ marginBottom: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} style={{ margin: 'auto' }}>
          <div style={{ color: '#4caf50' }}>
            <h2 style={{ fontSize: '2rem' }}>Contact Us</h2>
            <p style={{ fontSize: '1.2rem' }}>
              Feel free to contact us for any inquiries or assistance.
            </p>
            <p style={{ fontSize: '1.2rem' }}>
              Phone: +123456789 <br />
              Email: info@example.com
            </p>
            <p style={{ fontSize: '1.2rem' }}>
              Address: 123 Main Street, City, Country <br />
              Postal Code: 12345
            </p>

            <div style={{ marginTop: '20px' }}>
              <IconButton
                href='https://www.facebook.com/'
                target='_blank'
                rel='noopener'
                style={{ color: '#4caf50', fontSize: '2rem' }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href='https://www.instagram.com/'
                target='_blank'
                rel='noopener'
                style={{ color: '#4caf50', fontSize: '2rem' }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href='https://twitter.com/'
                target='_blank'
                rel='noopener'
                style={{ color: '#4caf50', fontSize: '2rem' }}
              >
                <Twitter />
              </IconButton>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div
            style={{
              padding: '20px',
              height: '30rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Map />
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            textAlign: 'center',
            padding: '20px 0',
            height: '7rem',
          }}
        >
          <p>Opening Hours: Monday - Friday, 9:00 AM - 5:00 PM</p>

          <p>Your Journey Through Time Starts Here.</p>
          <p>© 2024 Your Company. All rights reserved.</p>
        </div>
      </Grid>
    </div>
  );
};

export default Contact;
