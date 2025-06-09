"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  hashtags?: string;
  createdAt: string;
  author: {
    name: string;
  };
}



export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="p-6 flex flex-col gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-white">
                {post.author.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{post.author.name}</p>
                <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full max-h-[300px] object-cover rounded-md mb-3"
              />
            )}
            <p className="text-gray-700 mb-2">{post.description}</p>
            {post.hashtags && (
              <div className="flex flex-wrap gap-2">
                {post.hashtags.split(",").map((tag, idx) => (
                  <span key={idx} className="text-blue-700 text-sm font-medium">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const diff = (Date.now() - date.getTime()) / 1000;

  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}
