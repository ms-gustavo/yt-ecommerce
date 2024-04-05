"use client";

import { formatPrice } from "@/utils/FormatPrice";
import { truncateText } from "@/utils/TruncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    console.log("data>>>>>>", data);
  }, [data]);

  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            src={data?.images[0]?.image}
            alt={data.name}
            fill
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>
          {data.reviews.length}{" "}
          {data.reviews.length == 1 ? "análise" : "análises"}
        </div>
        <div className=" text-lightBrown font-semibold">
          {formatPrice(data.price)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
