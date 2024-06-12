import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Services from "../../api/service";

const AddGame = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [zipfile, setZipfile] = useState(null);

    const handleInputChange = (e, setValue) => {
        setValue(e.target.value);
    };
    const handleFileChange = (e, setValue) => {
        setValue(e.target.files[0]);
    };
    const addGame = async (e) => {
        e.preventDefault();
        await Services.addGame(token, title, description).then((res) => {
            console.log(res);
            if (res && res.status === 201 && res.data.slug) {
                Services.uploadGame(token, thumbnail, zipfile, res.data.slug).then((res) => {
                    if(res && res.status === 200){
                        navigate('/manage-games');
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
                });
            }
        }).catch((err) => {
            alert(err.response.data.message || err.response.data.slug || 'Unknown error');
        });
    }
    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-3">
                        Manage Games - Gaming Portal
                    </h2>
                </div>
            </div>

            <div className="py-5">
                <div className="container">

                    <div className="row justify-content-center ">
                        <div className="col-lg-5 col-md-6">

                            <form onSubmit={addGame}>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="title" className="mb-1 text-muted">Title <span className="text-danger">*</span></label>
                                            <input id="title" type="text" placeholder="Title" className="form-control" name="title" onChange={(e) => handleInputChange(e, setTitle)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="description" className="mb-1 text-muted">Description <span className="text-danger">*</span></label>
                                            <textarea name="description" className="form-control" placeholder="Description" id="description" cols="30" rows="5" onChange={(e) => handleInputChange(e, setDescription)}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="thumbnail" className="mb-1 text-muted">Thumbnail <span className="text-danger">*</span></label>
                                            <input type="file" name="thumbnail" className="form-control" id="thumbnail" onChange={(e) => handleFileChange(e, setThumbnail)}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="game" className="mb-1 text-muted">File Game <span className="text-danger">*</span></label>
                                            <input type="file" name="game" className="form-control" id="game" onChange={(e) => handleFileChange(e, setZipfile)}></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 row">
                                    <div className="col">
                                        <button className="btn btn-primary w-100">Submit</button>
                                    </div>
                                    <div className="col">
                                        <p onClick={() => navigate(-1)} className="btn btn-danger w-100">Back</p>
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
export default AddGame;