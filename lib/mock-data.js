const akunRes = {
  status: 200,
  ok: true,
  data: [
    {
      id: 1,
      nama: "Jenius",
      nominal: 1500000,
    },
    {
      id: 2,
      nama: "BCA",
      nominal: 1000000,
    },
    {
      id: 3,
      nama: "Tunai",
      nominal: 500000,
    },
  ],
};

const kategRes = {
  status: 200,
  ok: true,
  data: [
    {
      id: 1,
      nama: "Makan",
      nominal: 500000,
    },
    {
      id: 2,
      nama: "Transport",
      nominal: 1000000,
    },
  ],
};

function getKategDataById(id) {
  const data = kategRes.data.find((kat) => kat.id === id);
  console.log(data);
  return data;
}

const pengeluaranRes = {
  status: 200,
  ok: true,
  data: [
    {
      id: 1,
      kateg: getKategDataById(1),
      nama: "Makan siang",
      tanggal: "",
      biaya: 15000,
    },
    {
      id: 2,
      kateg: getKategDataById(2),
      nama: "Pertalite",
      tanggal: "",
      biaya: 22000,
    },
  ],
};

const budgetRes = {
  status: 200,
  ok: true,
  data: {
    nominal: getBudgetTotal(),
  },
};

function getBudgetTotal() {
  let total = akunRes.data.reduce((awal, item) => awal + item.nominal, 0);
  total -= kategRes.data.reduce((awal, item) => awal + item.nominal, 0);
  console.log(total);
  return total;
}

function getBudgetRes() {
  return budgetRes;
}

function getAkunRes() {
  return akunRes;
}

function getKategRes() {
  return kategRes;
}

function getPengeluaranRes() {
  return pengeluaranRes;
}

export default {
  kategoriPengeluaran: getKategRes(),
  akun: getAkunRes(),
  pengeluaran: getPengeluaranRes(),
  budget: getBudgetRes(),
};
