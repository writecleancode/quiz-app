import styles from './QuizProgress.module.scss';

type QuizProgressProps = {
	text: string;
};

export const QuizProgress = ({ text }: QuizProgressProps) => {
	return <span className={styles.progress}>{text}</span>;
};
