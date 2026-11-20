# Product category normalization

Category IDs applied to the supplied product Markdown files:

| Product file | Main category | Subcategory |
|---|---|---|
| biolink-biohub-2d-single-use-storage-bag.md | Liquid Management | storage-transfer |
| biolink-biohub-3d-single-use-storage-bag.md | Liquid Management | storage-transfer |
| biolink-biohub-sealer-ii.md | Liquid Management | connect-disconnect |
| biolink-cytolinx-br.md | Upstream Solution | single-use-bioreactors |
| biolink-purilinx-benchtop-chromatography-system.md | Downstream Solution | chromatography-systems |
| lisure-apps-process-chromatography-system.md | Downstream Solution | chromatography-systems |
| lisure-b-pilot-750.md | Downstream Solution | chromatography-systems |
| lisure-b-pilot-cx750.md | Downstream Solution | chromatography-systems; filtration-systems |
| lisure-continuous-buffer-management-system.md | Liquid Management | mixing-systems |
| lisure-pilot-scale-chrom-system-dn8.md | Downstream Solution | chromatography-systems |

Notes:
- The CX750 is assigned to both Chromatography Systems and Filtration Systems because its supplied description explicitly identifies both chromatography and tangential flow filtration (TFF).
- The 2D and 3D BioHub bags are assigned to Storage & Transfer, not Cell Culture Bags: the supplied product descriptions position them as storage/transfer bags for process liquids.
- The CBMS is assigned to Mixing Systems because the supplied description centers on inline mixing and buffer preparation/management.
- No supplied product was assigned to Cell Culture Media & Reagents, Chromatography Resins & Columns, Filtration Consumables, Fill & Finishing, Product Characterization, or Process Control because the supplied files do not describe a product that clearly belongs to those categories.

IMPORTANT:
The IDs `connect-disconnect`, `storage-transfer`, and `mixing-systems` must match the IDs in `src/data/product-categories.ts`.
If that file currently uses different IDs (for example, `aseptic-connect-disconnect` or `buffer-management-systems`), update the category config IDs to the IDs above, or change the corresponding product frontmatter to match the canonical IDs in that config. The visible category labels alone do not determine filter matching; the IDs must match exactly.
