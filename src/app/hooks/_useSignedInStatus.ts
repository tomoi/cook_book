"use server"

import { getUserSession } from "../actions/auth";

export async function useSignedInStatus() {

    const userSession = await getUserSession()
    return userSession

}