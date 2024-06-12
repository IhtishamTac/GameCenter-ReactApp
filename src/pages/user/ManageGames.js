import { NavComp } from "../../components/NavComp";
import defaultImg from "../../asset/example_game/v1/thumbnail.png";
import Services from "../../api/service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ManageGames = () => {
    const token = localStorage.getItem('token');

    const [games, setGames] = useState([]);
    
    const getCreated = () => {
        Services.getCreatedGames(token).then((res)=>{
            setGames(res.data.games);
        }).catch((err)=>{
            alert(err.response.data.message || err.response.data.status || 'Unknown Error');
        });
    }
    useEffect(()=>{
        getCreated();
    },[token]);
    if(!games) return (<h1>Loading...</h1>);
    return (
        <main>
            <NavComp />
            <div className="hero py-5 bg-light">
                <div className="container">
                    <Link to={'/add-game'} className="btn btn-primary">
                        Add Game
                    </Link>
                </div>
            </div>

            <div className="list-form py-5">
                <div className="container">
                    <h6 className="mb-3">List Games</h6>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th width="100">Thumbnail</th>
                                <th width="200">Title</th>
                                <th width="500">Description</th>
                                <th width="180">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           {games.map((game, index)=>(
                            <tr key={index}>
                                <td><img src={defaultImg} alt="Demo Game 1 Logo" style={{width:'100%'}}></img></td>
                                <td>{game.title}</td>
                                <td>{game.description}</td>
                                <td>
                                    <Link to={`/detail-game/${game.slug}`} className="btn btn-sm btn-primary">Detail</Link>
                                    <a href="manage-games-form-update.html" className="btn btn-sm btn-secondary">Update</a>
                                    <button className="btn btn-sm btn-danger">Delete</button>
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
export default ManageGames;