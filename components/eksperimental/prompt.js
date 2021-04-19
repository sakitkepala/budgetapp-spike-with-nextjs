import bajet from "../../lib/api/bajet";

async function prompt(perintah) {
  /**
   * Step:
   * 1. memproses multi step prompt
   * 2. membuat request yang sebenarnya (misal, ke back end) pakai data
   *    yang sudah dilengkapi user lewat prompt sebelumnya
   *
   * Pemrosesan perintah prompt dimulai dengan membaca array dialog
   * lalu mencari item data pertama yang akan dipakai untuk menampilkan
   * dialog prompt untuk dijawab user.
   *
   * Item pertama yang diambil itu nilainya pasti masih null.
   *
   * Tapi sebagai perhatian, ada kondisi dimana field-nya boleh dikosingi,
   * atau tidak mandatory. Bagaimana caranya membedakan item yang field-nya
   * tidak required/boleh dikosongi ini dengan item yang ingin kita cari
   * sebenarnya?
   */

  const dialog = perintah.dialog.find(({ nilai }) => nilai === null);
  if (dialog) {
    return {
      dialog,
      pesan: "Perintah diproses. Menunggu prompt dialog...",
    };
  }

  // TODO: mengeksekusi perintah yang sebenarnya ketika semua dialog prompt sudah terpenuhi
  try {
    // contoh: bikin request request ke backend untuk update data bajet di database
    // const data = await fetch(...).then(res => res, error => throw new Error(error))
    // return data

    const data = perintah.dialog[0].nilai;

    // Simulasi request API
    const res = bajet.update({ nominal: data });

    return {
      data: res,
      pesan: "Perintah berhasil dijalankan.",
    };
  } catch (error) {
    return Promise.reject("GAGAL!!!");
  }
}

export { prompt };
