import { ChangeEvent, useEffect, useState } from 'react';
import { useModal } from 'src/hooks/useModal';
import { quizzes } from 'src/data/quizzes';
import { questionsData as quizData } from 'src/data/knowledgeOfMovies';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizProgress } from 'src/components/atoms/QuizProgress/QuizProgress';
import { ControlProgressButtons } from 'src/components/atoms/ControlProgressButtons/ControlProgressButtons';
import { LoadingGif } from 'src/components/atoms/LoadingGif/LoadingGif';
import { ScoreModal } from 'src/components/molecules/ScoreModal/ScoreModal';
import { basePath } from 'src/utils/base-path';
import styles from './KnowledgeOfMovies.module.scss';

type questionsDataType = {
	title: string;
	imageURL: string;
	hasUserAnswered: boolean;
	answersData: {
		id: string;
		textFirstPart: string;
		textLastPart: string;
		correntAnswer: string;
		acceptableAnswers: string[];
		hasUserGuessed: boolean;
	}[];
}[];

const initialFormValues: Record<string, string> = {
	answer1: '',
	answer2: '',
	answer3: '',
	answer4: '',
	answer5: '',
};

const maxScore = quizData.reduce((accumulator, currentMovie) => accumulator + currentMovie.answersData.length, 0);

export const KnowledgeOfMovies = () => {
	const [questionsData, setQuestionsData] = useState<never[] | questionsDataType>([]);
	const [questionIndex, setQuestionIndex] = useState(0);
	const [inputValues, setInputValues] = useState(initialFormValues);
	const [userScore, setUserScore] = useState(0);
	const isFirstQuestion = questionIndex <= 0 ? true : false;
	const isLastQuestion = questionIndex >= questionsData.length - 1 ? true : false;
	const { isModalOpen, handleDisplayScore, handleCloseModal } = useModal();

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement>,
		{ id, acceptableAnswers }: { id: string; acceptableAnswers: string[] },
		index: number
	) => {
		setInputValues({
			...inputValues,
			[id]: e.target.value,
		});

		if (acceptableAnswers.some(answer => answer.toLowerCase() === e.target.value.toLowerCase())) {
			setQuestionsData([
				...questionsData.slice(0, questionIndex),
				{
					...questionsData[questionIndex],
					answersData: [
						...questionsData[questionIndex].answersData.slice(0, index),
						{ ...questionsData[questionIndex].answersData[index], hasUserGuessed: true },
						...questionsData[questionIndex].answersData.slice(index + 1),
					],
				},
				...questionsData.slice(questionIndex + 1),
			]);
			setUserScore(prevScore => prevScore + 1);
		}
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

	const showCorrectAnswers = () => {
		setQuestionsData([
			...questionsData.slice(0, questionIndex),
			{
				...questionsData[questionIndex],
				hasUserAnswered: true,
			},
			...questionsData.slice(questionIndex + 1),
		]);
	};

	useEffect(() => {
		setQuestionsData(quizData);
	}, []);

	useEffect(() => {
		if (
			questionsData.length &&
			questionsData[questionIndex].answersData.every(answer => answer.hasUserGuessed === true) &&
			questionsData[questionIndex].hasUserAnswered === false
		) {
			showCorrectAnswers();
		}
	}, [questionsData]);

	useEffect(() => {
		if (userScore >= maxScore) handleDisplayScore();
	}, [userScore]);

	return (
		<>
			{questionsData.length ? (
				<QuizWrapper>
					<QuizHeader title={quizzes[2].title} description={quizzes[2].description} />
					<QuizProgress text={`${questionIndex + 1} / ${questionsData.length}`} />
					<div className={styles.wrapper}>
						<div className={styles.pictureWrapper}>
							<img
								className={styles.pictureWrapper__picture}
								src={`${basePath}/${questionsData[questionIndex].imageURL}`}
								alt={`okładka fimlu ${questionsData[questionIndex].title}`}
							/>
						</div>
						<div className={styles.controlsWrapper}>
							<p className={styles.title}>{questionsData[questionIndex].title}</p>
							<div className={styles.textWrapper}>
								{questionsData[questionIndex].answersData.map(
									({ correntAnswer, textFirstPart, textLastPart, id, hasUserGuessed, acceptableAnswers }, index) => (
										<p key={correntAnswer} className={styles.textWrapper__text}>
											{textFirstPart}
											<span className={styles.textWrapper__inputWrapper}>
												{correntAnswer}
												<input
													className={styles.textWrapper__answerInput}
													name={id}
													data-status={hasUserGuessed ? 'guessed' : questionsData[questionIndex].hasUserAnswered ? 'failed' : ''}
													value={hasUserGuessed || questionsData[questionIndex].hasUserAnswered ? correntAnswer : inputValues.id}
													onChange={e => handleInputChange(e, { id, acceptableAnswers }, index)}
													disabled={hasUserGuessed || questionsData[questionIndex].hasUserAnswered ? true : false}
												/>
											</span>
											{textLastPart}
										</p>
									)
								)}
							</div>
							<div className={styles.buttonsWrapper}>
								<ControlProgressButtons
									previousButton='Poprzedni film'
									nextButton={questionsData[questionIndex].hasUserAnswered ? 'Następne pytanie' : 'Sprawdzam!'}
									showCorrectAnswers={showCorrectAnswers}
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
