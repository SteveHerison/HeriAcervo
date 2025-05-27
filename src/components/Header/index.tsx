"use client";
import Image from "next/image";
import logo from "@/assets/img/logo.svg";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

type modalAdd = {
  setModalAdd: (value: boolean) => void;
};

export const Header = ({ setModalAdd }: modalAdd) => {
  const [isOcupacionalDomain, setIsOcupacionalDomain] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentDomain = window.location.hostname;
      setIsOcupacionalDomain(currentDomain === "acervoocupacional.vercel.app");
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-200 bg-green-50/80 backdrop-blur-md py-4">
      <div className="h-16 container mx-auto items-center flex justify-between">
        <Link href="/">
          <Image src={logo} alt="" className="w-20 h-20" />
        </Link>
        <div className="flex items-center gap-4 pr-4">
          <ul className="md:flex gap-4 hidden">
            <li>Sobre</li>
          </ul>
          {isOcupacionalDomain && (
            <Button onClick={() => setModalAdd(true)}>Adicionar Artigo</Button>
          )}
        </div>
      </div>
    </header>
  );
};
