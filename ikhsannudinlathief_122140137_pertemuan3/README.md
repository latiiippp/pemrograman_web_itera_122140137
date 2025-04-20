### Aplikasi Manajemen Buku Pribadi
Aplikasi pengelola koleksi buku pribadi yang membantu untuk melacak buku yang dimiliki, sedang dibaca, atau ingin dibeli.

### Deploy Vercel
[Web Manajemen Buku Pribadi](https://ikhsannudinlathief122140137pertemuan3.vercel.app/)

### Deskripsi
Aplikasi ini memungkinkan pengguna untuk mengelola koleksi buku pribadi mereka dengan antarmuka yang intuitif dan responsif. Pengguna dapat menambahkan buku baru, mengedit entri yang sudah ada, menghapus buku, dan memfilter koleksi berdasarkan status berbeda.

### Fitur
- Menambahkan buku baru dengan judul, penulis, dan status (milik, sedang dibaca, ingin dibeli)
- Mengedit buku yang sudah ada untuk memperbarui informasi
- Menghapus buku dari koleksi
- Memfilter buku berdasarkan status kepemilikan
- Fitur pencarian untuk menemukan buku berdasarkan judul atau penulis
- Penyimpanan data menggunakan localStorage agar koleksi buku tetap tersimpan antar sesi
- Halaman statistik untuk melihat ringkasan koleksi Anda
### Instalasi dan Pengaturan
Ikuti langkah-langkah berikut untuk menjalankan aplikasi secara lokal:
```Git
# Clone repositori
git clone https://github.com/latiiippp/pemrograman_web_itera_122140137.git

# Masuk ke direktori proyek
cd ikhsannudinlathief_122140137_pertemuan3

# Instal dependensi
npm install

# Jalankan server pengembangan
npm start
```
Aplikasi akan terbuka di browser default Anda di alamat http://localhost:3000.
### Screenshots
![Halaman Utama](https://github.com/user-attachments/assets/941f28f8-4532-4069-b3f3-69f46974c374)
Halaman Utama Antarmuka utama yang menampilkan koleksi buku dengan opsi pencarian dan filter


![Halaman Utama](https://github.com/user-attachments/assets/9e465c47-0ea8-4429-87a6-3fa5caed2b4b)
Form Buku Formulir untuk menambahkan buku baru atau mengedit buku yang sudah ada


![Halaman Statistik](https://github.com/user-attachments/assets/b6a30ad0-109a-4cc7-ac78-3a34b1c793e7)
Halaman Statistik Ringkasan statistik koleksi buku Anda


### Teknologi yang Digunakan
Fitur React
- Komponen Fungsional: Semua komponen dibangun menggunakan komponen fungsional dengan React Hooks
- useState: Digunakan untuk manajemen state lokal komponen (mis. visibilitas form, input form)
- useEffect: Digunakan untuk efek samping seperti memuat data dari localStorage
- Context API: Diimplementasikan dengan useReducer untuk manajemen state global
- React Router: Untuk navigasi antar halaman
- Custom Hooks:
  - useLocalStorage untuk penyimpanan data persisten
  - useBookStats untuk menghitung statistik koleksi
  - PropTypes: Untuk pemeriksaan tipe prop komponen
Teknologi Lainnya
- Tailwind CSS: Untuk styling dan desain responsif
- localStorage API: Untuk persistensi data sisi klien
- React Testing Library: Untuk pengujian unit komponen
### Struktur Proyek
```Folder
src/
├── components/           # Komponen yang dapat digunakan kembali
│   ├── BookFilter/       # Fungsi pencarian dan filter
│   ├── BookForm/         # Formulir untuk menambah/mengedit buku
│   └── BookList/         # Tampilan koleksi buku
├── context/              # Manajemen state global
│   └── BookContext.js    # Context dan reducer untuk data buku
├── hooks/                # Custom React hooks
│   ├── useBookStats.js   # Perhitungan statistik
│   └── useLocalStorage.js # Hook penyimpanan persisten
├── pages/                # Halaman aplikasi
│   ├── Home/             # Antarmuka manajemen buku utama
│   └── Stats/            # Halaman statistik koleksi
└── App.js                # Komponen utama aplikasi
```
### Detail Implementasi Utama
- Manajemen State: Menggunakan Context API dengan useReducer untuk mengelola state aplikasi
- Persistensi Data: Semua data buku secara otomatis disimpan ke localStorage
- Validasi Formulir: Termasuk penanganan kesalahan untuk field yang wajib diisi
- Desain Responsif: Berfungsi dengan baik di perangkat mobile, tablet, dan desktop
- Pengujian: Termasuk pengujian unit untuk semua komponen dan fungsionalitas utama
### Menjalankan Pengujian
Untuk menjalankan pengujian unit:
```Git
npm test
```
