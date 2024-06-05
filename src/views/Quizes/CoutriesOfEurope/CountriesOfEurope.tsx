import { useEffect, useState } from 'react';
import { useModal } from 'src/hooks/useModal';
import { quizzes } from 'src/data/quizzes';
import { countriesList as quizData } from 'src/data/coutriesOfEurope';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { LoadingGif } from 'src/components/atoms/LoadingGif/LoadingGif';
import { ScoreModal } from 'src/components/molecules/ScoreModal/ScoreModal';
import { basePath } from 'src/utils/base-path';
import styles from './CountriesOfEurope.module.scss';

type countryType = {
	name: string;
	isGuessed: boolean;
};

type countryListType = {
	firstHalf: countryType[];
	secondHalf: countryType[];
};

const initialTime = 120; // initial time in seconds
const maxTime = 600; // max time in seconds
let interval: NodeJS.Timer;

const timeLeftText = (secondsTotal = initialTime) => {
	const minutes = Math.floor(secondsTotal / 60);
	const seconds = secondsTotal % 60;

	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const prepareCoutriesList = () => quizData.map(country => ({ name: country, isGuessed: false }));

const divideCoutriesList = (coutriesToDivide: countryType[]) => {
	return {
		firstHalf: coutriesToDivide.slice(0, Math.ceil(coutriesToDivide.length / 2)),
		secondHalf: coutriesToDivide.slice(Math.ceil(coutriesToDivide.length / 2)),
	};
};

const coutriesNumber = quizData.length;

export const CountriesOfEurope = () => {
	const [countriesList, setCountriesList] = useState<never[] | string[]>([]);
	const [hasQuizStarted, setQuizState] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [guessedCoutriesNumber, setGuessedCoutriesNumber] = useState(0);
	const [secondsTotal, setSecondsTotal] = useState(initialTime);
	const [timeLeft, setTimeLeft] = useState(timeLeftText);
	const [isQuizFinished, setQuizFinished] = useState(false);
	const [isMapDisplayed, setMapDisplay] = useState(true);
	const [coutriesWithStatus, setCountriesWithStatus] = useState<countryType[]>(prepareCoutriesList);
	const [coutriesToDisplay, setCoutriesToDisplay] = useState<countryListType>(divideCoutriesList(coutriesWithStatus));
	const { isModalOpen, handleDisplayScore, handleCloseModal } = useModal();

	useEffect(() => {
		setCountriesList(quizData);
	}, []);

	useEffect(() => {
		setCountriesWithStatus(prepareCoutriesList);
	}, [countriesList]);

	useEffect(() => {
		setCoutriesToDisplay(divideCoutriesList(coutriesWithStatus));
	}, [coutriesWithStatus]);

	const handleStartQuiz = () => {
		setQuizState(true);

		interval = setInterval(() => {
			setSecondsTotal(prevState => prevState - 1);
		}, 1000);
	};

	const handleCheckCoutries = () => {
		coutriesWithStatus.map(country => {
			if (country.isGuessed === true) return;

			if (country.name.toLowerCase() === inputValue.toLowerCase().trim()) {
				country.isGuessed = true;
				setInputValue('');
				setGuessedCoutriesNumber(prevValue => prevValue + 1);
			}
		});
	};

	const handleEndQuiz = () => {
		setQuizFinished(true);
		clearInterval(interval);
		handleDisplayScore();
		if (guessedCoutriesNumber !== coutriesNumber) setSecondsTotal(0);
	};

	const handleExtendTime = (secondsToExtend: number) => setSecondsTotal(prevState => prevState + secondsToExtend);

	useEffect(() => {
		setTimeLeft(timeLeftText(secondsTotal));

		if (secondsTotal <= 0 && !isQuizFinished) handleEndQuiz();
		if (secondsTotal >= maxTime) setSecondsTotal(maxTime);
	}, [secondsTotal]);

	useEffect(() => {
		handleCheckCoutries();
	}, [inputValue]);

	useEffect(() => {
		if (guessedCoutriesNumber === coutriesWithStatus.length) {
			setQuizFinished(true);
			handleEndQuiz();
		}
	}, [guessedCoutriesNumber]);

	return (
		<>
			{countriesList.length ? (
				<QuizWrapper>
					<QuizHeader title={quizzes[0].title} description='wymień jak najwięcej krajów leżących na terenie Europy w ciągu 2 minut' />
					<div className={styles.controlsWrapper}>
						{hasQuizStarted ? (
							<div className={styles.formWrapper}>
								<div className={styles.formField}>
									<label className={styles.formField__label} htmlFor='country'>
										Wpisz nazwę państwa:
									</label>
									<input
										className={styles.formField__input}
										value={inputValue}
										onChange={e => setInputValue(e.target.value)}
										disabled={secondsTotal <= 0 ? true : false}
										type='text'
										id='country'
										name='country'
									/>
								</div>
								<div className={styles.formInfo}>
									<p className={styles.formInfo__progress}>
										{guessedCoutriesNumber} / {coutriesNumber}
									</p>
									<p className={styles.formInfo__timeLeft}>{timeLeft}</p>
								</div>
								<div className={styles.formButtons}>
									<button
										className={styles.formButtons__addMoreTimeButton}
										onClick={() => handleExtendTime(120)}
										disabled={secondsTotal === 0 || secondsTotal === maxTime || isQuizFinished ? true : false}
										type='button'>
										Chcę jeszcze 2 minuty!
									</button>
									<button
										className={styles.formButtons__giveUpButton}
										onClick={handleEndQuiz}
										disabled={isQuizFinished ? true : false}
										type='button'>
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
							<button className={styles.toggleMapDisplayButton} onClick={() => setMapDisplay(prevState => !prevState)} type='button'>
								<img src={`${basePath}/icons/map.svg`} alt='' />
								<span>Pokaż mapę pomocniczą</span>
							</button>
							{isMapDisplayed ? <img className={styles.mapImg} src={`${basePath}/img/quiz1/europe_map.jpg`} alt='mapa Europy' /> : null}
						</div>
						<div className={styles.resultsWrapper}>
							<div className={styles.resultsWrapper__column}>
								{coutriesToDisplay.firstHalf.map(({ name, isGuessed }) => (
									<p key={name} className={styles.result}>
										<span className={isGuessed ? styles.guessed : secondsTotal > 0 ? styles.hidden : styles.notGuessed}>{name}</span>
									</p>
								))}
							</div>
							<div className={styles.resultsWrapper__column}>
								{coutriesToDisplay.secondHalf.map(({ name, isGuessed }) => (
									<p key={name} className={styles.result}>
										<span className={isGuessed ? styles.guessed : secondsTotal > 0 ? styles.hidden : styles.notGuessed}>{name}</span>
									</p>
								))}
							</div>
						</div>
					</div>
				</QuizWrapper>
			) : (
				<LoadingGif />
			)}
			<ScoreModal isOpen={isModalOpen} userScore={guessedCoutriesNumber} totalScore={coutriesNumber} handleCloseModal={handleCloseModal} />
		</>
	);
};
