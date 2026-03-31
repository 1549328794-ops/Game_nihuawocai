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

      // 获取画布数据并转换为base64（去掉data:image/png;base64,前缀）
      const base64Image = dataURL.replace(/^data:image\/png;base64,/, '');

      // 1. 获取百度文心一言的access_token
      const tokenResponse = await axios.post(
        'https://aip.baidubce.com/oauth/2.0/token',
        null,
        {
          params: {
            grant_type: 'client_credentials',
            client_id: import.meta.env.VITE_BAIDU_API_KEY,
            client_secret: import.meta.env.VITE_BAIDU_SECRET_KEY
          }
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // 2. 调用百度图像识别API
      const imageResponse = await axios.post(
        'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general',
        {
          image: base64Image
        },
        {
          params: {
            access_token: accessToken
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      // 解析结果
      const result = imageResponse.data;
      if (result.result && result.result.length > 0) {
        const topResult = result.result[0];
        setAiResult(`文心一言猜测：${topResult.keyword}（置信度：${(topResult.score * 100).toFixed(2)}%）`);
      } else {
        setAiResult('文心一言无法识别图像内容');
      }
    } catch (error) {
      console.error('AI猜测失败:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error_msg || error.message || '未知错误';
        setAiResult(`文心一言猜测失败：${errorMessage}`);
      } else {
        setAiResult(`文心一言猜测失败：${error instanceof Error ? error.message : '未知错误'}`);
      }
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
              {isLoading ? '文心一言思考中...' : '文心一言猜测'}
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