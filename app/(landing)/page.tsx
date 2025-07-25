import Link from "next/link";
import ProductsList from "@/entities/product/ui/ProductsList";
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import { ROUTES } from "../config/routes";

export default function Home() {
  return (
    <div className="container py-4 mx-auto">
      <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
        <h1 className="text-3xl md:text-5xl text-center font-bold">
          CreativAI Toolkit
        </h1>
        <ProductsList />
        <Link href={ROUTES.cabinet.dashboard}>
          <Button className="flex gap-2">
            Zacznij własną przygodę z CreativAI Toolkit
            <ArrowBigRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
