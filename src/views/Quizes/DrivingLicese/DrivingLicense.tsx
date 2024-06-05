import { useEffect, useState } from 'react';
import { useModal } from 'src/hooks/useModal';
import { quizzes } from 'src/data/quizzes';
import { questionsData as quizData } from 'src/data/drivingLicense';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizProgress } from 'src/components/atoms/QuizProgress/QuizProgress';
import { ControlProgressButtons } from 'src/components/atoms/ControlProgressButtons/ControlProgressButtons';
import { LoadingGif } from 'src/components/atoms/LoadingGif/LoadingGif';
import { ScoreModal } from 'src/components/molecules/ScoreModal/ScoreModal';
import { basePath } from 'src/utils/base-path';
import styles from './DrivingLicense.module.scss';

type questionsDataType = {
	title: string;
	imageURL: string;
	imageAlt: string;
	hasUserAnswered: boolean;
	answers: {
		text: string;
		isCorrectAnswer: boolean;
		hasUserChecked: boolean;
	}[];
}[];

const maxScore = quizData.length;

export const DrivingLicense = () => {
	const [questionsData, setQuestionsData] = useState<never[] | questionsDataType>([]);
	const [questionIndex, setQuestionIndex] = useState(0);
	const [userScore, setUserScore] = useState(0);
	const isFirstQuestion = questionIndex <= 0 ? true : false;
	const isLastQuestion = questionIndex >= questionsData.length - 1 ? true : false;
	const { isModalOpen, handleDisplayScore, handleCloseModal } = useModal();

	const handleChangeQuestion = (direction: string) => {
		if (direction === 'next') {
			if (isLastQuestion) {
				handleDisplayScore();
				return;
			}
			setQuestionIndex(prevState => prevState + 1);
		}
		if (direction === 'previous') {
			if (isFirstQuestion) return;
			setQuestionIndex(prevState => prevState - 1);
		}
	};

	const highlightClickedAnswer = (answerIndex: number) => {
		if (questionsData[questionIndex].hasUserAnswered) return;
		setQuestionsData([
			...questionsData.slice(0, questionIndex),
			{
				...questionsData[questionIndex],
				answers: [
					...questionsData[questionIndex].answers.slice(0, answerIndex),
					{
						...questionsData[questionIndex].answers[answerIndex],
						hasUserChecked: !questionsData[questionIndex].answers[answerIndex].hasUserChecked,
					},
					...questionsData[questionIndex].answers.slice(answerIndex + 1),
				],
			},
			...questionsData.slice(questionIndex + 1),
		]);
	};

	const handleAddPoint = () => setUserScore(prevScore => prevScore + 1);

	const showCorrectAnswers = () => {
		setQuestionsData([
			...questionsData.slice(0, questionIndex),
			{
				...questionsData[questionIndex],
				hasUserAnswered: true,
			},
			...questionsData.slice(questionIndex + 1),
		]);

		if (questionsData[questionIndex].answers.every(answer => answer.hasUserChecked === answer.isCorrectAnswer)) {
			handleAddPoint();
		}
	};

	useEffect(() => {
		setQuestionsData(quizData);
	}, []);

	return (
		<>
			{questionsData.length ? (
				<QuizWrapper>
					<div className={styles.container}>
						<QuizHeader title={quizzes[3].title} description={quizzes[3].description} />
						<QuizProgress text={`${questionIndex + 1} / ${maxScore}`} />
						<div className={styles.wrapper}>
							<div className={styles.pictureWrapper}>
								<img
									className={styles.pictureWrapper__picture}
									src={`${basePath}/${questionsData[questionIndex].imageURL}`}
									alt={questionsData[questionIndex].imageAlt}
								/>
							</div>
							<div className={styles.controlsWrapper}>
								<div className={styles.questionWrapper}>
									<p className={styles.questionWrapper__question}>{questionsData[questionIndex].title}</p>
									<div className={styles.answersWrapper}>
										{questionsData[questionIndex].answers.map(({ text, hasUserChecked, isCorrectAnswer }, index) => (
											<button
												key={text}
												className={styles.answersWrapper__answer}
												data-selected={hasUserChecked ? 'true' : ''}
												data-correct={questionsData[questionIndex].hasUserAnswered ? isCorrectAnswer : ''}
												onClick={() => highlightClickedAnswer(index)}
												type='button'>
												<img
													data-visible={hasUserChecked && questionsData[questionIndex].hasUserAnswered ? 'true' : ''}
													className={styles.answersWrapper__answerIcon}
													src={isCorrectAnswer ? `${basePath}/icons/check.svg` : `${basePath}/icons/x.svg`}
													alt=''
												/>
												<span>{text}</span>
											</button>
										))}
									</div>
								</div>
								<p className={styles.instructionText}>
									test wielokrotnego wyboru - zaznacz <span className={styles.textBold}>wszystkie poprawne</span> odpowiedzi
								</p>
								<div className={styles.buttonsWrapper}>
									<ControlProgressButtons
										previousButton='Poprzednie pytanie'
										nextButton={questionsData[questionIndex].hasUserAnswered ? 'Następne pytanie' : 'Sprawdzam!'}
										showCorrectAnswers={showCorrectAnswers}
										handleChangeQuestion={handleChangeQuestion}
										isFirstQuestion={isFirstQuestion}
										isLastQuestion={isLastQuestion}
									/>
								</div>
							</div>
						</div>
					</div>
				</QuizWrapper>
			) : (
				<LoadingGif />
			)}
			<ScoreModal isOpen={isModalOpen} userScore={userScore} totalScore={maxScore} handleCloseModal={handleCloseModal} />
		</>
	);
};
