import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.status(405).end();
    return;
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(post);
    }

    // if (req.method === "GET") {
    //   const { username } = req.query

    //   if (username && typeof username === "string") {
    //     const posts = await prisma.post.findMany({
    //       where: {
    //         username,
    //       },
    //       include: {
    //         user: true,
    //         comments: true,
    //       },

    //       orderBy: {
    //         createdAt: "desc",
    //       },
    //     })

    //     return res.status(200).json(posts)
    //   } else {
    //     const posts = await prisma.post.findMany({
    //       include: {
    //         user: true,
    //         comments: true,
    //       },
    //       orderBy: {
    //         createdAt: "desc",
    //       },
    //     })

    //     return res.status(200).json(posts)
    //   }
    // }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
