'use client';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInAction } from '@/app/actions/auth';
import { useState } from 'react';

import LogOutbutton from '../../components/LogOutButton';

const userSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
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
    const [error, setError] = useState();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setError(undefined);
        setLoading(true);
        const result = await signInAction(data);
        setLoading(false);
        if (result) {
            setError(result.error.message);
        }
    };

    return (
        <div className="sign-up-form">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <button type="submit" disabled={loading}>
                    Log In
                </button>
            </form>
            {error && <p>{error}</p>}
            <LogOutbutton />
        </div>
    );
}
