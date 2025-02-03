import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import OngRegister from "@/pages/ong/register/ong-register.tsx";
import OngProfileUpdate from "@/pages/ong/profile/ong-profile-update.tsx";
import LoginApp from "@/pages/login/login.tsx";
import HomePage from "@/pages/home/home.tsx";
import OngProfile from "@/pages/ong/profile/ong-profile.tsx";
import OngAdminProfile from "@/pages/ong/profile/ong-admin-profile.tsx";

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginApp/>}/>
                    <Route path="/ong/register" element={<OngRegister/>}/>
                    <Route path="/ong/admin/:id" element={<OngAdminProfile/>}/>
                    <Route path="/ong/:id" element={<OngProfile/>}/>
                    <Route path="/ong/admin/:id/config" element={<OngProfileUpdate/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </QueryClientProvider>
    )
}

export default App
