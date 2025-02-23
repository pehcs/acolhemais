import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {QueryClient, QueryClientProvider} from "react-query";
import OngProfile from "@/pages/ong/profile/ong-profile.tsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import OngRegister from "@/pages/ong/register/ong-register.tsx";
import OngProfileUpdate from "@/pages/ong/profile/ong-profile-update.tsx";

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" component={<h1>Home</h1>}/>
                    <Route path="/ong" element={<OngRegister/>}/>
                    <Route path="/ong/admin/:id" element={<OngProfile/>}/>
                    <Route path="/ong/admin/:id/config" element={<OngProfileUpdate/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </QueryClientProvider>
    )
}

export default App
