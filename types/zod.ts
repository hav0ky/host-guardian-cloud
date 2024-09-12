import { z } from "zod";

const validUnameRegex = /^[a-zA-Z0-9_]+$/;

export const registerSchema = z.object({
    username: z.string().min(3).max(25).refine(value => validUnameRegex.test(value), {
        message: 'Invalid value. Username must contain only capital letters, small letters, numbers, and underscores.'
    }),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
});

// export const accSchema = z.object({
//     current: z.string(),
//     password: z.string(),
//     confirmPassword: z.string(),
// });