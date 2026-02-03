'use server';

import { useSignedInStatus } from '@/app/hooks/_useSignedInStatus';
import { redirect } from 'next/navigation';
import RecipeForm from './recipeForm/RecipeForm';

export default async function RecipeInput() {
    const userSession = await useSignedInStatus();
    //redirect user home if they are not logged in.
    if (userSession === null) {
        redirect('/');
    }

    return (
        <main>
            <RecipeForm userObject={userSession} />
        </main>
    );
}
