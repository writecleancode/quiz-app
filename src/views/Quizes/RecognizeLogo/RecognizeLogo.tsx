import { useEffect, useState } from 'react';
import { useModal } from 'src/hooks/useModal';
import { quizzes } from 'src/data/quizzes';
import { questionsData as quizData } from 'src/data/recognizeLogo';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizProgress } from 'src/components/atoms/QuizProgress/QuizProgress';
import { ControlProgressButtons } from 'src/components/atoms/ControlProgressButtons/ControlProgressButtons';
import { LoadingGif } from 'src/components/atoms/LoadingGif/LoadingGif';
import { ScoreModal } from 'src/components/molecules/ScoreModal/ScoreModal';
import { basePath } from 'src/utils/base-path';
import styles from './RecognizeLogo.module.scss';

const maxScore = quizData.length;

type questionsDataType = {
	imageURL: string;
	imageAlt: string;
	answers: {
		text: string;
		isCorrectAnswer: boolean;
	}[];
}[];

export const RecognizeLogo = () => {
	const [questionsData, setQuestionsData] = useState<never[] | questionsDataType>([]);
	const [questionIndex, setQuestionIndex] = useState(0);
	const [givenAnswersIndexes, setGivenAnswersIndexes] = useState<number[]>([]);
	const [isQuizFinished, setQuizState] = useState(false);
	const [userScore, setUserScore] = useState(0);
	const isFirstQuestion = questionIndex <= 0 ? true : false;
	const isLastQuestion = questionIndex >= questionsData.length - 1 ? true : false;
	const { isModalOpen, handleDisplayScore, handleCloseModal } = useModal();

	const handleAnswersStatus = (clickedCorrectAnswer: boolean) => {
		if (givenAnswersIndexes.includes(questionIndex)) return;
		setGivenAnswersIndexes(prevState => [...prevState, questionIndex]);

		if (clickedCorrectAnswer) setUserScore(prevScore => prevScore + 1);
	};

	const handleFinishQuiz = () => {
		handleDisplayScore();
		setQuizState(true);
	};

	const handleChangeQuestion = (direction: string) => {
		if (direction === 'next') {
			if (isLastQuestion) {
				handleFinishQuiz();
				return;
			}
			setQuestionIndex(prevState => prevState + 1);
		}
		if (direction === 'previous') {
			if (isFirstQuestion) return;
			setQuestionIndex(prevState => prevState - 1);
		}
	};

	useEffect(() => {
		setQuestionsData(quizData);
	}, []);

	useEffect(() => {
		if (userScore >= maxScore) handleFinishQuiz();
	}, [userScore]);

	return (
		<>
			{questionsData.length ? (
				<QuizWrapper>
					<QuizHeader title={quizzes[1].title} description={quizzes[1].description} />
					<QuizProgress text={`${questionIndex + 1} / ${questionsData.length}`} />
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
								<p className={styles.questionWrapper__question}>To logo należy do:</p>
								<div className={styles.answersWrapper}>
									{questionsData[questionIndex].answers.map(({ text, isCorrectAnswer }) => (
										<button
											key={text}
											className={styles.answersWrapper__answer}
											data-correct={givenAnswersIndexes.includes(questionIndex) || isQuizFinished ? isCorrectAnswer : ''}
											onClick={() => handleAnswersStatus(isCorrectAnswer)}
											type='button'>
											{text}
										</button>
									))}
								</div>
							</div>
							<div className={styles.buttonsWrapper}>
								<ControlProgressButtons
									previousButton='Poprzednie pytanie'
									nextButton='Następne pytanie'
									handleChangeQuestion={handleChangeQuestion}
									isFirstQuestion={isFirstQuestion}
									isLastQuestion={isLastQuestion}
								/>
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
