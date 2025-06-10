"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function MyPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMyPosts = async () => {
      setLoading(true);
      const res = await fetch("/api/myPosts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
      setLoading(false);
    };
    fetchMyPosts();
  }, []);

  const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this post?")) return;
  const res = await fetch("/api/myPosts", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (res.ok) {
    setPosts(posts.filter((post) => post.id !== id));
  }
};

  const handleEdit = (id: string) => {
    router.push(`/editPost/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Image src="https://via.placeholder.com/100?text=Loading..." alt="Loading" width={100} height={100} />
      </div>
    );
  }

  if (!posts.length) {
    return (
        <>
        <Navbar />
      <div className="text-center mt-8">No posts found.</div>
      </>
    );
  }

  return (
    <>
     <Navbar/>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Posts</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded p-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            {post.imageUrl && (
              <Image src={post.imageUrl} alt={post.title} width={200} height={120} className="my-2 rounded" />
            )}
            <p>{post.description}</p>
            <div className="text-sm text-gray-500 mt-2">{post.hashtags}</div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(post.id)}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}