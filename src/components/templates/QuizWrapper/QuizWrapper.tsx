import { ReactNode } from 'react';
import { AppNameTitle } from 'src/components/atoms/AppNameTitle/AppNameTitle';
import styles from './QuizWrapper.module.scss'

type QuizWrapperProps = {
    children: ReactNode
}

export const QuizWrapper = ({ children }: QuizWrapperProps) => {
	return (
		<div className={styles.wrapper}>
			<AppNameTitle />
			<div className={styles.quizWrapper}>{children}</div>
		</div>
	);
};
