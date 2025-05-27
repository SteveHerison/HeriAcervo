import { useState } from "react";
import { useAuth } from "@/context/authContext";

export function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      onClose();
    } catch {
      setError("Credenciais inválidas");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <p
          className="absolute top-0 right-2 text-lg font-semibold cursor-pointer"
          onClick={onClose}
        >
          X
        </p>
        <h2 className="text-xl font-bold mb-4">Faça login</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          className="mb-3 w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          className="mb-3 w-full p-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-emerald-600 text-white py-2 rounded"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
