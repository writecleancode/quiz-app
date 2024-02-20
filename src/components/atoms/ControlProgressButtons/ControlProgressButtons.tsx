import styles from './ControlProgressButtons.module.scss';

type ControlProgressButtonsProps = {
	previousButton: string;
	nextButton: string;
	handleChangeQuestion: (direction: string) => void;
	isFirstQuestion: boolean;
	isLastQuestion: boolean;
};

export const ControlProgressButtons = ({
	previousButton,
	nextButton,
	handleChangeQuestion,
	isFirstQuestion,
	isLastQuestion,
}: ControlProgressButtonsProps) => {
	console.log(isFirstQuestion);

	return (
		<>
			<button
				className={styles.previousQuestionButton}
				onClick={() => handleChangeQuestion('previous')}
				disabled={isFirstQuestion ? true : false}
				title='Możesz także używać strzałek na klawiaturze'
				type='button'>
				<img src='/src/assets/icons/caret-left-fill.svg' alt='' />
				<span>{previousButton}</span>
			</button>
			<button
				className={styles.nextQuestionButton}
				onClick={() => handleChangeQuestion('next')}
				disabled={isLastQuestion ? true : false}
				title='Możesz także używać strzałek na klawiaturze'
				type='button'>
				<span>{nextButton}</span>
				<img src='/src/assets/icons/caret-right-fill.svg' alt='' />
			</button>
		</>
	);
};
