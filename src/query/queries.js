import { gql } from "@apollo/client";

export const GET_PRODUK = gql`
    query MyQuery {
        PRODUK {
            harga
            deskripsi
            id
            kategori
            namaProduk
            previewProduk
            stok
        }
    }
`;

export const GET_PRODUK_BY_PK = gql`
    query MyQuery($id: Int!) {
        PRODUK(where: {id: {_eq: $id}}) {
            deskripsi
            harga
            id
            idPengguna
            kategori
            namaProduk
            previewProduk
            stok
        }
    }
`

export const SUBSCRIPTION_PRODUK = gql`
subscription MySubscription {
    PRODUK {
            deskripsi
            harga
            id
            idPengguna
            kategori
            namaProduk
            previewProduk
            stok
        }
    }
`


export const GET_PENGGUNA = gql`
    query MyQuery($_eq: String!, $_eq1: String!) {
            PENGGUNA(where: {password: {_eq: $_eq}, username: {_eq: $_eq1}}) {
            password
            username
        }
    }
`


export const INSERT_PRODUK = gql`
    mutation MyMutation($object: PRODUK_insert_input = {}) {
        insert_PRODUK_one(object: $object) {
            deskripsi
            harga
            id
            kategori
            namaProduk
            previewProduk
            stok
        }
    }
`

export const INSERT_PENGGUNA = gql`
    mutation MyMutation($object: PENGGUNA_insert_input!) {
        insert_PENGGUNA_one(object: $object) {
            id
            password
            username
        }
    }
`

export const GET_PRODUK_BY_KATEGORI = gql`
    query MyQuery($kategori: String!) {
        PRODUK(where: {kategori: {_eq: $kategori}}) {
            deskripsi
            harga
            id
            idPengguna
            kategori
            namaProduk
            previewProduk
            stok
        }
    }
`

export const DELETE_PRODUK = gql`
    mutation MyMutation($id: Int!) {
        delete_PRODUK(where: {id: {_eq: $id}}) {
        affected_rows
        }
    }
`

export const UPDATE_PRODUK_BY_PK = gql`
    mutation MyMutation($id: Int!, $harga: Int!, $deskripsi: String!, $stok: Int!, $previewProduk: String!, $namaProduk: String!, $kategori: String!) {
        update_PRODUK_by_pk(pk_columns: {id: $id}, _set: {deskripsi: $deskripsi, harga: $harga, kategori: $kategori, namaProduk: $namaProduk, previewProduk: $previewProduk, stok: $stok}) {
            deskripsi
            harga
            id
            idPengguna
            kategori
            namaProduk
            previewProduk
            stok
        }
    }
`