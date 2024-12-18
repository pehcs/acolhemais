import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { GoArrowLeft } from "react-icons/go";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";
import Map from "../../../components/ui/map/map.tsx";
import getUserLocation from "../../../components/ui/map/geolocation.tsx";
import getLatLonFromCep from "../../../components/ui/map/input.tsx";

function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, "");
  if (cnpj.length !== 14) return false;

  if (/^(\d)\1+$/.test(cnpj)) return false;

  const calcDV = (cnpj: string, pos: number[]) =>
    cnpj
      .slice(0, pos.length)
      .split("")
      .reduce((sum, num, i) => sum + parseInt(num, 10) * pos[i], 0);

  const d1 = calcDV(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) % 11;
  const d2 = calcDV(cnpj, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) % 11;

  return (
    parseInt(cnpj[12], 10) === (d1 < 2 ? 0 : 11 - d1) &&
    parseInt(cnpj[13], 10) === (d2 < 2 ? 0 : 11 - d2)
  );
}

const formSchema = z.object({
  nome: z.string(),
  data_criacao: z.string().optional(),
  cnpj: z
    .string()
    .optional()
    .refine((cnpj) => !cnpj || isValidCNPJ(cnpj), { message: "CNPJ inválido" }),
  localizacao: z.string().optional(),
  publico_alvo: z.string().optional(),
  necessidades: z.string().optional(),
  login: z.string().optional(),
  senha: z.string().optional(),
});

