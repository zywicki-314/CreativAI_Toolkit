import { ReactNode } from "react";
import { IProduct } from "../model/IProduct";
import { Activity, Code, Image, Video, MessageCircleCode } from "lucide-react";
import { ROUTES } from "@/app/config/routes";

interface IProductUI extends Pick<IProduct, "title" | "description"> {
  icon: ReactNode;
  color: string;
  link: string;
}

export const PRODUCTS: IProductUI[] = [
  {
    title: "Chat AI",
    description: "Zadaj mi pytanie",
    icon: <MessageCircleCode />,
    color: "text-green-700",
    link: ROUTES.cabinet.chat,
  },
  {
    title: "Code Helper",
    description: "Pomogę w tworzeniu kodu w każdym języku programowania",
    icon: <Code />,
    color: "text-red-700",
    link: ROUTES.cabinet.code,
  },
  {
    title: "Image Generate",
    description: "Szukasz grafiki? - Zrób swóją urzywając AI",
    icon: <Image />,
    color: "text-yellow-700",
    link: ROUTES.cabinet.image,
  },
  {
    title: "Audio Generate",
    description: "Generuj własną muzykę",
    icon: <Activity />,
    color: "text-blue-700",
    link: ROUTES.cabinet.audio,
  },
  {
    title: "Video Generate",
    description: "Genreuj video razem z AI",
    icon: <Video />,
    color: "text-orange-700",
    link: ROUTES.cabinet.video,
  },
];
