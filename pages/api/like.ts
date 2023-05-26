import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method === "POST") {
    const { postId, username } = req.body;

    if (!postId || !username) {
      return res.status(400).json({ message: "Missing post id or user id" });
    }

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          user: true,
        },
      });

      if (post) {
        await prisma.notification.create({
          data: {
            body: "Someone liked your tweet",
            username: post.user.username as string,
          },
        });

        await prisma.user.update({
          where: { username: post.user.username as string },
          data: {
            hasNotification: true,
          },
        });
      }

      if (!post) {
        throw new Error("Invalid ID");
      }

      const updatedLike = await prisma.like.create({
        data: {
          postId,
          username,
        },
      });

      return res.status(200).json(updatedLike);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  if (req.method === "DELETE") {
    const { postId, username } = req.query;

    if (!postId || typeof username !== "string") {
      return res.status(400).json({ message: "Missing post id or user id" });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const updatedLike = await prisma.like.delete({
      where: {
        username_postId: {
          postId: +postId,
          username,
        },
      },
    });
    return res.status(200).json(updatedLike);
  }
}
