import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { email, username, name, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
