import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

const prisma = new PrismaClient();

export async function create(req: Request, res: Response) {
  const reqSchema = z.object({
    color: z.string().min(1, { message: "Color needs to follow the HEX format: #FFFFFF" })
      .max(7, { message: "Color needs to follow the HEX format: #FFFFFF" }),
    //image: z.string().min(1, { message: "Image can't be empty" }),
    name: z.string().min(1, { message: "Name can't be empty" })
  });

  const { color, name } = reqSchema.parse(req.body);

  const userExist = await prisma.user.findUnique({
    where: {
      name
    }
  });

  if (userExist) {
    return res.status(409).json({
      "message": "User already exist"
    });
  };

  await prisma.user.create({
    data: {
      color,
      //image,
      name
    }
  });

  return res.status(201).json({
    "message": "User created",
    "user": {
      "color": color,
      //"image": image,
      "name": name
    }
  });
}

