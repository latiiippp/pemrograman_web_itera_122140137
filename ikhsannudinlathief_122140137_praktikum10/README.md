# Sistem Manajemen Perpustakaan

## Deskripsi

Proyek ini adalah implementasi sederhana dari sistem manajemen perpustakaan menggunakan Python dengan menerapkan konsep-konsep Object-Oriented Programming (OOP). Sistem ini memungkinkan pengguna untuk mengelola koleksi buku dan majalah, melakukan pencarian, serta proses peminjaman dan pengembalian item.

## Konsep OOP yang Diterapkan

### 1. Abstraksi (Abstraction)

Abstraksi diterapkan melalui kelas abstrak `LibraryItem` yang berfungsi sebagai blueprint untuk semua jenis item perpustakaan:

```python
class LibraryItem(ABC):
    # ...
    @abstractmethod
    def display_info(self):
        pass
```

Kelas ini mendefinisikan struktur dasar dan method yang harus diimplementasikan oleh kelas turunannya, namun tidak dapat diinstansiasi langsung.

### 2. Inheritance (Pewarisan)

Konsep inheritance diterapkan dengan kelas Book dan Magazine yang mewarisi atribut dan method dari kelas induk LibraryItem:

```python
class Book(LibraryItem):
    # Mewarisi fungsi-fungsi dari LibraryItem
    # Menambahkan atribut khusus buku (author, isbn)
```

```python
class Magazine(LibraryItem):
    # Mewarisi fungsi-fungsi dari LibraryItem
    # Menambahkan atribut khusus majalah (issue_number, publisher)
```

Kedua kelas tersebut memperoleh semua properti dan method dari kelas induk, serta dapat menambahkan atau mengubah fungsionalitas yang diperlukan.

### 3. Encapsulation (Enkapsulasi)

Encapsulation diterapkan melalui penggunaan akses modifier untuk melindungi data:

- Protected Attributes (\_): Digunakan pada atribut di kelas LibraryItem

```python
self._item_id = item_id
self._title = title
self._is_available = True
```

- Private Attributes (\_\_): Digunakan pada atribut di kelas Library

```python
self.__name = name
self.__items = {}
```

- Property Decorators: Memberikan akses terkontrol ke atribut yang dilindungi

```python
@property
def is_available(self):
    return self._is_available

@is_available.setter
def is_available(self, status):
    self._is_available = status
```

### 4. Polymorphism (Polimorfisme)

Polimorfisme ditunjukkan melalui implementasi method display_info() yang berbeda pada kelas turunan:

```python
# Implementasi di kelas Book
def display_info(self):
    status = "Tersedia" if self.is_available else "Dipinjam"
    return f"Buku: {self._title} (ID: {self._item_id}) | Penulis: {self._author} | " \
           f"Tahun: {self._year_published} | ISBN: {self._isbn} | Status: {status}"

# Implementasi di kelas Magazine
def display_info(self):
    status = "Tersedia" if self.is_available else "Dipinjam"
    return f"Majalah: {self._title} (ID: {self._item_id}) | Edisi: {self._issue_number} | " \
           f"Penerbit: {self._publisher} | Tahun: {self._year_published} | Status: {status}"
```

Meskipun method memiliki nama yang sama, implementasinya berbeda sesuai dengan jenis item.

## Struktur Program

- LibraryItem (Abstract Class): Blueprint dasar untuk semua item
- Book: Kelas untuk mengelola buku
- Magazine: Kelas untuk mengelola majalah
- Library: Kelas untuk mengelola koleksi item perpustakaan

## Fitur Program

1. Menampilkan seluruh koleksi perpustakaan
2. Menambahkan buku baru
3. Menambahkan majalah baru
4. Pencarian item berdasarkan ID
5. Pencarian item berdasarkan judul (pencarian parsial)
6. Proses peminjaman item
7. Proses pengembalian item

## Cara Menjalankan Program

1. Pastikan Python sudah terinstall di komputer Anda
2. Clone repository dengan menjalankan perintah berikut

```git
git clone https://github.com/latiiippp/pemrograman_web_itera_122140137.git
```

3. Jalankan perintah berikut melalui terminal

```git
cd ikhsannudinlathief_122140137_praktikum10
```

4. Jalankan file manajemen_perpustakaan.py melalui terminal

```git
python manajemen_perpustakaan.py
```

5. Ikuti menu interaktif yang ditampilkan
