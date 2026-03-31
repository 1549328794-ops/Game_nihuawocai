import React from 'react';

const Header: React.FC = () => {
  return (<header style={{
    padding: '1rem 2rem',
    backgroundColor: '#242424',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}>
    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>你画我猜游戏</div>
  </header>);
};

export default Header;