

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// ==========================================
// PRODUCTS
// ==========================================

const products = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/products",
  }),

  schema: z.object({
    // Tên chung của dòng sản phẩm
    // Ví dụ: Hệ thống tinh sạch protein
    title: z.string(),

    // Tên thương mại / Model cụ thể
    // Ví dụ: ÄKTA pure, ÄKTA avant, B Pilot 750
    model: z.string(),

    // Mô tả ngắn về model cụ thể
    description: z.string(),

    // Danh sách category slug; một sản phẩm có thể thuộc nhiều danh mục
    // Ví dụ: ["chromatography-systems", "filtration-systems"]
    categories: z.array(z.string()).min(1),

    // Brand slug
    // Ví dụ: cytiva
    brand: z.string(),

    // Sản phẩm nổi bật trên trang chủ
    featured: z.boolean().default(false),

    // Thứ tự ưu tiên hiển thị
    sortOrder: z.number().default(0),

    // Mã sản phẩm nếu có
    productCode: z.string().optional(),

    // Ảnh đại diện của model
    image: z.string().optional(),

    // Ứng dụng của sản phẩm
    applications: z.array(z.string()).default([]),
  }),
});

// ==========================================
// BRANDS
// ==========================================

const brands = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/brands",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),

    logo: z.string().optional(),
    website: z.string().url().optional(),

    featured: z.boolean().default(false),
    sortOrder: z.number().default(0),
  }),
});

// ==========================================
// SOLUTIONS
// ==========================================

const solutions = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/solutions",
  }),

  schema: z.object({
    // Tên Solution hiển thị trên landing page và trang chi tiết
    title: z.string(),

    // Mô tả ngắn dùng trên landing page và phần giới thiệu trang chi tiết
    description: z.string(),

    // Đường dẫn ảnh trong thư mục public; ví dụ /images/solutions/antibody.webp
    image: z.string().optional(),

    // Văn bản thay thế cho ảnh, hỗ trợ accessibility và SEO
    imageAlt: z.string().optional(),

    // Thứ tự hiển thị trên landing page (số nhỏ hiển thị trước)
    sortOrder: z.number().default(0),

    // Ẩn nội dung chưa sẵn sàng xuất bản khỏi landing page và static routes
    draft: z.boolean().default(false),
  }),
});

// ==========================================
// NEWS
// ==========================================

const news = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/news",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),

    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    author: z.string().optional(),
    coverImage: z.string().optional(),

    draft: z.boolean().default(false),
  }),
});

// ==========================================
// EXPORT COLLECTIONS
// ==========================================

export const collections = {
  products,
  brands,
  solutions,
  news,
};
