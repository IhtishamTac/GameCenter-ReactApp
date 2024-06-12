import { useNavigate, useParams } from 'react-router-dom';
import defaultImg from '../../asset/example_game/v1/thumbnail.png';
import { useEffect, useState } from 'react';    
import Services from '../../api/service';
const ProfilePage = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { username } = useParams();

    const [user, setUser] = useState(null);
    const [authoredGames, setAuthoredGames] = useState([]);
    const [highScore, setHighScore] = useState([]);
    
    const getProfile = async () => {
        await Services.getProfile(token, username).then((res) => {
            setUser(res.data);
            setHighScore(res.data.highscore)

            for (let i = 0; i < 3; i++) {
                Services.detailGame(token, res.data.authoredGames[i].slug).then((res) => {
                    setAuthoredGames(data => [...data, ...res.data]);
                }).catch((err) => {
                    alert(err.response.data.message || err.response.data.status || 'Unknown Error');
                });
            }
        }).catch(() => { });
    }
    console.log(authoredGames);
    useEffect(() => {
        getProfile();
    }, [username]);
    if (!user ) return (<h1>Loading..</h1>);
    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-1">
                        {user.username}
                    </h2>
                    <h5 className="mt-2">Last Login {user.registeredTimestamp}</h5>
                </div>
            </div>

            <div className="py-5">
                <div className="container">

                    <div className="row justify-content-center ">
                        <div className="col-lg-5 col-md-6">

                            <h5>Highscores per Game</h5>
                            <div className="card-body">
                                <ol>
                                    {highScore.map((highscore, index) => (
                                        <li key={index}><a href="detail-games.html">{highscore.game.title} ({highscore.score})</a></li>
                                    ))}
                                </ol>
                            </div>
                            <h5>Authored Games</h5>
                            {authoredGames.map((authored, index) => (
                                <a href="detail-games.html" className="card card-default mb-3" key={index}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-4">
                                                <img src={defaultImg} alt="Demo Game 1 Logo" style={{ width: '100%' }}></img>
                                            </div>
                                            <div className="col">
                                                <h5 className="mb-1">{authored.title} <small className="text-muted">By {user.username}</small></h5>
                                                <div>{authored.description}</div>
                                                <hr className="mt-1 mb-1"></hr>
                                                <div className="text-muted">#scores submitted : {authored.scoreCount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}

                            <button onClick={() => navigate(-1)} className="btn btn-danger w-100">Back</button>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
export default ProfilePage;