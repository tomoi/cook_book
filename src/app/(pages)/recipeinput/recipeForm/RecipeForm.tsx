'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { redirect } from 'next/navigation';

async function submitData(data: any) {
    const response = await fetch(`${process.env.API_URL}/api/recipe`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const recipe_id = await response.json();
    //redirect to recipe page
    redirect(`/recipe/${recipe_id.id}`);
}

export default function RecipeForm() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [ingredientCount, setIngredientCount] = useState(1);

    async function onSubmit(data: any) {
        if (confirm('Are you sure you want to submit?')) {
            submitData(data);
        }
    }

    const userSchema = z.object({
        title: z
            .string()
            .min(5, 'Recipe title must be more than 4 characters.'),
        ingredients: z
            .array(
                z.object({
                    ingredient: z
                        .string()
                        .min(2, 'Ingredient name is required.'),
                    count: z.preprocess((fraction: string) => {
                        //some math to convert the fractions to decimals
                        let fraction_array = fraction.split(' ');
                        let sum = 0;
                        fraction_array.map((num) => {
                            if (num.search('/') >= 0) {
                                const new_num = num.split('/');
                                sum += Number(new_num[0]) / Number(new_num[1]);
                            } else {
                                sum += Number(num);
                            }
                        });
                        //round to 3 decimal places
                        return Math.round(sum * 1000) / 1000;
                    }, z.number().positive('Must be a positive number.')),
                    measure_type: z.enum([
                        'cup',
                        'tbsp',
                        'tsp',
                        'g',
                        'kg',
                        'ml',
                        'l',
                    ]),
                })
            )
            .min(2),
        instructions: z.string().min(10, 'Must provide instructions.'),
    });
    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(userSchema),
    });

    const ingredients = [];
    for (let i = 0; i < ingredientCount; i++) {
        ingredients.push(
            <div key={i}>
                <input
                    type="text"
                    {...register(`ingredients.${i}.ingredient`)}
                    placeholder="Eg. Flour"
                />
                {/* zod error message */}
                {errors.ingredients?.[i]?.ingredient?.message && (
                    <p>{errors.ingredients?.[i]?.ingredient?.message}</p>
                )}

                <input
                    type="text"
                    //regex to allow any character from 0-9, a forward slash '/', any whitespace character '\s' and it must be 1 or more characters '{1,}'
                    pattern="[0-9\/\s]{1,}"
                    {...register(`ingredients.${i}.count`)}
                />
                {errors.ingredients?.[i]?.count?.message && (
                    <p>{errors.ingredients?.[i]?.count?.message}</p>
                )}
                <select
                    id=""
                    defaultValue=""
                    {...register(`ingredients.${i}.measure_type`)}
                >
                    <option value="" disabled>
                        Select Measurement Type
                    </option>
                    <option value="cup">Cup(s)</option>
                    <option value="tsp">Teaspoon(s)</option>
                    <option value="tbsp">Tablespoon(s)</option>
                    <option value="g">Gram(s)</option>
                    <option value="kg">Kilogram(s)</option>
                    <option value="ml">Milliliter(s)</option>
                    <option value="l">Liter(s)</option>
                </select>
                {errors.ingredients?.[i]?.measure_type?.message && (
                    <p>{errors.ingredients?.[i]?.measure_type?.message}</p>
                )}
                {errors.ingredients?.message && (
                    <p>{errors.ingredients?.message}</p>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Recipe Title</label>
            <input
                type="text"
                {...register('title')}
                placeholder="Eg. 'Easy Bake Brownies'"
            />
            {errors.title?.message && <p>{errors.title?.message}</p>}
            {ingredients}
            <p>Must provide 2 or more ingredients.</p>
            <input
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setIngredientCount(ingredientCount + 1);
                }}
                value="Add Ingredient"
            />
            <input
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    //removes ingredient from react-hook-form
                    unregister(`ingredients.${ingredientCount - 1}`);
                    setIngredientCount(ingredientCount - 1);
                }}
                disabled={ingredientCount === 1}
                value="Remove Ingredient"
            />
            <textarea {...register('instructions')}></textarea>
            {errors.instructions?.message && (
                <p>{errors.instructions?.message}</p>
            )}

            {/* TODO: make this a submit button but have it ask the user if they
            want to submit the recipe before it pushes to the server. */}
            <input type="submit" disabled={loading} value="Submit Recipe" />
        </form>
    );
}
