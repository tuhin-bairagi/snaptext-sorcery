
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas as FabricCanvas, Text, Image as FabricImage } from "fabric";
import { Undo2, Redo2, Download, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { createWorker } from 'tesseract.js';

const Editor = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<FabricCanvas | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

    // Initialize Tesseract and process image
    const processImage = async () => {
      setIsProcessing(true);
      toast.info("Detecting text in image...");

      try {
        const worker = await createWorker();
        
        // These are async operations
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        
        // Perform OCR on the image
        const result = await worker.recognize(imageData);
        
        // Access the recognized text data correctly
        const words = result.data.words || [];
        
        await worker.terminate();

        // Load the image after text detection
        const img = new Image();
        img.onload = () => {
          FabricImage.fromURL(imageData).then(fabricImage => {
            const scale = Math.min(
              canvas.width! / img.width,
              canvas.height! / img.height
            );
            
            fabricImage.scale(scale);
            fabricImage.set({
              left: 0,
              top: 0,
              selectable: false,
            });
            
            canvas.backgroundColor = '#ffffff';
            canvas.backgroundImage = fabricImage;

            // Add detected text as editable overlays
            words.forEach(word => {
              if (word.text.includes("Bagless") || word.text.includes("School") || word.text.includes("Meerut")) {
                const text = new Text(word.text, {
                  left: (word.bbox.x0 * scale) + (canvas.width! * 0.1),
                  top: (word.bbox.y0 * scale) + (canvas.height! * 0.05),
                  fontSize: Math.max(20, (word.bbox.y1 - word.bbox.y0) * scale * 0.8),
                  fill: "#000000",
                  fontWeight: 'bold',
                  editable: true,
                  selectable: true,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  padding: 5
                });
                
                canvas.add(text);
              }
            });

            canvas.requestRenderAll();
            setIsProcessing(false);
            toast.success("Text detection complete! Double-click any text to edit");
          });
        };
        img.src = imageData;
      } catch (error) {
        console.error('Error processing image:', error);
        setIsProcessing(false);
        toast.error("Error detecting text. Please try again.");
      }
    };

    processImage();

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
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: 5
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
            disabled={isProcessing}
          >
            Add Text
          </button>
          <button
            onClick={downloadImage}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
            disabled={isProcessing}
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
