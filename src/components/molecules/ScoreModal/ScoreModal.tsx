import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { basePath } from 'src/utils/base-path';
import styles from './ScoreModal.module.scss';

type ScoreModalProps = {
	isOpen: boolean;
	userScore: number;
	totalScore: number;
	handleCloseModal: () => void;
};

export const ScoreModal = ({ isOpen, userScore, totalScore, handleCloseModal }: ScoreModalProps) => {
	return (
		<ReactModal isOpen={isOpen} className={styles.wrapper} appElement={document.querySelector<HTMLDivElement>('#root')!}>
			<p className={styles.scoreTitle}>Twój wynik</p>
			<p className={styles.scoreText}>
				{userScore} / {totalScore}
			</p>
			<div className={styles.buttonsWrapper}>
				<Link to={`${basePath}/`} className={styles.backButton} aria-label='Powrót do wyboru quizów'>
					<img src={`${basePath}/icons/arrow-double-left.svg`} alt='' />
					<span className={styles.backButton__text}>Powrót</span>
				</Link>
				<button className={styles.closeButton} onClick={handleCloseModal} aria-label='Powrót do wyboru quizów'>
					<span className={styles.closeButton__text}>Zamknij</span>
					<img src={`${basePath}/icons/x-circle.svg`} alt='' />
				</button>
			</div>
		</ReactModal>
	);
};
