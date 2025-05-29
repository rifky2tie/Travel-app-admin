import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage({ errorCode }) {
  const navigate = useNavigate();
  let title = ""; 
  let errorDescription = "";
  let errorImage = "";
  let backgroundColor = "";
  let textColor = "text-white";

  if (errorCode === "404") {
    title = "Looks like you're lost";
    errorDescription = "We searched everywhere but couldn't find what you're looking for. Let's find a better place for you to go.";
    errorImage = "/img/404.png";
    backgroundColor = "bg-black";
  } else if (errorCode === "403") {
    title = "No Results Found";
    errorDescription = "We couldn't find what you searched for. Try searching again.";
    errorImage = "/img/403.png";
    backgroundColor = "bg-cyan";
    textColor = "text-birutua";
  } else if (errorCode === "400") {
    title = "Oh no. We lost this page";
    errorDescription = "We searched everywhere but couldn't find what you're looking for. Let's find a better place for you to go.";
    errorImage = "/img/400.png";
    backgroundColor = "bg-gray-100";
    textColor = "text-black";
  } else if (errorCode === "401") {
    title = "OOOPs! Page Not Found";
    errorDescription = "The page you are looking for might have been removed or is temporarily unavailable.";
    errorImage = "/img/401.png";
    backgroundColor = "bg-blue-500";
  } else {
    title = "Error";
    errorDescription = "Forbidden - You don't have permission to access this resource.";
    errorImage = "/img/error.png";
    backgroundColor = "bg-gray-100";
  }

  // Set title halaman browser
  document.title = `${title} - Travelie`;

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${backgroundColor}`}
    >
      <div className="p-8 rounded-lg text-center">
        <img
          src={errorImage}
          alt="Error Illustration"
          className="w-2/4 mb-6 mx-auto"
        />
        <h1 className={`text-9xl font-bold ${textColor}`}>{errorCode}</h1>
        <h2 className={`text-3xl font-semibold ${textColor} my-4`}>{title}</h2>
        <p className={`text-xl mt-4 mb-6 ${textColor}`}>{errorDescription}</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-lg border border-gray-300 bg-white text-black"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
