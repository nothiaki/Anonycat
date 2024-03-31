import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';

const prisma = new PrismaClient();

export async function getMany(_: Request, res: Response) {
  const messages = await prisma.message.findMany();

  return res.status(200).json({ messages });
}
