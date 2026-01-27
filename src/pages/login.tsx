import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import * as z from 'zod';

const User = z.object({});

export default function LoginPage() {
    const router = useRouter();
}
