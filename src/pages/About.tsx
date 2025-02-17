
const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          About SnapText
        </h1>
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            SnapText is a powerful online tool that allows you to easily edit text in your screenshots.
            Whether you're creating documentation, tutorials, or social media content,
            our tool makes it simple to modify text without needing complex image editing software.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-6">
            We believe that editing screenshots should be simple and accessible to everyone.
            Our mission is to provide a user-friendly tool that helps you create
            professional-looking images with minimal effort.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 mb-6">
            Simply upload your screenshot, edit the text as needed, and download
            the modified version. No account required, and it's completely free to use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
