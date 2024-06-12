import { Link, useNavigate } from "react-router-dom";
import Services from "../api/service";

export const NavComp = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const signout = async () => {
        await Services.signout(token).then((res) => {
            if (res && res.status === 200) {
                localStorage.removeItem('token');
                localStorage.removeItem('username');

                navigate('/');
            }
        }).catch((err) => {
            alert(err.response.data.message || err.response.data.status || 'Unknown error');
        });
    }
    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to={'/home'}>Gaming Portal</Link>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                    {localStorage.getItem('username').includes('admin') ? (
                        <>
                            <li><Link to={'/admins'} className="nav-link px-2 text-white">List Admins</Link></li>
                            <li><Link to={'/users'} className="nav-link px-2 text-white">List Users</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to={'/discover-games'} className="nav-link px-2 text-white">Discover Games</Link></li>
                            <li><Link to={'/manage-games'} className="nav-link px-2 text-white">Manage Games</Link></li>
                            <li><Link to={`/profile/${localStorage.getItem('username')}`} className="nav-link px-2 text-white">User Profile</Link></li>
                        </>
                    )}


                    <li className="nav-item">
                        <Link to={'/profile'} className="nav-link active bg-dark">Welcome, {localStorage.getItem('username') || 'username not-found'}</Link>
                    </li>
                    <li className="nav-item">
                        <button onClick={signout} className="btn bg-white text-primary ms-4">Sign Out</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}