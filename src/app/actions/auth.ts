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

export async function signInAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signInEmail({
        body: {
            email, password,
        }
    })

    redirect("/");
}

export async function signOutAction() {
    await auth.api.signOut({
        headers: await headers()
    })
        redirect("/");

}