import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

type ReqMessage = {
  content: string,
  owner: string
}

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

  //also delete mssages
};
