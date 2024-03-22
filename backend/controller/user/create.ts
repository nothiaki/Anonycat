import { Request, Response } from "express";

export async function create(req: Request, res: Response) {
  const { name } = req.body;

  return res.status(200).json({
    "message": "User created",
    "name": name
  });
}
