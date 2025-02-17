
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Edit, Download, ArrowRight } from "lucide-react";
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload</h3>
              <p className="text-gray-600">
                Drag and drop or browse to upload your screenshot
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Edit</h3>
              <p className="text-gray-600">
                Modify text, adjust size, and position as needed
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Download</h3>
              <p className="text-gray-600">
                Save your edited screenshot instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Latest from Our Blog</h2>
            <p className="text-gray-600 mt-4">
              Tips and tricks for screenshot editing
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "How to Edit Screenshots Like a Pro",
                excerpt:
                  "Learn the best practices for editing screenshots effectively...",
                date: "March 15, 2024",
              },
              {
                title: "Top 10 Screenshot Tools in 2024",
                excerpt:
                  "Discover the best screenshot editing tools available today...",
                date: "March 10, 2024",
              },
              {
                title: "Screenshot Editing for Beginners",
                excerpt:
                  "A complete guide to getting started with screenshot editing...",
                date: "March 5, 2024",
              },
            ].map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link
                    to="/blog"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700"
                  >
                    Read more <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </article>
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
