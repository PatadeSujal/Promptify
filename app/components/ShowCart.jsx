"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StyleCard from "./StyleCard";
import Loader from "./Loader";

const ShowCart = ({ page }) => {
  const [prompts, setPrompts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // ✅ loader state

  useEffect(() => {
    if (!page) return;

    const fetchPrompts = async () => {
      try {
        setLoading(true); // start loader
        const res = await axios.get(`/api/data?page=${page}`);
        setPrompts(res.data.prompts);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      } finally {
        setLoading(false); // stop loader
      }
    };

    fetchPrompts();
  }, [page]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-20 flex-col">
          {/* <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> */}
          <Loader/>
          <span className="ml-3 text-gray-600">Loading prompts...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {prompts.length > 0 ? (
              prompts.map((item) => (
                <StyleCard
                  key={item._id}
                  name={item.Name}
                  prompt={item.Prompt}
                  image_url={item.image_link}
                  hashtags={item.Hashtags ? item.Hashtags.split(" ") : []}
                />
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center py-12">
                <p className="text-gray-500 text-lg">No prompts found</p>
              </div>
            )}
          </div>

          {/* Pagination UI */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              disabled={page <= 1}
              onClick={() =>
                window.location.assign(`/prompts?page=${Number(page) - 1}`)
              }
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() =>
                window.location.assign(`/prompts?page=${Number(page) + 1}`)
              }
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowCart;
