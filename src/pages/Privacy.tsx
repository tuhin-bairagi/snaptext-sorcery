
const Privacy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Information We Collect
          </h2>
          <p className="text-gray-600 mb-6">
            We do not store any of the images you upload to our service. All image
            processing is done in your browser, and we do not maintain any record of
            your uploads or edits.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-gray-600 mb-6">
            Since we don't collect or store your images or personal information,
            there is no use or sharing of such data. Your privacy is important to us.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about our privacy policy, please contact us
            through our contact page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
