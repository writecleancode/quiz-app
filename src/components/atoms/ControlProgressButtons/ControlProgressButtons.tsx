import { basePath } from 'src/utils/base-path';
import styles from './ControlProgressButtons.module.scss';

type ControlProgressButtonsProps = {
	previousButton: string;
	nextButton: string;
	showCorrectAnswers?: () => void;
	handleChangeQuestion: (direction: string) => void;
	isFirstQuestion: boolean;
	isLastQuestion: boolean;
};

export const ControlProgressButtons = ({
	previousButton,
	nextButton,
	showCorrectAnswers,
	handleChangeQuestion,
	isFirstQuestion,
	isLastQuestion,
}: ControlProgressButtonsProps) => {
	return (
		<>
			<button
				className={styles.previousQuestionButton}
				onClick={() => handleChangeQuestion('previous')}
				disabled={isFirstQuestion ? true : false}
				type='button'>
				<img src={`${basePath}/icons/caret-left-fill.svg`} alt='' />
				<span>{previousButton}</span>
			</button>

			{nextButton === 'Sprawdzam!' ? (
				<button className={styles.nextQuestionButton} onClick={showCorrectAnswers} data-last='false' type='button'>
					<span>{nextButton}</span>
				</button>
			) : (
				<button
					className={styles.nextQuestionButton}
					onClick={() => handleChangeQuestion('next')}
					data-last={isLastQuestion ? 'true' : 'false'}
					type='button'>
					<span>{isLastQuestion ? 'Zakończ Quiz' : nextButton}</span>
					{isLastQuestion ? null : <img src={`${basePath}/icons/caret-right-fill.svg`} alt='' />}
				</button>
			)}
		</>
	);
};
