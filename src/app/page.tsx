'use server';

interface Recipe {
    title: string;
    date_created: number;
}

export default async function HomePage() {
    let data;
    try {
        const response = await fetch(`http://localhost:3000/api/recipe`);
        data = await response.json();
    } catch (error: any) {
        console.error(error.message);
    }
    return (
        <main>
            <h1>Home Page</h1>
            {data ? (
                data.map((recipe: Recipe) => {
                    <div>
                        <h2>{recipe.title}</h2>;
                        <h3>
                            Recipe Uploaded{' '}
                            {new Date(recipe.date_created).getMonth()}
                            {new Date(recipe.date_created).getDate()},{' '}
                            {new Date(recipe.date_created).getFullYear()}
                        </h3>
                    </div>;
                })
            ) : (
                <p>No recipes available.</p>
            )}
        </main>
    );
}
