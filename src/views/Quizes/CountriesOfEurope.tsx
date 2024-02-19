import { useEffect, useState } from 'react';
import { quizzes } from 'src/data/quizzes';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import styles from './CountriesOfEurope.module.scss';
import { countriesList } from 'src/data/coutriesOfEurope';

const initialTime = 3; // initial time in seconds
const maxTime = 600; // max time in seconds
let interval: NodeJS.Timer;

const timeLeftText = (secondsTotal = initialTime) => {
	const minutes = Math.floor(secondsTotal / 60);
	const seconds = secondsTotal % 60;

	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const countriesStatus = countriesList.map(country => {
	return { name: country, isVisible: false };
});

const countries = {
	firstHalf: countriesStatus.slice(0, Math.ceil(countriesStatus.length / 2)),
	secondHalf: countriesStatus.slice(Math.ceil(countriesStatus.length / 2)),
};

export const CountriesOfEurope = () => {
	const [isQuizStarted, setQuizState] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [secondsTotal, setSecondsTotal] = useState(initialTime);
	const [guessedCoutriesNumber, setGuessedCoutriesNumber] = useState(0);
	const [timeLeft, setTimeLeft] = useState(timeLeftText);
	const [isMapDisplayed, setMapDisplay] = useState(true);

	const handleStartQuiz = () => {
		setQuizState(true);

		interval = setInterval(() => {
			setSecondsTotal(prevState => prevState - 1);
		}, 1000);
	};

	const handleStopQuiz = () => {
		clearInterval(interval);
	};

	const handleCheckCoutries = () => {
		countriesStatus.map(country => {
			if (country.isVisible === true) return;

			if (country.name.toLowerCase() === inputValue.toLowerCase()) {
				country.isVisible = true;
				setInputValue('');
				setGuessedCoutriesNumber(prevValue => prevValue + 1);
			}
		});
	};

	const handleExtendTime = (secondsToExtend: number) => {
		setSecondsTotal(prevState => prevState + secondsToExtend);
		if (secondsTotal >= maxTime) setSecondsTotal(maxTime);
		setTimeLeft(timeLeftText(secondsTotal));
	};

	useEffect(() => {
		setTimeLeft(timeLeftText(secondsTotal));
		if (secondsTotal <= 0) handleStopQuiz()
	}, [secondsTotal]);

	useEffect(() => {
		handleCheckCoutries();
	}, [inputValue]);

	useEffect(() => {
		if (guessedCoutriesNumber === countriesStatus.length) handleStopQuiz();
	}, [guessedCoutriesNumber]);

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
							<p className={styles.formInfo__progress}>
								{guessedCoutriesNumber} / {countriesList.length}
							</p>
							<p className={styles.formInfo__timeLeft}>{timeLeft}</p>
						</div>
						<div className={styles.formButtons}>
							<button
								className={styles.formButtons__addMoreTimeButton}
								onClick={() => handleExtendTime(120)}
								disabled={secondsTotal === 0 || secondsTotal === maxTime ? true : false}
								type='button'>
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
						{countries.firstHalf.map(({ name, isVisible }) => (
							<p key={name} className={styles.result}>
								<span className={isVisible ? styles.visible : styles.hidden}>{name}</span>
							</p>
						))}
					</div>
					<div className={styles.resultsWrapper__column}>
						{countries.secondHalf.map(({ name, isVisible }) => (
							<p key={name} className={styles.result}>
								<span className={isVisible ? styles.visible : styles.hidden}>{name}</span>
							</p>
						))}
					</div>
				</div>
			</div>
		</QuizWrapper>
	);
};
