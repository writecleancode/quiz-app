import { Header } from 'src/components/molecules/Header/Header';
import { AppNameTitle } from 'src/components/atoms/AppNameTitle/AppNameTitle';
import { QuizCards } from 'src/components/organisms/QuizCards/QuizCards';
import styles from './MainView.module.scss';

export const MainView = () => {
	return (
		<div className={styles.wrapper}>
			<Header>
				<AppNameTitle />
			</Header>
			<QuizCards />
		</div>
	);
};
