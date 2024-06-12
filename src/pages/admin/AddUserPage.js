import { useState } from "react";
import Services from "../../api/service";
import { Link, useNavigate } from "react-router-dom";
const AddUserPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleInputChange = (e, setValue) => {
        setValue(e.target.value);
    }
    const addUser = async (e) => {
        e.preventDefault();
        await Services.addUser(token, username, password).then((res) => {
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

                            <form onSubmit={addUser}>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="addusername" className="mb-1 text-muted">Username <span className="text-danger">*</span></label>
                                            <input id="addusername" type="text" placeholder="Username" className="form-control" name="addusername" onChange={(e) => handleInputChange(e, setUsername)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="addpassword" className="mb-1 text-muted">Password <span className="text-danger">*</span></label>
                                            <input id="addpassword" type="password" placeholder="Password" className="form-control" name="adduserpasswordname" onChange={(e)=>handleInputChange(e, setPassword)} />
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
export default AddUserPage;