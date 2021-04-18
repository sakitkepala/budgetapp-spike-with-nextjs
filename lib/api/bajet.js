let ObjekData = {
  nominal: 0,
};

function read() {
  return ObjekData;
}

function readMenurutField(field) {
  return ObjekData[field];
}

function update(Value) {
  for (let field in Value) {
    if (!(field in ObjekData)) {
      throw new Error(`Bajet tidak mempunyai field ${field} ini.`);
    }
  }
  // Override data awal dengan Objek data yang baru
  ObjekData = { ...ObjekData, ...Value };
  return ObjekData;
}

export default { read, readMenurutField, update };
