import authApi from '../../../api/authApi';
import swal from 'sweetalert2';

export const delClientEnBD = async ( clientId,setNuevoClient, navigate) => {
    try {

        const resp = await authApi.delete(`/admin/delete-client/${clientId}`);
        // Realizar la solicitud POST a la API para guardar el proyecto
       

        // Puedes manejar la respuesta si es necesario
        console.log('cliente eliminado de la base de datos:', resp.data);
        swal.fire("Erfolg", "der Kunde wurde entfernt", "success");
        setNuevoClient(true)
        
        navigate('/MainSL');

        

        // Puedes devolver la respuesta u otra lógica según tus necesidades
        return resp.data;
    } catch (error) {
        console.error(error.response.data.msg);

        // Mostrar un mensaje de error utilizando swal
        swal.fire("FEHLER", error.response.data.msg, "error");

        // Puedes lanzar el error nuevamente para que sea manejado en la función llamante
        throw error;
    }
};
