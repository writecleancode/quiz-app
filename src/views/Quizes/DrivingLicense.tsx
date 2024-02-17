import { quizzes } from 'src/data/quizzes';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizProgress } from 'src/components/atoms/QuizProgress/QuizProgress';
import { ControlProgressButtons } from 'src/components/atoms/ControlProgressButtons/ControlProgressButtons';
import styles from './DrivingLicense.module.scss';

export const DrivingLicense = () => {
	return (
		<QuizWrapper>
			<div className={styles.container}>
				<QuizHeader title={quizzes[3].title} description={quizzes[3].description} />
				<QuizProgress text='9 / 10' />
				<div className={styles.wrapper}>
					<div className={styles.pictureWrapper}>
						<img
							className={styles.pictureWrapper__picture}
							src='/src/assets/img/quiz4/question1.jpg'
							alt='logo Adidas'
						/>
					</div>
					<div className={styles.controlsWrapper}>
						<div className={styles.questionWrapper}>
							<p className={styles.questionWrapper__question}>Za tym znakiem dozwolone jest:</p>
							<div className={styles.answersWrapper}>
								<button className={styles.answersWrapper__answer} type='button'>
									zatrzymanie samochodu poniżej 1 minuty
								</button>
								<button className={styles.answersWrapper__answer} type='button'>
									postój samochodu powyżej 1 minuty
								</button>
								<button className={styles.answersWrapper__answer} type='button'>
									zawracanie
								</button>
							</div>
						</div>
						<p className={styles.instructionText}>
							test wielokrotnego wyboru - zaznacz <span className={styles.textBold}>wszystkie poprawne</span> odpowiedzi
						</p>
						<div className={styles.buttonsWrapper}>
							<ControlProgressButtons previousButton='Poprzednie pytanie' nextButton='Następne pytanie' />
						</div>
					</div>
				</div>
			</div>
		</QuizWrapper>
	);
};
