'use server';

export default async function Rating({
    rating,
}: {
    rating: number | undefined;
}) {
    if (rating === 0) {
        return <p>No Ratings</p>;
    }
}
