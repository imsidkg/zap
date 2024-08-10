import {z} from 'zod';


export const signUpSchema = z.object({
    username : z.string().min(5),
    password : z.string().min(8),
    name : z.string()
})
export const signInSchema = z.object({
    username : z.string(),
    password : z.string(),
})

