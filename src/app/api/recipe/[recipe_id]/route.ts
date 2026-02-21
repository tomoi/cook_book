'use server';
import { Pool } from 'pg';
import { getUserSession } from '@/app/actions/auth';
import { redirect } from 'next/navigation';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

//get a specific recipe, normally to display it in a page.
export async function GET(
    request: Request,
    { params }: { params: Promise<{ recipe_id: string }> }
) {
    const client = await pool.connect();
    const { recipe_id } = await params;

    //TODO: make 2 separate endpoints so the instructions are not sent multiple times, to save on the amount of data being sent on the server
    const recipe_text = 'SELECT title, instructions FROM recipe WHERE id = $1';
    const ingredient_text =
        'SELECT name, measurement_type, amount FROM ingredient WHERE recipe_id = $1';
    const values = [recipe_id];

    const recipe_res = await client.query(recipe_text, values);
    const ingredient_res = await client.query(ingredient_text, values);
    client.release();

    return Response.json({
        recipe: recipe_res.rows[0],
        ingredients: ingredient_res.rows,
    });
}

interface Recipe_delete {
    recipe_id: number;
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ recipe_id: string }> }
) {
    const userSession = await getUserSession();
    const { recipe_id } = await params;

    //if user is not logged in
    if (!userSession) {
        return Response.json({
            error: { message: 'Error, user is not logged in.' },
        });
        redirect('/');
    }

    const client = await pool.connect();
    const text = 'DELETE FROM recipe WHERE id = $1 AND user_id = $2';
    const values = [recipe_id, userSession?.user.id];
    const res = await client.query(text, values);
    client.release();
    return Response.json({ status: 'complete' });
}
