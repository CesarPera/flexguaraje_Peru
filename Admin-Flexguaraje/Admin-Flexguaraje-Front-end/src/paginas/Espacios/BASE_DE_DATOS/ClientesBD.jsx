import axios from "axios";

const baseURL = "http://localhost:8080/api/clientes";

export const listarClientes = async () => {
    const response = await axios.get(baseURL);
    return response.data;
};

export const agregarCliente = async (nuevoCliente) => {
    const response = await axios.post(baseURL, nuevoCliente);
    return response.data;
};