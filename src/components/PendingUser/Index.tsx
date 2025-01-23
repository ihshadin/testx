import React from "react";

const PendingUserDashboard = () => {
  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-158px)]">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl shadow-primary/10 text-center space-y-8">
        {/* Title with glowing text effect */}
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-pulse">
          Your Account is Pending Approval!
        </h1>

        {/* Animated Pending Text */}
        <p className="text-xl text-gray-700 animate__animated animate__fadeIn animate__delay-1s">
          We&apos;re reviewing your account. Please be patient while we verify
          your details.
        </p>

        {/* Progress Bar Animation */}
        <div className="w-full mt-5">
          <div className="bg-gray-300 h-2 rounded-full">
            <div className="bg-primary h-2 rounded-full w-1/3"></div>
          </div>
        </div>

        {/* Contact Admin Section */}
        <div className="mt-6 text-gray-700">
          <p className="text-lg font-semibold">
            Need assistance or have questions?
          </p>
          <p className="text-base">
            Feel free to contact the admin directly at:
          </p>
          <a
            href="mailto:admin@gmail.com"
            className="text-blue-500 underline hover:text-blue-700 transition-colors duration-300"
          >
            admin@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default PendingUserDashboard;
