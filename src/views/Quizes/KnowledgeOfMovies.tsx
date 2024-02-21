import { ChangeEvent, useState } from 'react';
import { quizzes } from 'src/data/quizzes';
import { questionsData } from 'src/data/knowledgeOfMovies';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizProgress } from 'src/components/atoms/QuizProgress/QuizProgress';
import { ControlProgressButtons } from 'src/components/atoms/ControlProgressButtons/ControlProgressButtons';
import styles from './KnowledgeOfMovies.module.scss';

const initialFormValues = {
	0: '',
	1: '',
	2: '',
	3: '',
	4: '',
};
console.log(initialFormValues);

export const KnowledgeOfMovies = () => {
	const [questionIndex, setQuestionIndex] = useState(0);
	const [inputValues, setInputValues] = useState(initialFormValues);
	const isFirstQuestion = questionIndex <= 0 ? true : false;
	const isLastQuestion = questionIndex >= questionsData.length - 1 ? true : false;

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		setInputValues({
			...inputValues,
			[index]: e.target.value,
		});
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

	return (
		<QuizWrapper>
			<QuizHeader title={quizzes[2].title} description={quizzes[2].description} />
			<QuizProgress text={`${questionIndex + 1} / ${questionsData.length}`} />
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
								<input
									className={styles.textWrapper__answerInput}
									placeholder={answer.correntAnswer}
									value={inputValues[index]}
									onChange={e => handleInputChange(e, index)}
								/>
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
		</QuizWrapper>
	);
};
