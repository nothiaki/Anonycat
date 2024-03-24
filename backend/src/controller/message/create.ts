import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

const prisma = new PrismaClient();

export async function create(req: Request, res: Response) {
  const reqSchema = z.object({
    content: z.string().min(1, { message: "Message can't be empty" })
      .max(360, { message: "Message longer than 360 caracteres" }),
    owner: z.string().min(1, { message: "Name can't be empty" })
  });

  const { content, owner } = reqSchema.parse(req.body);

  await prisma.message.create({
    data: {
      content,
      owner
    }
  });

  return res.status(201);
}
