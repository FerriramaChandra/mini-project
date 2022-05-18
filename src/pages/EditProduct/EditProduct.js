import { useState, useCallback, } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUK, GET_PRODUK_BY_PK, UPDATE_PRODUK_BY_PK } from "../../query/queries";
import "./style.css"
import { useParams, useHistory } from "react-router-dom";


const EditProduct = () => {

    const history = useHistory()

    const [UpdateProduk, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_PRODUK_BY_PK, {
        refetchQueries: [
            { query: GET_PRODUK },
        ],
    });
    const { id } = useParams();
    const { data: dataDetailProduk, loading, error } = useQuery(GET_PRODUK_BY_PK, {
        variables: {
            id: id,
        }
    });
    console.log(dataDetailProduk);

    const [namaProduk, setNamaProduk] = useState(dataDetailProduk.PRODUK_by_pk.namaProduk);
    const [kategori, setKategori] = useState(dataDetailProduk.PRODUK_by_pk.kategori);
    const [harga, setHarga] = useState(dataDetailProduk.PRODUK_by_pk.harga);
    const [stok, setStok] = useState(dataDetailProduk.PRODUK_by_pk.stok);
    const [imageBase64, setImageBase64] = useState(dataDetailProduk.PRODUK_by_pk.previewProduk);
    const [deskripsi, setDeskripsi] = useState(dataDetailProduk.PRODUK_by_pk.deskripsi);

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const onDrop = useCallback(acceptedFiles => {
        getBase64(acceptedFiles[0])
            .then((result) => {
                console.log(result);
                setImageBase64(result);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const HandleUpdate = (e) => {
        e.preventDefault();
        UpdateProduk({
            variables: {
                id: id,
                namaProduk: namaProduk,
                kategori: kategori,
                harga: harga,
                stok: stok,
                previewProduk: imageBase64,
                deskripsi: deskripsi,
            }
        })
        setNamaProduk("");
        setKategori("");
        setHarga("");
        setStok("");
        setImageBase64("");
        setDeskripsi("");
        history.push("/")
    };

    return (
        <div className="ContainerTambahProduk">
            <form onSubmit={HandleUpdate} className="Form">
                <h4>Edit</h4>
                <div className="PembungkusProduk">
                    <div className="isiProduk">
                        <div>
                            <input
                                type="text"
                                placeholder="Masukkan nama produk"
                                value={namaProduk}
                                onChange={(e) => setNamaProduk(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <select
                                required
                                placeholder="Masukkan kategori"
                                value={kategori}
                                onChange={(e) => setKategori(e.target.value)}>
                                <option value="Kaos">Kaos</option>
                                <option value="Kemeja">Kemeja</option>
                                <option value="Rajut">Rajut</option>
                                <option value="Gamis">Gamis</option>
                                <option value="Jeans">Jeans</option>
                                <option value="Jaket">Jaket</option>
                            </select>
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Rp ..."
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Masukkan stok"
                                value={stok}
                                onChange={(e) => setStok(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div {...getRootProps()} id="uploadImage">
                                <input {...getInputProps()} />
                            </div>
                            <button type='button' className='button' onClick={() => document.getElementById('uploadImage').click()}>Upload Image</button>
                        </div>
                        <div>
                            <textarea placeholder="Deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required>
                            </textarea>
                        </div>
                    </div>
                    <div>
                        {
                            imageBase64.length > 0 &&
                            <img src={imageBase64} style={{ height: '320px', width: '300px' }} alt="preview" />
                        }
                    </div>
                </div>
                <button className="TombolSubmit">Submit</button>
            </form>
        </div>
    );
}

export default EditProduct;