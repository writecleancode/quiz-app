import { ReactNode } from 'react';
import styles from './Header.module.scss';

type HeaderProps = {
	children: ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
	return <div className={styles.wrapper}>{children}</div>;
};
