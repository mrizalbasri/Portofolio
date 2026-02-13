# Livewire Security Blog Images

Folder ini berisi gambar-gambar untuk blog post tentang CVE-2025-54068.

## Required Images:

1. **cve-banner.webp** - Banner utama blog
   - Screenshot dari GitHub Advisory Database menampilkan CVE-2025-54068
   - Menampilkan: Judul vulnerability, severity (Critical 9.2/10), affected versions, patched versions
   - Recommended size: 1200x630px atau gunakan screenshot asli dari GitHub Advisory
   - Referensi: https://github.com/advisories/GHSA-28cq-5w36-x7w3
   - Caption: "Detail kerentanan CVE-2025-54068 pada GitHub Advisory Database menunjukkan severity Critical dengan skor CVSS 9.2"

2. **threat-model.webp** - Diagram model ancaman
   - Visualisasi alur serangan dari threat ke asset
   - Diagram flow yang menunjukkan:
     ```
     External Unauthenticated Attacker
            ↓
     Malicious Payload via Property Update
            ↓
     Hydration Mechanism Flaw (CVE-2025-54068)
            ↓
     Remote Command Execution (RCE)
            ↓
     Complete Server Takeover
            ↓
     IT Assets Compromised (Server, Database, Credentials)
     ```
   - Bisa dibuat dengan tools: draw.io, Figma, Canva, atau Excalidraw
   - Recommended size: 1200x800px
   - Caption: "Diagram alur ancaman dari External Attacker hingga kompromi IT Asset melalui eksploitasi kerentanan hydration pada Livewire v3"

3. **impact-analysis.webp** - CVSS Metrics dan Impact Analysis
   - Screenshot dari bagian CVSS metrics di GitHub Advisory atau NVD
   - Menampilkan:
     * CVSS v4 Base Metrics
     * Attack Vector: Network
     * Attack Complexity: High
     * Privileges Required: None
     * User Interaction: None
     * Confidentiality Impact: High
     * Integrity Impact: High
     * Availability Impact: High
     * EPSS Score: 22.039%
   - Atau buat infografis CIA Triad dengan detail metrics
   - Recommended size: 1200x800px
   - Caption: "CVSS v4 Base Metrics menunjukkan Attack Vector: Network, Attack Complexity: High, dengan dampak Confidentiality, Integrity, dan Availability semuanya HIGH"

## Sumber Referensi Gambar:

### Untuk cve-banner.webp:
- GitHub Advisory: https://github.com/advisories/GHSA-28cq-5w36-x7w3
- NVD Database: https://nvd.nist.gov/vuln/detail/CVE-2025-54068
- Laravel News: https://laravel-news.com/livewire-security-vulnerability

### Untuk threat-model.webp:
Buat diagram sendiri menggunakan:
- Draw.io (https://app.diagrams.net/)
- Excalidraw (https://excalidraw.com/)
- Figma (https://figma.com)
- Canva (https://canva.com)

Template diagram:
```
┌─────────────────────────────────┐
│  External Attacker              │
│  (Unauthenticated)              │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Malicious Payload              │
│  (Property Update Request)      │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Security Vulnerability         │
│  (Hydration Mechanism Flaw)     │
│  CVE-2025-54068                 │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Remote Command Execution       │
│  (RCE)                          │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  IT Assets Compromised          │
│  • Production Server            │
│  • Database                     │
│  • Credentials & API Keys       │
│  • Source Code                  │
└─────────────────────────────────┘
```

### Untuk impact-analysis.webp:
- Screenshot dari section CVSS Metrics di GitHub Advisory
- Atau screenshot dari NVD yang menampilkan CVSS calculator
- Atau buat infografis sendiri dengan data CVSS metrics

## Tips:

- Gunakan format WebP untuk optimasi ukuran file
- Pastikan gambar memiliki kontras yang baik untuk dark theme
- Tambahkan watermark atau credit jika menggunakan gambar dari sumber lain
