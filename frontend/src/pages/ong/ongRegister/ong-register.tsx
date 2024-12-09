import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form";
  import { GoArrowLeft } from "react-icons/go";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { Input } from "@/components/ui/input";
  import { Progress } from "@/components/ui/progress";
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  
  const formSchema = z.object({
    nome: z.string(),
    data_criacao: z.string().optional(),
    cnpj: z.string().optional(),
    localizacao: z.string().optional(),
    publico_alvo: z.string().optional(),
    necessidades: z.string().optional(),
    login: z.string().optional(),
  });
  
  export default function OngRegister() {
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
      },
    });
  
    const [currentStep, setCurrentStep] = useState(0);
  
    const steps: { id: string; title: string; label?: string; field: keyof z.infer<typeof formSchema>; image: string }[] = [
        {
           id: "NOME",
           title: "Qual o nome da sua ONG?",
           label: "Nome",
           field: "nome",
           image: "/images/img-4.svg"
        },
        {
           id: "DATA_DE_CRIACAO",
           title: "Em que ano a ONG foi criada?", 
           field: "data_criacao",
           image: "/images/img-5.svg"
        },
        {
           id: "CNPJ",
           title: "Por favor, informe o CNPJ da ONG, caso ela tenha um.",
           label: "CNPJ",
           field: "cnpj",
           image: "/images/img-9.svg"
        },
        {
           id: "LOCALIZACAO",
           title: "Onde a ONG se localiza?",
           label: "Endereço ou CEP",
           field: "localizacao",
           image: "/images/img-6.svg"
        },
        {
           id: "PUBLICO_ALVO",
           title: "Selecione o(s) público(s) alvo da sua ONG.",
           field: "publico_alvo",
           image: "/images/img-7.svg"
        },
        {
           id: "NECESSIDADES",
           title: "Selecione a(s) causa(s) que sua ONG atende.",
           field: "necessidades",
           image: "/images/img-8.svg"
        },
        {
           id: "login",
           title: "Quase lá! Informe um email e senha para acessar a conta.",
           field: "login",
           image: "/images/img-7-var.svg"
        }
     ];
  
    const totalSteps = steps.length;
  
    const onSubmit = (values: z.infer<typeof formSchema>) => {
      console.log(values);
    };
  
    const handleNextStep = () => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        form.handleSubmit(onSubmit)();
      }
    };
  
    const handlePreviousStep = () => {
      if (currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
      }
    };
  
    return (
      <div className="h-screen px-4">
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
            <FormField
              control={form.control}
              name={steps[currentStep].field}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{steps[currentStep].label}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
  
            <Button
              className="w-full"
              type={currentStep === totalSteps - 1 ? "submit" : "button"}
              onClick={handleNextStep}
            >
              {currentStep === totalSteps - 1 ? "Finalizar" : "Continuar"}
            </Button>
          </form>
        </Form>
      </div>
    );
  }
  