import { quizzes } from 'src/data/quizzes';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import styles from './RecognizeLogo.module.scss';
import { ControlProgressButtons } from 'src/components/atoms/ControlProgressButtons/ControlProgressButtons';

export const RecognizeLogo = () => {
	return (
		<QuizWrapper>
			<QuizHeader title={quizzes[1].title} description={quizzes[1].description} />
			<span className={styles.progress}>3 / 12</span>
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
						{/* <button className={styles.buttonsWrapper__previousQuestionButton}>
							<img src='/src/assets/icons/caret-left-fill.svg' alt='' />
							<span>Poprzednie pytanie</span>
						</button>
						<button className={styles.buttonsWrapper__nextQuestionButton}>
							<span>Następne pytanie</span>
							<img src='/src/assets/icons/caret-right-fill.svg' alt='' />
						</button> */}
					</div>
				</div>
			</div>
		</QuizWrapper>
	);
};
