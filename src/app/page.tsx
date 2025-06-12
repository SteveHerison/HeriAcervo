"use client";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import Hero from "@/components/Hero";

import { Card, CardContent, TruncatedDescription } from "@/components/ui/card";
import Link from "next/link";

import CategoryFilter from "@/components/CategoriaFiltro";

import React, { useEffect, useState, useCallback } from "react";
import ModalAdd from "@/components/modals/ShowModalAddArticle";
import { useAuth } from "@/context/authContext";
import { LoginModal } from "@/components/modals/LoginModal";
import axios from "axios";
import { Sucess } from "@/components/modals/Sucess";
import { CardsVisitas } from "@/components/CartoesDeVisita";
import { Button } from "@/components/ui/button";

interface Article {
  id: number;
  title: string;
  author: string;
  description: string;
  url: string;
  image?: string;
  categoryId: number;
  category: string;
  createdAt: string;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [modalAdd, setModalAdd] = useState(false);
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [articles, setArticles] = useState<Article[]>([]);

  const getArticles = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`,
        {
          params: activeCategory ? { categoryId: activeCategory } : {},
        }
      );
      setArticles(response.data);
    } catch (error) {
      console.error("Erro ao buscar artigos:", error);
    }
  }, [activeCategory]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const handleAdd = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // mostra o modal de login
      return;
    }

    setModalAdd(true); // mostra o modal de adicionar artigo
  };

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000); // 3 segundos

      return () => clearTimeout(timer); // limpa o timer se o componente desmontar ou o modal fechar antes
    }
  }, [showSuccessModal]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }
    fetchCategories();
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

  const filteredItems = articles.filter((item) => {
    const matchesCategory = activeCategory
      ? item.categoryId === activeCategory
      : true;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen relative">
      <Header setModalAdd={handleAdd} />
      <main className="flex-grow ">
        <Hero />

        <section className="py-12 bg-green-50/50 px-2" id="artigos">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-8">
              Explore por Categoria
            </h2>
            {categories.length > 0 && (
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                className="justify-center mb-8"
              />
            )}
            <div className="max-w-md w-full mx-auto mb-8 flex items-center gap-4">
              <input
                type="text"
                placeholder="Buscar artigo por título, autor ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block px-4 py-2 border max-w-xl w-xl border-green-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Button onClick={() => setSearchQuery(searchTerm)}>
                Pesquisar
              </Button>
            </div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-3"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-3">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-green-200 shadow-lg"
                >
                  <CardContent className="p-6 grid h-full">
                    <h3 className="text-xl font-semibold text-green-900 mb-2">
                      {item.title}
                    </h3>
                    <span className="text-zinc-800 font-semibold text-md">
                      Autores
                    </span>
                    <p className="text-green-700 mb-4">{item.author}</p>{" "}
                    {/* ajustado para autor */}
                    <span className="text-zinc-800 font-semibold text-md">
                      Descrição
                    </span>
                    <TruncatedDescription
                      text={item.description}
                      maxLength={150}
                    />
                    <div className=" h-full flex items-end mt-auto">
                      <Link
                        href={`${item.url}`}
                        className="text-emerald-600  hover:text-emerald-700 font-medium text-sm"
                        target="_blank"
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

        <section className="py-16" id="footer">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-12">
              Informações
            </h2>

            <div className="grid grid-cols-1 gap-8">
              <CardsVisitas />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {modalAdd && (
        <ModalAdd
          setModalAdd={setModalAdd}
          refreshArticles={getArticles}
          categories={categories}
          onSuccess={() => setShowSuccessModal(true)}
        />
      )}
      {showSuccessModal && <Sucess />}

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </main>
  );
}
