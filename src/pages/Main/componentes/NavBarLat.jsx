import React from 'react'
import { Sidebar, Menu, } from 'react-pro-sidebar';
import { Button, Container } from 'react-bootstrap';
import Logo from '../../../assets/sl_logo.png'



export const NavBarLat = ({ isCollapsed, onToggle, userName, theme,setOpcionSeleccionada }) => {

    const renderProyect = () => {
        setOpcionSeleccionada('proyect');
      };

      const renderClients = () => {
        setOpcionSeleccionada('clients');
      };

      const renderArch = () => {
        setOpcionSeleccionada('Archivados');
      };
    return (
        <div style={{ display: 'flex', height: '100vh' }} >
            
            <Sidebar collapsed={isCollapsed}>
                
                <Menu  className={`${theme === 'lights' ? 'sidebar-body-light' : 'sidebar-body-dark'}`} style={{ display: 'flex', height: '100vh' }}>
          <div className={`sidebar-header d-flex align-items-center justify-content-between px-3 py-2 ${theme === 'lights' ? 'navbar-header-light' : 'navbar-header-dark'} p-4`}
          
          
          >
            {!isCollapsed && <img src={Logo} alt="Logo" className="rounded-circle" style={{ width: '50px', height: '50px' }} />}
            {!isCollapsed && (
              <span className="username ms-2">
                <h6>Studio Lorenzi</h6>
              </span>
            )}
            <Button variant="dark" onClick={onToggle} 
            className={`btn btn-${theme === 'lights' ? 'darks' : 'lights'} btn-theme rounded-circle border-0 collapse-button ms-auto`}>
                
              <i className="bi bi-list"></i>
            </Button>
            <hr />
          </div>

         
          <div >

          <h4 className="text-center mb-3 mt-3">{userName}</h4>
        
        <Container>
        <div className="m-3">
  <Button
    className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}
    type="submit"
    onClick={renderProyect}
  >
    <h5>
      <i className="bi bi-diagram-2"> </i>
      {!isCollapsed && <span>Projekt</span>}
    </h5>
  </Button>
</div>

<div className="m-3">
  <Button
    className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}
    type="submit"
    onClick={renderClients}
  >
    <h5>
      <i className="bi bi-people"> </i>
      {!isCollapsed && <span>Kunden</span>}
    </h5>
  </Button>
</div>

<div className="m-3">
  <Button
    className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}
    type="submit"
    onClick={renderArch}
  >
    <h5>
      <i className="bi bi-archive"> </i>
      {!isCollapsed && <span>Archiv</span>}
    </h5>
  </Button>
</div>


        </Container>


{!isCollapsed && (
  <div className={`mt-auto text-center position-absolute bottom-0 w-100 p-3 ${theme === 'lights' ? 'navbar-footer-light' : 'navbar-footer-dark'}`}>
    <span className="fw-bold">Rechte</span>
    <span className="ms-5">{userName}</span>
  </div>
)}

          </div>

          
        </Menu>

                
        
      </Sidebar>

        </div>
    );
};
