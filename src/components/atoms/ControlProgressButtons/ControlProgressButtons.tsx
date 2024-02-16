import styles from './ControlProgressButtons.module.scss';

type ControlProgressButtonsProps = {
	previousButton: string;
	nextButton: string;
};

export const ControlProgressButtons = ({ previousButton, nextButton }: ControlProgressButtonsProps) => {
	return (
		<>
			<button className={styles.previousQuestionButton} title='Możesz także używać strzałek na klawiaturze'>
				<img src='/src/assets/icons/caret-left-fill.svg' alt='' />
				<span>{previousButton}</span>
			</button>
			<button className={styles.nextQuestionButton} title='Możesz także używać strzałek na klawiaturze'>
				<span>{nextButton}</span>
				<img src='/src/assets/icons/caret-right-fill.svg' alt='' />
			</button>
		</>
	);
};
