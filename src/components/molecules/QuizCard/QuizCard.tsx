import styles from './QuizCard.module.scss';

type QuizCardProps = {
	title: string;
	description: string;
	backgroundURL: string;
};

export const QuizCard = ({ title, description, backgroundURL }: QuizCardProps) => {
	return (
		<div className={styles.wrapper} style={{ backgroundImage: `url('${backgroundURL}')` }}>
			<p className={styles.title}>{title}</p>
			<p className={styles.description}>{description}</p>
		</div>
	);
};
