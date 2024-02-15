import { quizzes } from 'src/data/quizzes';
import { QuizCard } from 'src/components/molecules/QuizCard/QuizCard';
import styles from './QuizCards.module.scss';

export const QuizCards = () => {
	return (
		<div className={styles.wrapper}>
			<p className={styles.title}>Wybierz quiz:</p>
			<div className={styles.cardsWrapper}>
				{quizzes.map(({ title, description, backgroundURL }) => (
					<QuizCard title={title} description={description} backgroundURL={backgroundURL} />
				))}
			</div>
		</div>
	);
};
