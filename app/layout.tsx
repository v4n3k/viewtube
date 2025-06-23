import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import 'src/app/styles/globals.css';

const roboto = Roboto({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-family',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'ViewTube',
	description: 'ViewTube – Video Streaming Platform',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={roboto.variable}>{children}</body>
		</html>
	);
}
