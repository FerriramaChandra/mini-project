import { useDispatch, useSelector } from "react-redux";
import "./style.css"
import { subtract, plus, remove } from "../../store/action/cartSlice"

const ShoppingCart = () => {
    const cart = useSelector((state) => state.cart)
    console.log(cart.cart.products)
    const dispatch = useDispatch();
    const handleSubtract = (product) => {
        dispatch(subtract(product))
    }

    const handlePlus = (product) => {
        dispatch(plus(product))
    }

    const handleRemove = (product) => {
        dispatch(remove(product))
    }

    return (
        <div className="ContainerTable">
            <table className="TableStyle">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Harga</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.cart.products.map((cart, i) => {
                        return (
                            <tr key={cart.id}>
                                <td>{i += 1}</td>
                                <td>{cart.name}</td>
                                <td>{cart.price}</td>
                                <td className="QuantityTable"><button onClick={() => handleSubtract(cart)}>-</button> {cart.quantity} <button onClick={() => handlePlus(cart)}>+</button></td>
                                <td>{cart.price * cart.quantity}</td>
                                <td className="ActionTable">
                                    <button onClick={() => handleRemove(cart)}>X</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <div>
                    <button className="HubungiPenjual">
                        <a href="https://wa.me/6285399998992">Hubungi penjual</a>
                    </button>
                </div>
            </table>
        </div>
    );
}

export default ShoppingCart;