import { Link } from 'react-router-dom';
import styles from './AppNameTitle.module.scss';

type AppNameTitleProps = {
	isSpecialHover?: boolean;
};

export const AppNameTitle = ({ isSpecialHover = false }: AppNameTitleProps) => {
	return (
		<Link to='/' className={styles.link}>
			<h1
				className={`${styles.h1} ${isSpecialHover ? styles.switchOrderHover : styles.whiteCircleHover}`}
				title='Powrót do wyboru quizów'>
				<span className={styles.purple}>Quiz</span>
				<span>App</span>
			</h1>
		</Link>
	);
};
