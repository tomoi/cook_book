'use server';

import type { RecipeObject } from '@/app/interfaces';

//retrieve the recipe id from the url
export default async function recipe({
    params,
}: {
    params: Promise<{ recipe_id: number }>;
}) {
    let error;
    let data: RecipeObject | undefined;
    const { recipe_id } = await params;
    try {
        const response = await fetch(
            `http://localhost:3000/api/recipe/${recipe_id}`
        );
        data = await response.json();
        console.log(data);
    } catch (error: any) {
        console.error(error.message);
    }

    return (
        <div>
            <h1>{data?.title}</h1>
            {/* todo: add a star thing for ratings, also make a "no ratings" if the stars are 0 */}
            <p>Rating {data?.rating}</p>
            <div className="ingredients">
                {data?.ingredients.map((ingredient) => {
                    return (
                        <p
                            key={ingredient.id}
                        >{`${ingredient.amount} ${ingredient.measurement_type} ${ingredient.name}`}</p>
                    );
                })}
            </div>
            <p>{data?.instructions}</p>
        </div>
    );
}
