# =======================================================================================================
# Sistem Manajemen Perpustakaan
# Program ini menerapkan konsep OOP (Object-Oriented Programming) untuk membuat sistem perpustakaan
# sederhana dengan fitur pengelolaan buku dan majalah.
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


# Fungsi untuk menampilkan menu interaktif kepada pengguna
def display_menu():
    print("\n===== SISTEM MANAJEMEN PERPUSTAKAAN =====")
    print("1. Tampilkan Semua Item")
    print("2. Tambah Buku Baru")
    print("3. Tambah Majalah Baru")
    print("4. Cari Item berdasarkan ID")
    print("5. Cari Item berdasarkan Judul")
    print("6. Pinjam Item")
    print("7. Kembalikan Item")
    print("0. Keluar")
    print("========================================")


# Fungsi untuk memulai perpustakaan dengan data awal
def initialize_library():
    library = Library("ITERA")
    
    # Data awal untuk perpustakaan (seeder)
    initial_data = [
        Book("B001", "Python Programming", 2020, "John Smith", "978-1-2345-6789-0"),
        Book("B002", "Data Structures and Algorithms", 2019, "Jane Doe", "978-0-9876-5432-1"),
        Magazine("M001", "National Geographic", 2023, "Edisi Mei", "National Geographic Society")
    ]
    
    for item in initial_data:
        library.add_item(item)
    
    return library


# Fungsi untuk menambah buku baru melalui input pengguna
def add_book(library):
    print("\n--- TAMBAH BUKU BARU ---")
    try:
        item_id = input("Masukkan ID Buku (contoh: B003): ")
        title = input("Masukkan Judul Buku: ")
        year = int(input("Masukkan Tahun Terbit: "))
        author = input("Masukkan Nama Penulis: ")
        isbn = input("Masukkan ISBN: ")
        
        new_book = Book(item_id, title, year, author, isbn)
        if library.add_item(new_book):
            print(f"Buku '{title}' berhasil ditambahkan ke perpustakaan")
        
    except ValueError:
        print("Error: Format input tidak valid")


# Fungsi untuk menambah majalah baru melalui input pengguna
def add_magazine(library):
    print("\n--- TAMBAH MAJALAH BARU ---")
    try:
        item_id = input("Masukkan ID Majalah (contoh: M002): ")
        title = input("Masukkan Judul Majalah: ")
        year = int(input("Masukkan Tahun Terbit: "))
        issue_number = input("Masukkan Nomor Edisi: ")
        publisher = input("Masukkan Nama Penerbit: ")
        
        new_magazine = Magazine(item_id, title, year, issue_number, publisher)
        if library.add_item(new_magazine):
            print(f"Majalah '{title}' berhasil ditambahkan ke perpustakaan")
        
    except ValueError:
        print("Error: Format input tidak valid")


# Fungsi untuk mencari item berdasarkan ID
def search_by_id(library):
    item_id = input("\nMasukkan ID item yang ingin dicari: ")
    item = library.search_by_id(item_id)
    
    if item:
        print("\nItem ditemukan:")
        print(item.display_info())
    else:
        print(f"Item dengan ID '{item_id}' tidak ditemukan")


# Fungsi untuk mencari item berdasarkan kata kunci judul
def search_by_title(library):
    title = input("\nMasukkan kata kunci judul yang ingin dicari: ")
    results = library.search_by_title(title)
    
    if results:
        print(f"\nDitemukan {len(results)} item dengan kata kunci '{title}':")
        for item in results:
            print(item.display_info())
    else:
        print(f"Tidak ditemukan item dengan kata kunci '{title}'")


# Fungsi untuk memproses peminjaman item
def checkout_item(library):
    item_id = input("\nMasukkan ID item yang ingin dipinjam: ")
    item = library.search_by_id(item_id)
    
    if item:
        if item.is_available:
            item.check_out()
            print(f"Berhasil meminjam: {item.display_info()}")
        else:
            print(f"Item '{item.title}' sedang tidak tersedia (sudah dipinjam)")
    else:
        print(f"Item dengan ID '{item_id}' tidak ditemukan")


# Fungsi untuk memproses pengembalian item
def checkin_item(library):
    item_id = input("\nMasukkan ID item yang ingin dikembalikan: ")
    item = library.search_by_id(item_id)
    
    if item:
        if not item.is_available:
            item.check_in()
            print(f"Berhasil mengembalikan: {item.display_info()}")
        else:
            print(f"Item '{item.title}' tidak sedang dipinjam")
    else:
        print(f"Item dengan ID '{item_id}' tidak ditemukan")


# Fungsi utama yang menjalankan program secara keseluruhan
def main():
    # Inisialisasi perpustakaan
    library = initialize_library()
    print(f"Selamat datang di Sistem Manajemen Perpustakaan {library.name}!")
    
    # Loop utama program
    while True:
        display_menu()
        choice = input("Pilih menu (0-7): ")
        
        # Eksekusi fungsi sesuai dengan pilihan pengguna
        if choice == "1":
            print(library.display_items())
        elif choice == "2":
            add_book(library)
        elif choice == "3":
            add_magazine(library)
        elif choice == "4":
            search_by_id(library)
        elif choice == "5":
            search_by_title(library)
        elif choice == "6":
            checkout_item(library)
        elif choice == "7":
            checkin_item(library)
        elif choice == "0":
            print("\nTerima kasih telah menggunakan Sistem Manajemen Perpustakaan!")
            break
        else:
            print("\nPilihan tidak valid. Silakan coba lagi.")
            
        input("\nTekan Enter untuk melanjutkan...")


# Entry point program
if __name__ == "__main__":
    main()