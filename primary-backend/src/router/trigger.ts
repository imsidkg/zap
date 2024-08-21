
import { Router } from "express";
import { authMiddleware } from "../middleware";
import { signUpSchema, signInSchema } from "../types";
import { prisma} from "../db";
import jwt from "jsonwebtoken";
const crypto = require("crypto");
import { JWT_PASSWORD } from "../types/config";



const router = Router();

router.get('/available' , async(req,res) => {
    const availableTriggers = await prisma.availableTrigger.findMany({})
    res.json({
        availableTriggers
    })
});






export const triggerRouter = router;