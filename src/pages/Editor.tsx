
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
    
    setCanvas(canvas);

    // Load the image
    const img = new Image();
    img.onload = () => {
      // Update canvas dimensions to match image
      canvas.setDimensions({
        width: img.width,
        height: img.height
      });
      
      // Create fabric image and set as background
      FabricImage.fromURL(imageData, (fabricImage) => {
        if (fabricImage.width && fabricImage.height) {
          fabricImage.scaleToWidth(canvas.width || img.width);
          canvas.setBackgroundImage(fabricImage, canvas.renderAll.bind(canvas));
        }
      });
    };
    img.src = imageData;

    return () => {
      canvas.dispose();
    };
  }, [navigate]);

  const addText = () => {
    if (!canvas) return;

    const text = new Text("Click to edit", {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: "#000000",
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
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
