import prisma from "@/libs/prismadb";

import serverAuth from "@/libs/serverAuth";
import S3 from "aws-sdk/clients/s3";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    let { name, bio, coverImage, profileImage } = req.body;

    if (coverImage || profileImage) {
      coverImage = await imageUpload(
        coverImage,
        currentUser?.username,
        "cover"
      );
      profileImage = await imageUpload(
        profileImage,
        currentUser?.username,
        "profile"
      );
    }

    if (!name) {
      return res.status(400).json({ message: "Name required" });
    }

    let user;

    if (!coverImage || !profileImage) {
      user = await prisma.user.updateMany({
        where: {
          username: currentUser.username,
        },
        data: {
          name,
          bio,
        },
      });
    } else {
      user = await prisma.user.updateMany({
        where: {
          username: currentUser.username,
        },
        data: {
          name,
          bio,
          coverImage,
          profileImage,
        },
      });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "3mb",
    },
  },
};

async function imageUpload(
  base64: string,
  username: string | null,
  category: string
) {
  // Configure AWS with your access and secret key.
  const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, S3_BUCKET } = process.env;

  // Create an s3 instance
  const s3 = new S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  // Ensure that you POST a base64 data to your server.
  const base64Data = Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  // Getting the file type, ie: jpeg, png or gif
  const type = base64.split(";")[0].split("/")[1];

  // With this setup, each time your user uploads an image, will be overwritten.
  // To prevent this, use a different Key each time.
  // This won't be needed if they're uploading their avatar, hence the filename, userAvatar.js.
  const params = {
    Bucket: S3_BUCKET as string,
    Key: `${username}.${category}.${type}`, // type is not required
    Body: base64Data,
    ContentEncoding: "base64", // required
    ContentType: `image/${type}`, // required. Notice the back ticks
  };

  // The upload() is used instead of putObject() as we'd need the location url and assign that to our user profile/database
  // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
  let location = "";

  // s3.upload(params, (err: any, data: any) => {
  //   if (err) {
  //     console.log("Error uploading file:", err);
  //     return "";
  //   } else {
  //     console.log("File uploaded successfully. File location:", data.Location);
  //     return data.Location;
  //   }
  // });

  const data = await s3.upload(params).promise();

  return data.Location;

  // To delete, see: https://gist.github.com/SylarRuby/b3b1430ca633bc5ffec29bbcdac2bd52
}
