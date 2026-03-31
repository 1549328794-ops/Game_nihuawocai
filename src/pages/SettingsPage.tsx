import React from 'react';

const SettingsPage: React.FC = () => {
  return (<div style={{
      maxWidth: '600px',
      margin: '0 auto'
    }}><h1>设置</h1><div style={{
        border: '2px solid #ddd',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: 'white'
      }}><h2>画笔设置</h2><div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'block', marginBottom: '0.5rem' }}>画笔颜色：</label><input 
            type="color" 
            defaultValue="#000000"
            style={{ width: '50px', height: '30px', border: 'none', borderRadius: '4px' }}
          /></div><div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'block', marginBottom: '0.5rem' }}>画笔粗细：</label><input 
            type="range" 
            min="1" 
            max="20" 
            defaultValue="5"
            style={{ width: '100%' }}
          /></div><h2>游戏设置</h2><div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" defaultChecked />声音效果</label></div><div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" />背景音乐</label></div><div style={{ marginTop: '2rem', textAlign: 'right' }}><button style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#646cff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            保存设置</button></div></div></div>);
};

export default SettingsPage;