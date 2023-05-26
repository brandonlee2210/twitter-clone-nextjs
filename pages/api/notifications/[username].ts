import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { username } = req.query;

    if (!username || typeof username !== "string") {
      throw new Error("Invalid username");
    }

    const notification = await prisma.notification.findMany({
      where: {
        username,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.user.update({
      where: {
        username,
      },
      data: {
        hasNotification: false,
      },
    });

    return res.status(200).json(notification);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
