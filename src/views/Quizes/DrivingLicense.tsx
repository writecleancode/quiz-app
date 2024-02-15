import { quizzes } from 'src/data/quizzes';
import { QuizHeader } from 'src/components/molecules/QuizHeader/QuizHeader';
import { QuizWrapper } from 'src/components/templates/QuizWrapper/QuizWrapper';

export const DrivingLicense = () => {
	return (
		<QuizWrapper>
			<QuizHeader title={quizzes[3].title} description={quizzes[3].description} />
		</QuizWrapper>
	);
};
