function hitungKalkulator(angka1, angka2, operasi) {
  let hasil = 0;
  switch (operasi) {
    case "tambah":
      hasil = angka1 + angka2;
      break;
    case "kurang":
      hasil = angka1 - angka2;
      break;
    case "kali":
      hasil = angka1 * angka2;
      break;
    case "bagi":
      if (angka2 === 0) {
        return "Error: pembagian dengan nol tidak boleh";
      }
      hasil = angka1 / angka2;
      break;
    case "pangkat":
      hasil = Math.pow(angka1, angka2);
      break;
    case "akar":
      hasil = Math.pow(angka1, 1 / angka2);
      break;
    case "modulo":
      hasil = angka1 % angka2;
      break;
    default:
      return "Operasi tidak valid";
  }
  return hasil;
}

const buttons = [
  { id: "btn-tambah", operasi: "tambah", simbol: "+" },
  { id: "btn-kurang", operasi: "kurang", simbol: "-" },
  { id: "btn-kali", operasi: "kali", simbol: "*" },
  { id: "btn-bagi", operasi: "bagi", simbol: "/" },
  { id: "btn-pangkat", operasi: "pangkat", simbol: "^" },
  { id: "btn-akar-kuadrat", operasi: "akar", simbol: "√" },
  { id: "btn-modulo", operasi: "modulo", simbol: "%" },
];

buttons.forEach((btn) => {
  document.getElementById(btn.id).addEventListener("click", function () {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);

    if (isNaN(angka1) || isNaN(angka2)) {
      document.getElementById("hasil-kalkulator").innerHTML = `
        <p class="text-red-500">Masukkan angka yang valid!</p>
      `;
    } else {
      const hasil = hitungKalkulator(angka1, angka2, btn.operasi);
      document.getElementById("hasil-kalkulator").innerHTML = `
        <p>Hasil: ${angka1} ${btn.simbol} ${angka2} = <span class="text-blue-600">${hasil}</span></p>
      `;
    }
  });
});
