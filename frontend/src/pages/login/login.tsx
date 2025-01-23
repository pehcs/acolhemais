import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {api} from "@/utils/api.ts";
import {Ong} from "@/pages/ong/@types/Ong.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useEffect, useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FaArrowLeft} from "react-icons/fa";
import {FiLogOut} from "react-icons/fi";
import {TbEdit} from "react-icons/tb";

import { IoSettingsOutline } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";

export default function LoginApp() {
    
    const circle = {
        svg: (
          <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="250" cy="-50" rx="410" ry="410" fill="#2F49F3" />
          </svg>
        )
    };

    return (
        <div className="h-screen px-4 overflow-hidden">
            <div className="fixed top-0 left-0 w-full h-[440px] z-[-1] pointer-events-none">
                {circle.svg}
            </div>

            <div className="flex flex-row items-center w-full mt-8 gap-4">
                    <Button
                        className="p-0 w-2/12 text-[#FAFAFA]"
                        variant="icon"
                        type="button"
                    >
                        <GoArrowLeft className="w-7 h-7"/>
                    </Button>  
                <h1 className="text-[#FAFAFA] text-xl w-8/12 text-center">Acolhe +</h1>
                <div className="w-2/12"></div>
            </div>

            <div className="flex flex-col items-center w-full mt-3 mb-12 gap-4">
                    
                <h1 className="text-[#FAFAFA] text-3xl text-center mb-4">Bem-vindo!</h1>
                <img src="/images/img-1.png" alt="" />
            </div>
            





        </div>
    );
}