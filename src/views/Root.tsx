import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MainView } from './MainView';
import { CountriesOfEurope } from './Quizes/CoutriesOfEurope/CountriesOfEurope';
import { RecognizeLogo } from './Quizes/RecognizeLogo/RecognizeLogo';
import { KnowledgeOfMovies } from './Quizes/KnowledgeOfMovies/KnowledgeOfMovies';
import { DrivingLicense } from './Quizes/DrivingLicese/DrivingLicense';

export const Root = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<MainView />} />
				<Route path='/quiz/panstwa-europy' element={<CountriesOfEurope />} />
				<Route path='/quiz/rozpoznaj-logo' element={<RecognizeLogo />} />
				<Route path='/quiz/znajomosc-filmow' element={<KnowledgeOfMovies />} />
				<Route path='/quiz/prawo-jazdy' element={<DrivingLicense />} />
			</Routes>
		</Router>
	);
};
