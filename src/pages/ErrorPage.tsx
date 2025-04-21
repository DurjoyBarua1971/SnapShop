import React from "react";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          {isRouteErrorResponse(error) ? error.status : "Error"}
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          {isRouteErrorResponse(error)
            ? error.statusText
            : error instanceof Error
            ? error.message
            : "Something went wrong!"}
        </p>
        <p className="text-gray-600 mb-6">
          {isRouteErrorResponse(error) && error.status === 404
            ? "The page you're looking for doesn't exist."
            : "An unexpected error occurred."}
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;