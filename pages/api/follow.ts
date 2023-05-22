import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { currentUser } = await serverAuth(req, res);

  if (req.method === "POST") {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Missing fields" });
    }
    try {
      const fetchedUser = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!fetchedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const follower = await prisma.follower.create({
        data: {
          username: currentUser.username!,
          followingUsername: fetchedUser.username!,
        },
      });

      return res.status(200).json(follower);
    } catch (err) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "DELETE") {
    const { username } = req.query;

    if (!username || typeof username !== "string") {
      return res.status(400).json({ message: "Missing user id" });
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error("Username not found");
    }

    const updateFollower = await prisma.follower.delete({
      where: {
        username_followingUsername: {
          username: currentUser.username!,
          followingUsername: user.username!,
        },
      },
    });

    return res.status(200).json(updateFollower);
  }
}
