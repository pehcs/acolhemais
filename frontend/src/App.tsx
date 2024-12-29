import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {QueryClient, QueryClientProvider} from "react-query";
import OngProfile from "@/pages/ong/profile/ong-profile.tsx";

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <OngProfile/>
            <ToastContainer/>
        </QueryClientProvider>
    )
}

export default App
