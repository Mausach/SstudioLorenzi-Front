import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { NavBarLat } from './componentes/NavBarLat';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Accordion, Card, Button, Form, Row, Col, Container } from 'react-bootstrap';
import { cargarProyectsDB } from './helpers/CargarProyects';
import { FormullarioAP } from './componentes/FormullarioAP';
import { TablaClients } from './componentes/TablaClientes';
import { cargarClientsDB } from './helpers/CargarClients';
import { FormularioAC } from './componentes/FormularioAC';
import { TablaArchivados } from './componentes/TablaArchivados';
import { TablaProyectos } from './componentes/TablaProyectos';



export const MainSL = () => {

    //captura datos enviados del login
    const location = useLocation();

    let userName = location.state;

    const navigate = useNavigate();

    //const para el boton de cmabiar de tema
    const [theme, setTheme] = useState('lights');

    const handleChangeTheme = () => {
        const newTheme = theme === 'lights' ? 'darks' : 'lights';
        setTheme(newTheme);
        document.body.className = newTheme + '-theme';
    };

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Variable para controlar si la barra lateral está colapsada
const [sidebarOpen, setSidebarOpen] = useState(true); // Variable para controlar si la barra lateral está abierta

const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed); // Cambiar el estado de colapsado
    setSidebarOpen(!sidebarCollapsed); // Cambiar el estado de abierto basado en el estado de colapsado
};


    // Const para el offcanvas de react boostrap para el logout
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //metodo de log out
    const LogOut = () => {
        localStorage.removeItem('token');
        userName = null;
        navigate('/*')
    }

    //states para los clientes y proyectos
    const [cargarProyectos, setCargarProyectos] = useState([]);

    //estado para controlar si se cargan nuevos proyectos
    const [nuevoProyect, setNuevoProyect] = useState(false);

	
	const [cargarClientes, setCargarClientes] = useState([]);

    //estado para controlar si se cargan nuevos clientes
    const [nuevaClient, setNuevoClient] = useState(false);

	
	const [cargarArchivados, setCargarArchivados] = useState([]);


    //estado para controlar si se cargan nuevos archivados
    const [nuevoArchivado, setNuevoArchivado] = useState(false);

    

    
//estado para seleccion de menu
const [opcionSeleccionada, setOpcionSeleccionada] = useState('proyect');

//para canselar vuelve a la lista d eptoyects
const renderpro = () => {
    setOpcionSeleccionada('proyect');
  };

//para seleccionar el alta de proyecto
const renderAltaPro = () => {
    setOpcionSeleccionada('creatP');
  };

  //para seleccionar alta de cliente
  const renderAltaClie = () => {
    setOpcionSeleccionada('creatC');
  };

