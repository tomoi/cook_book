'use server';

import { auth } from '@/utils/auth';
import { headers } from 'next/headers';

import { redirect } from 'next/navigation';
import RecipeForm from './recipeForm/RecipeForm';

export default async function RecipeInput() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect('/signin');
    }
    return <RecipeForm />;
}
