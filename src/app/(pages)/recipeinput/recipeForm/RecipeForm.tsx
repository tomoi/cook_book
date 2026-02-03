'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function RecipeForm(userObject: any) {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [ingredientCount, setIngredientCount] = useState(1);

    async function onSubmit(data: any) {
        if (confirm('Are you sure you want to submit?')) {
            console.log(data);
        }
    }

    const userSchema = z.object({
        title: z.string().min(5, { message: 'Recipe title is required.' }),
        ingredients: z
            .array(
                z.object({
                    ingredient: z
                        .string()
                        .min(2, { message: 'Ingredient name is required.' }),
                    count: z.coerce
                        .number()
                        .positive({ message: 'Must be a positive number.' }),
                    measure_type: z.enum([
                        'cup',
                        'tbsp',
                        'tsp',
                        'pinch',
                        'dash',
                    ]),
                })
            )
            .min(2, { message: 'Must have at least 2 ingredients.' }),
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

                <input type="number" {...register(`ingredients.${i}.count`)} />
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
                    <option value="cup">Cup</option>
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
            {/* TODO: make this a submit button but have it ask the user if they
            want to submit the recipe before it pushes to the server. */}
            <input type="submit" disabled={loading} value="Submit Recipe" />
        </form>
    );
}
