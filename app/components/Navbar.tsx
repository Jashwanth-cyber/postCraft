import Image from "next/image";
import {signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="bg-red-750 text-white px-6 py-3 flex justify-between items-center w-full h-16">
      <div className="">
        <Image src="https://res.cloudinary.com/dxjna0dxi/image/upload/v1749535225/cbbbb2b1-de26-4ff0-aa0c-d6ea7fc6b73e_xx41kh.png" alt="Logo" width={60} height={60} 
         onClick={()=>router.push("/dashboard")} className="cursor-pointer px-1 py-6"/>
      </div>
        <div className="hidden md:block flex space-x-4 items-center">
          
          <Link href="/createPost" >Create Post</Link>
          <Link href="/myProfile">My Profile</Link>
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="border rounded-md p-2 bg-red-700">Log Out</button>
          </div>
        <div className="md:hidden flex items-center">
            <Link href ="/myProfile" className="text-white"><Image src="https://imgs.search.brave.com/8fJGgJgXzCrUjbL1jJHaDOHp0gq34bUWrlzqqfXIEes/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTg3/ODA1MTU2L3ZlY3Rv/ci9wcm9maWxlLXBp/Y3R1cmUtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9Z2t2TERDZ3NI/SC04SGVRZTdKc2po/bE9ZNnZSQkprX3NL/VzlseWFMZ21Mbz0" alt="Profile" width={40} height={40} className="rounded-full border-2 border-gray-800 object-cover"/></Link>

        </div>
    </nav>
  );
}