import React, { useState, useRef } from 'react';
import Canvas from '../components/Canvas';
import axios from 'axios';

interface CanvasHandle {
  getCanvas: () => HTMLCanvasElement | null;
}

const GamePage: React.FC = () => {
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const [aiResult, setAiResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<CanvasHandle>(null);

  const handleAiGuess = async () => {
    setIsLoading(true);
    setAiResult('');

    try {
      // 获取canvas元素
      const canvas = canvasRef.current?.getCanvas();
      if (!canvas) {
        throw new Error('无法获取画布');
      }

      // 获取画布数据
      const dataURL = canvas.toDataURL('image/png');

      // 调用豆包图像理解API
      const response = await axios.post(
        'https://open.doubao.com/api/chat/completions',
        {
          model: 'doubao-1.0-pro',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: '请识别这幅手绘图像中的内容，用简短的中文描述它是什么物体或场景。'
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: dataURL
                  }
                }
              ]
            }
          ],
          max_tokens: 100
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_DOUBAN_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      setAiResult(`豆包猜测：${aiResponse}`);
    } catch (error) {
      console.error('AI猜测失败:', error);
      setAiResult('豆包猜测失败，请检查API密钥是否正确');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <h1>游戏页面</h1>
      <div style={{
        border: '2px solid #ddd',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: 'white'
      }}>
        <h2>画布区域</h2>
        <Canvas
          color={color}
          lineWidth={lineWidth}
          isEraser={isEraser}
          ref={canvasRef}
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
        }}>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#646cff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              开始
            </button>
            <button
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f9f9f9',
                color: '#213547',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={handleAiGuess}
              disabled={isLoading}
            >
              {isLoading ? 'AI思考中...' : 'AI猜测'}
            </button>
          </div>

          {aiResult && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#f0f8ff',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              {aiResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;