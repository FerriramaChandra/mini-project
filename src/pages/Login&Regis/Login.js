import { useEffect, useState } from "react";
import "./loginregis.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { GET_PENGGUNA } from "../../query/queries"
import { useLazyQuery } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../../store/action/userSlice";
import { CircularProgress } from "@mui/material";
import { Alert } from "@mui/material";

const Login = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [getPengguna, { data, loading }] = useLazyQuery(GET_PENGGUNA);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (data?.PENGGUNA.length === 1) {
            return history.push("/")
        }
    }, [data, history])

    const handleLogin = (e) => {
        e.preventDefault();
        getPengguna({ variables: { _eq: password, _eq1: username } }).then(res => {
            const user = res.data.PENGGUNA[0]
            // console.log(user);
            localStorage.setItem("user", "login");
            localStorage.setItem("username", username);
            dispatch(login({
                username: user.username
            }));
        }).catch(err => {
            console.log(err)
        })
    }

    if (loading) {
        return (
            <div className="spinner_contain">
                <CircularProgress style={{ width: "200px", height: "200px" }} />
            </div>
        )
    }

    return (
        <div className="container">
            <form className="form" onSubmit={handleLogin}>
                <h3>Sign In</h3>
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Masukkan username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
                <br />
                <div className="RegisButton">
                    <p>Belum punya akun ? <Link to="/Register">Klik disini</Link></p>
                </div>
                {
                    data && <h2>Terdapat kesalahan pada username atau password</h2>
                }
            </form>
        </div>
    );

}



export default Login;