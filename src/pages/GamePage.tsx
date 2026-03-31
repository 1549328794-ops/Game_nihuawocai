import React, { useState } from 'react';
import Canvas from '../components/Canvas';

const GamePage: React.FC = () => {
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [isEraser, setIsEraser] = useState(false);

  return (<div style={{
    maxWidth: '1000px',
    margin: '0 auto'
  }}><h1>游戏页面</h1><div style={{
    border: '2px solid #ddd',
    borderRadius: '8px',
    padding: '2rem',
    backgroundColor: 'white'
  }}><h2>画布区域</h2><Canvas
        color={color}
        lineWidth={lineWidth}
        isEraser={isEraser}
      /><div style={{
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: '0 auto'
      }}><div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><label>画笔颜色：</label><input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ width: '50px', height: '30px', border: 'none', borderRadius: '4px' }}
      /></div><div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><label>画笔粗细：</label><input
        type="range"
        min="1"
        max="20"
        value={lineWidth}
        onChange={(e) => setLineWidth(Number(e.target.value))}
        style={{ flex: 1 }}
      /><span>{lineWidth}px</span></div><div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><label><input
        type="checkbox"
        checked={isEraser}
        onChange={(e) => setIsEraser(e.target.checked)}
      /> 橡皮擦</label></div><div style={{
        marginTop: '1rem',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center'
      }}><button style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#646cff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
            开始</button><button style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#f9f9f9',
              color: '#213547',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
            AI猜测</button></div></div></div></div>);
};

export default GamePage;