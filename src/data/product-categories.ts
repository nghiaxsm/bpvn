/**
 * Product category taxonomy for BPVN.
 *
 * Products reference subcategory IDs in their `categories` frontmatter field.
 * Parent categories are derived from the selected subcategories.
 */

export interface ProductSubcategory {
  id: string;
  name: string;
  parentId: string;
  sortOrder: number;
}

export interface ProductParentCategory {
  id: string;
  name: string;
  sortOrder: number;
  subcategories: ProductSubcategory[];
}

export const productCategories: ProductParentCategory[] = [
  {
    id: "upstream-solution",
    name: "Upstream Solution",
    sortOrder: 1,
    subcategories: [
      { id: "single-use-bioreactor", name: "Single-Use Bioreactor", parentId: "upstream-solution", sortOrder: 1 },
      { id: "cell-culture-bags", name: "Cell Culture Bags", parentId: "upstream-solution", sortOrder: 2 },
      { id: "cell-culture-media-reagents", name: "Cell Culture Media & Reagents", parentId: "upstream-solution", sortOrder: 3 },
    ],
  },
  {
    id: "downstream-solution",
    name: "Downstream Solution",
    sortOrder: 2,
    subcategories: [
      { id: "chromatography-systems", name: "Chromatography Systems", parentId: "downstream-solution", sortOrder: 1 },
      { id: "chromatography-resins-columns", name: "Chromatography Resins & Columns", parentId: "downstream-solution", sortOrder: 2 },
      { id: "filtration-systems", name: "Filtration Systems", parentId: "downstream-solution", sortOrder: 3 },
      { id: "filtration-consumables", name: "Filtration Consumables", parentId: "downstream-solution", sortOrder: 4 },
    ],
  },
  {
    id: "liquid-management",
    name: "Liquid Management",
    sortOrder: 3,
    subcategories: [
      { id: "mixing-systems", name: "Mixing Systems", parentId: "liquid-management", sortOrder: 1 },
      { id: "fill-finishing", name: "Fill & Finishing", parentId: "liquid-management", sortOrder: 2 },
      { id: "connect-disconnect", name: "Connect & Disconnect", parentId: "liquid-management", sortOrder: 3 },
      { id: "storage-transfer", name: "Storage & Transfer", parentId: "liquid-management", sortOrder: 4 },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    sortOrder: 4,
    subcategories: [
      { id: "product-characterization", name: "Product Characterization", parentId: "analytics", sortOrder: 1 },
      { id: "process-control", name: "Process Control", parentId: "analytics", sortOrder: 2 },
    ],
  },
];

/** Flattened list for lookups, validation, and filter controls. */
export const productSubcategories: ProductSubcategory[] =
  productCategories.flatMap((category) => category.subcategories);

export function getProductParentCategoryById(
  id: string,
): ProductParentCategory | undefined {
  return productCategories.find((category) => category.id === id);
}

export function getProductSubcategoryById(
  id: string,
): ProductSubcategory | undefined {
  return productSubcategories.find((subcategory) => subcategory.id === id);
}

export function getProductSubcategoriesByParentId(
  parentId: string,
): ProductSubcategory[] {
  return getProductParentCategoryById(parentId)?.subcategories ?? [];
}

export function getProductParentCategoryForSubcategory(
  subcategoryId: string,
): ProductParentCategory | undefined {
  const subcategory = getProductSubcategoryById(subcategoryId);

  return subcategory
    ? getProductParentCategoryById(subcategory.parentId)
    : undefined;
}
