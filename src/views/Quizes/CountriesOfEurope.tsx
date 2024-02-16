import { quizzes } from 'src/data/quizzes';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import styles from './CountriesOfEurope.module.scss';
import { useState } from 'react';

export const CountriesOfEurope = () => {
	// const [isQuizStarted, setQuizState] = useState(false);
	const [isQuizStarted, setQuizState] = useState(false);

	return (
		<QuizWrapper>
			<QuizHeader
				title={quizzes[0].title}
				description='wymień jak najwięcej krajów leżących na terenie Europy w ciągu 2 minut'
			/>
			<div className={styles.controlsWrapper}>
				{isQuizStarted ? (
					<div className={styles.formWrapper}>
						<div className={styles.formField}>
							<label className={styles.formField__label} htmlFor='country'>
								Wpisz nazwę państwa:
							</label>
							<input className={styles.formField__input} type='text' id='country' name='country' />
						</div>
						<div className={styles.formInfo}>
							<p className={styles.formInfo__progress}>13 / 46</p>
							<p className={styles.formInfo__timeLeft}>1:37</p>
						</div>
						<div className={styles.formButtons}>
							<button className={styles.formButtons__addMoreTimeButton} type='button'>
								Chcę jeszcze 2 minuty!
							</button>
							<button className={styles.formButtons__giveUpButton} type='button'>
								Poddaję się 😕
							</button>
						</div>
					</div>
				) : (
					<button className={styles.startButton} onClick={() => setQuizState(true)} type='button'>
						Rozpocznij quiz
					</button>
				)}
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
					<div className={styles.resultsWrapper__column}>
						<p className={styles.result}>Albania</p>
					</div>
					<div className={styles.resultsWrapper__column}>
						<p className={styles.result}>Bośnia i Hercegowina</p>
					</div>
				</div>
			</div>
		</QuizWrapper>
	);
};
