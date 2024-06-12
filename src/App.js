
import './asset/css/bootstrap.css';
import './asset/css/style.css';
import './asset/js/bootstrap';
import './asset/js/popper';

import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';

const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const LandingPage = lazy(() => import('./pages/user/LandingPage'));

const AdminsPage = lazy(() => import('./pages/admin/AdminsPage'));
const UsersPage = lazy(() => import('./pages/admin/UsersPage'));
const AddUserPage = lazy(() => import('./pages/admin/AddUserPage'));
const UpdateUserPage = lazy(() => import('./pages/admin/UpdateUserPage'));

const DiscoverGames = lazy(() => import('./pages/user/DiscoverGames'));
const DetailGamePage = lazy(() => import('./pages/user/DetailGame'));
const ProfilePage = lazy(() => import('./pages/user/ProfilePage'));

const ManageGames = lazy(() => import('./pages/user/ManageGames'));


function App() {
  return (
    <Suspense fallback={<div className='d-flex justify-content-center'><h1>Loading...</h1></div>}>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='/home' element={<LandingPage />} />

        <Route path='/admins' element={<AdminsPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/add-user' element={<AddUserPage />} />
        <Route path='/update-user/:userid/:username' element={<UpdateUserPage />} />

        <Route path='/discover-games' element={<DiscoverGames />} />
        <Route path='/detail-game/:slug' element={<DetailGamePage />} />

        <Route path='/profile/:username' element={<ProfilePage />} />
        <Route path='/manage-games' element={<ManageGames />} />
      </Routes>
    </Suspense>
  );
}

export default App;