//funcion que va a renderizar las tablas o acordeones
const CargarTabla = () => {

    if (opcionSeleccionada === "proyect") {
        
          return (
            <Container>
                <div className='pt-5'>
                    <Row className="justify-content-between align-items-center mb-4">
                        <Col className="d-flex justify-content-center">
                            <h1>PROJEKT LISTE</h1>
                        </Col>
                        <Col className="d-flex justify-content-end">

                        <Button
                            className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}
                            type="submit"
                            onClick={renderAltaPro}
                        >

                            <h5 className={theme === 'lights' ? '' : ''}>
                            <i className="bi bi-plus"> </i>
                                <span>Neues Projekt</span></h5>
                        </Button>
                        
                            
                        </Col>
                    </Row>
                    <TablaProyectos cargarProyectos={cargarProyectos} setNuevoProyect={setNuevoProyect} theme={theme}/>
                </div>

            </Container>
                
            );
        }
    else if (opcionSeleccionada == "clients") {
        
        
           
        
            return (
                <Container>
                <div className='pt-5'>
                    <Row className="justify-content-between align-items-center mb-4">
                        <Col className="d-flex justify-content-center">
                            <h1>KUNDEN LISTE</h1>
                        </Col>
                        <Col className="d-flex justify-content-end">

                        <Button
                           className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}
                            type="submit"
                            onClick={renderAltaClie}
                        >

                            <h5 className={theme === 'lights' ? '' : ''}>
                            <i className="bi bi-plus"> </i>
                                <span>Neuer Kunde</span></h5>
                        </Button>
                        
                            
                        </Col>
                    </Row>
                    <TablaClients cargarClientes={cargarClientes} setNuevoClient={setNuevoClient}  navigate={navigate} theme={theme}/>
                </div>

            </Container>
            );
        }
     else if (opcionSeleccionada == "Archivados") {
        
        
            
        
            return (
                <Container>
                <div className='pt-5'>
                    <Row className="justify-content-between align-items-center mb-4">
                        <Col className="d-flex justify-content-center">
                            <h1>PROJEKT LISTE</h1>
                        </Col>
                        
                    </Row>
                    <TablaArchivados cargarProyectos={cargarProyectos} setNuevoProyect={setNuevoProyect} theme={theme}/>
                </div>

            </Container>
            );
        }

        else if (opcionSeleccionada == "creatP") {
        
                
            return (
                
                    <Container>
                <div className='pt-5'>
                    <Row className="justify-content-between align-items-center mb-4">
                        <Col className="d-flex justify-content-center">
                        <h1>Neues Projekt erfassen</h1>
                        </Col>
                        <Col className="d-flex justify-content-end">

                        <Button
                            className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}
                            type="submit"
                            onClick={renderpro}
                        >

                            <h5 className={theme === 'lights' ? '' : ''}>
                            <i className="bi bi-x"> </i>
                                <span>kündigen</span></h5>
                        </Button>
                        
                            
                        </Col>
                    </Row>
                    <FormullarioAP cargarProyectos={cargarProyectos} setNuevoProyect={setNuevoProyect} setOpcionSeleccionada={setOpcionSeleccionada} theme={theme}/>
                    
                </div>

            </Container>
                    
                
            );
        }

        else if (opcionSeleccionada == "creatC") {
        
                
            return (
                <Container>
                <div className='pt-5'>
                    <Row className="justify-content-between align-items-center mb-4">
                        <Col className="d-flex justify-content-center">
                        <h1>Neuer Kunde erfassen</h1>
                        </Col>
                        <Col className="d-flex justify-content-end">

                        <Button
                            className={` w-100 ${theme === 'lights' ? 'btn-light' : 'custom-button'}`}
                            type="submit"
                            onClick={renderpro}
                        >

                            <h5 className={theme === 'lights' ? '' : ''}>
                            <i className="bi bi-x"> </i>
                                <span>kündigen</span></h5>
                        </Button>
                        
                            
                        </Col>
                    </Row>
                    <FormularioAC cargarClientes={cargarClientes} setNuevoClient={setNuevoClient} setOpcionSeleccionada={setOpcionSeleccionada} theme={theme}/>
                    
                </div>

            </Container>
            );
        }
    }

    useEffect(() => {
        if (nuevoProyect) {
          cargarProyectsDB(setCargarProyectos, navigate,);//metodo al back para cargar proyectos
          setNuevoProyect(false);
        } else {
          cargarProyectsDB(setCargarProyectos, navigate,);//
        }

        if (nuevaClient) {
            cargarClientsDB(setCargarClientes, navigate,);//metodo al back para cargar proyectos
            setNuevoClient(false);
          } else {
            cargarClientsDB(setCargarClientes, navigate,);//
          }
      
        
      }, [nuevoProyect,nuevaClient]);


    return (

        <div className={`bg-${theme} text-${theme === 'lights' ? 'darks' : 'lights'} d-flex`}>


            
            <NavBarLat isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} userName={userName} theme={theme} setOpcionSeleccionada={setOpcionSeleccionada} />

            <div className="position-absolute top-0 end-0 d-flex gap-2">

                <Button variant="dark"
                    className={`btn btn-${theme === 'lights' ? 'darks' : 'lights'} btn-theme rounded-circle border-0`}
                    onClick={handleChangeTheme}
                >
                    {theme === 'lights' ? <i className="bi bi-moon text-dark"></i> : <i className="bi bi-brightness-high"></i>} {/* Alternar entre íconos de luna y sol */}
                </Button>

                <Button
                    variant="dark"
                    className={`btn btn-${theme === 'lights' ? 'darks' : 'lights'} btn-theme rounded-circle border-0`}
                    onClick={handleShow}

                >
                    {theme === 'lights' ? <i className="bi bi-person text-dark"></i> : <i className="bi bi-person"></i>}

                </Button>
            </div>

            <Offcanvas className={`${theme === 'lights' ? 'sidebar-body-light' : 'sidebar-body-dark'}`} show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>SL</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <h4>Benutzername</h4>
                    <h6>{userName}</h6>

                    <h4>Rechte</h4>
                    <h6>{userName}</h6>
                </Offcanvas.Body>

                <div className=" position-absolute bottom-0 w-100">
                    <hr></hr>
                    <div className='m-3'>
                        <Button
                            className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}
                            type="submit"
                            onClick={LogOut}
                        >

                            <h5 className={theme === 'lights' ? '' : ''}>
                                <i className="bi bi-box-arrow-right"> </i>
                                <span>Logout</span></h5>
                        </Button>

                    </div>
                </div>

            </Offcanvas>
            
            {CargarTabla()}

           

        </div>
    )

}
