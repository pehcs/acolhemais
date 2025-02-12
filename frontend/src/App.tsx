import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import OngRegister from "@/pages/ong/register/ong-register.tsx";
import OngProfileUpdate from "@/pages/ong/profile/ong-profile-update.tsx";
import LoginApp from "@/pages/login/login.tsx";
<<<<<<< HEAD
import HomeApp from './pages/home/home';
=======
import HomePage from "@/pages/home/home.tsx";
import OngProfile from "@/pages/ong/profile/ong-profile.tsx";
import OngAdminProfile from "@/pages/ong/profile/ong-admin-profile.tsx";
import AcoesOng from './pages/acao/acoes_ong/acoes-ong';
>>>>>>> d3ab44e4ec01eda5550663a4c7751a152610ca37

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
<<<<<<< HEAD
                    <Route path="/" element={<HomeApp/>}/>
=======
                    <Route path="/" element={<HomePage/>}/>
>>>>>>> d3ab44e4ec01eda5550663a4c7751a152610ca37
                    <Route path="/login" element={<LoginApp/>}/>
                    <Route path="/ong/register" element={<OngRegister/>}/>
                    <Route path="/ong/admin/:id" element={<OngAdminProfile/>}/>
                    <Route path="/ong/:id" element={<OngProfile/>}/>
                    <Route path="/ong/admin/:id/config" element={<OngProfileUpdate/>}/>
                    <Route path="/ong/admin/:id/acoes" element={<AcoesOng/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </QueryClientProvider>
    )
}

export default App
