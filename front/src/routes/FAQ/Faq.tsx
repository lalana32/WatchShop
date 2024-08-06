import { AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import { ExpandMore } from '@mui/icons-material';

const Faq = () => {
  return (
    <>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '4rem',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '3rem', margin: '0', color: '#333', fontFamily: 'Roboto, sans-serif' }}>
              Frequently Asked Questions
            </h1>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src='/photos/FAQ.png'
            alt='faq'
            style={{
              height: '20rem',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{ maxWidth: '800px', width: '100%', margin: 'auto' }}
      >
        {[
          { question: 'Can I visit your physical store to see your products in person?', answer: 'Yes, we have a physical store where you can visit and browse our product offerings in person. Our friendly staff will be happy to assist you and provide any information you may need.' },
          { question: 'Do you offer warranty on your products?', answer: 'Yes, we offer a warranty on all our products to ensure your satisfaction. Our warranty coverage varies depending on the product, so please check the warranty terms and conditions for specific details.' },
          { question: 'How do I contact customer support?', answer: 'You can contact our customer support team through various channels, including email, phone, or live chat. Visit our contact us page for more information on how to reach us.' },
          { question: 'Are your products water-resistant?', answer: 'Yes, many of our products are water-resistant to varying degrees. However, the level of water resistance may differ between models, so we recommend checking the product specifications for detailed information.' },
          { question: 'How much does shipping cost?', answer: 'Our shipping service is entirely free of charge! We cover all shipping expenses to ensure your order reaches you conveniently and affordably.' },
          { question: 'Do you offer international shipping?', answer: 'Yes, we offer international shipping to many countries worldwide. Please check our shipping policy for more details.' }
        ].map((item, index) => (
          <Grid item xs={12} key={index}>
            <Accordion
              sx={{
                width: '100%',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '1rem',
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: 'purple' }} />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
                
              >
                <h2 style={{ fontSize: '1.2rem', color: '#333' }}>{item.question}</h2>
              </AccordionSummary >
              <AccordionDetails>
                <p style={{ fontSize: '1rem', color: '#555' }}>{item.answer}</p>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Faq;
