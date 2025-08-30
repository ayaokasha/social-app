import React from "react";
import { Link } from "react-router-dom";
import useGet from "../Hooks/useGet";



export default function NotFoundPage() {

  // const { data } = useGet(api);
  // console.log(data.data.data);


  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="inline-block p-6 rounded-full bg-white/10 backdrop-blur-sm animate-bounce">
            <svg
              className="w-24 h-24 mx-auto text-cyan-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 
                11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-lg animate-pulse">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Page Not Found
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="px-6 py-3 text-lg font-medium rounded-xl bg-cyan-900 hover:bg-cyan-950 text-white transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
