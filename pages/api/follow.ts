// import prisma from "@/libs/prismadb"
// import serverAuth from "@/libs/serverAuth"
// import { NextApiRequest, NextApiResponse } from "next"

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST" && req.method !== "DELETE") {
//     return res.status(405).json({ message: "Method not allowed" })
//   }

//   const { currentUser } = await serverAuth(req, res)

//   if (req.method === "POST") {
//     const { userId } = req.body

//     if (!userId) {
//       return res.status(400).json({ message: "Missing fields" })
//     }
//     try {
//       const fetchedUser = await prisma.user.findUnique({
//         where: {
//           id: currentUser.id,
//         },
//       })

//       if (!fetchedUser) {
//         return res.status(404).json({ message: "User not found" })
//       }

//       let followingIds = [...fetchedUser.followingIds, userId]

//       const updatedUser = await prisma.user.update({
//         where: {
//           id: currentUser.id,
//         },
//         data: {
//           followingIds,
//         },
//       })

//       return res.status(200).json(updatedUser)
//     } catch (err) {
//       return res.status(400).json({ message: "Something went wrong" })
//     }
//   }

//   if (req.method === "DELETE") {
//     const { userId } = req.query

//     if (!userId || typeof userId !== "string") {
//       return res.status(400).json({ message: "Missing user id" })
//     }

//     const user = await prisma.user.findUnique({
//       where: {
//         id: currentUser.id,
//       },
//     })

//     if (!user) {
//       throw new Error("Invalid ID")
//     }

//     let updatedFollowingIds = [...(user?.followingIds || [])].filter(
//       (id) => id !== userId
//     )

//     const updatedUser = await prisma.user.update({
//       where: {
//         id: currentUser.id,
//       },
//       data: {
//         followingIds: updatedFollowingIds,
//       },
//     })

//     return res.status(200).json(updatedUser)
//   }
// }
