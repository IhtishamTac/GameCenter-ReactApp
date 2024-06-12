import { Link, useNavigate } from "react-router-dom";
import { NavComp } from "../../components/NavComp";
import { useEffect, useState } from "react";
import Services from "../../api/service";
const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const getUsers = async () => {
        await Services.getUsers(token).then((res) => {
            console.log(res);
            setUsers(res.data.content);
        }).catch((err) => {
            alert(err.response.data.message || err.response.data.status || 'Unknown error');
        });
    }
    const setParamUpdate = (userid, username) => {
        navigate(`/update-user/${userid}/${username}`);
    }
    const blockUser = async (delete_reason, id) => {
        await Services.blockUser(token, delete_reason, id).then((res) => {
            if (res && res.status === 204) {
                console.log(res);
                getUsers();
            }
        }).catch((err) => {
            alert(err.response.data.message || err.response.data.status || 'Unknown error');
        });
    }
    const unblockUser = async (id) => {
        await Services.unblockUser(token, id).then((res) => {
            if (res && res.status === 204) {
                console.log(res);
                getUsers();
            }
        }).catch((err) => {
            alert(err.response.data.message || err.response.data.status || 'Unknown error');
        });
    }
    const deleteUser = async (id) => {
        await Services.deleteUser(token, id).then((res) => {
            if (res && res.status === 204) {
                console.log(res);
                getUsers();
            }
        }).catch((err) => {
            alert(err.response.data.message || err.response.data.status || 'Unknown error');
        });
    }
    useEffect(() => {
        getUsers();
    }, [token]);
    return (
        <main>
            <NavComp />
            <div className="hero py-5 bg-light">
                <div className="container">
                    <Link to={'/add-user'} className="btn btn-primary">
                        Add User
                    </Link>
                </div>
            </div>

            <div className="list-form py-5">
                <div className="container">
                    <h6 className="mb-3">List Users</h6>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Created at</th>
                                <th>Last login</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td><Link to={'/profile'} target="_blank">{user.username}</Link></td>
                                    <td>{user.created_at}</td>
                                    <td>{user.last_login_at || "Haven't login"}</td>
                                    {user.deleted_at == null ?
                                        <td><span className="bg-success text-white p-1 d-inline-block">Active</span></td>
                                        :
                                        <td><span className="bg-danger text-white p-1 d-inline-block">Blocked</span></td>}
                                    <td>
                                        {user.deleted_at == null ?
                                            <div className="btn-group" role="group">
                                                <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Lock
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <button onClick={() => blockUser('Spamming', user.id)} type="submit" className="dropdown-item" name="reason" value="spamming">Spamming</button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => blockUser('Cheating', user.id)} type="submit" className="dropdown-item" name="reason" value="cheating">Cheating</button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => blockUser('Other', user.id)} type="submit" className="dropdown-item" name="reason" value="other">Other</button>
                                                    </li>
                                                </ul>
                                            </div>
                                            :
                                            <button onClick={() => unblockUser(user.id)} type="submit" className="btn btn-primary btn-sm">Unlock</button>
                                        }

                                        <button onClick={() => setParamUpdate(user.id, user.username)} className="btn btn-sm btn-secondary">Update</button>
                                        <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

        </main>
    )
}
export default UsersPage;