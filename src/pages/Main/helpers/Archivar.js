import authApi from '../../../api/authApi';
import swal from 'sweetalert2';

export const ArchivarEnBD = async ( proyectId,setNuevoProyect,navigate) => {
    try {
        // Realizar la solicitud POST a la API para guardar el proyecto
        const resp = await authApi.put('/admin/project-update-status',{
            proyectId,
            
        });

        // Puedes manejar la respuesta si es necesario
        console.log('Proyecto Archivadoen la base de datos:', resp.data);
        swal.fire("Erfolg", "das Projekt wurde archiviert", "success");
        setNuevoProyect(true)
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
//armar guardado
