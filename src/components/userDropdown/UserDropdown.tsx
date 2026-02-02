'use server';

import { useSignedInStatus } from '@/app/hooks/_useSignedInStatus';

export default async function UserDropdown() {
    const userSession = await useSignedInStatus();
    console.log(userSession);
    if (userSession !== null) {
        return <p>Logged In</p>;
    }
    return <p>Logged Out</p>;
}
