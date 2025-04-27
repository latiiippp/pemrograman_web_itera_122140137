import math_operations
from math_operations import celsius_to_fahrenheit, celsius_to_kelvin

# Persegi
print("Hitung Persegi")
sisi = float(input("Masukkan panjang sisi persegi: "))
luas, keliling = math_operations.persegi(sisi)
print(f"Persegi (sisi={sisi})")
print(f"- Luas     : {luas:.2f}")
print(f"- Keliling : {keliling:.2f}")

# Persegi Panjang
print("\nHitung Persegi Panjang")
p = float(input("Masukkan panjang: "))
l = float(input("Masukkan lebar: "))
luas, keliling = math_operations.persegi_panjang(p, l)
print(f"\nPersegi Panjang (p={p}, l={l})")
print(f"- Luas     : {luas:.2f}")
print(f"- Keliling : {keliling:.2f}")

# Lingkaran
print("\nHitung Lingkaran")
jari_jari = float(input("Masukkan jari-jari lingkaran: "))
luas, keliling = math_operations.lingkaran(jari_jari)
print(f"\nLingkaran (r={jari_jari})")
print(f"- Luas     : {luas:.2f}")
print(f"- Keliling : {keliling:.2f}")

# Menggunakan fungsi konversi suhu dengan input
print("\n[KONVERSI SUHU]")
print("-" * 30)

# Input suhu dalam Celsius
suhu_celcius = []
jumlah_suhu = int(input("Berapa banyak suhu celcius yang ingin dikonversi? "))
for i in range(jumlah_suhu):
    suhu = float(input(f"Masukkan suhu ke-{i + 1} dalam Celsius: "))
    suhu_celcius.append(suhu)

print(f"\n{'Celsius':<10}{'Fahrenheit':<15}{'Kelvin':<10}")
print("-" * 35)

for c in suhu_celcius:
    f = celsius_to_fahrenheit(c)
    k = celsius_to_kelvin(c)
    print(f"{c:<10.1f}{f:<15.1f}{k:<10.1f}")

print("\n" + "=" * 50)