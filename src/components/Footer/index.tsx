import { Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer
      className="bg-gradient-to-r from-green-900 to-emerald-800 text-green-50 py-12 "
      id="footer"
    >
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-100">
              Acervo Virtual Terapia Ocupacional
            </h3>

            <p className="text-green-200 max-w-xs">
              Acervo digital organizado pelo Centro Acadêmico da Unifor,
              reunindo conteúdos relevantes sobre a história, práticas e
              contribuições da Terapia Ocupacional.
            </p>
          </div>

          <div className="">
            <h4 className="font-medium text-green-100 mb-4">Contato</h4>
            <ul className="space-y-2 ">
              <li className="text-green-200">caebunifor@gmail.com</li>
              <li className="text-green-200 ">
                <Link
                  href="https://www.instagram.com/catounifor?igsh=Y2lqeXRkcmh0bW50"
                  target="_blank"
                  className="flex items-center  gap-2"
                >
                  <Instagram />
                  <p>catounifor</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-green-800 text-center text-green-300 text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <Link href="https://herisontech.vercel.app" target="_blank">
              HerisonTech.
            </Link>{" "}
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
