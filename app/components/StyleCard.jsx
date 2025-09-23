"use client"
import React, { useState } from 'react';

export default function StyleCard({name, image_url, prompt, hashtags}) {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCopyPrompt = () => {
    const promptText = prompt;
    navigator.clipboard.writeText(promptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-lg">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-gray-400">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        )}
        
        <img
          src={image_url}
          alt="Style demonstration"
          className={`w-full h-full object-contain p-2 sm:p-3 md:p-4 transition-all duration-300 hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.style.display = 'none';
            setImageLoaded(false);
          }}
        />
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
        {/* Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 line-clamp-2">
          {name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">
          {prompt.slice(0, 123)}...
        </p>
        
        {/* Hashtags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {
            hashtags.map((item) =>{
              return(
 <span className="px-2 sm:px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
            {item}
          </span>
              );
            })
          }
         
       
        </div>
        
        {/* Copy Button */}
        <button
          onClick={handleCopyPrompt}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {copied ? (
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">Copied!</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Click To Copy Prompt</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
