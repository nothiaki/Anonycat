import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';

const prisma = new PrismaClient();

export async function create(req: Request, res: Response) {
  const reqSchema = z.object({
    color: z.string().min(4, { message: "Color needs to follow the HEX format: #FFFFFF" })
      .max(7, { message: "Color needs to follow the HEX format: #FFFFFF" }),
    name: z.string().min(1, { message: "Name can't be empty" })
  });

  const { color, name } = reqSchema.parse(req.body);

  const userExist = await prisma.user.findUnique({
    where: {
      name
    }
  });

  if (userExist) {
    return res.status(409).json({ message: 'User already exist.' });
  };

  await prisma.user.create({
    data: {
      color,
      name
    }
  });

  return res.status(201).json({ message: 'User created' });
};

