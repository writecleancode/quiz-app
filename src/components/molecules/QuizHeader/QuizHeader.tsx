import { Link } from 'react-router-dom';
import styles from './QuizHeader.module.scss';

type QuizHeaderProps = {
	title: string;
	description: string;
};

export const QuizHeader = ({ title, description }: QuizHeaderProps) => {
	return (
		<div className={styles.wrapper}>
			<Link to='/' className={styles.backButton}>
				<img src='/src/assets/icons/arrow-left.svg' alt='' />
				<span className={styles.backButton__text}>Powrót</span>
			</Link>
			<div className={styles.textWrapper}>
				<p className={styles.title}>{title}</p>
				<p className={styles.description}>{description}</p>
			</div>
		</div>
	);
};
