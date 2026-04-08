'use server';

import type { RecipeObject } from '@/app/interfaces';
import Rating from '@/components/rating/Rating';

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
            `${process.env.API_URL}/api/recipe/${recipe_id}`
        );
        data = await response.json();
    } catch (error: any) {
        console.error(error.message);
    }

    return (
        <div id="recipe_page">
            <h1>{data?.title}</h1>
            {/* todo: add a star thing for ratings, also make a "no ratings" if the stars are 0 */}
            <Rating rating={data?.rating} />
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
