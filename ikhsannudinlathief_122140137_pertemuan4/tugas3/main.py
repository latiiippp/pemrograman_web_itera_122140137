import math_operations
from math_operations import celsius_to_fahrenheit, celsius_to_kelvin

# Persegi
sisi = 5
luas, keliling = math_operations.persegi(sisi)
print(f"Persegi (sisi={sisi})")
print(f"- Luas     : {luas:.2f}")
print(f"- Keliling : {keliling:.2f}")

# Persegi Panjang
p, l = 8, 4
luas, keliling = math_operations.persegi_panjang(p, l)
print(f"\nPersegi Panjang (p={p}, l={l})")
print(f"- Luas     : {luas:.2f}")
print(f"- Keliling : {keliling:.2f}")

# Lingkaran
jari_jari = 7
luas, keliling = math_operations.lingkaran(jari_jari)
print(f"\nLingkaran (r={jari_jari})")
print(f"- Luas     : {luas:.2f}")
print(f"- Keliling : {keliling:.2f}")

# Menggunakan fungsi konversi suhu dengan import cara 2
print("\n[KONVERSI SUHU]")
print("-" * 30)

# Beberapa contoh suhu dalam Celsius
suhu_celcius = [0, 25, 37, 100]

print(f"{'Celsius':<10}{'Fahrenheit':<15}{'Kelvin':<10}")
print("-" * 35)

for c in suhu_celcius:
    f = celsius_to_fahrenheit(c)
    k = celsius_to_kelvin(c)
    print(f"{c:<10.1f}{f:<15.1f}{k:<10.1f}")

print("\n" + "=" * 50)