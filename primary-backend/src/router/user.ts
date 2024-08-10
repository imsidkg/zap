import { Router } from "express";
import { authMiddleware } from "../middleware";
import { signInSchema, signUpSchema } from "../types";
import { prisma } from "../db";
const crypto = require("crypto");
import jwt from 'jsonwebtoken'
import { JWT_PASSWORD } from "../types/config";

const router = Router();

router.post("/signup", authMiddleware, async (req, res) => {
  const body = req.body;
  const parsedData = signUpSchema.safeParse(body);

  if (!parsedData.success) {
    console.log(parsedData.error);
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const userExists = await prisma.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExists) {
    return res.status(403).json({
      message: "User already exists",
    });
  }

  await prisma.user.create({
    data: {
      email: parsedData.data.username,

      password: crypto
        .createHash("sha256")
        .update(parsedData.data.password)
        .digest("hex"),
      name: parsedData.data.name,
    },
  });

  return res.json({
    message: "Please verify your account by checking your email",
  });
});

router.post("/signin", authMiddleware,async (req, res) => {
  console.log("sigin handler");
  const body = req.body;
    const parsedData = signInSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await prisma.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    });
    
    if (!user) {
        return res.status(403).json({
            message: "Sorry credentials are incorrect"
        })
    }

    // sign the jwt
    const token = jwt.sign({
        id: user.id
    }, JWT_PASSWORD);

    res.json({
        token: token,
    });
});

router.get("/", authMiddleware, async(req, res) => {
  
    // @ts-ignore
    const id = req.id;
    const user = await prisma.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });

    return res.json({
        user
    });
});

export const userRouter = router;
