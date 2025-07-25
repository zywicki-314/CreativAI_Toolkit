import { PRODUCTS } from "@/entities/product/static/products";
import ProductAudioForm from "@/entities/product/ui/ProductAudioForm";
import ProductHeader from "@/entities/product/ui/ProductHeader";
import React, { FC } from "react";

interface ICabinetAudioPageProps {}

const CabinetAudioPage: FC<ICabinetAudioPageProps> = ({}) => {
  const audio = PRODUCTS[3];
  return (
    <div className="md:flex-1 flex flex-col justify-between h-[calc(100vh-50px)]">
      <ProductHeader {...audio} />
      <ProductAudioForm />
    </div>
  );
};

export default CabinetAudioPage;
