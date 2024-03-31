import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getAll(_: Request, res: Response) {
  const data = await prisma.user.findMany();

  return res.status(200).json({ data });
}
