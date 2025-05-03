# =======================================================================================================
# Sistem Manajemen Perpustakaan
# Program ini menerapkan konsep OOP (Object-Oriented Programming) untuk membuat sistem perpustakaan
# sederhana dengan fitur pengelolaan buku dan majalah.
# =======================================================================================================

from utils import initialize_library
from ui import (
    display_menu, add_book, add_magazine, search_by_id, 
    search_by_title, checkout_item, checkin_item
)

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