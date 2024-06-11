import authApi from '../../../api/authApi';
import Swal from 'sweetalert2';

export const starRegister = async (userName, password, navigate) => {
  try {
    const resp = await authApi.post('/auth/new', {
      userName,
      password,
    });
    

    localStorage.setItem('token', resp.data.token);

    
    navigate('/*');
    Swal.fire("Erfolg", "creado con exsito", "success");
  } catch (error) {
    if (error.response.status === 400) {
      Swal.fire("Fehler", error.response.data.msg, "error");
    } else {
      console.log(error);
      Swal.fire("Error", "algo salio mal", "error");
    }
  }
}