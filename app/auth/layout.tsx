import React from 'react';

const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div>
			{children}
			<p>auth layout</p>
		</div>
	);
};

export default Layout;
