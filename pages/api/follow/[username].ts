import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username } = req.query;

    if (!username || typeof username !== "string") {
      return res.status(400).json({ message: "Missing username " });
    }

    const followersAmount = await prisma.follower.count({
      where: {
        followingUsername: username,
      },
    });

    const followingAmount = await prisma.follower.count({
      where: {
        username: username,
      },
    });

    return res.status(200).json({ followersAmount, followingAmount });
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong" });
  }
}
