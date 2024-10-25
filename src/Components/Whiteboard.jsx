// Whiteboard.jsx

import React, { useRef, useEffect, useState } from 'react';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#000000'); // Default color
  const [paths, setPaths] = useState([]); // Store paths for drawing
  const [isDrawing, setIsDrawing] = useState(false); // Track drawing state

  useEffect(() => {
    const myCanvas = canvasRef.current;
    const ctx = myCanvas.getContext('2d');

    // Set canvas dimensions
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;

    // Draw all paths on the canvas
    const drawPaths = () => {
      ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); // Clear canvas
      ctx.fillStyle = '#fff'; // Reset background color
      ctx.fillRect(0, 0, myCanvas.width, myCanvas.height); // Redraw background

      // Redraw all paths
      paths.forEach((path) => {
        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.lineWidth;
        ctx.beginPath();
        path.points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      });
    };

    // Draw the initial paths
    drawPaths();

    // Mouse event handlers
    const getMousePos = (e) => {
      const rect = myCanvas.getBoundingClientRect(); // Get canvas position
      return {
        x: e.clientX - rect.left, // Adjust for canvas position
        y: e.clientY - rect.top, // Adjust for canvas position
      };
    };

    const startDrawing = (e) => {
      const pos = getMousePos(e);
      setIsDrawing(true);
      const newPath = {
        color,
        lineWidth: 5, // Default line width
        points: [{ x: pos.x, y: pos.y }],
      };
      setPaths((prev) => [...prev, newPath]); // Start new path
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const pos = getMousePos(e);
      const newPaths = [...paths];
      newPaths[newPaths.length - 1].points.push({ x: pos.x, y: pos.y }); // Add point to current path
      setPaths(newPaths); // Update paths
      drawPaths(); // Redraw canvas with updated paths
    };

    const endDrawing = () => {
      setIsDrawing(false); // End drawing
      drawPaths(); // Redraw to finalize the current path
    };

    // Mouse events
    myCanvas.addEventListener('mousedown', startDrawing);
    myCanvas.addEventListener('mousemove', draw);
    myCanvas.addEventListener('mouseup', endDrawing);
    myCanvas.addEventListener('mouseleave', endDrawing); // Stop drawing when leaving canvas

    // Touch event handlers
    const drawTouch = {
      start: (evt) => {
        const pos = getMousePos(evt.touches[0]);
        const newPath = {
          color,
          lineWidth: 5, // Default line width
          points: [{ x: pos.x, y: pos.y }],
        };
        setPaths((prev) => [...prev, newPath]); // Start new path
        setIsDrawing(true); // Start drawing
      },
      move: (evt) => {
        if (!isDrawing) return;
        const pos = getMousePos(evt.touches[0]);
        const newPaths = [...paths];
        newPaths[newPaths.length - 1].points.push({ x: pos.x, y: pos.y }); // Add point to current path
        setPaths(newPaths); // Update paths
        drawPaths(); // Redraw canvas with updated paths
      },
      end: () => {
        setIsDrawing(false); // End drawing
        drawPaths(); // Redraw to finalize the current path
      },
    };

    // Touch events
    myCanvas.addEventListener('touchstart', drawTouch.start, false);
    myCanvas.addEventListener('touchend', drawTouch.end, false);
    myCanvas.addEventListener('touchmove', drawTouch.move, false);

    // Disable page move
    document.body.addEventListener('touchmove', (evt) => {
      evt.preventDefault();
    }, false);

    // Cleanup event listeners on component unmount
    return () => {
      myCanvas.removeEventListener('mousedown', startDrawing);
      myCanvas.removeEventListener('mousemove', draw);
      myCanvas.removeEventListener('mouseup', endDrawing);
      myCanvas.removeEventListener('mouseleave', endDrawing);
      myCanvas.removeEventListener('touchstart', drawTouch.start);
      myCanvas.removeEventListener('touchend', drawTouch.end);
      myCanvas.removeEventListener('touchmove', drawTouch.move);
    };
  }, [paths, color, isDrawing]); // Re-run effect if paths, color, or drawing state changes

  // Function to clear the canvas
  const clearCanvas = () => {
    setPaths([]); // Clear paths state
    const myCanvas = canvasRef.current;
    const ctx = myCanvas.getContext('2d');
    ctx.fillStyle = '#fff'; // Background color
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height); // Clear canvas
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setColor('#FF0000')} style={{ backgroundColor: '#FF0000' }} />
        <button onClick={() => setColor('#00FF00')} style={{ backgroundColor: '#00FF00' }} />
        <button onClick={() => setColor('#0000FF')} style={{ backgroundColor: '#0000FF' }} />
        <button onClick={() => setColor('#FFFF00')} style={{ backgroundColor: '#FFFF00' }} />
        <button onClick={() => setColor('#FF00FF')} style={{ backgroundColor: '#FF00FF' }} />
        <button onClick={() => setColor('#00FFFF')} style={{ backgroundColor: '#00FFFF' }} />
        <button onClick={() => setColor('#000000')} style={{ backgroundColor: '#000000' }} />
        <button onClick={() => setColor('#FFFFFF')} style={{ backgroundColor: '#FFFFFF', border: '1px solid black' }} />
        <button onClick={() => setColor('#FFA500')} style={{ backgroundColor: '#FFA500' }} />
        <button onClick={clearCanvas}>Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        id="myCanvas"
        style={{ border: '1px solid black', width: '100%'}}
      >
        Sorry, your browser does not support HTML5 canvas technology.
      </canvas>
    </div>
  );
};

export default Whiteboard;
