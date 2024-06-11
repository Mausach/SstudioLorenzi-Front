import authApi from '../../../api/authApi';
import Swal from 'sweetalert2';

export const starLogin = async (userName, password, navigate) => {
  try {
    const resp = await authApi.post('/auth/login', {
      userName,
      password,
    });
    

    localStorage.setItem('token', resp.data.token);

    
    navigate('/MainSL', { state: resp.data.userName });
    Swal.fire("Erfolg", "Logged in successfully!", "success");
  } catch (error) {
    if (error.response.status === 400) {
      Swal.fire("Fehler", error.response.data.msg, "error");
    } else {
      console.log(error);
      Swal.fire("Error", "An unexpected error occurred", "error");
    }
  }
}