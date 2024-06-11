import authApi from '../../../api/authApi';
import swal from 'sweetalert2';

export const delProEnBD = async ( proyectId,setNuevoProyect) => {
    try {

        const resp = await authApi.delete(`/admin/delete-project/${proyectId}`);
        // Realizar la solicitud POST a la API para guardar el proyecto
       

        // Puedes manejar la respuesta si es necesario
        console.log('Proyecto Eliminadola base de datos:', resp.data);
        swal.fire("Erfolg", "das Projekt wurde gelöscht", "success");
        setNuevoProyect(true)
        

        

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
//armar guardado