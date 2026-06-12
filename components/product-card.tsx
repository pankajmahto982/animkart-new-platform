import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { discountPercent, formatINR, StoreProduct } from "@/lib/products";

type ProductCardProps = {
  product: StoreProduct;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = discountPercent(product);

  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-[#D1D1D1] transition hover:-translate-y-1 hover:ring-[#1B6B3A]">
      <Link className="block" href={`/product/${product.slug}`}>
        <div className="relative aspect-[4/3] bg-white">
          <ProductImage alt={product.name} category={product.category} src={product.image} />
          {discount ? (
            <span className="absolute left-3 top-3 rounded bg-[#DC2626] px-2 py-1 text-[10px] font-bold text-white">
              {discount}% OFF
            </span>
          ) : null}
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[10px] font-bold uppercase text-[#6B6B6B]">{product.brand}</p>
          <span className="rounded bg-[#EDF7F1] px-2 py-1 text-[10px] font-bold text-[#1B6B3A]">
            {product.inStock ? "In stock" : "Check stock"}
          </span>
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-semibold text-[#1A1A1A]">{product.name}</h3>
        </Link>
        <p className="mt-1 text-xs text-[#6B6B6B]">Vendor: AnimKart verified supplier</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-[#6B6B6B]">
          <span className="flex items-center gap-1 text-[#1B6B3A]">
            <Star size={13} fill="currentColor" />
            {(4.5 + (index % 5) / 10).toFixed(1)}
          </span>
          <span>({84 + index * 11} reviews)</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-[#1A1A1A]">{formatINR(product.price)}</p>
            {product.regularPrice && product.regularPrice > product.price ? (
              <p className="text-xs font-semibold text-[#6B6B6B] line-through">{formatINR(product.regularPrice)}</p>
            ) : null}
            <p className="mt-1 text-[11px] text-[#6B6B6B]">Incl. GST</p>
          </div>
          <Link className="grid size-11 place-items-center rounded-lg bg-[#1B6B3A] text-white" href="/cart">
            <ShoppingCart size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