export default function OngRegister() {
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [cnpjError, setCNPJError] = useState<string>("");
  const [registerOng, setRegisterOng] = useState<any>({
    nome: "",
    data_criacao: 2024,
    cnpj: "",
    localizacao: "",
    publico_alvo: new Set([]),
    necessidades: new Set([]),
    login: "",
    senha: "",
  });
  const options = [
    "Crianças",
    "Adolescentes",
    "Adultos",
    "Idosos",
    "Homens",
    "Mulheres",
    "População negra",
    "População Indígena",
    "LGBTQIA+",
    "Pessoas com Deficiência",
  ];

  const necessidades = [
    "Assistência Social",
    "Educação",
    "Saúde",
    "Saúde Mental",
    "Meio Ambiente",
    "Combate à Pobreza e Fome",
    "Cultura e Arte",
    "Igualdade de Gênero",
    "Direitos Humanos",
    "Justiça Social",
    "Esporte e Lazer",
    "Animais",
    "Desenvolvimento Comunitário",
    "Desastres e emergências",
    "Emprego",
  ];

  const handleView = () => {
    setViewPassword(!viewPassword);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      data_criacao: "",
      cnpj: "",
      localizacao: "",
      publico_alvo: "",
      necessidades: "",
      login: "",
      senha: "",
    },
  });
  const { register } = form;
  const [currentStep, setCurrentStep] = useState(0);
  // const steps: { id: string; title: string; label?: string; field: keyof z.infer<typeof formSchema>; image: string }[] = [
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 0, longitude: 0 });
  const [error, setError] = useState<string | null>(null);

  
  const steps: any[] = [
    {
      id: "NOME",
      title: "Qual o nome da sua ONG?",
      label: "Nome",
      field: "nome",
      image: "/images/img-4.svg",
      input: (
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{steps[currentStep].label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={registerOng.nome}
                  onChange={(e) =>
                    setRegisterOng((prevState: any) => ({
                      ...prevState,
                      nome: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
      ),
    },
    {
      id: "DATA_DE_CRIACAO",
      title: "Em que ano a ONG foi criada?",
      field: "data_criacao",
      image: "/images/img-5.svg",
      input: (
        <div className="w-full flex flex-col items-center gap-2">
          <Button
            className="p-0 w-12"
            variant="icon"
            type="button"
            onClick={() => {
              setRegisterOng((prevState: any) => ({
                ...prevState,
                data_criacao: prevState.data_criacao + 1,
              }));
            }}
          >
            <RiArrowUpSLine className="w-7 h-7 text-[#AFB1B6] hover:text-[#2F49F3] transition-colors duration-300" />
          </Button>
          <FormItem className="flex flex-col w-1/2">
            <FormControl>
              <Input
                className="text-center"
                onChange={(e) =>
                  setRegisterOng((prevState: any) => ({
                    ...prevState,
                    data_criacao: e.target.value,
                  }))
                }
                type="number"
                value={registerOng.data_criacao}
              />
            </FormControl>
          </FormItem>
          <Button
            className="p-0 w-12"
            variant="icon"
            type="button"
            onClick={() => {
              setRegisterOng((prevState: any) => ({
                ...prevState,
                data_criacao: prevState.data_criacao - 1,
              }));
            }}
          >
            <RiArrowDownSLine className="w-7 h-7 text-[#AFB1B6] hover:text-[#2F49F3] transition-colors duration-300" />
          </Button>
        </div>
      ),
    },
    {
      id: "CNPJ",
      title: "Por favor, informe o CNPJ da ONG, caso ela tenha um.",
      label: "CNPJ",
      field: "cnpj",
      image: "/images/img-9.svg",
      input: (
        <Controller
          control={form.control}
          name="cnpj"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col">
                <FormLabel>{steps[currentStep].label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite seu CNPJ"
                    value={registerOng.cnpj}
                    onChange={(e) => {
                      if (e.target.value && !isValidCNPJ(e.target.value)) {
                        setCNPJError("CNPJ inválido");
                      } else {
                        setCNPJError("");
                      }
                      setRegisterOng((prevState: any) => ({
                        ...prevState,
                        cnpj: e.target.value,
                      }));
                    }}
                  />
                </FormControl>
                {cnpjError && (
                  <p className="text-red-500 text-sm mt-2">{cnpjError}</p>
                )}
              </FormItem>
            );
          }}
        />
      ),
    },
    {
      id: "LOCALIZACAO",
      title: "Onde a ONG se localiza?",
      label: "CEP",
      field: "localizacao",
      image: "/images/img-6.svg",
      input: (
        <Controller
          control={form.control}
          name="localizacao"
          render={({ field }) => (
            <div>
              <FormItem className="flex flex-col">
                <FormLabel>CEP da ONG</FormLabel>
                <FormControl>
                  <Input
                    id="localizacao"
                    {...field}
                    onChange={(e) => {
                      setRegisterOng((prevState: any) => ({
                        ...prevState,
                        localizacao: e.target.value,
                      }));
                      (async () => {
                        setError(null);
                        try {
                          if (!registerOng.localizacao || registerOng.localizacao.trim() === "") {
                            const [latitude, longitude] = await getUserLocation();
                            setCoordinates({ latitude, longitude });
                            return;
                          }
                  
                          const isCep = (input: string) => /^\d{8}$|^\d{5}-\d{3}$/.test(input);
                  
                          const input = registerOng.localizacao.trim();
                  
                          if (isCep(input)) {
                            const location = await getLatLonFromCep(input);
                  
                            if (location) {
                              const { lat, lon } = location;
                              setCoordinates({ latitude: lat, longitude: lon });
                            } else {
                              throw new Error("Não foi possível encontrar o CEP fornecido.");
                            }
                          }
                        } catch (err: any) {
                          setCoordinates({ latitude: 0, longitude: 0 });
                          setError(err.message || "Erro ao buscar localização.");
                        }
                      })()
                    }}
                    value={registerOng.localizacao}
                  />
                </FormControl>
              </FormItem>
              {error && <p className="text-red-500 text-sm pt-2">{error}</p>}
              <div className={error ? "h-48 mt-2" : "h-52 mt-4"}>
                <Map
                  latitude={coordinates.latitude}
                  longitude={coordinates.longitude}
                />
              </div>
            </div>
          )}
        />
      ),
    },
    {
      id: "PUBLICO_ALVO",
      title: "Selecione o(s) público(s) alvo da sua ONG.",
      field: "publico_alvo",
      image: "/images/img-7.svg",
      input: (
        <FormItem className="flex flex-col">
          <FormLabel>Selecione o(s) público(s) alvo da sua ONG.</FormLabel>
          <FormControl>
            <div className="flex gap-2 w-11/12 flex-wrap justify-center">
              {options.map((option) => (
                <Button
                  onClick={() => {
                    setRegisterOng((prevState: any) => {
                      const updatedPublicoAlvo = new Set(
                        prevState.publico_alvo
                      );

                      if (updatedPublicoAlvo.has(option)) {
                        updatedPublicoAlvo.delete(option);
                      } else {
                        updatedPublicoAlvo.add(option);
                      }

                      return {
                        ...prevState,
                        publico_alvo: updatedPublicoAlvo,
                      };
                    });
                  }}
                  type="button"
                  className={`w-auto py-0 hover:bg-${registerOng.publico_alvo.has(option) ? "bg-[#FFCF33]" : "bg-[#EFEFF0]"} ${registerOng.publico_alvo.has(option) ? "bg-[#FFCF33]" : "bg-[#EFEFF0]"} text-[#19191B] focus:outline-none hover:bg-none`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </FormControl>
        </FormItem>
      ),
    },
    {
      id: "NECESSIDADES",
      title: "Selecione a(s) causa(s) que sua ONG atende.",
      field: "necessidades",
      image: "/images/img-8.svg",
      input: (
        <FormItem className="flex flex-col">
          <FormControl>
            <div className="flex gap-2 w-11/12 flex-wrap justify-center h-[62%] overflow-y-scroll">
              {necessidades.map((option) => (
                <Button
                  onClick={() => {
                    setRegisterOng((prevState: any) => {
                      const updatedPublicoAlvo = new Set(
                        prevState.necessidades
                      );

                      if (updatedPublicoAlvo.has(option)) {
                        updatedPublicoAlvo.delete(option);
                      } else {
                        updatedPublicoAlvo.add(option);
                      }

                      return {
                        ...prevState,
                        necessidades: updatedPublicoAlvo,
                      };
                    });
                  }}
                  type="button"
                  className={`w-auto py-0 hover:bg-${registerOng.necessidades.has(option) ? "bg-[#FFCF33]" : "bg-[#EFEFF0]"} ${registerOng.necessidades.has(option) ? "bg-[#FFCF33]" : "bg-[#EFEFF0]"} text-[#19191B] focus:outline-none hover:bg-none`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </FormControl>
        </FormItem>
      ),
    },
    {
      id: "login",
      title: "Quase lá! Informe um email e senha para acessar a conta.",
      field: "login",
      image: "/images/img-7-var.svg",
      input: (
        <div className="flex flex-col gap-4">
          <FormItem className="flex flex-col">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                value={registerOng.login}
                onChange={(e) =>
                  setRegisterOng((prevState: any) => ({
                    ...prevState,
                    login: e.target.value,
                  }))
                }
              />
            </FormControl>
          </FormItem>
          <FormItem className="flex flex-col">
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={viewPassword ? "text" : "password"}
                  value={registerOng.senha}
                  onChange={(e) =>
                    setRegisterOng((prevState: any) => ({
                      ...prevState,
                      senha: e.target.value,
                    }))
                  }
                />
                {viewPassword ? (
                  <FiEyeOff
                    onClick={handleView}
                    className="text-[#AFB1B6] absolute right-4 bottom-1/4 w-7 h-6"
                  />
                ) : (
                  <FiEye
                    onClick={handleView}
                    className="text-[#AFB1B6] absolute right-4 bottom-1/4 w-7 h-6"
                  />
                )}
              </div>
            </FormControl>
          </FormItem>
        </div>
      ),
    },
  ];

  const totalSteps = steps.length;

  const onSubmit = () => {
    console.log(registerOng);
    setFinished(true);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onSubmit();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
    if (finished) {
      setFinished(false);
    }
  };

  return (
    <div className="h-screen px-4 overflow-hidden">
      {finished ? (
        <>
          <div className="flex flex-row items-center w-full mt-8 mb-12 gap-4">
            <Button
              className="p-0"
              variant="icon"
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
            >
              <GoArrowLeft className="w-7 h-7" />
            </Button>
            <div className="h-2 w-3/4">
              <Progress
                className="bg-[#9DEEBC]"
                value={(currentStep / (totalSteps - 1)) * 100}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between content-center h-[82%]">
            <div className="text-[#19191B] text-2xl flex flex-col items-center gap-10">
              <h2 className="text-center">Tudo Pronto!</h2>
              <div className="w-full h-64 flex justify-center">
                <img src={"/images/img-7.svg"} />
              </div>
              <p className="text-2xl text-center w-[75%]">
                Que tal personalizar o perfil da <b>{registerOng.nome}</b> para
                atingir ainda mais pessoas?
              </p>
            </div>
            <div className="w-full flex justify-center">
              <Button className="w-[92%]">Vamos nessa!</Button>
            </div>
          </div>
        </>
      ) : (
        <Form {...form}>
          <div className="flex flex-row items-center w-full mt-8 mb-12 gap-4">
            <Button
              className="p-0"
              variant="icon"
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
            >
              <GoArrowLeft className="w-7 h-7" />
            </Button>
            <div className="h-2 w-3/4">
              <Progress value={(currentStep / (totalSteps - 1)) * 100} />
            </div>
          </div>

          <div className="text-[#19191B] text-2xl flex flex-col items-center gap-10">
            <h2 className="text-center">{steps[currentStep].title}</h2>
            <div className="w-full h-64 flex justify-center">
              <img src={steps[currentStep].image} />
            </div>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 h-[44%] p-4 flex flex-col justify-between"
          >
            {steps[currentStep].input}
            {/* <FormField
            control={form.control}
            name={}
            render={({ field }) => steps[currentStep].input(field)}
          /> */}

            <Button
              className="w-10/12 absolute bottom-12"
              type={currentStep === totalSteps - 1 ? "submit" : "button"}
              onClick={handleNextStep}
            >
              {currentStep === totalSteps - 1 ? "Finalizar" : "Continuar"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}

// const MapInput = ({ label, field }: { label: string; field: any }) => {

//   return (

//   );
// };
