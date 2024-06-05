import { Link } from 'react-router-dom';
import { basePath } from 'src/utils/base-path';
import styles from './QuizCard.module.scss';

type QuizCardProps = {
	path: string;
	title: string;
	description: string;
	backgroundURL: string;
};

export const QuizCard = ({ path, title, description, backgroundURL }: QuizCardProps) => {
	return (
		<Link to={`${basePath}/quiz/${path}`} className={styles.wrapper} style={{ backgroundImage: `url('${basePath}/${backgroundURL}')` }}>
			<p className={styles.title}>{title}</p>
			<p className={styles.description}>{description}</p>
		</Link>
	);
};
