//type for the object that will be passed in the body
export interface RecipeObject {
    title: string;
    ingredients: {
        name: string;
        amount: number;
        measurement_type: string;
        id: number;
    }[];
    instructions: string;
    rating: number;
}
