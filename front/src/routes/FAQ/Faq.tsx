import { AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import { BorderColor, ExpandMore } from '@mui/icons-material';

const Faq = () => {
  return (
    <>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '4rem',
          flexDirection: 'row',
        }}
      >
        <Grid item>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              fontFamily: 'Sedan, sans-serif',
            }}
          >
            <br />
            <h1 style={{ fontSize: '3rem', margin: '0' }}>Frequently</h1>
            <br />
            <h1 style={{ fontSize: '3rem', margin: '0' }}>Asked</h1>
            <br />
            <h1 style={{ fontSize: '3rem', margin: '0' }}>Questions</h1>
          </div>
        </Grid>
        <Grid item>
          <img src='/photos/FAQ.png' alt='faq' style={{ height: '16rem' }} />
        </Grid>
      </Grid>
      <Grid
        style={{
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <Accordion
          style={{
            width: '70%',
            borderTop: '1px solid black',
            borderBottom: 'none',
            backgroundColor: '#eee9e9',
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            boxShadow: 'none',
            margin: 'auto',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <h2>
              Can I visit your physical store to see your products in person?
            </h2>
          </AccordionSummary>
          <AccordionDetails>
            <h4>
              Yes, we have a physical store where you can visit and browse our
              product offerings in person. Our friendly staff will be happy to
              assist you and provide any information you may need.
            </h4>
          </AccordionDetails>
        </Accordion>

        <Accordion
          style={{
            width: '70%',
            borderTop: '1px solid black',
            borderBottom: 'none',
            backgroundColor: '#eee9e9',
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            boxShadow: 'none',
            margin: 'auto',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <h2>Do you offer warranty on your products?</h2>
          </AccordionSummary>
          <AccordionDetails>
            <h4>
              Yes, we offer a warranty on all our products to ensure your
              satisfaction. Our warranty coverage varies depending on the
              product, so please check the warranty terms and conditions for
              specific details.
            </h4>
          </AccordionDetails>
        </Accordion>

        <Accordion
          style={{
            width: '70%',
            borderTop: '1px solid black',
            borderBottom: 'none',
            backgroundColor: '#eee9e9',
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            boxShadow: 'none',
            margin: 'auto',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <h2>How do I contact customer support?</h2>
          </AccordionSummary>
          <AccordionDetails>
            <h4>
              You can contact our customer support team through various
              channels, including email, phone, or live chat. Visit our contact
              us page for more information on how to reach us.
            </h4>
          </AccordionDetails>
        </Accordion>

        <Accordion
          style={{
            width: '70%',
            borderTop: '1px solid black',
            borderBottom: 'none',
            backgroundColor: '#eee9e9',
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            boxShadow: 'none',
            margin: 'auto',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <h2>Are your products water-resistant?</h2>
          </AccordionSummary>
          <AccordionDetails>
            <h4>
              Yes, many of our products are water-resistant to varying degrees.
              However, the level of water resistance may differ between models,
              so we recommend checking the product specifications for detailed
              information.
            </h4>
          </AccordionDetails>
        </Accordion>

        <Accordion
          style={{
            width: '70%',
            borderTop: '1px solid black',
            borderBottom: 'none',
            backgroundColor: '#eee9e9',
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            boxShadow: 'none',
            margin: 'auto',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <h2>How much does shipping cost?</h2>
          </AccordionSummary>
          <AccordionDetails>
            <h4>
              Our shipping service is entirely free of charge! We cover all
              shipping expenses to ensure your order reaches you conveniently
              and affordably.
            </h4>
          </AccordionDetails>
        </Accordion>

        <Accordion
          style={{
            width: '70%',
            borderTop: '1px solid black',
            borderBottom: 'none',
            backgroundColor: '#eee9e9',
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            boxShadow: 'none',
            margin: 'auto',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <h2>Do you offer international shipping?</h2>
          </AccordionSummary>
          <AccordionDetails>
            <h4>
              Yes, we offer international shipping to many countries worldwide.
              Please check our shipping policy for more details.
            </h4>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
};

export default Faq;
