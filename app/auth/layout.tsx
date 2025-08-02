import React from 'react';
import styles from './layout.module.css';

const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return <div className={styles.authLayout}>{children}</div>;
};

export default Layout;
