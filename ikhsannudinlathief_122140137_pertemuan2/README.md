# ITERA Student Dashboard


## 📝 Deskripsi

Student Dashboard adalah aplikasi web yang membantu mahasiswa mengelola kegiatan akademik mereka secara efisien. Aplikasi ini dirancang untuk mempermudah mahasiswa dalam mengorganisir jadwal kuliah, mengingat tugas, menyimpan catatan, dan mengelola kalender akademik.

## ✨ Fitur Utama

- **Profil Pengguna**: Simpan dan edit informasi pengguna (nama, NIM, program studi)
- **Dashboard**: Tampilan ringkas untuk melihat semua informasi penting sekaligus
- **Jadwal Kuliah**: Kelola jadwal perkuliahan berdasarkan hari
- **Pengingat Tugas**: Buat daftar tugas dengan deadline dan status penyelesaian
- **Catatan Ringkas**: Simpan catatan penting untuk referensi cepat
- **Kalender Akademik**: Lacak ujian, tenggat waktu, dan acara penting lainnya

## 📸 Screenshots

### Dashboard Utama
![Dashboard](./screenshots/dashboard.png)

### Jadwal Kuliah
![Jadwal Kuliah](./screenshots/schedule.png)

### Pengingat Tugas
![Tugas](./screenshots/tasks.png)

### Catatan
![Catatan](./screenshots/notes.png)

### Kalender
![Kalender](./screenshots/calendar.png)

## 🔍 Implementasi Fitur ES6+

### 1. Penggunaan let dan const
```javascript
// const untuk nilai tetap
const taskManager = new TaskManager();
const eventsList = document.getElementById("eventsList");

// let untuk nilai yang berubah
let statusClass = isCompleted ? "border-green-300" : isOverdue ? "border-red-300" : "border-orange-300";
let timeLeftDisplay = "";
