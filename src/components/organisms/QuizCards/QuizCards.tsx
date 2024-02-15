import { quizzes } from 'src/data/quizzes';
import { QuizCard } from 'src/components/molecules/QuizCard/QuizCard';
import styles from './QuizCards.module.scss';

export const QuizCards = () => {
	return (
		<div className={styles.wrapper}>
			<p className={styles.title}>Wybierz quiz:</p>
			<div className={styles.cardsWrapper}>
				{quizzes.map(({ path, title, description, backgroundURL }) => (
					<QuizCard key={title} path={path} title={title} description={description} backgroundURL={backgroundURL} />
				))}
			</div>
		</div>
	);
};
