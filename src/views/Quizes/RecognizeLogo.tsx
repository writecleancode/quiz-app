import { quizzes } from 'src/data/quizzes';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';

export const RecognizeLogo = () => {
	return (
		<QuizWrapper>
			<QuizHeader title={quizzes[1].title} description={quizzes[1].description} />
		</QuizWrapper>
	);
};
