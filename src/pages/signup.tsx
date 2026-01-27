'use client';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const userSchema = z
    .object({
        userName: z
            .string()
            .min(4, { message: 'User Name must be longer than 4 characters.' }),
        email: z
            .string()
            .email({ message: 'Please enter a valid email address.' }),
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters.' })
            .regex(/[a-zA-Z]/, { message: 'Must contain at least one letter.' })
            .regex(/[0-9]/, { message: 'Must contain at least one number.' })
            .regex(/[^a-zA-Z0-9]/, {
                message: 'Must contain at least one special character.',
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    });

export type SignUpFormValues = z.infer<typeof userSchema>;

export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(userSchema),
    });

    return (
        <div className="sign-up-form">
            <h2>Sign Up</h2>
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
            >
                <label htmlFor="userName">Username: </label>
                <input
                    type="text"
                    {...register('userName')}
                    placeholder="Username"
                />
                {errors.userName?.message && <p>{errors.userName?.message}</p>}
                <label htmlFor="email">Email: </label>
                <input
                    type="text"
                    {...register('email')}
                    placeholder="email@example.com"
                />
                {errors.email?.message && <p>{errors.email?.message}</p>}

                <label htmlFor="password">Password: </label>
                <input
                    type="text"
                    {...register('password')}
                    placeholder="Password"
                />
                {errors.password?.message && <p>{errors.password?.message}</p>}

                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input
                    type="text"
                    {...register('confirmPassword')}
                    placeholder="Confirm Password"
                />
                {errors.confirmPassword?.message && (
                    <p>{errors.confirmPassword?.message}</p>
                )}

                <button>Sign Up</button>
            </form>
        </div>
    );
}
