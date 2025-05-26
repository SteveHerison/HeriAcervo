"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { SelectCategory } from "../Category";

interface ModalAddProps {
  setModalAdd: (open: boolean) => void;
  refreshArticles: () => void;
  categories: { id: number; name: string }[];
  onSuccess: () => void;
}

export default function ModalAdd({
  setModalAdd,
  refreshArticles,
  categories,
  onSuccess,
}: ModalAddProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    url: "",
    image: null as File | null,
    category: null as number | null,
  });

  // Função para atualizar os campos do form
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        image: (e.target as HTMLInputElement).files?.[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  // Função para tratar o submit do form

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("description", formData.description);
      data.append("url", formData.url);
      if (formData.image) {
        data.append("image", formData.image);
      }
      if (formData.category !== null) {
        data.append("category", String(formData.category));
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}articles`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onSuccess();

      await refreshArticles();

      setModalAdd(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(
          `Erro ao salvar artigo: ${
            error.response?.data
              ? JSON.stringify(error.response.data)
              : error.message
          }`
        );
      } else {
        alert("Erro desconhecido ao salvar artigo");
      }
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
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <SelectCategory
            category={formData.category}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
            options={categories.map(({ id, name }) => ({ id, name }))}
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
