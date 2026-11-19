# BPVN – Website Development Guide

## 1. Project Overview

**Project:** Bioprocess Vietnam (BPVN)  
**Framework:** Astro  
**Rendering:** Static Site Generation (SSG)  
**Styling:** Vanilla CSS  
**JavaScript:** Minimal, ưu tiên HTML và CSS native.

Website được xây dựng với mục tiêu:
- Hiệu năng tải trang nhanh.
- Responsive trên desktop, tablet và mobile.
- SEO-friendly.
- Cấu trúc code rõ ràng, dễ bảo trì và mở rộng.
- Tái sử dụng component hợp lý.
- Hạn chế JavaScript phía client.
- Không sử dụng UI framework như React, Vue hoặc Tailwind CSS.

---

## 2. Project Structure

Cấu trúc thư mục định hướng:

```text
bpvn/
│
├── public/
│   ├── fonts/
│   │   └── noto-sans/
│   │
│   ├── images/
│   │
│   └── logos/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── content/
│   │
│   ├── layouts/
│   │
│   ├── pages/
│   │
│   └── styles/
│       │
│       ├── components/
│       │
│       ├── animations.css
│       ├── base.css
│       ├── fonts.css
│       ├── global.css
│       ├── layout.css
│       ├── reset.css
│       ├── tokens.css
│       └── utilities.css
│
├── astro.config.mjs
├── package.json
└── README.md
```

### 2.1. `public/`

Chứa các tài nguyên tĩnh được phục vụ trực tiếp mà không qua quá trình xử lý của Astro.

- `fonts/`: Font chữ self-host, định dạng WOFF2.
- `images/`: Hình ảnh tĩnh cần giữ nguyên đường dẫn.
- `logos/`: Logo BPVN và các phiên bản logo.

Các file trong `public/` được truy cập bằng đường dẫn từ root website.

Ví dụ:

```css
src: url("/fonts/noto-sans/noto-sans-regular.woff2");
```

### 2.2. `src/assets/`

Chứa hình ảnh và tài nguyên cần được Astro xử lý, tối ưu hoặc quản lý thông qua hệ thống asset.

Ưu tiên sử dụng `astro:assets` cho hình ảnh nội dung cần tối ưu kích thước và định dạng.

### 2.3. `src/components/`

Chứa các Astro components có thể tái sử dụng trên nhiều trang.

Ví dụ:

```text
components/
├── common/
│   ├── Button.astro
│   ├── Badge.astro
│   └── Container.astro
│
├── layout/
│   ├── Header.astro
│   ├── Footer.astro
│   └── Navigation.astro
│
├── product/
│   ├── ProductCard.astro
│   └── ProductGrid.astro
│
└── sections/
    ├── Hero.astro
    └── SectionHeading.astro
```

Quy tắc:
- Mỗi component đảm nhiệm một chức năng rõ ràng.
- Ưu tiên component nhỏ, dễ tái sử dụng.
- Sử dụng Props để truyền dữ liệu.
- Không tạo component chỉ để bọc một phần tử HTML đơn giản nếu không có lợi ích thực tế.
- Hạn chế JavaScript phía client.

### 2.4. `src/content/`

Quản lý dữ liệu nội dung thông qua Astro Content Collections.

Các nhóm nội dung dự kiến:

```text
content/
├── config.ts
│
├── products/
│
├── brands/
│
├── solutions/
│
└── news/
```

Mục đích:

- `products/`: Thông tin sản phẩm.
- `brands/`: Thông tin hãng sản xuất.
- `solutions/`: Các giải pháp công nghệ.
- `news/`: Tin tức và bài viết.

Sử dụng schema để kiểm tra cấu trúc dữ liệu và đảm bảo tính nhất quán.

### 2.5. `src/layouts/`

Chứa các layout dùng chung cho các trang.

Ví dụ:

```text
layouts/
├── MainLayout.astro
└── ArticleLayout.astro
```

`MainLayout.astro` chịu trách nhiệm về:
- HTML document structure.
- SEO metadata.
- Global CSS.
- Header và Footer.
- Các thành phần dùng chung toàn website.

### 2.6. `src/pages/`

Quản lý routing theo cơ chế file-based routing của Astro.

Cấu trúc dự kiến:

