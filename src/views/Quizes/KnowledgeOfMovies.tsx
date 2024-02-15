import { quizzes } from 'src/data/quizzes';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';

export const KnowledgeOfMovies = () => {
	return (
		<QuizWrapper>
			<QuizHeader title={quizzes[2].title} description={quizzes[2].description} />
		</QuizWrapper>
	);
};
