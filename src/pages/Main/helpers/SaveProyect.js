import authApi from '../../../api/authApi';
import swal from 'sweetalert2';

export const guardarProyectoEnBD = async (companyName,address,task,taskDescription,formDate,untilDate,madeDate,resposiblePerson,weekDuration,hourDuration,costs,costsGoogle,clientId,status,setNuevoProyect,setOpcionSeleccionada) => {
    try {
        // Realizar la solicitud POST a la API para guardar el proyecto
        const resp = await authApi.post('/admin/new-Proyect',{
            companyName,
            address,
            task,
            taskDescription,
            formDate,
            untilDate,
            madeDate,
            resposiblePerson,
            weekDuration,
            hourDuration,
            costs,
            costsGoogle,
            clientId,
            status
        });

        // Puedes manejar la respuesta si es necesario
        console.log('Proyecto guardado en la base de datos:', resp.data);
        swal.fire("Erfolg", "das neue Projekt wurde gespeichert", "success");
        setNuevoProyect(true)
        setOpcionSeleccionada('proyect')

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