```text
pages/
├── index.astro
│
├── products/
│   ├── index.astro
│   └── [slug].astro
│
├── brands/
│   ├── index.astro
│   └── [slug].astro
│
├── solutions/
│   ├── index.astro
│   └── [slug].astro
│
├── news/
│   ├── index.astro
│   └── [slug].astro
│
├── about.astro
└── contact.astro
```

Các trang chi tiết sử dụng `getStaticPaths()` khi cần tạo static routes từ Content Collections.

---

## 3. CSS Architecture

Toàn bộ CSS dùng chung được quản lý tại:

```text
src/styles/
```

### 3.1. File responsibilities

| File | Responsibility |
|---|---|
| `tokens.css` | Design tokens: màu sắc, typography, spacing, radius, shadow... |
| `reset.css` | Reset và chuẩn hóa CSS mặc định của trình duyệt. |
| `fonts.css` | Khai báo font self-host bằng `@font-face`. |
| `base.css` | HTML, body, headings, links, buttons, forms... |
| `layout.css` | Container, section, grid, flex và bố cục chung. |
| `utilities.css` | Các utility classes dùng chung. |
| `animations.css` | Transition, animation và hiệu ứng. |
| `global.css` | Điều phối import và cascade layers. |

Thư mục `styles/components/` dành cho CSS dùng chung của các component khi thực sự cần thiết.

### 3.2. CSS cascade layers

Sử dụng CSS Cascade Layers để kiểm soát thứ tự ưu tiên:

```css
@layer reset, tokens, base, layout, components, pages, utilities;
```

Nguyên tắc:
- `reset`: Chuẩn hóa trình duyệt.
- `tokens`: Khai báo design tokens.
- `base`: Quy tắc nền tảng.
- `layout`: Bố cục chung.
- `components`: Thành phần giao diện.
- `pages`: Quy tắc riêng cho từng trang.
- `utilities`: Các class tiện ích.

`fonts.css` được import riêng, không gắn vào layer, để các khai báo `@font-face` độc lập.

### 3.3. Component styles

Ưu tiên sử dụng scoped `<style>` trong các file `.astro` khi CSS chỉ phục vụ một component.

Ví dụ:

```astro
<section class="product-card">
  <h3>Product name</h3>
</section>

<style>
  .product-card {
    padding: 1.5rem;
    border-radius: 1rem;
  }
</style>
```

Chỉ đưa CSS vào `styles/components/` khi cần chia sẻ giữa nhiều component.

Không tạo quá nhiều utility classes hoặc CSS abstraction không cần thiết.

---

## 4. Design System

### 4.1. Color Palette

Màu sắc chính của BPVN:

| Token | Value | Purpose |
|---|---|---|
| Primary | `#200291` | Màu thương hiệu chính |
| Primary Hover | `#16006B` | Trạng thái hover |
| Primary Active | `#120052` | Trạng thái active |
| Primary Light | `#4F3AB5` | Màu tím sáng |
| Primary Soft | `#F3F0FF` | Nền tím nhạt |
| Secondary Teal | `#0F766E` | Màu nhấn xanh teal |
| Teal Soft | `#E0F2F0` | Nền teal nhạt |
| Gold | `#D9A441` | Điểm nhấn vàng |
| White | `#FFFFFF` | Nền trắng |
| Background | `#F8F9FC` | Nền tổng thể |
| Text | `#202033` | Nội dung chính |
| Text Secondary | `#514B61` | Nội dung phụ |
| Border | `#E2E5EF` | Đường viền |

Các màu cần được quản lý tập trung trong `tokens.css`.

Không hardcode màu tùy tiện trong component nếu đã có design token phù hợp.

### 4.2. Typography

Font family chính:

**Noto Sans**

Sử dụng font self-host WOFF2, hỗ trợ tiếng Việt và tiếng Anh.

Font weights:

| Weight | Value |
|---|---:|
| Regular | 400 |
| Medium | 500 |
| SemiBold | 600 |
| Bold | 700 |

Các kích thước typography được quản lý qua CSS variables trong `tokens.css`.

### 4.3. Layout

| Property | Value |
|---|---:|
| Container | 1280px |
| Wide Container | 1440px |
| Narrow Container | 800px |
| Container Padding | 24px |
| Header Height | 76px |

Spacing, radius, shadows và transitions sử dụng design tokens tương ứng.

---

## 5. Development Principles

### 5.1. Astro-first

