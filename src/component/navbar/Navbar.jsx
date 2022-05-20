import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import "./style.css"
import UserHeader from './UserHeader';
import LoginHeader from './LoginHeader';
import { GET_PRODUK_BY_KATEGORI } from '../../query/queries';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { login } from '../../store/action/userSlice';


const Navbar = () => {

    const username = useSelector((state) => state.user.username)

    const [getProdukByKategori, { data }] = useLazyQuery(GET_PRODUK_BY_KATEGORI)
    const [kategory, setKategory] = useState("");
    const isLogin = useSelector((state) => state.user.isLogin)
    const status = localStorage.getItem("user")
    // console.log(isLogin);
    // console.log(status);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "login") {
            dispatch(login({
                username: localStorage.getItem("username")
            }))
        }
    }, []);

    const ClickHandler = (e) => {
        e.preventDefault();
        setKategory(e.target.innerText)
        console.log(e);
        console.log(kategory)
        getProdukByKategori({
            variables: {
                kategori: kategory,
            }
        })
        console.log(data);
    }

    return (
        <div className="Nav">
            <div className="NavTop">
                <div className="NavLeft">
                    <Link to="/"><h4>Mary Winter</h4></Link>
                </div>
                <div className="NavCenter">
                    <ul>
                        <li onClick={ClickHandler}>Kaos</li>
                        <li onClick={ClickHandler}>Kemeja</li>
                        <li>Rajut</li>
                        <li>Gamis</li>
                        <li>Jeans</li>
                        <li>Jaket</li>
                    </ul>
                </div>
                <div className="NavRight">
                    {
                        username === "admin" && (
                            <Link to="/AddProduct"><AddIcon /></Link>
                        )
                    }
                    <Link to="/ShoppingCart"><ShoppingCartIcon /></Link>
                    {
                        isLogin ?
                            <UserHeader />
                            :
                            <LoginHeader />
                    }
                </div>
            </div>
        </div >
    );
}

export default Navbar;