import { useState } from 'react';
import { quizzes } from 'src/data/quizzes';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import styles from './CountriesOfEurope.module.scss';
import { countriesList } from 'src/data/coutriesOfEurope';

const initialTime = 120; // initial time in seconds

const timeLeftText = (secondsTotal = initialTime) => {
	const minutes = Math.floor(secondsTotal / 60);
	const seconds = secondsTotal % 60;

	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const countries = {
	firstHalf: countriesList.slice(0, Math.ceil(countriesList.length / 2)),
	secondHalf: countriesList.slice(Math.ceil(countriesList.length / 2)),
};

export const CountriesOfEurope = () => {
	const [isQuizStarted, setQuizState] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [timeLeft, setTimeLeft] = useState(timeLeftText);
	const [isMapDisplayed, setMapDisplay] = useState(true);

	const handleStartQuiz = () => {
		setQuizState(true);
		let secondsTotal = initialTime;

		const interval = setInterval(() => {
			secondsTotal--;
			setTimeLeft(timeLeftText(secondsTotal));

			if (secondsTotal <= 0) clearInterval(interval);
		}, 1000);
	};

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
							<input
								className={styles.formField__input}
								value={inputValue}
								onChange={e => setInputValue(e.target.value)}
								type='text'
								id='country'
								name='country'
							/>
						</div>
						<div className={styles.formInfo}>
							<p className={styles.formInfo__progress}>13 / {countriesList.length}</p>
							<p className={styles.formInfo__timeLeft}>{timeLeft}</p>
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
					<button className={styles.startButton} onClick={handleStartQuiz} type='button'>
						Rozpocznij quiz
					</button>
				)}
			</div>
			<div className={styles.helpersWrapper}>
				<div>
					<button
						className={styles.toggleMapDisplayButton}
						onClick={() => setMapDisplay(prevState => !prevState)}
						type='button'>
						<img src='/src/assets/icons/map.svg' alt='' />
						<span>Pokaż mapę pomocniczą</span>
					</button>
					{isMapDisplayed ? (
						<img className={styles.mapImg} src='/src/assets/img/europe_map.jpg' alt='mapa Europy' />
					) : null}
				</div>
				<div className={styles.resultsWrapper}>
					<div className={styles.resultsWrapper__column}>
						{countries.firstHalf.map(country => (
							<p key={country} className={styles.result}>
								{country}
							</p>
						))}
					</div>
					<div className={styles.resultsWrapper__column}>
						{countries.secondHalf.map(country => (
							<p key={country} className={styles.result}>
								{country}
							</p>
						))}
					</div>
				</div>
			</div>
		</QuizWrapper>
	);
};
