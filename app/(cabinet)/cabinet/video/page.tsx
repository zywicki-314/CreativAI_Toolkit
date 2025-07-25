import { PRODUCTS } from "@/entities/product/static/products";
import ProductVideoForm from "@/entities/product/ui/ProductVideoForm";
import ProductHeader from "@/entities/product/ui/ProductHeader";
import React, { FC } from "react";

interface ICabinetVideoPageProps {}

const CabinetVideoPage: FC<ICabinetVideoPageProps> = ({}) => {
  const video = PRODUCTS[4];
  return (
    <div className="md:flex-1 flex flex-col justify-between h-[calc(100vh-50px)]">
      <ProductHeader {...video} />
      <ProductVideoForm />
    </div>
  );
};

export default CabinetVideoPage;
