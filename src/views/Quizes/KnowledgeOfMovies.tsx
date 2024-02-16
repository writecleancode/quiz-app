import { quizzes } from 'src/data/quizzes';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';
import styles from './KnowledgeOfMovies.module.scss';

export const KnowledgeOfMovies = () => {
	return (
		<QuizWrapper>
			<QuizHeader title={quizzes[2].title} description={quizzes[2].description} />
			<p className={styles.progress}>1 / 5</p>
			<div className={styles.pictureWrapper}>
				<img
					className={styles.pictureWrapper__picture}
					src='/src/assets/img/quiz3/iron_man.jpg'
					alt='okładka filmu Iron Man'
				/>
			</div>
			<div className={styles.controlsWrapper}>
				<div className={styles.textWrapper}>
					<p className={styles.textWrapper__text}>
						Głównym bogaterem firmu Iron Man jest miliarder i genialny wynalazca Tony [...Stark...].
					</p>
					<p className={styles.textWrapper__text}>
						Firma Stark Industries zajmuje się produkcją [...broni...] dla armii USA.
					</p>
					<p className={styles.textWrapper__text}>
						Zbroja Iron Mana jest koloru [...czerwonego...] z żółto-złotymi akcentami.
					</p>
					<p className={styles.textWrapper__text}>
						Tonemu i jego asystentce Virgini'i „Pepper” Potts pomagają agenci organizacji o nazwie [...T.A.R.C.Z.A...].
					</p>
					<p className={styles.textWrapper__text}>Iron Man należy do uniwersum [...Marvela...].</p>
				</div>
				<div className={styles.buttonsWrapper}></div>
			</div>
		</QuizWrapper>
	);
};
