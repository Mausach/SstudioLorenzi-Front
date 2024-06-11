import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Logo from '../../../assets/sl_logo.png'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';//para cuando falte un dato
import { starLogin } from '../helpers/StartLogin';

export const CardLogin = ({ theme }) => {

  //capturemos datos del formulario
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const [alert, setAlert] = useState({ show: false, variant: '', message: '' }); // Estado para manejar la alerta

  const navigate = useNavigate();


  const onSubmit = (e) => {
    e.preventDefault();
    if (
      user.userName.trim() === "" ||
      user.password.trim() === "") {
        console.log("faltan datos")
        setAlert({ show: true, variant: 'danger', message: 'Falscher Benutzername oder falsches Passwort' });
        
    } else {
      
      starLogin(user.userName, user.password, navigate);//llama al metodo starLogin del helper 
    }
  }

  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  //escucha constantemente para las alertas
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => setAlert({ ...alert, show: false }), 3000); // Oculta la alerta después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [alert]);





  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className={`p-3 m-5 ${theme === 'lights' ? 'card-light' : 'card-dark'} card-with-shadow`} style={{ width: '600px' }}>

        <Card.Body>

          <div className="text-center mb-3">
            <img src={Logo} alt="Descripción de la imagen" className="rounded-circle" style={{ width: '100px', height: '100px' }} />
          </div>

          <div className="text-center m-3 ">
            <h2 className="fw-bold">LOGIN</h2>

            <Card.Text >
              Bitte geben Sie Ihre Anmeldedaten ein.
            </Card.Text>

          </div>

          {alert.show && (
            <Alert
              variant={alert.variant}
              onClose={() => setAlert({ ...alert, show: false })}
              dismissible
              className={alert.variant === 'danger' ? 'transparent-red-alert' : 'transparent-green-alert'}
            >
              <Alert.Heading>{alert.variant === 'danger' ? 'Oh snap! You got an error!' : 'Success!'}</Alert.Heading>
              <p>{alert.message}</p>
            </Alert>
          )}


          <Form onSubmit={onSubmit}>

          <Form.Group className="mb-3" >

<Form.Label >benutzername</Form.Label>
<Form.Control 
type="text" 
name='userName' 
placeholder="benutzername" 
maxLength={30} 
value={user.userName} 
onChange={onInputChange} />

</Form.Group>

<Form.Group className="mb-3" >
<Form.Label htmlFor="inputPassword5">Passwort</Form.Label>
<Form.Control
type="password"
name='password'
placeholder="****"
aria-describedby="passwordHelpBlock"
value={user.password} 
onChange={onInputChange}
/>

</Form.Group>



<Form.Group className="d-flex justify-content-center align-items-center mt-4 " >

<Button
  className={` w-100 ${theme === 'lights' ? 'btn-light' : 'custom-button'}`}
  type="submit"
/* onClick={handleChangeTheme} */
>
  <h6 className={theme === 'lights' ? '' : ''}>
    EINLOGGEN</h6>
</Button>


</Form.Group>

          </Form>

         


        </Card.Body>

      </Card>
    </div>
  )
}
