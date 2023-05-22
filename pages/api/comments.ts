import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { body } = req.body;

    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
      throw new Error("Post ID is not valid");
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId: +postId,
      },
    });

    return res.status(200).json(comment);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}
