import React, { useRef, useEffect, useState } from 'react';

interface CanvasProps {
  width?: number;
  height?: number;
  color?: string;
  lineWidth?: number;
  isEraser?: boolean;
}

const Canvas: React.FC<CanvasProps> = ({
  width = 600,
  height = 400,
  color = '#000000',
  lineWidth = 5,
  isEraser = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setIsDrawing(true);
      setLastPosition({ x, y });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 设置绘图样式
      ctx.strokeStyle = isEraser ? '#ffffff' : color;
      ctx.lineWidth = isEraser ? lineWidth * 2 : lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // 绘制线条
      ctx.beginPath();
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      setLastPosition({ x, y });
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    const handleMouseLeave = () => {
      setIsDrawing(false);
    };

    // 添加事件监听器
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // 清理事件监听器
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [width, height, color, lineWidth, isEraser, isDrawing, lastPosition]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    link.click();
  };

  return (<div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}><canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        cursor: isDrawing ? 'crosshair' : 'default'
      }}
    /><div style={{
      marginTop: '1rem',
      display: 'flex',
      gap: '1rem'
    }}><button onClick={clearCanvas} style={{
      padding: '0.5rem 1rem',
      backgroundColor: '#f9f9f9',
      color: '#213547',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer'
    }}>清除</button><button onClick={saveCanvas} style={{
      padding: '0.5rem 1rem',
      backgroundColor: '#f9f9f9',
      color: '#213547',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer'
    }}>保存</button></div></div>);
};

export default Canvas;