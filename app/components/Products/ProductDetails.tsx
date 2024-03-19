"use client";

import { Rating } from "@mui/material";
import { useCallback, useState } from "react";
import SetColor from "./SetColor";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

export const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  console.log("cartProduct", cartProduct);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>Images</div>

      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>
            {product.reviews.length}{" "}
            {product.reviews.length == 1 ? "análise" : "análises"}
          </div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}Horizontal</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORIA: {product.category}</span>
        </div>
        <div>
          <span className="font-semibold">MARCA: {product.brand}</span>
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400 "}>
          {product.inStock ? "Em estoque" : "Fora de estoque"}{" "}
        </div>
        <Horizontal />
        <SetColor
          images={product.images}
          cartProduct={cartProduct}
          handleColorSelect={handleColorSelect}
        />
        <Horizontal />
        <div>quantidade</div>
        <Horizontal />
        <div>adicionar ao carrinho</div>
      </div>
    </div>
  );
};

export default ProductDetails;
