beratBadan = float(input("Masukkan berat badan Anda (kg): "))
tinggiBadan = float(input("Masukkan tinggi badan Anda (cm): "))

tinggiBadan = tinggiBadan / 100  # Konversi cm to m

bmi = beratBadan / (tinggiBadan * tinggiBadan)

if bmi < 18.5:
    status = "Berat badan kurang"
elif 18.5 <= bmi < 25:
    status = "Berat badan normal"
elif 25 <= bmi < 30:
    status = "Obesitas"

print(f"Berat badan Anda: {beratBadan} kg")
print(f"Tinggi badan Anda: {tinggiBadan} m")
print(f"Indeks massa tubuh Anda: {bmi:.2f}")
print(f"Status berat badan Anda: {status}")