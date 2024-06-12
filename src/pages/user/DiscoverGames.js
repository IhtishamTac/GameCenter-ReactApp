import { useEffect, useState } from 'react';
import Services from '../../api/service';
import defaultImg from '../../asset/example_game/v1/thumbnail.png';
import { Link } from 'react-router-dom';
import { NavComp } from '../../components/NavComp';

const getThumbnailSrc = (game, defaultImg) => {
    if (Array.isArray(game.thumbnail) && game.thumbnail.length > 0) {
        if (game.thumbnail[0]) {
            return "http://127.0.0.1:8000/" + game.thumbnail[0];
        } else if (game.thumbnail[1]) {
            return "http://127.0.0.1:8000/" + game.thumbnail[1];
        }
    }
    return defaultImg;
};

const DiscoverGames = () => {
    const token = localStorage.getItem('token');
    const [games, setGames] = useState([]);
    const [element, setElement] = useState([]);
    const [sortBy, setSortBy] = useState('title');
    const [sortDir, setSortDir] = useState('asc');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [loading, setLoading] = useState(false);

    console.log(games);
    const getGames = async () => {
        await Services.discoverGames(token, size, page, sortBy, sortDir).then((res) => {
            setGames(res.data.content);
            setElement(res.data);
        }).catch((err) => {
            alert(err.response.data.message || err.response.data.status || 'Unknown Error');
        });
    }
    useEffect(() => {
        getGames();
    }, [token, sortBy, sortDir, page, size]);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement || document.body;
            if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
                setLoading(true);
                console.log('is at bottom');
                setSize(prevSize => prevSize + 10);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);
    if (!games) return (<h1>Loading...</h1>);
    return (
        <main>
            <NavComp />
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h1>Discover Games</h1>
                </div>
            </div>

            <div className="list-form py-5">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2 className="mb-3">{element.totalElements} Game Avaliable</h2>
                        </div>

                        <div className="col-lg-8" style={{ textAlign: 'right' }}>
                            <div className="mb-3">
                                <div className="btn-group" role="group" style={{ marginRight: '10px' }}>
                                    <button
                                        onClick={() => {
                                            setSortBy('popular');
                                            getGames()
                                        }}
                                        type="button"
                                        className={sortBy === 'popular' ? 'btn btn-secondary' : 'btn btn-outline-primary'}
                                    >Popularity</button>
                                    <button
                                        onClick={() => {
                                            setSortBy('uploaddate');
                                            getGames()
                                        }}
                                        type="button"
                                        className={sortBy === 'uploaddate' ? 'btn btn-secondary' : 'btn btn-outline-primary'}
                                    >Recently Updated</button>
                                    <button
                                        onClick={() => {
                                            setSortBy('title');
                                            getGames()
                                        }}
                                        type="button"
                                        className={sortBy === 'title' ? 'btn btn-secondary' : 'btn btn-outline-primary'}
                                    >Alphabetically</button>
                                </div>

                                <div className="btn-group" role="group">
                                    <button
                                        onClick={() => {
                                            setSortDir('asc');
                                            getGames()
                                        }}
                                        type="button"
                                        className={sortDir === 'asc' ? 'btn btn-secondary' : 'btn btn-outline-primary'}
                                    >ASC</button>
                                    <button
                                        onClick={() => {
                                            setSortDir('desc');
                                            getGames()
                                        }}
                                        type="button"
                                        className={sortDir === 'desc' ? 'btn btn-secondary' : 'btn btn-outline-primary'}
                                    >DESC</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        {games.map((game, index) => (
                            <div className="col-md-6" key={index}>
                                <Link to={`/detail-game/${game.slug}`} className="card card-default mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-4">
                                                <img src={getThumbnailSrc(game, defaultImg)} alt="Demo Game 1 Logo" style={{ width: '180px', height:'180px', objectFit:'cover' }}></img>
                                            </div>
                                            <div className="col">
                                                <h5 className="mb-1">{game.title} <small className="text-muted">By {game.author}</small></h5>
                                                <div>{game.description}</div>
                                                <hr className="mt-1 mb-1"></hr>
                                                <div className="text-muted">#scores submitted : {game.scoreCount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}

                    </div>

                </div>
            </div>

        </main>
    )
}
export default DiscoverGames;