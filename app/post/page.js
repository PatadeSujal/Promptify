"use client"
import React, { useState } from 'react';
import { Upload, Sparkles, Hash, Send } from 'lucide-react';

export default function AIImagePostGenerator() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [name, setName] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

 const handlePost = async () => {
  if (!image || !prompt) {
    alert("Please upload an image and enter a prompt!");
    return;
  }

  try {
    // Convert File → Base64
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1]; // remove prefix

      // Upload to ImgBB
      const formData = new FormData();
      formData.append("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY);
      formData.append("image", base64Image);

      const imgbbRes = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const imgbbData = await imgbbRes.json();

      if (imgbbData.success) {
        const newUrl = imgbbData.data.url;

        // Save to DB via API route
        await fetch("/api/add-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Name:name,
            Prompt:prompt,
            hashtags,
            image_link: newUrl,
          }),
        });

        alert("Post created successfully! 🎉");
      } else {
        console.error("ImgBB upload failed:", imgbbData);
      }
    };
  } catch (err) {
    console.error("Error creating post:", err.message);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-3xl font-bold">AI Image Post Generator</h1>
          </div>
          <p className="text-purple-100">Create stunning posts with AI-generated images</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Upload Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-purple-300 rounded-2xl cursor-pointer bg-purple-50 hover:bg-purple-100 transition-all duration-300"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-2xl"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-purple-500 mb-3" />
                    <p className="text-purple-600 font-medium">Click to upload image</p>
                    <p className="text-purple-400 text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* AI Prompt */}
          <div>
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Hash className="w-4 h-4 text-purple-600" />
              Title
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Title of Prompt"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              AI Generated Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Prompt so other's can create like you..."
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none h-32 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Hashtags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Hash className="w-4 h-4 text-purple-600" />
              Hashtags
            </label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#AI #Creative #Design #Art"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Post Button */}
          <button
            onClick={handlePost}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
          >
            <Send className="w-5 h-5" />
            Create Post
          </button>
        </div>

        {/* Footer */}
        <div className="bg-purple-50 px-8 py-4 border-t border-purple-100">
          <p className="text-sm text-purple-600 text-center">
            Your creative journey starts here ✨
          </p>
        </div>
      </div>
    </div>
  );
}