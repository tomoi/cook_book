'use server';

import Link from 'next/link';

interface Recipe {
    title: string;
    date_created: number;
    id: number;
}

export default async function HomePage() {
    let data;
    try {
        const response = await fetch(`${process.env.API_URL}/api/recipe`);
        data = await response.json();
    } catch (error: any) {
        console.error(error.message);
    }
    return (
        <main>
            <h1>Home Page</h1>
            {data ? (
                data.map((recipe: Recipe) => {
                    return (
                        <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
                            <div>
                                <h2>{recipe.title}</h2>
                                <p>
                                    Recipe Uploaded{' '}
                                    {new Intl.DateTimeFormat('en-CA', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    }).format(Number(recipe.date_created))}
                                </p>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <p>No recipes available.</p>
            )}
        </main>
    );
}
