//retrieve the recipe id from the url
export default async function recipe({
    params,
}: {
    params: Promise<{ recipe_id: number }>;
}) {
    const { recipe_id } = await params;
    try {
        const response = await fetch(
            `http://localhost:3000/api/recipe/${recipe_id}`
        );
        let data = await response.json();
    } catch (error: any) {
        console.error(error.message);
    }

    return <p>{recipe_id}</p>;
}
