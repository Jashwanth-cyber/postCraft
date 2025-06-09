import Image from "next/image";
import {signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="bg-red-800 text-white px-6 py-3 flex justify-between items-center w-full h-16">
      <div className="">
        <Image src="https://sdmntprwestus3.oaiusercontent.com/files/00000000-a3c4-61fd-a198-fd2f353e92d8/raw?se=2025-06-09T05%3A14%3A46Z&sp=r&sv=2024-08-04&sr=b&scid=3911cc58-361d-5232-ae92-d155db26b6a2&skoid=864daabb-d06a-46b3-a747-d35075313a83&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-08T23%3A01%3A56Z&ske=2025-06-09T23%3A01%3A56Z&sks=b&skv=2024-08-04&sig=Jruh9e7eUHgXIrYn%2BfYiZEJEs521a0J7XkZRQaWNlTs%3D" alt="Logo" width={100} height={100} 
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