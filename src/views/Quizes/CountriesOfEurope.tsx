import { quizzes } from 'src/data/quizzes';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import styles from './CountriesOfEurope.module.scss';

export const CountriesOfEurope = () => {
	return (
		<QuizWrapper>
			<QuizHeader
				title={quizzes[0].title}
				description='wymień jak najwięcej krajów leżących na terenie Europy w ciągu 2 minut'
			/>
			<div className={styles.controlsWrapper}>
				<button className={styles.startButton} type='button'>
					Rozpocznij quiz
				</button>
			</div>
			<div className={styles.helpersWrapper}>
				<div>
					<button className={styles.toggleMapDisplayButton} type='button'>
						<img src='/src/assets/icons/map.svg' alt='' />
						<span>Pokaż mapę pomocniczą</span>
					</button>
					<img className={styles.mapImg} src='/src/assets/img/europe_map.jpg' alt='mapa Europy' />
				</div>
				<div className={styles.resultsWrapper}>
					<p className={styles.result}>Albania</p>
					<p className={styles.result}>Bośnia i Hercegowina</p>
				</div>
			</div>
		</QuizWrapper>
	);
};
