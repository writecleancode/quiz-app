import { ChangeEvent, useEffect, useState } from 'react';
import { quizzes } from 'src/data/quizzes';
import { questionsData as quizData } from 'src/data/knowledgeOfMovies';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizProgress } from 'src/components/atoms/QuizProgress/QuizProgress';
import { ControlProgressButtons } from 'src/components/atoms/ControlProgressButtons/ControlProgressButtons';
import styles from './KnowledgeOfMovies.module.scss';

type questionDataType = {
	title: string;
	imageURL: string;
	answersData: {
		id: string;
		textFirstPart: string;
		textLastPart: string;
		correntAnswer: string;
		acceptableAnswers: string[];
		hasUserGuessed: boolean;
		hasUserfailed: boolean;
	}[];
}[];

const initialFormValues: Record<string, string> = {
	answer1: '',
	answer2: '',
	answer3: '',
	answer4: '',
	answer5: '',
};

export const KnowledgeOfMovies = () => {
	const [questionsData, setQuestionsData] = useState<never[] | questionDataType>([]);
	const [questionIndex, setQuestionIndex] = useState(0);
	const [inputValues, setInputValues] = useState(initialFormValues);
	const isFirstQuestion = questionIndex <= 0 ? true : false;
	const isLastQuestion = questionIndex >= questionsData.length - 1 ? true : false;

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
			console.log('działa');
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
		}
	};

	const handleChangeQuestion = (direction: string) => {
		if (direction === 'next') {
			if (isLastQuestion) return;
			setQuestionIndex(prevState => prevState + 1);
		}
		if (direction === 'previous') {
			if (isFirstQuestion) return;
			setQuestionIndex(prevState => prevState - 1);
		}
	};

	const clearInputValues = () => setInputValues(initialFormValues);

	useEffect(() => {
		setQuestionsData(quizData);
	}, []);

	useEffect(() => {
		clearInputValues();
	}, [questionIndex]);

	return (
		<QuizWrapper>
			<QuizHeader title={quizzes[2].title} description={quizzes[2].description} />
			<QuizProgress text={`${questionIndex + 1} / ${questionsData.length}`} />
			{questionsData.length ? (
				<div className={styles.wrapper}>
					<div className={styles.pictureWrapper}>
						<img
							className={styles.pictureWrapper__picture}
							src={questionsData[questionIndex].imageURL}
							alt={`okładka fimlu ${questionsData[questionIndex].title}`}
						/>
					</div>
					<div className={styles.controlsWrapper}>
						<p className={styles.title}>{questionsData[questionIndex].title}</p>
						<div className={styles.textWrapper}>
							{questionsData[questionIndex].answersData.map((answer, index) => (
								<p key={answer.correntAnswer} className={styles.textWrapper__text}>
									{answer.textFirstPart}
									<span className={styles.textWrapper__inputWrapper}>
										{answer.correntAnswer}
										<input
											className={styles.textWrapper__answerInput}
											name={answer.id}
											data-status={answer.hasUserGuessed ? 'guessed' : answer.hasUserfailed ? 'failed' : 'inprogress'}
											value={inputValues.id}
											onChange={e => handleInputChange(e, answer, index)}
										/>
									</span>
									{answer.textLastPart}
								</p>
							))}
						</div>
						<div className={styles.buttonsWrapper}>
							<ControlProgressButtons
								previousButton='Poprzedni film'
								nextButton='Następny film'
								handleChangeQuestion={handleChangeQuestion}
								isFirstQuestion={isFirstQuestion}
								isLastQuestion={isLastQuestion}
							/>
						</div>
					</div>
				</div>
			) : null}
		</QuizWrapper>
	);
};
