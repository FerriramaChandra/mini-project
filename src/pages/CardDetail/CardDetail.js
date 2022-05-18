import "./style.css";

import { useParams } from "react-router-dom";
import { GET_PRODUK_BY_PK } from "../../query/queries";
import { useQuery } from "@apollo/client";
import { CircularProgress, } from "@mui/material";
import { Link } from "react-router-dom";


const CardDetail = () => {

    const { id } = useParams();
    const { data: dataDetailProduk, loading, error } = useQuery(GET_PRODUK_BY_PK, {
        variables: {
            id: id,
        }
    });
    console.log(dataDetailProduk);

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
                    <div className="container_detail">
                        <div className="card_detail">
                            <img src={dataDetailProduk.PRODUK_by_pk.previewProduk} alt="Gambar preview produk" className="card_img_detail" />
                            <div className="card_content_detail">
                                <div className="title_wrapper">
                                    <h5>{dataDetailProduk.PRODUK_by_pk.namaProduk}</h5>
                                    <h6>Stok : {dataDetailProduk.PRODUK_by_pk.stok}</h6>
                                </div>
                                <div>
                                    <h6>Rp. {dataDetailProduk.PRODUK_by_pk.harga}</h6>
                                    <h6>Kategory : {dataDetailProduk.PRODUK_by_pk.kategori}</h6>
                                </div>
                            </div>
                            <p>{dataDetailProduk.PRODUK_by_pk.deskripsi}</p>
                        </div>
                        <div className="button_wrapper">
                            <button className="button_back"><Link to="/">Kembali</Link></button>
                        </div>
                    </div>
            }
        </div>
    );
}

export default CardDetail;