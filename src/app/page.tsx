"use client";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import Hero from "@/components/Hero";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import CategoryFilter from "@/components/CategoriaFiltro";

import React, { useEffect, useState } from "react";

import { categories } from "@/data/categorias";
import ModalAdd from "@/components/modals/ShowModalAddArticle";
import { useAuth } from "@/context/authContext";
import { LoginModal } from "@/components/modals/LoginModal";
import axios from "axios";

interface Article {
  id: number;
  title: string;
  author: string;
  description: string;
  url: string;
  image?: string;
  category: string;
  createdAt: string;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [modalAdd, setModalAdd] = useState(false);
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [articles, setArticles] = useState<Article[]>([]);

  const getArticles = async () => {
    try {
      const response = await axios.get("http://localhost:3001/articles");
      setArticles(response.data); // salva os artigos no estado
    } catch (error) {
      console.error("Erro ao buscar artigos:", error);
    }
  };

  const handleAdd = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // mostra o modal de login
      return;
    }

    setModalAdd(true); // mostra o modal de adicionar artigo
  };

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    if (modalAdd) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalAdd]);

  const filteredItems = activeCategory
    ? articles.filter((item) => item.category === activeCategory)
    : articles;

  return (
    <main className="min-h-screen relative">
      <Header setModalAdd={handleAdd} />
      <main className="flex-grow">
        <Hero />

        <section className="py-12 bg-green-50/50">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-8">
              Explore por Categoria
            </h2>
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              className="justify-center mb-8"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 ">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-green-200"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={item.image || "/default-image.png"}
                      alt={item.title}
                      width={400}
                      height={225}
                      unoptimized
                      className="w-full h-full object-center transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-green-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-green-700 mb-4">{item.author}</p>{" "}
                    {/* ajustado para autor */}
                    <p className="text-green-700 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600">
                        {new Date(item.createdAt).getFullYear()} Ano PB
                      </span>
                      <Link
                        href={`/colecao/${item.id}`}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                      >
                        Ver Artigo →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-12">
              Exposições em Destaque
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"></div>
          </div>
        </section>
      </main>
      <Footer />
      {modalAdd && (
        <ModalAdd setModalAdd={setModalAdd} refreshArticles={getArticles} />
      )}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </main>
  );
}
