import { quizzes } from 'src/data/quizzes';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizProgress } from 'src/components/atoms/QuizProgress/QuizProgress';
import { ControlProgressButtons } from 'src/components/atoms/ControlProgressButtons/ControlProgressButtons';
import styles from './RecognizeLogo.module.scss';

export const RecognizeLogo = () => {
	return (
		<QuizWrapper>
			<QuizHeader title={quizzes[1].title} description={quizzes[1].description} />
			<QuizProgress text='3 / 12' />
			<div className={styles.wrapper}>
				<div className={styles.pictureWrapper}>
					<img
						className={styles.pictureWrapper__picture}
						src='/src/assets/img/quiz2/adidas_logo.jpg'
						alt='logo Adidas'
					/>
				</div>
				<div className={styles.controlsWrapper}>
					<div className={styles.questionWrapper}>
						<p className={styles.questionWrapper__question}>To logo należy do:</p>
						<div className={styles.answersWrapper}>
							<button className={styles.answersWrapper__answer} type='button'>
								4F
							</button>
							<button className={styles.answersWrapper__answer} type='button'>
								Adidas
							</button>
							<button className={styles.answersWrapper__answer} type='button'>
								Nike
							</button>
							<button className={styles.answersWrapper__answer} type='button'>
								Puma
							</button>
						</div>
					</div>
					<div className={styles.buttonsWrapper}>
						<ControlProgressButtons previousButton='Poprzednie pytanie' nextButton='Następne pytanie' />
					</div>
				</div>
			</div>
		</QuizWrapper>
	);
};
