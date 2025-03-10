"use client";
// components/PhotoEditor.js
import React, { useEffect, useRef, useState } from "react";

const PhotoEditor = () => {
  // const canvasRef = useRef(null);
  // const [canvas, setCanvas] = useState(null);
  // const [isDrawingMode, setIsDrawingMode] = useState(false);

  // // Initialize Fabric.js canvas
  // useEffect(() => {
  //   const canvas = new fabric.Canvas(canvasRef.current, {
  //     width: 800,
  //     height: 600,
  //     backgroundColor: "#f0f0f0",
  //   });
  //   setCanvas(canvas);

  //   // Cleanup on unmount
  //   return () => {
  //     canvas.dispose();
  //   };
  // }, []);

  // // Load image
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     fabric.Image.fromURL(event.target.result, (img) => {
  //       canvas.add(img);
  //       canvas.renderAll();
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // };

  // // Add text
  // const addText = () => {
  //   const text = new fabric.IText("Edit me", {
  //     left: 100,
  //     top: 100,
  //     fontFamily: "Arial",
  //     fontSize: 30,
  //     fill: "#000",
  //   });
  //   canvas.add(text);
  //   canvas.setActiveObject(text);
  //   canvas.renderAll();
  // };

  // // Add rectangle
  // const addRectangle = () => {
  //   const rect = new fabric.Rect({
  //     left: 100,
  //     top: 100,
  //     width: 100,
  //     height: 100,
  //     fill: "#ff0000",
  //     stroke: "#000",
  //     strokeWidth: 2,
  //   });
  //   canvas.add(rect);
  //   canvas.setActiveObject(rect);
  //   canvas.renderAll();
  // };

  // // Add circle
  // const addCircle = () => {
  //   const circle = new fabri.Circle({
  //     radius: 50,
  //     left: 100,
  //     top: 100,
  //     fill: "#00ff00",
  //     stroke: "#000",
  //     strokeWidth: 2,
  //   });
  //   canvas.add(circle);
  //   canvas.setActiveObject(circle);
  //   canvas.renderAll();
  // };

  // // Toggle free drawing mode
  // const toggleFreeDraw = () => {
  //   setIsDrawingMode(!isDrawingMode);
  //   canvas.isDrawingMode = !isDrawingMode;
  // };

  // // Delete selected object
  // const deleteSelected = () => {
  //   const activeObject = canvas.getActiveObject();
  //   if (activeObject) {
  //     canvas.remove(activeObject);
  //   }
  // };

  // // Save image
  // const saveImage = () => {
  //   const link = document.createElement("a");
  //   link.href = canvas.toDataURL({
  //     format: "png",
  //     quality: 1,
  //   });
  //   link.download = "edited-image.png";
  //   link.click();
  // };

  return (
    <div>
      {/* <div style={{ marginBottom: "10px" }}>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={addText}>Add Text</button>
        <button onClick={addRectangle}>Add Rectangle</button>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={toggleFreeDraw}>
          {isDrawingMode ? "Stop Drawing" : "Free Draw"}
        </button>
        <button onClick={deleteSelected}>Delete Selected</button>
        <button onClick={saveImage}>Save Image</button>
      </div>
      <canvas ref={canvasRef} /> */}
      shadin
    </div>
  );
};

export default PhotoEditor;
