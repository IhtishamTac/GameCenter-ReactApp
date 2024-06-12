import axios from "axios";
// import Services from "./service";

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/';

export const signin = async (username, password, navigate) => {
    const data = { username, password };
    await axios.post('auth/signin', data).then((res) => {
        if (res && res.status === 200) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', username);

            navigate('/home');
        }
    }).catch((err) => {
        if (err) {
            alert(err.response.data.message || err.response.data.status || 'Unknown error');
        }
    })
}

export const signup = async (username, password, navigate) => {
    const data = { username, password };
    await axios.post('auth/signup', data).then((res) => {
        if (res && res.status === 201) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', username);
            navigate('/home');
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
