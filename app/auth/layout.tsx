import React from 'react';

const layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div>
			{children}
			<p>auth layout</p>{' '}
		</div>
	);
};

export default layout;
