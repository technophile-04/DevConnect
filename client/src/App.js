import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import ProfileForm from './components/profile-form/ProfileForm';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';

import { Provider } from 'react-redux';
import { store } from './store';
import { loadUser } from './actions/auth';
import { LOGOUT } from './actions/types';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		store.dispatch(loadUser());

		window.addEventListener('storage', () => {
			if (!localStorage.token) store.dispatch({ type: LOGOUT });
		});
	}, []);

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Navbar />

				<Alert />

				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
					<Route path="profiles" element={<Profiles />} />
					<Route path="profile/:id" element={<Profile />} />
					<Route
						path="dashboard"
						element={<PrivateRoute component={Dashboard} />}
					/>
					<Route
						path="create-profile"
						element={<PrivateRoute component={ProfileForm} />}
					/>
					<Route
						path="edit-profile"
						element={<PrivateRoute component={ProfileForm} />}
					/>
					<Route
						path="add-experience"
						element={<PrivateRoute component={AddExperience} />}
					/>
					<Route
						path="add-education"
						element={<PrivateRoute component={AddEducation} />}
					/>
					<Route path="posts" element={<PrivateRoute component={Posts} />} />
					<Route path="posts/:id" element={<PrivateRoute component={Post} />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
