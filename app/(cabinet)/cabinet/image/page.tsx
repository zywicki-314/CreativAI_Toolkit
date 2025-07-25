import { PRODUCTS } from "@/entities/product/static/products";
import ProductHeader from "@/entities/product/ui/ProductHeader";
import ProductImageForm from "@/entities/product/ui/ProductImageForm";
import React, { FC } from "react";

interface ICabinetImagePageProps {}

const CabinetImagePage: FC<ICabinetImagePageProps> = ({}) => {
  const image = PRODUCTS[2];
  return (
    <div className="md:flex-1 flex flex-col justify-between h-[calc(100vh-50px)]">
      <ProductHeader {...image} />
      <ProductImageForm />
    </div>
  );
};

export default CabinetImagePage;
