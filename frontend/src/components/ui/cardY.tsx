import { CalendarIcon } from "@radix-ui/react-icons";
import { IoLocationOutline } from "react-icons/io5";

interface CardXProps {
  image?: string;
  nomeAcao: string;
  nomeOng: string;
  dataAcao: string;
  endereco: string;
  publicoAlvo: string[];
  necessidades: string[];
}

const CardY = ({ image, nomeAcao, nomeOng, dataAcao, endereco, publicoAlvo, necessidades }: CardXProps) => {
  return (
    <div className="flex flex-col gap-2 p-3 border border-[#EFEFF0] rounded-xl pb-4">
      {image && (
        <img
          src={image}
          alt={`Imagem da ONG ${nomeAcao}`}
          className="h-32 w-full max-h-32 rounded-xl object-cover"
        />
      )}

      <h2 className="text-lg font-medium">{nomeAcao}</h2>

      <h3 className="text-sm font-medium">{nomeOng}</h3>

      <div className="flex gap-1 items-center">
        <CalendarIcon className="text-[#61646B]" />
        <span className="text-sm text-[#61646B]">{dataAcao}</span>
      </div>


      <div className="flex gap-1 items-center">
        <IoLocationOutline className="text-[#61646B]" />
        <span className="text-sm text-[#61646B]">{endereco}</span>
      </div>

      <div className="flex gap-1 items-center max-h-16 overflow-x-scroll overflow-y-hidden">
        {publicoAlvo.map((item, index) => (
          <div
            key={index}
            className="bg-[#EFEFF0] text-sm text-[#19191B] w-auto py-2 px-6 rounded-full inline-flex whitespace-nowrap"
          >
            {item}
          </div>
        ))}
        {necessidades.map((item, index) => (
          <div
            key={index}
            className="bg-[#EFEFF0] text-sm text-[#19191B] w-auto py-2 px-6 rounded-full inline-flex whitespace-nowrap"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export { CardY };