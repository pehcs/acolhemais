import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {QueryClient, QueryClientProvider} from "react-query";
import OngProfile from "@/pages/ong/profile/ong-profile.tsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" component={<h1>Home</h1>}/>
                    <Route path="/ong/admin/:id" element={<OngProfile/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </QueryClientProvider>
    )
}

export default App
