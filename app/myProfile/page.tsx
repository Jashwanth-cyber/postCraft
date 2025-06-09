"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function MyProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-700 text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-700 text-lg">You are not logged in.</div>
        <Link href="/login" className="ml-4 text-red-600 hover:underline">
          Login
        </Link>
      </div>
    );
  }

  const hashtags = [
    "#Productivity",
    "#Writing",
    "#PostCraft",
    "#NextJS",
    "#Blogging",
    "#Community",
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg border-t-8 border-red-800 p-8 flex flex-col items-center">
        <Image
          width={100}
          height={100}
          src="https://imgs.search.brave.com/8fJGgJgXzCrUjbL1jJHaDOHp0gq34bUWrlzqqfXIEes/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTg3/ODA1MTU2L3ZlY3Rv/ci9wcm9maWxlLXBp/Y3R1cmUtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9Z2t2TERDZ3NI/SC04SGVRZTdKc2po/bE9ZNnZSQkprX3NL/VzlseWFMZ21Mbz0"
          alt="Profile Picture"
          className="w-24 h-24 rounded-full border-4 border-red-800 shadow mb-4 object-cover"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-1 text-center">
          {session.user?.name || "User"}
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          {session.user?.email}
        </p>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Welcome to your profile page! Here you can manage your posts and settings.
        </p>
        <div className="flex space-x-4 mb-6">
        <Link
          href="/createPost"
          className="mt-4 inline-block bg-red-800 text-white rounded-md px-4 py-2 hover:bg-red-700 transition-colors"
        >
          Create Post
        </Link>
        <Link
          href="/myPosts"
          className="mt-4 inline-block bg-gray-200 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-300 transition-colors"
        >
          My Posts
        </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-6 p-3">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
        >
          Logout
        </button>
      </div>
    </div>
    </>
  );
}
