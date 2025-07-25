import { PRODUCTS } from "@/entities/product/static/products";
import ProductCodeForm from "@/entities/product/ui/ProductCodeForm";
import ProductHeader from "@/entities/product/ui/ProductHeader";
import React, { FC } from "react";

interface ICabinetCodePageProps {}

const CabinetCodePage: FC<ICabinetCodePageProps> = ({}) => {
  const [_, code] = PRODUCTS;
  return (
    <div className="md:flex-1 flex flex-col justify-between h-[calc(100vh-50px)]">
      <ProductHeader {...code} />
      <ProductCodeForm inline="true" />
    </div>
  );
};

export default CabinetCodePage;
