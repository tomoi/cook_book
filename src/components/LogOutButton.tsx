import { signOutAction } from '@/app/actions/auth';

export default function LogOutButton() {
    return <button onClick={signOutAction}>Log Out</button>;
}
