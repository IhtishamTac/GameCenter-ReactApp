import { useEffect, useState } from "react";
import { NavComp } from "../../components/NavComp";
import Services from "../../api/service";

const AdminsPage = () => {
    const [admins, setAdmins] = useState([]);
    const token = localStorage.getItem('token');
    const getAdmins = async () => {
        await Services.getadmins(token).then((res) => {
            setAdmins(res.data.content);
            console.log(res.data.content);
        }).catch((err) => {
            alert(err.response.data.message || err.response.data.status || 'Unknown error');
        });
    }
    useEffect(() => {
        getAdmins();
    }, [token]);
    return (
        <main>
            <NavComp />
            <div className="list-form py-5">
                <div className="container">
                    <h6 className="mb-3">List Admin Users</h6>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Created at</th>
                                <th>Last login</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin, index) => (
                                <tr key={index}>
                                    <td>{admin.username}</td>
                                    <td>{admin.created_at}</td>
                                    <td>{admin.last_login_at || "Haven't login"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

        </main>

    )
}
export default AdminsPage;