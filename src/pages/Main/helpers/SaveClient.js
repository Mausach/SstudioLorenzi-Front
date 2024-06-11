import authApi from '../../../api/authApi';
import swal from 'sweetalert2';

export const guardarClientEnBD = async (companyName,
    clientName,
    address,
    postalCode,
    webSite,
    customerEmail,
    clientsDateOfBirth,
    abbreviation,
    brandEmail,
    hostingServer,
    serverName,
    loginCreds,
    mobileNr,
    phoneNr,setNuevoClient,setOpcionSeleccionada) => {
    try {
        // Realizar la solicitud POST a la API para guardar el proyecto
        const resp = await authApi.post('/admin/new-Client',{
            companyName,
            clientName,
            address,
            postalCode,
            webSite,
            customerEmail,
            clientsDateOfBirth,
            abbreviation,
            brandEmail,
            hostingServer,
            serverName,
            loginCreds,
            mobileNr,
            phoneNr,
        });

        // Puedes manejar la respuesta si es necesario
        console.log('nuevo cliente guardado en la base de datos:', resp.data);
        swal.fire("Erfolg", "der neue Kunde wurde gespeichert", "success");
        setNuevoClient(true)
        setOpcionSeleccionada('clients')

        // Puedes devolver la respuesta u otra lógica según tus necesidades
        return resp.data;
    } catch (error) {
        console.error(error.response.data.msg);

        // Mostrar un mensaje de error utilizando swal
        swal.fire("FEHLER", "verifique por favor que todos los campos esten completos incluyengo @ y .com", "error");

        // Puedes lanzar el error nuevamente para que sea manejado en la función llamante
        throw error;
    }
};
//armar guardado
