import authApi from '../../../api/authApi';
import Swal from 'sweetalert2';


export const cargarClientsDB = async (setsetCargarClientes, navigate,) => {
    try {
        const resp = await authApi.get('/admin/clients');

        setsetCargarClientes(resp.data.clientes);
        console.log(resp.data.clientes)
        
    } catch (error) {
        console.log(error.response.data.msg);
        Swal.fire("Fehler", error.response.data.msg, "error");
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/*');
        }else if(error.response.status === 404){
            navigate('/MainSL')
        }
    }
};