'use server';

import { redirect } from 'next/navigation';
import RecipeForm from './recipeForm/RecipeForm';
import { getUserSession } from '@/app/actions/auth';

export default async function RecipeInput() {
    const userSession = await getUserSession();
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
