# MyCVBuilder

🧑‍💻 Professional CV yaratish platformasi - real-time preview, dark mode va PDF export bilan.

**Dasturchi:** [Musayev Doniyor](https://github.com/doniyor-musayev)

## ✨ Xususiyatlar

- ✅ **6 ta shablon** - Classic, Modern, Minimal, Creative, Professional, Elegant
- ✅ **Real-time preview** - Har bir o'zgarish darhol ko'rsatiladi
- ✅ **Full-screen preview** - To'liq ekran CV ko'rish
- ✅ **Dark/Light mode** - To'liq dark mode qo'llab-quvvatlash
- ✅ **PDF export** - Yuqori sifatli PDF yaratish
- ✅ **Responsive dizayn** - Mobil va desktop uchun moslashgan
- ✅ **LocalStorage** - Ma'lumotlar brauzerda saqlanadi
- ✅ **O'zbek tili** - To'liq o'zbek tilida interfeys
- ✅ **Zamonaviy UI** - Chiroyli animatsiyalar va dizayn
- ✅ **7 ta ko'nikma kategoriyasi** - Frontend, Backend, Mobile, Database, DevOps, Design, Others
- ✅ **Edit functionality** - Barcha ma'lumotlarni tahrirlash
- ✅ **Reusable components** - AddButton, EditButton komponentlari
- ✅ **Accessibility** - WCAG 2.1 standartlariga mos
- ✅ **PWA support** - Progressive Web App
- ✅ **SEO optimized** - Search Engine Optimization
- ✅ **Professional logo** - SVG formatda

## 🛠 Texnologiyalar

- **React 18** + **TypeScript** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS v3** - Styling va responsive design
- **Zustand** - State management
- **jsPDF** + **html2canvas** - Yuqori sifatli PDF export
- **Lucide React** - Icons
- **Google Fonts** - Inter, Poppins, JetBrains Mono

## 🚀 O'rnatish va ishga tushirish

```bash
# Dependencelarni o'rnatish
npm install

# Development serverini ishga tushirish
npm run dev

# Production build
npm run build

# Build preview
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📁 Loyiha strukturasi

```
src/
├── components/
│   ├── FormSections/          # CV form bo'limlari
│   │   ├── PersonalInfoSection.tsx
│   │   ├── AboutMeSection.tsx
│   │   ├── SocialsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── WorkExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── LanguagesSection.tsx
│   │   └── CertificatesSection.tsx
│   ├── CVPreview/             # CV preview shablonlari
│   │   ├── CVPreview.tsx
│   │   ├── ClassicTemplate.tsx
│   │   ├── ModernTemplate.tsx
│   │   ├── MinimalTemplate.tsx
│   │   ├── CreativeTemplate.tsx
│   │   ├── ProfessionalTemplate.tsx
│   │   └── ElegantTemplate.tsx
│   ├── Accessibility/         # Accessibility komponentlari
│   │   ├── SkipToContent.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── LoadingSpinner.tsx
│   ├── AddButton.tsx          # Reusable add button
│   ├── EditButton.tsx         # Reusable edit button
│   ├── TemplateSelector.tsx   # Shablon tanlash
│   └── DownloadButton.tsx     # PDF yuklab olish
├── hooks/
│   └── useFormData.ts         # Zustand store
├── pages/
│   └── Home.tsx               # Asosiy sahifa
├── types/
│   ├── index.ts               # TypeScript tiplari
│   └── html2pdf.d.ts          # html2pdf.js tiplari
└── index.css                  # Tailwind CSS + custom styles
```

## 🎨 Shablonlar

### Classic

- Oddiy, professional dizayn
- To'liq ma'lumotlar ko'rsatiladi
- Rangli elementlar
- Dark mode qo'llab-quvvatlash

### Modern

- Card-based zamonaviy dizayn
- Gradient va shadowlar
- Kategoriyalarga ajratilgan
- To'liq dark mode

### Minimal

- Qora-oq oddiy dizayn
- Faqat asosiy ma'lumotlar
- Toza va professional
- Dark mode uchun moslashgan

### Creative

- Rangli va zamonaviy dizayn
- Gradient header
- Card-based layout
- Dark mode qo'llab-quvvatlash

### Professional

- Biznes uchun mos
- Formal va professional
- Clean design
- Dark mode uchun moslashgan

### Elegant

- Nafis va chiroyli
- Modern typography
- Sophisticated layout
- Dark mode qo'llab-quvvatlash

## 📝 CV bo'limlari

1. **Shaxsiy ma'lumotlar** - Ism, lavozim, kontakt ma'lumotlari, profil rasm
2. **O'zim haqida** - Qisqacha ma'lumot (max 700 belgi)
3. **Ijtimoiy tarmoqlar** - LinkedIn, GitHub, Website, Telegram username
4. **Ko'nikmalar** - 7 kategoriya: Frontend, Backend, Mobile, Database, DevOps, Design, Others
5. **Loyihalar** - Nomi, tavsif, texnologiyalar, havolalar
6. **Ish tajribasi** - Lavozim, kompaniya, sanalar, vazifalar
7. **Ta'lim** - O'quv yurti, yo'nalish, daraja
8. **Tillar** - Til nomi va darajasi (Beginner, Intermediate, Advanced, Fluent)
9. **Sertifikatlar** - Nomi, beruvchi, yil, havola

## 🔧 Xususiyatlar

### 🎯 Asosiy funksiyalar

- **Real-time preview** - Har bir o'zgarish darhol ko'rsatiladi
- **Full-screen preview** - To'liq ekran CV ko'rish rejimi
- **Dark/Light mode** - To'liq dark mode qo'llab-quvvatlash
- **LocalStorage** - Ma'lumotlar brauzerda saqlanadi
- **PDF export** - Yuqori sifatli PDF yaratish

### ✏️ Edit funksiyalari

- **Inline editing** - Skills uchun inline tahrirlash
- **Form editing** - Loyihalar, tajriba, ta'lim, sertifikatlar uchun form tahrirlash
- **Reusable components** - AddButton va EditButton komponentlari
- **Consistent UI** - Barcha joyda bir xil ko'rinish

### 🎨 UI/UX

- **Responsive** - Mobil va desktop uchun moslashgan
- **TypeScript** - Type safety
- **O'zbek tili** - To'liq o'zbek tilida interfeys
- **Animatsiyalar** - Smooth transitions va hover effects
- **Gradient design** - Zamonaviy gradient elementlar
- **Font system** - Inter, Poppins, JetBrains Mono

### ♿ Accessibility

- **WCAG 2.1 AA** standartlariga mos
- **Screen reader** qo'llab-quvvatlash
- **Keyboard navigation** - Tab, Enter, Escape
- **Skip to content** - Tezkor o'tish
- **ARIA labels** - Accessibility attributelari
- **Focus management** - To'g'ri fokus boshqaruvi
- **Color contrast** - Yuqori kontrast
- **Semantic HTML** - Ma'no beruvchi HTML

### 🔍 SEO Features

- **Meta tags** - Title, description, keywords
- **Open Graph** - Facebook, Twitter sharing
- **Structured data** - JSON-LD schema
- **Sitemap** - XML sitemap
- **Robots.txt** - Search engine guidance
- **Performance** - Fast loading
- **Mobile-friendly** - Mobile-first design

## 🎯 Ko'nikma kategoriyalari

- **Frontend** - React, Vue, Angular, HTML, CSS, JavaScript
- **Backend** - Node.js, Python, Java, PHP, .NET
- **Mobile** - React Native, Flutter, Swift, Kotlin
- **Database** - PostgreSQL, MySQL, MongoDB, Redis
- **DevOps** - Docker, Kubernetes, AWS, CI/CD
- **Design** - Figma, Adobe XD, Photoshop, Illustrator
- **Others** - Git, Linux, Testing, Agile

## 🌙 Dark Mode

- **To'liq qo'llab-quvvatlash** - Barcha komponentlar dark mode uchun moslashgan
- **Theme toggle** - Light/Dark/System rejimlari
- **Persistent** - Tanlangan tema saqlanadi
- **Smooth transitions** - Tema o'zgarishida animatsiyalar
- **Consistent colors** - Barcha ranglar dark mode uchun optimallashtirilgan

## 📱 Full-Screen Preview

- **Toggle button** - Form va preview o'rtasida almashish
- **Responsive** - Barcha ekran o'lchamlarida ishlaydi
- **Template selector** - Preview rejimida ham shablon o'zgartirish
- **Optimized layout** - To'liq ekran uchun maxsus dizayn

## 🚀 Keyingi qo'shimchalar

- [ ] CV JSON export/import
- [ ] Ko'proq shablonlar
- [ ] Drag-n-drop reorder
- [ ] CV QR-code
- [ ] Auth system
- [ ] Cloud storage
- [ ] Template customization
- [ ] Multiple CVs
- [ ] CV sharing
- [ ] Analytics
- [ ] Multi-language support
- [ ] Advanced PDF options
- [ ] CV templates marketplace
- [ ] Real-time collaboration
- [ ] AI-powered suggestions

## 📄 Litsenziya

MIT License

## 🤝 Hissa qo'shish

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/amazing-feature`)
3. Commit qiling (`git commit -m 'Add amazing feature'`)
4. Push qiling (`git push origin feature/amazing-feature`)
5. Pull Request yarating

## 👨‍💻 Dasturchi

**Musayev Doniyor** - Fullstack Developer

- 🌍 O'zbekiston
- 💻 React, Next, Node.js, TypeScript, JavaScript, Nest, Express
- 📧 [GitHub](https://github.com/doniyor-musayev)
- ❤️ Made with love in Uzbekistan

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized
- **Bundle Size**: < 500KB gzipped
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Dark Mode**: Instant switching
- **Full-Screen Preview**: Smooth transitions

---

**MyCVBuilder** - Professional CV yaratish uchun eng yaxshi platforma! 🎯

_Made with love in Uzbekistan_ ❤️
