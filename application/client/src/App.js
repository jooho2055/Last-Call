import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import AboutMeJooho from './pages/TeamMembers/AboutMeJooho';
import AboutMeDorrie from './pages/TeamMembers/AboutMeDorrie';
import AboutMeGwangwoo from './pages/TeamMembers/AboutMeGwangwoo';
import AboutMeVedang from './pages/TeamMembers/AboutMeVedang';
import AboutMeLeslie from './pages/TeamMembers/AboutMeLeslie';
import AboutMeLuis from './pages/TeamMembers/AboutMeLuis';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <NotFound />,
		children: [
			{ index: true, element: <LandingPage /> }, // images and short description of our app
			{ path: '/AboutUs', element: <AboutUs /> },
			{ path: '/AboutUs/Dorrie Shen', element: <AboutMeDorrie /> },
			{ path: '/AboutUs/Gwangwoo Lee', element: <AboutMeGwangwoo /> },
			{ path: '/AboutUs/Vedang Sakxena', element: <AboutMeVedang /> },
			{ path: '/AboutUs/Jooho Chang', element: <AboutMeJooho /> },
			{ path: '/AboutUs/Leslie Mora Ponce', element: <AboutMeLeslie /> },
			{ path: '/AboutUs/Luis Acuna Mendez', element: <AboutMeLuis /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
