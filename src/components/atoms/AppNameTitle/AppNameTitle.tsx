import { Link } from 'react-router-dom';
import styles from './AppNameTitle.module.scss';

export const AppNameTitle = () => {
	return (
		<Link to='/' className={styles.link}>
			<h1 className={styles.h1} title='Powrót do wyboru quizów'>
				<span className={styles.purple}>Quiz</span>App
			</h1>
		</Link>
	);
};
