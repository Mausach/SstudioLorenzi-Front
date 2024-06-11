import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Button, Pagination } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import swal from 'sweetalert2';
import { ArchivarEnBD } from '../helpers/Archivar';
import { delProEnBD } from '../helpers/DelProyect';
import { useNavigate } from 'react-router-dom';

export const TablaArchivados = ({cargarProyectos, setNuevoProyect,theme}) => {
  const navigate = useNavigate();

 // Para editar los datos de los proyectos
 const [proyectoEditar, setProyectoEditar] = useState({});

 // Estado para el acordeón abierto
 const [activeAccordion, setActiveAccordion] = useState(null);

 // Filtrar proyectos con status en true
const proyectosFiltrados = cargarProyectos.filter(proyecto => proyecto.status === true);

 // Estado para la página actual y filas por página
 const [currentPage, setCurrentPage] = useState(1);
 const rowsPerPage = 5;

 // Calcular el índice de las filas a mostrar en la página actual
 const indexOfLastRow = currentPage * rowsPerPage;
 const indexOfFirstRow = indexOfLastRow - rowsPerPage;
 const currentRows = proyectosFiltrados.slice(indexOfFirstRow, indexOfLastRow);

 // Función para cambiar de página
 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 // Calcular el número total de páginas
 const pageNumbers = [];
 for (let i = 1; i <= Math.ceil(proyectosFiltrados.length / rowsPerPage); i++) {
     pageNumbers.push(i);
 }

 //para los botones de informe o mensaje
const [textoCampo, setTextoCampo] = useState('');

 // Función para manejar el cambio de acordeón
 const handleAccordionToggle = (eventKey) => {
     setActiveAccordion(eventKey === activeAccordion ? null : eventKey);
     const proyecto = cargarProyectos.find((proyecto) => proyecto.proyectId.toString() === eventKey);
     if (proyecto) {
         
         setProyectoEditar(proyecto);
         console.log(proyectoEditar)
     }
 };


 const eliminar = (proyectId) => {

     swal.fire({
         title: 'Sind Sie sicher?',
         text: 'Einmal gelöscht, können Sie dieses Projekt nicht mehr wiederherstellen.',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Ja, löschen',
         cancelButtonText: 'Abbrechen'
     }).then((result) => {
         if (result.isConfirmed) {
             // Si el usuario confirma, llamar a la función para eliminar el proyecto
             delProEnBD(proyectId, setNuevoProyect)
                 .then(resp => {
                     // Manejar la respuesta si es necesario
                     console.log(resp);
                     // Mostrar mensaje de éxito
                     swal.fire('Eliminiert!', 'Das Projekt wurde gelöscht.', 'success');
                 })
                 .catch(error => {
                     // Manejar el error si ocurre
                     console.error('Fehler beim Löschen des Projekts:', error);
                     // Mostrar mensaje de error
                     swal.fire('Falsch!', 'Beim Löschen des Projekts ist ein Fehler aufgetreten.', 'error');
                 });
         }
     });

 };
// Función para calcular la suma de los costos
const calcularTotalCostos = () => {
 return proyectosFiltrados.reduce((total, proyect) => total + parseFloat(proyect.costs)+parseFloat(proyect.costsGoogle), 0);
};
const totalCostos = calcularTotalCostos();

 const handleClickBoton1 = () => {
     setTextoCampo('Testbriefing 777');
   };
 
   const handleClickBoton2 = () => {
     setTextoCampo('Testbrief');
   };


   const onSubmitArchProy = (e) => {
     e.preventDefault();
 
     const { proyectId, companyName, address, task, taskDescription, formDate, untilDate, madeDate, resposiblePerson,
       weekDuration, hourDuration, costs, costsGoogle, clientId, status } = proyectoEditar;
 
 
     console.log("Estado del formulario:", proyectoEditar);
     if (
       proyectId === 0
 
     ) {
       swal.fire({
         title: "Alle Felder sind obligatorisch",
         icon: "error",
       });
     } else {
 
 
 
       // Llamar a la función para guardar en la base de datos
 
       ArchivarEnBD(
         proyectId,
         setNuevoProyect,
         navigate
 
       );

     }
   };

 
 return (
     <div className="p-5 p-sm-4">
         <table className={`${theme === 'lights' ? 'lights-theme' : 'darks-theme'} custom-table`}>
             <thead>
             <tr>
         <th> </th>
         <th>	</th>
         <th>Kunden</th>
         <th></th>
         <th>Aufgabe</th>
         <th></th>
         <th></th>
         <th></th>
         <th></th>
         <th></th>
         <th>Datum des Beginns</th>
         <th></th>
       </tr>
             </thead>
             <tbody>
                 {currentRows.map((proyecto, index) => (
                     <React.Fragment key={proyecto.proyectId}>
                         <tr>
                         <td>
                                    <Button
                                    className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}>
                                    {index + 1}
                                    </Button>
                                
                                </td>
                             <td colSpan="10">
                                 <Accordion className="w-100" activeKey={activeAccordion} onSelect={handleAccordionToggle}>
                                     <Accordion.Item eventKey={proyecto.proyectId.toString()}>
                                         <Accordion.Header>
                                             <div className="d-flex w-100 justify-content-between">
                                             <div className="me-3">{proyecto.companyName}</div>
                                                    
                                                    <div className="me-3">{proyecto.task}</div>
                                                    <div className="me-3">{proyecto.taskDescription}</div>
                                                    
                                                    <div className="me-3">{proyecto.untilDate}</div>
                                                    
                                                    <div className="me-3">{proyecto.costs}</div>
                                                    
                                             </div>
                                         </Accordion.Header>
                                         <Accordion.Body className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}>
                                             <Form className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}>
                                             <Row className="mb-3">
                         <Col md={4}>
                           <Form.Group controlId="formCompanyName">
                             <Form.Label>Firmenname:</Form.Label>
                             <Form.Control
                               as="select"
                               name="companyName"
                               value={proyectoEditar.companyName}
                               readOnly
                             >
                               {cargarProyectos.map((proyecto) => (
                                 <option key={proyecto.proyectId} value={proyecto.companyName}>
                                   {proyecto.companyName}
                                 </option>
                               ))}
                             </Form.Control>
                           </Form.Group>
                         </Col>
                         <Col md={4}>
                           <Form.Group controlId="formAddress">
                             <Form.Label>Adresse:</Form.Label>
                             <Form.Control
                               type="text"
                               name="address"
                               value={proyectoEditar.address}
                               readOnly
                             />
                           </Form.Group>
                         </Col>
                         <Col md={4}>
                           <Form.Group controlId="formTask">
                             <Form.Label>Aufgabe:</Form.Label>
                             <Form.Control
                               type="text"
                               name="task"
                               value={proyectoEditar.task}
                               readOnly
                             />
                           </Form.Group>
                         </Col>
                       </Row>
                       <Row className="mb-3">
                         <Col md={4}>
                           <Form.Group controlId="formTaskDescription">
                             <Form.Label>Aufgabe Beschreibung:</Form.Label>
                             <Form.Control
                               type="text"
                               name="taskDescription"
                               value={proyectoEditar.taskDescription}
                               readOnly
                             />
                           </Form.Group>
                         </Col>
                         <Col md={4}>
                           <Form.Group controlId="formFormDate">
                             <Form.Label>Datum des Beginns:</Form.Label>
                             <Form.Control
                               type="date"
                               name="formDate"
                               value={proyectoEditar.formDate}
                               readOnly
                             />
                           </Form.Group>
                         </Col>
                         <Col md={4}>
                           <Form.Group controlId="formUntilDate">
                             <Form.Label>Datum des Endes:</Form.Label>
                             <Form.Control
                               type="date"
                               name="untilDate"
                               value={proyectoEditar.untilDate}
                               readOnly
                             />
                           </Form.Group>
                         </Col>
                       </Row>
                       <Row className="mb-3">
                         <Col md={4}>
                           <Form.Group controlId="formResponsiblePerson">
                             <Form.Label>Verantwortliche Person:</Form.Label>
                             <Form.Control
                               type="text"
                               name="resposiblePerson"
                               value={proyectoEditar.resposiblePerson}
                               readOnly
                             />
                           </Form.Group>
                         </Col>
                         <Col md={4}>
                           <Form.Group controlId="formCosts">
                             <Form.Label>Kosten:</Form.Label>
                             <Form.Control
                               type="text"
                               name="costs"
                               value={proyectoEditar.costs}
                               readOnly
                             />
                           </Form.Group>
                         </Col>
                         <Col md={4}>
                           <Form.Group controlId="formCostsGoogle">
                             <Form.Label>Google Kosten:</Form.Label>
                             <Form.Control
                               type="text"
                               name="costsGoogle"
                               value={proyectoEditar.costsGoogle}
                               readOnly
                             />
                           </Form.Group>
                         </Col>
                       </Row>
                       <Row className="mb-3">
                         <Col>
                           <Button variant="primary" onClick={onSubmitArchProy}
                           className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}>
                             <i className="bi bi-floppy"> </i>
                             <br />
                             Unarchive
                           </Button>
                         </Col>
                       </Row>
                       <hr />
                       <Row className="mb-3">
                         <Col>
                           <Button variant="primary" onClick={handleClickBoton1}
                           className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}>
                             briefing
                             <i className="bi bi-plus"> </i>
                           </Button>
                         </Col>
                       </Row>
                       <Row className="mb-3">
                         <Col>
                           <Button variant="primary" onClick={handleClickBoton2}
                           className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}>
                             brief
                             <i className="bi bi-plus"> </i>
                           </Button>
                         </Col>
                         <Col>
                           <Form.Control
                             type="text"
                             value={textoCampo}
                             readOnly
                             className="form-control-lg"
                           />
                         </Col>
                       </Row>
                                                 <hr />
                                             </Form>
                                         </Accordion.Body>
                                     </Accordion.Item>
                                 </Accordion>
                             </td>
                             <td>
                                 <Button onClick={() => eliminar(proyecto.proyectId)}
                                     className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}>
                                     <strong className='font-weight-bold'>
                                         <h3>
                                             <i className="bi bi-trash3-fill"></i>
                                         </h3>
                                     </strong>
                                 </Button>
                             </td>
                         </tr>
                     </React.Fragment>
                 ))}
             </tbody>
         </table>
         <div className="d-flex flex-column align-items-end mt-4">
         <Button variant="primary" 
                              className={`w-25 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0 mb-3`}>
                               <h5 >Gesamtkosten: ${totalCostos.toFixed(2)}</h5>
                              </Button> 
             <Pagination>
                 {pageNumbers.map(number => (
                     <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                         {number}
                     </Pagination.Item>
                 ))}
             </Pagination>
         </div>
     </div>
 );
};
