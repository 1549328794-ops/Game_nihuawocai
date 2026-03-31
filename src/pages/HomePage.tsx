import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (<div style={{
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center'
  }}><h1>欢迎来到你画我猜游戏</h1><p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
      在这个游戏中，你可以在画布上作画，AI系统会猜测你画的是什么内容！</p><div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}><button
        onClick={() => navigate('/game')}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          backgroundColor: '#646cff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        开始游戏</button></div></div>);
};

export default HomePage;