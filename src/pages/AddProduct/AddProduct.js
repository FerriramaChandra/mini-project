import { useMutation, } from "@apollo/client";
import { GET_PRODUK, INSERT_PRODUK, } from "../../query/queries";
import { useState, useCallback, } from "react";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router-dom";
import "./style.css"

const AddProduct = () => {
    const history = useHistory();
    const [namaProduk, setNamaProduk] = useState('');
    const [kategori, setKategori] = useState('');
    const [harga, setHarga] = useState('');
    const [stok, setStok] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [deskripsi, setDeskripsi] = useState();

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

    const [insertProduk] = useMutation(INSERT_PRODUK, {
        refetchQueries: [
            { query: GET_PRODUK }
        ]
    });
    const HandleSubmit = (e) => {
        e.preventDefault();
        insertProduk({
            variables: {
                object: {
                    namaProduk: namaProduk,
                    kategori: kategori,
                    harga: harga,
                    stok: stok,
                    deskripsi: deskripsi,
                    previewProduk: imageBase64,
                }
            }
        })
        setNamaProduk("");
        setKategori("");
        setHarga("");
        setStok("");
        setImageBase64("");
        setDeskripsi("");
        history.push("/");
    };


    return (
        <div className="ContainerTambahProduk">
            <form onSubmit={HandleSubmit} className="Form">
                <h4>Tambahkan produk</h4>
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
    )
}

export default AddProduct;