import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 Farm IT - All Rights HealthOfin </p>
    </footer>
  );
};

const styles = {
  footer: { 
    textAlign: 'center', 
    padding: '15px', 
    backgroundColor: '#333', 
    color: 'white', 
    width: '100%',
    marginTop: 'auto',
    poition:"fixed" // Push footer to the bottom
  },
};

export default Footer;