import Header from '@/components/Header/Header';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './styles.css';

const figtree = Figtree({
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Cook Book',
    description: 'Recipe sharing website made by Tomas',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={figtree.className}>
            <body>
                <Header />
                <main>{children}</main>
            </body>
        </html>
    );
}
