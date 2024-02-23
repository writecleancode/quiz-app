import { useState } from 'react';
import { quizzes } from 'src/data/quizzes';
import { questionsData } from 'src/data/recognizeLogo';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizProgress } from 'src/components/atoms/QuizProgress/QuizProgress';
import { ControlProgressButtons } from 'src/components/atoms/ControlProgressButtons/ControlProgressButtons';
import styles from './RecognizeLogo.module.scss';

const maxScore = questionsData.length;

export const RecognizeLogo = () => {
	const [questionIndex, setQuestionIndex] = useState(0);
	const [givenAnswersIndexes, setGivenAnswersIndexes] = useState<number[]>([]);
	const [userScore, setUserScore] = useState(0);
	const isFirstQuestion = questionIndex <= 0 ? true : false;
	const isLastQuestion = questionIndex >= questionsData.length - 1 ? true : false;

	const handleAnswersStatus = (clickedCorrectAnswer: boolean) => {
		if (givenAnswersIndexes.includes(questionIndex)) return;
		setGivenAnswersIndexes(prevState => [...prevState, questionIndex]);

		if (clickedCorrectAnswer) setUserScore(prevScore => prevScore + 1);
	};

	const handleDisplayScore = () => {
		console.log(`Twój wynik to: ${userScore} / ${maxScore}`);
	};

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

	return (
		<QuizWrapper>
			<QuizHeader title={quizzes[1].title} description={quizzes[1].description} />
			<QuizProgress text={`${questionIndex + 1} / ${questionsData.length}`} />
			<div className={styles.wrapper}>
				<div className={styles.pictureWrapper}>
					<img
						className={styles.pictureWrapper__picture}
						src={questionsData[questionIndex].imageURL}
						alt={questionsData[questionIndex].imageAlt}
					/>
				</div>
				<div className={styles.controlsWrapper}>
					<div className={styles.questionWrapper}>
						<p className={styles.questionWrapper__question}>To logo należy do:</p>
						<div className={styles.answersWrapper}>
							{questionsData[questionIndex].answers.map(answer => (
								<button
									key={answer.text}
									className={styles.answersWrapper__answer}
									data-correct={givenAnswersIndexes.includes(questionIndex) ? answer.isCorrectAnswer : ''}
									onClick={() => handleAnswersStatus(answer.isCorrectAnswer)}
									type='button'>
									{answer.text}
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
	);
};
