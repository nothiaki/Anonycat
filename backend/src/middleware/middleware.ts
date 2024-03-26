import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

type ReqUser = {
  color: string,
  name: string
}

type Socket = {
  id: string
}

type ReqMessage = {
  content: string,
  owner: string
}

export async function onChat(req: ReqUser, socket: Socket) {
  const reqSchema = z.object({
    color: z.string().min(4, { message: "Color needs to follow the HEX format: #FFFFFF" })
      .max(7, { message: "Color needs to follow the HEX format: #FFFFFF" }),
    name: z.string().min(1, { message: "Name can't be empty" })
  });

  const { color, name } = reqSchema.parse(req);

  const userExist = await prisma.user.findUnique({
    where: {
      name
    }
  });

  if (userExist) {
    throw new Error('User already exists');
  };

  await prisma.user.create({
    data: {
      color,
      id: socket.id,
      name
    }
  });
};

export async function onMessage(req: ReqMessage) {
  const reqSchema = z.object({
    content: z.string().min(1, { message: "Message can't be empty" })
      .max(360, { message: "Message longer than 360 caracteres" }),
    owner: z.string().min(1, { message: "Name can't be empty" })
  });

  const { content, owner } = reqSchema.parse(req);

  const ownerExist = await prisma.user.findUnique({
    where: {
      name: owner
    }
  });

  if (!ownerExist) {
    throw new Error('Message owner not found');
  };

  await prisma.message.create({
    data: {
      content,
      owner
    }
  });
};

export async function deleteUser(name: string) {
  await prisma.user.delete({
    where: {
      name
    }
  });
};
