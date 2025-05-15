# API Manajemen Mata Kuliah

## Deskripsi

API manajemen mata kuliah dibuat menggunakan framework Python Pyramid dan database PostgreSQL. API ini menyediakan layanan CRUD (Create, Read, Update, Delete) untuk manajemen data mata kuliah yang digunakan oleh program studi. Setiap mata kuliah memiliki kode, nama, jumlah SKS, dan informasi semester.

## Fitur

- Mendapatkan daftar seluruh mata kuliah
- Mendapatkan detail mata kuliah berdasarkan ID
- Menambahkan mata kuliah baru
- Mengupdate informasi mata kuliah yang sudah ada
- Menghapus mata kuliah

## Teknologi yang Digunakan

- **Framework**: Python Pyramid
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Migrasi Database**: Alembic
- **Authentication**: Basic Auth (opsional)

## Struktur Data

Model mata kuliah (`Matakuliah`) memiliki struktur sebagai berikut:

- `id`: Integer (Primary Key)
- `kode_mk`: Text (Unique, Not Null)
- `nama_mk`: Text (Not Null)
- `sks`: Integer (Not Null)
- `semester`: Integer (Not Null)

## Prasyarat

Sebelum menginstal dan menjalankan API, pastikan Anda memiliki:

1. Python 3.6 atau lebih baru
2. PostgreSQL 10 atau lebih baru
3. pip (Python package installer)
4. virtualenv (opsional, tapi direkomendasikan)

## Instalasi

Berikut adalah langkah-langkah untuk menginstal dan menjalankan API:

1. **Clone Repository** (jika menggunakan git)

   ```bash
   git clone <url-repository>
   cd ikhsannudinlathief_122140137_pertemuan6
   ```

2. **Buat dan Aktifkan Virtual Environment**

   ```bash
   # Windows
   python -m venv .venv
   .venv\Scripts\activate

   # Linux/Mac
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Instal Dependencies**

   ```bash
   cd manajemen_matakuliah
   pip install -e .
   ```

4. **Konfigurasi Database**

   Edit file `development.ini` dan sesuaikan URL database PostgreSQL:

   ```
   sqlalchemy.url = postgresql://username:password@localhost:5432/nama_database
   ```

5. **Inisialisasi Database dan Jalankan Migrasi**

   ```bash
   initialize_manajemen_matakuliah_db development.ini
   alembic -c development.ini upgrade head
   ```

6. **Jalankan Server Development**

   ```bash
   pserve development.ini --reload
   ```

   Server API akan berjalan di http://localhost:6543

## Penggunaan API

### Endpoints

#### 1. Mendapatkan Semua Mata Kuliah

- **URL**: `/api/matakuliah`
- **Method**: GET
- **Response**: List semua mata kuliah

#### 2. Mendapatkan Detail Mata Kuliah

- **URL**: `/api/matakuliah/{id}`
- **Method**: GET
- **Response**: Detail mata kuliah berdasarkan ID

#### 3. Menambahkan Mata Kuliah Baru

- **URL**: `/api/matakuliah`
- **Method**: POST
- **Body**:
  ```json
  {
    "kode_mk": "IF3030",
    "nama_mk": "Pemrograman Web",
    "sks": 3,
    "semester": 5
  }
  ```
- **Response**: Data mata kuliah yang berhasil ditambahkan

#### 4. Mengupdate Mata Kuliah

- **URL**: `/api/matakuliah/{id}`
- **Method**: PUT
- **Body**:
  ```json
  {
    "nama_mk": "Pemrograman Web Lanjut",
    "sks": 4
  }
  ```
- **Response**: Data mata kuliah yang berhasil diupdate

#### 5. Menghapus Mata Kuliah

- **URL**: `/api/matakuliah/{id}`
- **Method**: DELETE
- **Response**: Status sukses penghapusan

## Pengujian API

### Menggunakan Postman

1. Download dan install [Postman](https://www.postman.com/downloads/)
2. Impor koleksi API (jika tersedia) atau buat request baru
3. Set URL sesuai dengan endpoint yang diinginkan
4. Pilih method yang sesuai (GET, POST, PUT, DELETE)
5. Untuk POST dan PUT, tambahkan body request dalam format JSON
6. Klik "Send" untuk mengirim request

### Menggunakan cURL

Berikut contoh penggunaan cURL untuk mengakses API:

```bash
# GET semua mata kuliah
curl http://localhost:6543/api/matakuliah

# POST mata kuliah baru
curl -X POST -H "Content-Type: application/json" -d '{"kode_mk":"IF3031", "nama_mk":"Basis Data", "sks":3, "semester":4}' http://localhost:6543/api/matakuliah
```

## Troubleshooting

### Database Error

- Pastikan server PostgreSQL berjalan
- Pastikan kredensial database di `development.ini` benar
- Cek apakah tabel sudah dibuat dengan `alembic -c development.ini upgrade head`

### API Error

- Periksa log error di terminal server
- Pastikan format request sudah benar
- Validasi data yang dikirimkan sesuai dengan model

## Pengembangan Lebih Lanjut

Beberapa fitur yang dapat ditambahkan untuk pengembangan:

1. Autentikasi dan otorisasi
2. Validasi input yang lebih lengkap
3. Dokumentasi API dengan Swagger
4. Frontend untuk manajemen mata kuliah
5. Penambahan relasi ke model lain (seperti Dosen atau Mahasiswa)

## Kontributor

- Ikhsannudin Lathief (122140137)

## Lisensi

[MIT License](LICENSE)
