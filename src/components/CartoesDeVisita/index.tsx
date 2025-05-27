import Image from "next/image";
import { visitas } from "@/data/pessoal";

export const CardsVisitas = () => {
  // Separando os dados
  const coordenacao = visitas.slice(0, 3);
  const producao = visitas.slice(3);

  return (
    <div className="px-2 space-y-10">
      {/* Coordenação Terapia */}
      <div>
        <h2 className="text-2xl font-bold text-green-900 mb-4">
          Coordenação de Terapia Ocupacional da Unifor
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {coordenacao.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-green-950 text-white rounded-lg p-4"
            >
              <div className="w-40 h-40">
                <Image
                  src={item.foto}
                  alt={item.nome}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col text-center mt-4">
                <div className="text-lg font-bold">{item.nome}</div>
                <div className="text-sm">{item.descricao}</div>
                <div className="mt-2 text-sm"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Produção */}
      <div>
        <h2 className="text-2xl font-bold text-green-900 mb-4">
          Coordenação Científica CATO
        </h2>
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center justify-center">
            {producao.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 items-center bg-green-950 text-white rounded-lg p-4  max-96 "
              >
                <div className="w-32 h-32">
                  <Image
                    src={item.foto}
                    alt={item.nome}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col justify-between h-full flex-1">
                  <div className="text-lg font-bold">{item.nome}</div>
                  <div className="text-sm">{item.descricao}</div>
                  <div className="mt-2 text-sm"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
