# =======================================================================================================
# File utils.py - Berisi fungsi-fungsi utilitas
# File ini berisi fungsi-fungsi pembantu yang digunakan dalam program
# =======================================================================================================

from models import Book, Magazine, Library

# Fungsi untuk memulai perpustakaan dengan data awal
def initialize_library():
    library = Library("ITERA")
    
    # Data awal untuk perpustakaan (seeder)
    initial_data = [
        Book("B001", "Filosofi Teras", 2020, "Saya sendiri", "1234-5678-9101"),
        Book("B002", "Filosofi Atap", 2019, "Jane Doe", "1234-5678-9102"),
        Magazine("M001", "Gaya Rambut Anak Jaksel", 2023, "Edisi Mei", "Jaksel Press"),
    ]
    
    for item in initial_data:
        library.add_item(item)
    
    return library