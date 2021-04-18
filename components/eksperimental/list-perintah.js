export default [
  {
    perintah: "bajet tambah",
    deskripsi: `Bajet: Menambahkan dana ke Bajet [bajet tambah]`,
    step: [
      {
        deskripsi: "Masukkan nominal Bajet yang ingin ditambahkan...",
        field: "number",
      },
      {
        deskripsi: "Lagi, biar mantep...",
        field: "number",
      },
    ],
  },
  {
    perintah: "makan",
    deskripsi: "Suatu perintah untuk... makan",
    step: [
      {
        deskripsi: "Suka makanan apa kamu kah?",
        field: "string",
      },
    ],
  },
  { perintah: "masokk", deskripsi: "Suatu perintah untuk... masokk!" },
  { perintah: "pergi", deskripsi: "Suatu perintah untuk... pergi" },
];
