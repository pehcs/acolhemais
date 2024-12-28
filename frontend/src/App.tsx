import './index.css'
import OngRegister from './pages/ong/ongRegister/ong-register'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <OngRegister/>
            <ToastContainer/>
        </QueryClientProvider>
    )
}

export default App
