"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

type ModalAddProps = {
  setModalAdd: (value: boolean) => void;
  refreshArticles: () => Promise<void>;
};

export default function ModalAdd({
  setModalAdd,
  refreshArticles,
}: ModalAddProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    url: "",
    image: "",
    category: "",
  });

  // Função para atualizar os campos do form
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Função para tratar o submit do form
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // se backend usa autenticação
      await axios.post(
        "http://localhost:3001/articles", // sua rota para criar artigo
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // se proteger rota
          },
        }
      );
      await refreshArticles();
      alert("Artigo salvo com sucesso!");
      setModalAdd(false);
    } catch (error) {
      console.error("Erro ao salvar artigo:", error);
      alert("Erro ao salvar artigo");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white/10 absolute w-screen h-screen" />
      <div className="relative bg-white w-full max-w-2xl mx-4 p-8 rounded-lg shadow-lg">
        <Button
          onClick={() => setModalAdd(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          variant="ghost"
        >
          <X size={24} />
        </Button>

        <h2 className="text-2xl font-bold mb-4">Adicionar Artigo</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            placeholder="Título do artigo"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            name="author"
            placeholder="Autor/Autores"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <Textarea
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            required
            className="max-h-40"
          />
          <Input
            name="url"
            placeholder="URL do artigo"
            value={formData.url}
            onChange={handleChange}
            required
          />
          <Input
            name="image"
            placeholder="URL da imagem"
            value={formData.image}
            onChange={handleChange}
            required
          />
          <Input
            name="category"
            placeholder="Categoria"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <div className="pt-4 flex justify-end">
            <Button type="submit" className="bg-green-600 text-white">
              Salvar Artigo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
