import { useNavigate } from 'react-router-dom';

function CadastroONG() {
    const navigate = useNavigate(); // Hook para navegação

    const handleCadastrarClick = () => {
        navigate('/NomeONG'); // Altere para o caminho desejado
    };

    return (
        <div>
            <h1>CadastroONG</h1>
            <button onClick={handleCadastrarClick}>Cadastrar ONG</button>
        </div>
    );
}

export default CadastroONG;
