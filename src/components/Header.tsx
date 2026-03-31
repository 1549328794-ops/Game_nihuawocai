import React from 'react';

const Header: React.FC = () => {
  return (<header style={{
      padding: '1rem 2rem',
      backgroundColor: '#242424',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}><div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>你画我猜游戏</div><nav><ul style={{
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}><li><a href="/" style={{ color: 'white', textDecoration: 'none' }}>首页</a></li><li><a href="/game" style={{ color: 'white', textDecoration: 'none' }}>游戏</a></li><li><a href="/settings" style={{ color: 'white', textDecoration: 'none' }}>设置</a></li></ul></nav></header>);
};

export default Header;