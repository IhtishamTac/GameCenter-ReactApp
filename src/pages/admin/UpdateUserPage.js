import { useState } from "react";
import Services from "../../api/service";
import { Link, useNavigate, useParams } from "react-router-dom";
const UpdateUserPage = () => {
    const { username } = useParams();
    const { userid } = useParams();
    const [usernames, setUsername] = useState(username);
    const [passwords, setPassword] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleInputChange = (e, setValue) => {
        setValue(e.target.value);
    }
    const updateUser = async (e) => {
        e.preventDefault();
        await Services.updateUser(token, usernames, passwords, userid).then((res) => {
            if (res && res.status === 201) {
                navigate('/users');
            }
        }).catch((err) => {
            if (err) {
                const data = err.response.data;
                if (data.violations) {
                    for (const datas in data.violations) {
                        if (data.violations.hasOwnProperty(datas)) {
                            data.violations[datas].forEach((message) => {
                                alert(message);
                            });
                        }
                    }
                } else {
                    alert(data.message || data.status || 'Unknown error');
                }
            }
        })
    }
    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-3">
                        Manage User - Administrator Portal
                    </h2>
                    <div className="text-muted">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </div>
                </div>
            </div>

            <div className="py-5">
                <div className="container">

                    <div className="row justify-content-center ">
                        <div className="col-lg-5 col-md-6">

                            <form onSubmit={updateUser}>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="updateusername" className="mb-1 text-muted">Username <span className="text-danger">*</span></label>
                                            <input id="updateusername" 
                                            type="text" 
                                            placeholder="Username" 
                                            defaultValue={username}
                                            className="form-control" 
                                            name="updateusername" 
                                            onChange={(e) => handleInputChange(e, setUsername)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="updatepassword" className="mb-1 text-muted">Password <span className="text-danger">*</span></label>
                                            <input id="updatepassword" 
                                            type="password" 
                                            placeholder="Password" 
                                            defaultValue={''} 
                                            className="form-control" 
                                            name="updateuserpasswordname" 
                                            onChange={(e) => handleInputChange(e, setPassword)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 row">
                                    <div className="col">
                                        <button className="btn btn-primary w-100">Submit</button>
                                    </div>
                                    <div className="col">
                                        <Link to={'/users'} className="btn btn-danger w-100">Back</Link>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
export default UpdateUserPage;