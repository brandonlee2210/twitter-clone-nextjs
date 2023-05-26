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

      // check all current user's followers
      const followers = await prisma.follower.findMany({
        where: {
          followingUsername: currentUser.username!,
        },
      });

      followers.forEach(async (follower) => {
        const notification = prisma.notification.create({
          data: {
            body: `${currentUser.name} posted a tweet`,
            username: follower.username,
          },
        });

        const updateUser = prisma.user.update({
          where: {
            username: follower.username,
          },
          data: {
            hasNotification: true,
          },
        });

        const result = await Promise.all([notification, updateUser]);
        console.log(result);
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      let { username } = req.query;

      if (username && typeof username === "string") {
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        const posts = await prisma.post.findMany({
          where: {
            userId: user!.id,
          },
          include: {
            user: true,
            comment: true,
            like: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        });

        return res.status(200).json(posts);
      } else {
        const posts = await prisma.post.findMany({
          include: {
            user: true,
            comment: true,
            like: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return res.status(200).json(posts);
      }
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