- Ưu tiên Astro components.
- Sử dụng Static Site Generation.
- Không sử dụng React, Vue hoặc framework frontend khác nếu không thực sự cần thiết.
- Không triển khai SPA routing.
- Hạn chế Client-side JavaScript.
- Ưu tiên native HTML và CSS.

### 5.2. Semantic HTML

Sử dụng đúng ngữ nghĩa HTML:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<footer>`
- `<button>`
- `<a>`

Không sử dụng thẻ HTML chỉ để phục vụ mục đích trình bày khi có phần tử semantic phù hợp.

### 5.3. Responsive Design

Thiết kế theo hướng responsive từ đầu.

Đảm bảo:
- Desktop.
- Tablet.
- Mobile.

Ưu tiên CSS Grid, Flexbox và media queries.

### 5.4. Performance

- Tối ưu hình ảnh.
- Sử dụng WOFF2.
- Hạn chế preload tài nguyên không cần thiết.
- Hạn chế JavaScript.
- Tránh tải thư viện lớn nếu có thể giải quyết bằng HTML/CSS native.
- Sử dụng lazy loading cho hình ảnh phù hợp.

### 5.5. SEO & Accessibility

- Mỗi trang có title và meta description riêng.
- Sử dụng semantic HTML.
- Hình ảnh có alt phù hợp.
- Đảm bảo keyboard navigation.
- Có trạng thái focus-visible.
- Đảm bảo độ tương phản màu theo WCAG.

---

## 6. Content & Website Structure

Các nhóm trang chính của BPVN:

| Page | Description |
|---|---|
| Home | Trang chủ |
| Products | Danh sách tất cả sản phẩm |
| Brands | Danh sách hãng sản xuất |
| Solutions | Các giải pháp công nghệ |
| News | Danh sách tin tức |
| About | Giới thiệu doanh nghiệp |
| Contact | Thông tin liên hệ |

### Products

- Hiển thị tất cả sản phẩm trên cùng một trang.
- Có bộ lọc theo Categories.
- Có bộ lọc theo Manufacturers/Brands.
- Mỗi sản phẩm có trường `featured`.
- Trang chủ luôn hiển thị hai hàng sản phẩm featured.

### News

Danh sách tin tức hiển thị:
- Tiêu đề bài viết.
- Ngày đăng.

Không cần hiển thị link điều hướng từ danh sách tin tức theo yêu cầu thiết kế hiện tại.

---

## 7. Naming Conventions

### Files

- Astro components: `PascalCase.astro`
- CSS files: `kebab-case.css`
- Content files: `kebab-case.md` hoặc định dạng dữ liệu phù hợp.
- Dynamic routes: `[slug].astro`

### CSS Classes

Sử dụng tên class rõ ràng, có ý nghĩa.

Ví dụ:

```css
.product-card {}
.product-card__title {}
.product-card__image {}
.product-card--featured {}
```

Ưu tiên naming nhất quán theo BEM khi component có nhiều phần tử và trạng thái.

### CSS Variables

Sử dụng tiền tố theo nhóm:

```css
--color-primary
--font-primary
--font-weight-regular
--text-body
--spacing-md
--radius-md
--shadow-md
--transition-fast
```

---

## 8. Development Commands

Cài đặt dependencies:

```bash
npm install
```

Chạy development server:

```bash
npm run dev
```

Build website:

```bash
npm run build
```

Preview bản build:

```bash
npm run preview
```

---

## 9. Important Rules

Khi phát triển website BPVN, cần tuân thủ:

1. Không thay đổi design tokens tùy tiện.
2. Không khai báo trùng lặp CSS variables.
3. Không đưa CSS riêng của component vào global CSS nếu không cần thiết.
4. Không tạo thêm file hoặc abstraction khi chưa có nhu cầu thực tế.
5. Không sử dụng inline styles cho những quy tắc thiết kế có thể tái sử dụng.
6. Không lạm dụng JavaScript phía client.
7. Không sử dụng Tailwind CSS hoặc UI framework.
8. Ưu tiên sử dụng Astro components và HTML/CSS native.
9. Giữ code dễ đọc, có cấu trúc và dễ bảo trì.
10. Kiểm tra responsive và build trước khi hoàn thành một nhóm chức năng.

---

**Project goal:** Xây dựng website Bioprocess Vietnam với giao diện khoa học, hiện đại, chuyên nghiệp, hiệu năng cao và có khả năng mở rộng lâu dài.
