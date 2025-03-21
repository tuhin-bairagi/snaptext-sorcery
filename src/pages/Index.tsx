import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Upload, Edit, Download, ArrowRight, Image, Share2, MessageSquare, Fullscreen, Layers } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        localStorage.setItem("editImage", e.target.result);
        navigate("/editor");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Edit Text in Screenshots{" "}
              <span className="text-primary-600">Instantly</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your screenshot, edit the text, and download the modified
              version in seconds. It's that simple.
            </p>
            <div
              className={`mt-8 max-w-xl mx-auto border-2 border-dashed rounded-lg p-12 transition-colors ${
                isDragging
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-300 bg-white"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleImageUpload(e.target.files[0]);
                  }
                }}
              />
              <label
                htmlFor="fileInput"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="w-12 h-12 text-primary-600 mb-4" />
                <span className="text-gray-600">
                  Drag and drop your screenshot here, or{" "}
                  <span className="text-primary-600">browse</span>
                </span>
              </label>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                onClick={() => document.getElementById("fileInput")?.click()}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Edit a screenshot now
              </button>
              <button
                onClick={() => navigate("/about")}
                className="bg-white text-primary-600 border border-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Download App
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Steps to Edit Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Steps to Edit Your Screenshots Online
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Upload Screenshot</h3>
              <p className="text-gray-600">
                Upload your screenshot from your device or paste it directly from clipboard
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Edit Screenshot</h3>
              <p className="text-gray-600">
                Modify text, adjust formatting, add elements, or annotate your screenshot
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Download & Share</h3>
              <p className="text-gray-600">
                Save your edited screenshot as an image file or share it directly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Why Use ScreenshotEditor.Online?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Image className="w-6 h-6 text-primary-600 mr-2" />
                Add Backgrounds & Mockups to Screenshots
              </h3>
              <p className="text-gray-600 mb-6">
                Enhance your screenshots with beautiful backgrounds or device mockups to make them more professional and visually appealing.
              </p>
              <img 
                src="/public/lovable-uploads/de756ea1-ae17-40e6-ac19-532d4f45f0e5.png" 
                alt="Screenshot with background" 
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Layers className="w-6 h-6 text-primary-600 mr-2" />
                Edit Multiple Screenshots in Single View
              </h3>
              <p className="text-gray-600 mb-6">
                Upload and modify multiple screenshots in one session, perfect for creating tutorials or documentation with multiple steps.
              </p>
              <img 
                src="/placeholder.svg" 
                alt="Multiple screenshots editing" 
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Share2 className="w-6 h-6 text-primary-600 mr-2" />
                Resize Screenshots for Social Media
              </h3>
              <p className="text-gray-600 mb-6">
                Automatically resize and optimize your screenshots for various social media platforms with just one click.
              </p>
              <img 
                src="/placeholder.svg" 
                alt="Social media optimization" 
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Fullscreen className="w-6 h-6 text-primary-600 mr-2" />
                Share Screenshots Online
              </h3>
              <p className="text-gray-600 mb-6">
                Generate shareable links for your edited screenshots that you can send to colleagues or include in documentation.
              </p>
              <img 
                src="/placeholder.svg" 
                alt="Screenshot sharing" 
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            FAQs About Screenshot Editor Online
          </h2>
          
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">Can I edit screenshots taken from any device?</h3>
                <span className="ml-6 flex-shrink-0">+</span>
              </button>
              <div className="px-6 pb-6">
                <p className="text-gray-600">
                  Yes, you can edit screenshots taken from any device including desktop, mobile, tablet, or even from other applications. Our editor supports common image formats like PNG, JPG, and WebP.
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">What is a screenshot editor online?</h3>
                <span className="ml-6 flex-shrink-0">+</span>
              </button>
              <div className="px-6 pb-6">
                <p className="text-gray-600">
                  A screenshot editor online is a web-based tool that allows you to modify screenshots without installing any software. You can add text, highlight areas, blur sensitive information, and more directly in your browser.
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">Is my data secure when using ScreenshotEditor.Online?</h3>
                <span className="ml-6 flex-shrink-0">+</span>
              </button>
              <div className="px-6 pb-6">
                <p className="text-gray-600">
                  Yes, we prioritize your privacy and security. Your screenshots are processed in your browser and not sent to any server unless you explicitly choose to save or share them. We don't store your images permanently on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try More Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Try More Tools
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: <Image className="w-6 h-6" />, name: "Image Editor" },
              { icon: <Edit className="w-6 h-6" />, name: "Text Editor" },
              { icon: <MessageSquare className="w-6 h-6" />, name: "QR Generator" },
              { icon: <Fullscreen className="w-6 h-6" />, name: "Screen Recorder" },
              { icon: <Layers className="w-6 h-6" />, name: "PDF Editor" }
            ].map((tool, index) => (
              <Link 
                key={index}
                to="#"
                className="flex flex-col items-center bg-white p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                  {tool.icon}
                </div>
                <span className="text-sm font-medium text-center">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Edit Your Screenshots?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Start editing your screenshots now. No sign-up required.
          </p>
          <button
            onClick={() => document.getElementById("fileInput")?.click()}
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Upload Screenshot
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
