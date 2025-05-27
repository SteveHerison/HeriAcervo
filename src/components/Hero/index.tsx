import React from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/img/logo.png";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-emerald-gradient py-16 md:py-24 text-primary-foreground">
      <div className="absolute inset-0 ">
        <div className="absolute inset-0 bg-primary"></div>
      </div>
      <div className="lg:container relative lg:mx-auto px-4 ">
        <div className="flex flex-col-reverse md:grid md:grid-cols-[1fr_auto] gap-10 items-center justify-center">
          <div className="">
            <h1 className="font-bold text-5xl lg:text-6xl  mb-6 animate-fade-in">
              Acervo Virtual de Terapia Ocupacional
              <br />
              <p className="text-2xl py-5">
                Centro Acadêmico de Terapia Ocupacional da UNIFOR
              </p>
            </h1>
            <p className="text-md md:text-xl mb-8 animate-fade-in  max-w-4xl">
              Acervo digital organizado pelo Centro Acadêmico da Unifor,
              reunindo conteúdos relevantes sobre a história, práticas e
              contribuições da Terapia Ocupacional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button
                onClick={() => {
                  const element = document.getElementById("artigos");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                size="lg"
                className=" text-emerald-800 hover:bg-green-100 bg-primary-foreground"
              >
                Explorar Coleção
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full">
            <Image src={Logo} alt="" className="max-w-96 max-h-96 w-80 h-80" />
          </div>
        </div>
      </div>
    </section>
  );
}
