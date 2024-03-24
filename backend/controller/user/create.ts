import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
//import { z } from "zod";

type Body = {
  name: String,
  color: String
}

const prisma = new PrismaClient();

export async function create(req: Request, res: Response) {
  const { name, color }: Body = req.body;
  const image: String = "https://pbs.twimg.com/profile_images/1770271023885144064/O9lHM-qY_400x400.jpg";
  //image to blob storage
  //handle data

  await prisma.user.create({
    data: {
      color,
      image,
      name
    }
  });

  return res.status(201).json({
    "message": "User created",
    "user": {
      "color": color,
      "image": image,
      "name": name
    }
  });
}

