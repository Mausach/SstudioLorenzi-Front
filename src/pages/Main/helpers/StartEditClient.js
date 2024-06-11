import authApi from '../../../api/authApi';
import swal from 'sweetalert2';

export const updateClientEnBD = async (
    clientId,
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
    phoneNr,) => {
    try {
        // Realizar la solicitud POST a la API para guardar el proyecto
        const resp = await authApi.put('/admin/client-edit',{
            clientId,
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
        console.log('cliente actualizado en la base de datos:', resp.data);
        swal.fire("Erfolg", "Die Kundendaten wurden aktualisiert", "success");
        
        

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
