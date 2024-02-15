import { Header } from 'src/components/molecules/Header/Header';
import { AppNameTitle } from 'src/components/atoms/AppNameTitle/AppNameTitle';
import { QuizCards } from 'src/components/organisms/QuizCards/QuizCards';
import styles from './Root.module.scss';

export const Root = () => {
	return (
		<div className={styles.wrapper}>
			<Header>
				<AppNameTitle />
			</Header>
			<QuizCards />
		</div>
	);
};
