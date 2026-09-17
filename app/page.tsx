"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const API_URL = "https://projectrestapi.vercel.app/api/products";

  // ==========================================
  // GET: Ambil semua produk
  // ==========================================
  const getProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();

      if (json.success) {
        setProducts(json.data);
      } else {
        alert("Gagal mengambil data produk");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal terhubung ke backend");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ==========================================
  // POST: Tambah produk
  // ==========================================
  const tambahProduk = async () => {
    if (!name || !price) {
      alert("Nama dan harga harus diisi");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          price: Number(price),
          stock: Number(stock) || 0,
        }),
      });

      const json = await response.json();

      if (json.success) {
        alert("Produk berhasil ditambahkan");

        setName("");
        setPrice("");
        setStock("");

        getProducts();
      } else {
        alert("Gagal menambahkan produk");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal terhubung ke backend");
    }
  };

  // ==========================================
  // DELETE: Hapus produk
  // ==========================================
  const hapusProduk = async (id: number) => {
    const yakin = confirm("Apakah kamu yakin ingin menghapus produk ini?");

    if (!yakin) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const json = await response.json();

      if (json.success) {
        alert("Produk berhasil dihapus");
        getProducts();
      } else {
        alert("Gagal menghapus produk");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal terhubung ke backend");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">

        {/* Judul */}
        <h1 className="mb-8 text-center text-3xl font-bold text-black">
          Manajemen Produk
        </h1>

        {/* Form Tambah Produk */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-black">
            Tambah Produk
          </h2>

          <div className="grid gap-4 md:grid-cols-3">

            <input
              type="text"
              placeholder="Nama Produk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded border p-3 text-black"
            />

            <input
              type="number"
              placeholder="Harga"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded border p-3 text-black"
            />

            <input
              type="number"
              placeholder="Stok"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="rounded border p-3 text-black"
            />

          </div>

          <button
            onClick={tambahProduk}
            className="mt-4 rounded bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Simpan Produk
          </button>
        </div>

        {/* Daftar Produk */}
        <div className="rounded-lg bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-semibold text-black">
            Daftar Produk
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3 text-left text-black">
                    ID
                  </th>

                  <th className="border p-3 text-left text-black">
                    Nama Produk
                  </th>

                  <th className="border p-3 text-left text-black">
                    Harga
                  </th>

                  <th className="border p-3 text-left text-black">
                    Stok
                  </th>

                  <th className="border p-3 text-left text-black">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>

                    <td className="border p-3 text-black">
                      {product.id}
                    </td>

                    <td className="border p-3 text-black">
                      {product.name}
                    </td>

                    <td className="border p-3 text-black">
                      Rp {product.price.toLocaleString("id-ID")}
                    </td>

                    <td className="border p-3 text-black">
                      {product.stock}
                    </td>

                    <td className="border p-3">
                      <button
                        onClick={() => hapusProduk(product.id)}
                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                      >
                        Hapus
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

      </div>
    </main>
  );
}