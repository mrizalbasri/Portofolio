# 🎨 Cara Memasukkan Logo ke Portfolio

## 📋 **Langkah-Langkah:**

### **Step 1: Persiapkan File Logo**

1. **Export logo** Anda dari design tool (Canva, Figma, dll)
2. **Format yang disarankan**:
   - **SVG** ⭐ (recommended - scalable, file kecil)
   - **PNG** (dengan transparent background)
   - **WebP** (modern, file kecil)

3. **Ukuran**:
   - Minimal: 100x100px
   - Recommended: 200x200px atau 512x512px
   - Ratio: Square (1:1) untuk hasil terbaik

---

### **Step 2: Simpan Logo di Folder Public**

Copy file logo Anda ke:
```
d:\Coding\Portofolio\portofolio\public\logo.svg
```

atau

```
d:\Coding\Portofolio\portofolio\public\logo.png
```

**Struktur folder:**
```
portofolio/
├── public/
│   ├── logo.svg    ← Simpan di sini
│   └── logo.png    ← atau di sini
├── components/
└── app/
```

---

### **Step 3: Aktifkan Logo di Navigation**

Buka file: `components/Navigation.tsx`

**Cari bagian ini (sekitar line 41-48):**

```tsx
{/* Logo Image - Uncomment when you add logo.svg/png to public folder */}
{/* <Image 
  src="/logo.svg" 
  alt="Logo" 
  width={40} 
  height={40}
  className="w-10 h-10"
/> */}
```

**Hapus komentar `{/* */}` untuk mengaktifkan:**

```tsx
{/* Logo Image */}
<Image 
  src="/logo.svg" 
  alt="Logo" 
  width={40} 
  height={40}
  className="w-10 h-10"
/>
```

**Jika menggunakan PNG:**
```tsx
<Image 
  src="/logo.png" 
  alt="Logo" 
  width={40} 
  height={40}
  className="w-10 h-10"
/>
```

---

### **Step 4: Hapus Text Logo (Optional)**

Jika sudah pakai image logo, hapus text "Portfolio":

**Cari bagian ini (line 50-52):**
```tsx
{/* Text Logo - Remove this when using image logo */}
<span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
  Portfolio
</span>
```

**Hapus atau comment:**
```tsx
{/* <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
  Portfolio
</span> */}
```

---

## 🎨 **Rekomendasi Warna Logo:**

Berdasarkan color scheme website Anda (purple-blue-cyan):

### **Opsi 1: Gradient Purple-Blue** ⭐ (Recommended)
- **Warna 1**: `#8B5CF6` (Purple)
- **Warna 2**: `#3B82F6` (Blue)
- **Matching dengan**: Hero gradient, buttons

### **Opsi 2: Bright Cyan**
- **Warna**: `#22D3EE` (Cyan)
- **Matching dengan**: Accent colors

### **Opsi 3: White**
- **Warna**: `#FFFFFF` (White)
- **Clean & professional**

---

## ⚙️ **Customization:**

### Mengubah Ukuran Logo:

```tsx
<Image 
  src="/logo.svg" 
  alt="Logo" 
  width={50}    // Ubah ini
  height={50}   // dan ini
  className="w-12 h-12"  // atau ini (w-10 = 40px, w-12 = 48px, w-16 = 64px)
/>
```

### Menambahkan Text di Samping Logo:

```tsx
<motion.a
  href="#"
  whileHover={{ scale: 1.05 }}
  className="flex items-center gap-2"
>
  <Image 
    src="/logo.svg" 
    alt="Logo" 
    width={40} 
    height={40}
    className="w-10 h-10"
  />
  <span className="text-xl font-bold text-white">
    M. Rizal Basri
  </span>
</motion.a>
```

### Menambahkan Hover Effect:

```tsx
<Image 
  src="/logo.svg" 
  alt="Logo" 
  width={40} 
  height={40}
  className="w-10 h-10 transition-transform hover:rotate-12"
/>
```

---

## 🔧 **Troubleshooting:**

### Logo tidak muncul?
1. ✅ Pastikan file ada di `public/logo.svg` atau `public/logo.png`
2. ✅ Cek nama file (case-sensitive)
3. ✅ Refresh browser (Ctrl + Shift + R)
4. ✅ Cek console browser untuk error

### Logo terlalu besar/kecil?
- Ubah `width` dan `height` di component
- Atau ubah class `w-10 h-10` (w-8, w-12, w-16, dll)

### Logo blur/pixelated?
- Gunakan SVG untuk hasil terbaik
- Atau gunakan PNG dengan resolusi tinggi (minimal 200x200px)

---

## ✅ **Checklist:**

- [ ] Logo sudah di-export (SVG/PNG)
- [ ] Logo sudah disimpan di folder `public/`
- [ ] Uncomment code `<Image />` di Navigation.tsx
- [ ] Update `src="/logo.svg"` sesuai nama file
- [ ] Hapus/comment text "Portfolio" (optional)
- [ ] Test di browser

---

## 🎯 **Hasil Akhir:**

Setelah selesai, logo Anda akan muncul di:
- ✅ Navigation bar (kiri atas)
- ✅ Responsive di mobile & desktop
- ✅ Hover effect smooth
- ✅ Matching dengan design website

**Selamat! Logo Anda sudah terpasang! 🎉**
