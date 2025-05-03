# =======================================================================================================
# File ui.py - Berisi fungsi-fungsi untuk antarmuka pengguna
# File ini berisi semua fungsi yang berhubungan dengan interaksi pengguna dan tampilan
# =======================================================================================================

from models import Book, Magazine

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