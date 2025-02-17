
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas as FabricCanvas, Text, Image as FabricImage } from "fabric";
import { Undo2, Redo2, Download, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Editor = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<FabricCanvas | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    const imageData = localStorage.getItem("editImage");
    if (!imageData) {
      navigate("/");
      return;
    }

    if (!canvasRef.current) return;

    // Initialize canvas with default dimensions
    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff'
    });
    
    // Enable text editing on double click
    canvas.on('mouse:dblclick', (e) => {
      if (e.target && e.target instanceof Text) {
        canvas.setActiveObject(e.target);
        e.target.set('editable', true);
        canvas.requestRenderAll();
      }
    });

    setCanvas(canvas);

    // Load the image
    const img = new Image();
    img.onload = () => {
      // Create fabric image and set as background
      FabricImage.fromURL(imageData).then(fabricImage => {
        // Calculate scale to fit the canvas
        const scale = Math.min(
          canvas.width! / img.width,
          canvas.height! / img.height
        );
        
        fabricImage.scale(scale);
        canvas.backgroundColor = '#ffffff';
        canvas.backgroundImage = fabricImage;
        
        // Add editable text overlay
        const headerText = new Text("First Bagless School in Meerut", {
          left: canvas.width! * 0.5,
          top: 50,
          fontSize: 28,
          fill: "#000000",
          fontWeight: 'bold',
          editable: true,
          selectable: true,
          originX: 'center',
          originY: 'center',
          textAlign: 'center',
        });
        
        canvas.add(headerText);
        canvas.requestRenderAll();
        toast.info("Double-click the text to edit it");
      });
    };
    img.src = imageData;

    return () => {
      canvas.dispose();
    };
  }, [navigate]);

  const addText = () => {
    if (!canvas) return;

    const text = new Text("Double-click to edit", {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: "#000000",
      editable: true,
      selectable: true,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.requestRenderAll();
    
    toast.info("Double-click any text to edit it");
  };

  const downloadImage = () => {
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL({
      format: "png",
      quality: 0.8,
      multiplier: 1,
    });
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-primary-600"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>
        <div className="flex items-center space-x-4">
          <button
            onClick={addText}
            className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
          >
            Add Text
          </button>
          <button
            onClick={downloadImage}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Download
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 overflow-auto">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </div>
  );
};

export default Editor;
