import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white flex flex-col items-center rounded-lg md:shadow-lg border-t-8 border-red-800 p-8 ">
        <Image
          src="https://res.cloudinary.com/dxjna0dxi/image/upload/v1749535225/cbbbb2b1-de26-4ff0-aa0c-d6ea7fc6b73e_xx41kh.png"
          alt="Welcome Image"
          width={320}
          height={192}
          className=" mb-6 "
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Welcome to{" "}
          <span className="text-red-800">PostCraft</span>
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Your one-stop solution for managing and crafting posts.
        </p>
        <div className="flex space-x-4 mb-6">
        <Link href="/register">
        <button className="px-6 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors" >
          Get Started
        </button>
        </Link>
        <Link href="/login">
        <button className=" px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
          Login
        </button>
        </Link>
        </div>
      </div>
    </div>
  );
}
