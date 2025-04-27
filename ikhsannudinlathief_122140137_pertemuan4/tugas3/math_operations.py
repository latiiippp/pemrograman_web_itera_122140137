PI = 3.14159

def persegi(sisi):
    luas = sisi * sisi
    keliling = 4 * sisi
    return luas, keliling

def persegi_panjang(panjang, lebar):
    luas = panjang * lebar
    keliling = 2 * (panjang + lebar)
    return luas, keliling

def lingkaran(jari_jari):
    luas = PI * jari_jari * jari_jari
    keliling = 2 * PI * jari_jari
    return luas, keliling

# Fungsi untuk konversi suhu
def celsius_to_fahrenheit(celsius):
    fahrenheit = (celsius * 9/5) + 32
    return fahrenheit

def celsius_to_kelvin(celsius):
    kelvin = celsius + 273.15
    return kelvin
