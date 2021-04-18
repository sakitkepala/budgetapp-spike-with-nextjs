export default [
  {
    id: 1432,
    perintah: "bajet tambah",
    deskripsi: `Bajet: Menambahkan dana ke Bajet [bajet tambah]`,
    dialog: [
      {
        deskripsi: "Masukkan nominal Bajet yang ingin ditambahkan...",
        field: "nominal",
        type: "number",
        required: true,
        nilai: null,
      },
      {
        deskripsi: "Lagi, biar mantep...",
        field: "nominal",
        type: "number",
        required: false,
        nilai: null,
      },
      {
        deskripsi: "Lagi, biar mantep...",
        field: "nominal",
        type: "number",
        required: false,
        nilai: null,
      },
    ],
  },
  {
    id: 1433,
    perintah: "makan",
    deskripsi: "Suatu perintah untuk... makan",
    dialog: [
      {
        deskripsi: "Suka makanan apa kamu kah?",
        field: "string",
      },
    ],
  },
  { perintah: "masokk", deskripsi: "Suatu perintah untuk... masokk!" },
  { perintah: "pergi", deskripsi: "Suatu perintah untuk... pergi" },
];
