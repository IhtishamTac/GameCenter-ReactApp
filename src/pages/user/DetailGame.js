import { Link, useNavigate, useParams } from 'react-router-dom';
import defaultImg from '../../asset/example_game/v1/thumbnail.png';
import { useEffect, useState } from 'react';
import Services from '../../api/service';
const DetailGamePage = () => {
    const { slug } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [scores, setScores] = useState([]);
    const getDetailGame = async () => {
        await Services.detailGame(token, slug).then((res) => {
            setGame(res.data[0]);
        }).catch((err) => {
            alert(err.response.data.message || err.response.data.status || 'Unknown Error');
        });
    }
    const getScore = async () => {
        await Services.getScore(token, slug).then((res) => {
            setScores(res.data.scores);
        }).catch((err) => {
            alert(err.response.data.message || err.response.data.status || 'Unknown Error');
        });
    }
    useEffect(() => {
        getDetailGame();
        getScore();

    }, [slug]);
    if (!game) return (<h1>Loading..</h1>);

    const localStorageUsername = localStorage.getItem('username');

    const firstTenScores = scores.slice(0, 10);
    const isUserInFirstTen = firstTenScores.some(score => score.username === localStorageUsername);
    let userScore = null;

    if (!isUserInFirstTen) {
        userScore = scores.find(score => score.username === localStorageUsername);
    }
    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-1">
                        {game.title}
                    </h2>
                    <Link to={`/profile/${game.author}`} className="btn btn-success">By {game.author}</Link>
                    <div className="text-muted">
                        {game.description}
                    </div>
                    <h5 className="mt-2">Last Versions {game.gamePath.split('/')[2]} ({game.uploadTimestamp})</h5>
                </div>
            </div>

            <div className="py-5">
                <div className="container">

                    <div className="row justify-content-center ">
                        <div className="col-lg-5 col-md-6">

                            <div className="row">
                                <div className="col">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5>Top 10 Leaderboard</h5>
                                            <ol>
                                                 {firstTenScores.map((score, index) => (
                                                    <li key={index}>
                                                        {score.username === localStorageUsername ? (
                                                            <b>{score.username} ({score.score})</b>
                                                        ) : (
                                                            <>{score.username} ({score.score})</>
                                                        )}
                                                    </li>
                                                ))}
                                                {!isUserInFirstTen && userScore && (
                                                    <li key="user-score">
                                                        <b>{localStorageUsername} ({userScore.score})</b>
                                                    </li>
                                                )}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <img src={defaultImg} alt="Demo Game 1 Logo" style={{ width: '100%' }}></img>
                                    <a href="../example_game/v1//game.zip" className="btn btn-primary w-100 mb-2 mt-2">Download Game</a>
                                </div>
                            </div>


                            <button onClick={()=>navigate(-1)} className="btn btn-danger w-100">Back</button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
export default DetailGamePage;