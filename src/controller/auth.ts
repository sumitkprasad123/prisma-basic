import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { BadRequestError } from "../exception/badRequestError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, name } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      next(new BadRequestError("User already exist.", 400));
    }
    const hashpassword = bcrypt.hashSync(password, 5);

    const registerUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashpassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).send({
      message: "User register successfully.",
      status: 201,
      response: registerUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong.",
      status: 500,
      response: error instanceof Error ? error.message : null,
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw Error("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw Error("Invalid credential.");
    }

    const token = await jwt.sign({ userId: user.id }, "secret key", {
      expiresIn: 60 * 60,
    });

    res.status(200).send({
      message: "User login Successfully.",
      status: 200,
      response: { user, token },
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong.",
      status: 500,
      response: error instanceof Error ? error.message : null,
    });
  }
};
