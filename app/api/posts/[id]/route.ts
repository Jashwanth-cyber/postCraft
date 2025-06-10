import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}


export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { title, imageUrl, description, hashtags } = await req.json();
  const { id } = context.params;

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post || post.authorId !== user.id) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  const updatedPost = await prisma.post.update({
    where: { id },
    data: { title, imageUrl, description, hashtags },
  });

  return NextResponse.json(updatedPost);
}
