"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title || "");
        setImageUrl(data.imageUrl || "");
        setDescription(data.description || "");
        setHashtags(data.hashtags || "");
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, imageUrl, description, hashtags }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/myPosts");
    } else {
      alert("Failed to update post");
    }
  };

  if (!title && !imageUrl && !description && !hashtags) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg border-t-4 border-red-800 shadow p-8 m-2">
      <div className="h-2  mb-6" />
      <h1 className="text-3xl font-bold text-center mb-8">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-800"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-800"
            placeholder="Paste image URL here"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-800"
            placeholder="Write your blog post here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Hashtags</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-800"
            placeholder="#blog #nextjs #postcraft"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">
            Separate hashtags with spaces, e.g.{" "}
            <span className="text-red-800 font-semibold">#blog #nextjs</span>
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-red-800 text-white rounded mt-4 font-semibold text-lg hover:bg-red-900 transition"
        >
          {loading ? "Saving..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}