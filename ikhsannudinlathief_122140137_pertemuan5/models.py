# =======================================================================================================
# File models.py - Berisi definisi kelas-kelas model
# File ini mendefinisikan kelas-kelas yang merepresentasikan struktur data program perpustakaan
# =======================================================================================================

from abc import ABC, abstractmethod

# Kelas abstrak sebagai dasar untuk semua item perpustakaan
# Menerapkan konsep abstraksi dalam OOP dimana kelas ini tidak dapat diinstansiasi langsung
class LibraryItem(ABC):
    def __init__(self, item_id, title, year_published):
        # Menggunakan protected attributes (_) untuk encapsulation
        self._item_id = item_id          # ID unik untuk item
        self._title = title              # Judul item
        self._year_published = year_published  # Tahun terbit
        self._is_available = True        # Status ketersediaan (bisa dipinjam atau tidak)

    # Implementasi property untuk mengakses atribut yang di-encapsulate
    # Memungkinkan akses ke atribut yang dilindungi tanpa mengubahnya secara langsung
    @property
    def title(self):
        return self._title
    
    @property
    def item_id(self):
        return self._item_id
    
    @property
    def is_available(self):
        return self._is_available
    
    # Setter untuk mengubah status ketersediaan item
    @is_available.setter
    def is_available(self, status):
        self._is_available = status
    
    # Method abstrak yang harus diimplementasikan oleh semua kelas turunan
    # Menerapkan konsep polymorphism melalui implementasi yang berbeda di setiap kelas turunan
    @abstractmethod
    def display_info(self):
        pass
    
    # Method untuk peminjaman item
    def check_out(self):
        if self._is_available:
            self._is_available = False
            return True
        return False
    
    # Method untuk pengembalian item
    def check_in(self):
        self._is_available = True
        return True


# Kelas untuk item buku, mewarisi dari LibraryItem
# Menerapkan konsep inheritance (pewarisan) dari kelas induk
class Book(LibraryItem):
    def __init__(self, item_id, title, year_published, author, isbn):
        # Memanggil konstruktor kelas induk
        super().__init__(item_id, title, year_published)
        self._author = author    # Penulis buku
        self._isbn = isbn        # Nomor ISBN buku
    
    # Implementasi method abstrak dari kelas induk
    # Contoh polymorphism: mengimplementasikan method dengan cara spesifik untuk buku
    def display_info(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        return f"Buku: {self._title} (ID: {self._item_id}) | Penulis: {self._author} | " \
               f"Tahun: {self._year_published} | ISBN: {self._isbn} | Status: {status}"


# Kelas untuk item majalah, mewarisi dari LibraryItem
# Implementasi kedua dari konsep inheritance
class Magazine(LibraryItem):
    def __init__(self, item_id, title, year_published, issue_number, publisher):
        # Memanggil konstruktor kelas induk
        super().__init__(item_id, title, year_published)
        self._issue_number = issue_number    # Nomor edisi majalah
        self._publisher = publisher          # Penerbit majalah
    
    # Implementasi method abstrak dari kelas induk
    # Contoh polymorphism: mengimplementasikan method dengan cara spesifik untuk majalah
    def display_info(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        return f"Majalah: {self._title} (ID: {self._item_id}) | Edisi: {self._issue_number} | " \
               f"Penerbit: {self._publisher} | Tahun: {self._year_published} | Status: {status}"


# Kelas untuk manajemen koleksi perpustakaan
# Menggunakan atribut private (__) untuk encapsulation yang lebih ketat
class Library:
    def __init__(self, name):
        self.__name = name        # Nama perpustakaan (private)
        self.__items = {}         # Dictionary untuk menyimpan semua item (private)
    
    # Property untuk mengakses nama perpustakaan
    @property
    def name(self):
        return self.__name
    
    # Method untuk menambah item baru ke perpustakaan dengan validasi
    def add_item(self, item):
        # Validasi: memastikan hanya objek turunan LibraryItem yang dapat ditambahkan
        if not isinstance(item, LibraryItem):
            print("Error: Hanya item perpustakaan yang dapat ditambahkan")
            return False
        
        # Validasi: memeriksa apakah ID sudah ada
        if item.item_id in self.__items:
            print(f"Error: Item dengan ID {item.item_id} sudah ada dalam perpustakaan")
            return False
        
        self.__items[item.item_id] = item
        return True
    
    # Method untuk menampilkan seluruh koleksi perpustakaan
    def display_items(self):
        if not self.__items:
            return "Perpustakaan kosong"
        
        result = f"Daftar Item di Perpustakaan {self.__name}:\n"
        for item in self.__items.values():
            result += f"{item.display_info()}\n"
        return result
    
    # Method untuk mencari item berdasarkan ID
    def search_by_id(self, item_id):
        item = self.__items.get(item_id)
        if item:
            return item
        return None
    
    # Method untuk mencari item berdasarkan judul (pencarian parsial)
    def search_by_title(self, title):
        results = []
        for item in self.__items.values():
            if title.lower() in item.title.lower():
                results.append(item)
        return results

    # Method untuk mendapatkan semua item dalam bentuk list
    def get_all_items(self):
        return list(self.__items.values())