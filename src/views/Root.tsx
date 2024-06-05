import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MainView } from './MainView';
import { CountriesOfEurope } from './Quizes/CoutriesOfEurope/CountriesOfEurope';
import { RecognizeLogo } from './Quizes/RecognizeLogo/RecognizeLogo';
import { KnowledgeOfMovies } from './Quizes/KnowledgeOfMovies/KnowledgeOfMovies';
import { DrivingLicense } from './Quizes/DrivingLicese/DrivingLicense';
import { basePath } from 'src/utils/base-path';

export const Root = () => {
	return (
		<Router>
			<Routes>
				<Route path={`${basePath}/`} element={<MainView />} />
				<Route path={`${basePath}/quiz/panstwa-europy`} element={<CountriesOfEurope />} />
				<Route path={`${basePath}/quiz/rozpoznaj-logo`} element={<RecognizeLogo />} />
				<Route path={`${basePath}/quiz/znajomosc-filmow`} element={<KnowledgeOfMovies />} />
				<Route path={`${basePath}/quiz/prawo-jazdy`} element={<DrivingLicense />} />
			</Routes>
		</Router>
	);
};
