import { Router } from "express";
import { authMiddleware } from "../middleware";

const router = Router();


router.post('/' , authMiddleware , (req,res) => {
    console.log('create a zap handler')
} )


router.get('/' , authMiddleware , (req,res) => {
    console.log('get zap handler')
} )


router.get('/:zapId' , authMiddleware , (req,res) => {
    console.log('get specific zap handler')
} )

export const zapRouter = router;

