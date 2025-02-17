
const Terms = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Acceptance of Terms
          </h2>
          <p className="text-gray-600 mb-6">
            By accessing and using SnapText, you accept and agree to be bound by the
            terms and provision of this agreement.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Use License
          </h2>
          <p className="text-gray-600 mb-6">
            This is a free service provided for your personal and commercial use.
            You may not use this service for any illegal or unauthorized purpose.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Disclaimer
          </h2>
          <p className="text-gray-600 mb-6">
            The service is provided "as is" without any warranties, expressed or
            implied. We do not warrant that the service will be uninterrupted or
            error-free.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
