"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title || !imageUrl || !description) {
      setError("All fields are required.");
      return;
    }
    
    const res = await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, imageUrl, description, hashtags }),
    });
    if (res?.ok) {
      alert("Post created successfully!");
      router.push("/dashboard");
    } else {
      setError("Failed to create post");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-2">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg border-t-8 border-red-800 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create a New Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-800"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
            <input
              type="url"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-800"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="Paste image URL here"
              required
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-3 rounded-md max-h-48 object-cover border"
              />
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-red-800"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Write your blog post here..."
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Hashtags</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-800"
              value={hashtags}
              onChange={e => setHashtags(e.target.value)}
              placeholder="#blog #nextjs #postcraft"
            />
            <p className="text-xs text-gray-500 mt-1">Separate hashtags with spaces, e.g. <span className="text-red-800">#blog #nextjs</span></p>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
    </>
  );
}