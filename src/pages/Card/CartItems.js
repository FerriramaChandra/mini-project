import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUK, DELETE_PRODUK } from '../../query/queries';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Typography, Card, CardContent, CardMedia, CardActions, CircularProgress, } from '@mui/material';

import { useSelector, useDispatch } from "react-redux";
import { add } from "../../store/action/cartSlice"

import "./styles.css";
import { useHistory } from "react-router-dom";


const CartItems = () => {

    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.user.isLogin)
    const username = useSelector((state) => state.user.username)
    const history = useHistory();
    const { data, loading, } = useQuery(GET_PRODUK);
    // const cart = useSelector((state) => state.cart)

    const [deleteProduk, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_PRODUK, {
        refetchQueries: [
            { query: GET_PRODUK }
        ]
    })


    const handleAddToCart = (user_id, product) => {
        if (!isLogin) {
            history.push("/Login");
        }
        const data = { user_id, product }
        dispatch(add(data))
    }


    const handleDelete = (barang) => {
        console.log(barang);
        deleteProduk({
            variables: {
                id: barang.id
            }
        })
    }


    const handleDetail = (barang) => {
        const id = barang.id
        history.push(`/ProductDetail/${id}`)
    }

    const handleEdit = (barang) => {
        const id = barang.id
        console.log(id)
        history.push(`/EditProduct/${id}`)
    }


    return (
        <div>
            {
                loading ?
                    (
                        <div className="spinner_contain">
                            <CircularProgress style={{ width: "200px", height: "200px" }} />
                        </div>
                    )
                    :
                    <div className="container">
                        {
                            data.PRODUK.map((barang, barangIdx) => (
                                <Card key={barangIdx} className="card" >
                                    <CardMedia component='img' src={barang.previewProduk} alt="Gambar preview produk" className="card_img" onClick={() => handleDetail(barang)} />
                                    <CardContent className="card_content">
                                        <Typography gutterBottom variant="h5">{barang.namaProduk}</Typography>
                                        <Typography gutterBottom variant="h8">Rp. {barang.harga}</Typography>
                                        <Typography gutterBottom variant="h8">Stok : {barang.stok}</Typography>
                                        <Typography gutterBottom variant="h8">Kategory : {barang.kategori}</Typography>
                                    </CardContent>
                                    <CardActions className="cart_action" >
                                        <button><AddShoppingCartIcon onClick={() => handleAddToCart(1, barang)} /></button>
                                        <button className={username !== "admin" && "user_button"} onClick={() => handleEdit(barang)}><EditIcon /></button>
                                        <button className={username !== "admin" && "user_button"} onClick={() => handleDelete(barang)} ><DeleteIcon /></button>
                                    </CardActions>
                                </Card>
                            ))
                        }
                    </div>
            }

        </div>
    );

};

export default CartItems;
