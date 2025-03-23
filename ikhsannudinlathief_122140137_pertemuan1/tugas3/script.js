// Validasi Nama
function validateName(name) {
  if (name.length <= 3) {
    return "Nama harus lebih dari 3 karakter.";
  }
  return "";
}

// Validasi Email
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return "Email tidak valid.";
  }
  return "";
}

// Validasi Password
function validatePassword(password) {
  if (password.length < 8) {
    return "Password harus minimal 8 karakter.";
  }
  return "";
}

// Event Listener Input Real-time
const namaInput = document.getElementById("nama");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const hasilValidasi = document.getElementById("hasilValidasi");

namaInput.addEventListener("input", function () {
  const error = validateName(namaInput.value.trim());
  document.getElementById("namaError").textContent = error;
});

emailInput.addEventListener("input", function () {
  const error = validateEmail(emailInput.value.trim());
  document.getElementById("emailError").textContent = error;
});

passwordInput.addEventListener("input", function () {
  const error = validatePassword(passwordInput.value.trim());
  document.getElementById("passwordError").textContent = error;
});

// Saat Submit
document
  .getElementById("formPendaftaran")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = namaInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validasi semua
    const namaError = validateName(nama);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    document.getElementById("namaError").textContent = namaError;
    document.getElementById("emailError").textContent = emailError;
    document.getElementById("passwordError").textContent = passwordError;

    hasilValidasi.innerHTML = "";

    if (!namaError && !emailError && !passwordError) {
      hasilValidasi.innerHTML = `<p class="text-green-600 font-medium">✅ Data yang anda masukkan valid!</p>`;
    }
  });
