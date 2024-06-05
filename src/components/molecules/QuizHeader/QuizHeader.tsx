import { Link } from 'react-router-dom';
import { basePath } from 'src/utils/base-path';
import styles from './QuizHeader.module.scss';

type QuizHeaderProps = {
	title: string;
	description: string;
};

export const QuizHeader = ({ title, description }: QuizHeaderProps) => {
	return (
		<div className={styles.wrapper}>
			<Link to={`${basePath}/`} className={styles.backButton} aria-label='Powrót do wyboru quizów'>
				<img src={`${basePath}/icons/arrow-double-left.svg`} alt='' />
				<span className={styles.backButton__text}>Powrót</span>
			</Link>
			<div className={styles.textWrapper}>
				<p className={styles.title}>{title}</p>
				<p className={styles.description}>{description}</p>
			</div>
		</div>
	);
};
