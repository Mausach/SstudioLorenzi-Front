import authApi from '../../../api/authApi';
import Swal from 'sweetalert2';


export const cargarProyectsDB = async (setCargarProyectos, navigate,) => {
    try {
        const resp = await authApi.get('/admin/proyects');

        setCargarProyectos(resp.data.proyectos);
        console.log(resp.data.proyectos)
        
        
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