'use server'

import { auth } from "@/utils/auth";
import { authClient } from "@/utils/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpAction(data: any ) {
    const email = data.email as string;
    const password = data.password as string;
    const name = data.userName as string;

    await auth.api.signUpEmail({
        body: {
            email, password, name,
        }
    })

    redirect("/");
}

export async function signInAction(data: any) {
    const email = data.email as string;
    const password = data.password as string;


    try {
    await auth.api.signInEmail({
        body: {
            email, password,
        }
    })
        redirect("/");

    } catch (error: any) {
        return({"error": {"message": error.message }})
    }

}

export async function signOutAction() {
    await auth.api.signOut({
        headers: await headers()
    })
        redirect("/");

}