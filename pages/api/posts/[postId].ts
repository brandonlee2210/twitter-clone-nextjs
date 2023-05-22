import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { postId } = req.query;

  try {
    if (!postId || typeof postId !== "string") {
      return res.status(400).json({ message: "Missing post id" });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
      include: {
        user: true,
        comment: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return res.status(200).json({ ...post });
  } catch (err) {
    return res.status(400).end();
  }
}
