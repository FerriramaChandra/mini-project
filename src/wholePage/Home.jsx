import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "../pages/Card/CartItems";
import { login } from "../store/action/userSlice";


import "./style.css"

const Home = () => {


    return (
        <div>
            <CartItems />
        </div>
    )
}

export default Home;