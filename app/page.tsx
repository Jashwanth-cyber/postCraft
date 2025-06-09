import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white flex flex-col items-center rounded-lg md:shadow-lg border-t-8 border-red-800 p-8 ">
        <Image
          src="https://sdmntprwestus3.oaiusercontent.com/files/00000000-a3c4-61fd-a198-fd2f353e92d8/raw?se=2025-06-09T05%3A14%3A46Z&sp=r&sv=2024-08-04&sr=b&scid=3911cc58-361d-5232-ae92-d155db26b6a2&skoid=864daabb-d06a-46b3-a747-d35075313a83&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-08T23%3A01%3A56Z&ske=2025-06-09T23%3A01%3A56Z&sks=b&skv=2024-08-04&sig=Jruh9e7eUHgXIrYn%2BfYiZEJEs521a0J7XkZRQaWNlTs%3D"
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
