import React from 'react';
import { Helmet } from 'react-helmet';

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <Helmet>
        <title>Confusing Invoices? Get Clear, Fast Explanations | ServiceCipher</title>
        <meta name="description" content="Auto repair invoices can be confusing. ServiceCipher translates them into plain English, with severity ratings and fair price checks." />
      </Helmet>

      <h1 style={styles.headline}>Still handing customers confusing invoices?</h1>
      <p style={styles.subhead}>
        Most customers have no clue what’s wrong with their car or if they’re overpaying.
        <br />
        That hurts trust — and repeat business.
      </p>

      <div style={styles.sideBySide}>
        <div style={styles.box}>
          <h3 style={styles.bad}>❌ BEFORE</h3>
          <p>
            - Replace A/C Evaporator Core<br />
            - R&R HVAC Housing<br />
            - $1,972.45<br />
            - Labor: 7.2 hrs
          </p>
        </div>

        <div style={styles.box}>
          <h3 style={styles.good}>✅ AFTER</h3>
          <p>
            Your A/C system isn’t blowing cold because the main cooling part (evaporator core)
            is leaking. This is a major repair that involves removing the dashboard. Cost is fair for labor/time.
          </p>
        </div>
      </div>

      <h2 style={styles.highlight}>We do this automatically — in seconds.</h2>

      <ul style={styles.bullets}>
        <li>✔️ Turn your invoice into a clear, customer-friendly summary</li>
        <li>✔️ Show if prices are fair based on real data</li>
        <li>✔️ Add severity scores: Major, Moderate, Minor</li>
        <li>✔️ Builds trust. Improves close rates. Saves time explaining.</li>
      </ul>

      <h3 style={styles.cta}>Try it free for 30 days.</h3>
      <a href="/" style={styles.button}>Get Started</a>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
    backgroundColor: '#1c1c2b',
    minHeight: '100vh',
  },
  headline: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  subhead: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
    lineHeight: '1.5',
  },
  sideBySide: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  box: {
    flex: 1,
    backgroundColor: '#2a2a3b',
    padding: '1rem',
    borderRadius: '8px',
  },
  bad: {
    color: '#ff6666',
  },
  good: {
    color: '#66ff99',
  },
  highlight: {
    fontSize: '1.3rem',
    marginBottom: '1rem',
    marginTop: '1rem',
    color: '#c3a3ff',
  },
  bullets: {
    lineHeight: '1.7',
    marginBottom: '2rem',
  },
  cta: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#fff',
  },
  button: {
    backgroundColor: '#b369f7',
    padding: '0.7rem 1.5rem',
    borderRadius: '5px',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

export default LandingPage;