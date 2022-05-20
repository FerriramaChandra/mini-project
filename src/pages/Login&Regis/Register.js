import { INSERT_PENGGUNA } from "../../query/queries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Register = () => {

    const history = useHistory();

    const [insertPengguna, { data }] = useMutation(INSERT_PENGGUNA)

    const [userName, setUsername] = useState('');
    const [passWord, setPassword] = useState('');
    const handleRegis = (e) => {
        e.preventDefault();
        insertPengguna({
            variables: {
                object: {
                    username: userName,
                    password: passWord,
                }
            }
        })
        history.push("/Login")
        console.log({ userName, passWord })
        setUsername("");
        setPassword("");
    }

    return (
        <div className="container">
            <form className="form" onSubmit={handleRegis}>
                <h3>Register</h3>
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Masukkan username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={passWord}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>

            </form>
        </div>
    );
}

export default Register;