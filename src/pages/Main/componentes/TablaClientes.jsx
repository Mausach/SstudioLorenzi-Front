import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Button, Pagination } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import swal from 'sweetalert2';
import { updateClientEnBD } from '../helpers/StartEditClient';

import { delClientEnBD } from '../helpers/DelClient';

export const TablaClients = ({ cargarClientes, setNuevoClient, navigate, theme }) => {



    // Para editar los datos de los clientes
    const [clientEditar, setClientEditar] = useState({});

    const [clientEliiminar, setClientEliminar] = useState({});


    // Estado para el acordeón abierto
    const [activeAccordion, setActiveAccordion] = useState(null);

    // Comienzo paginado
    // Estado para la página actual y filas por página
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Calcular el índice de las filas a mostrar en la página actual
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = cargarClientes.slice(indexOfFirstRow, indexOfLastRow);

    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(cargarClientes.length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Función para manejar el cambio de acordeón
    const handleAccordionToggle = (eventKey) => {
        setActiveAccordion(eventKey === activeAccordion ? null : eventKey);
        const client = cargarClientes.find(client => client.clientId.toString() === eventKey);
        if (client) {
            setClientEditar(client);
            setClientEliminar(client)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientEditar({ ...clientEditar, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateClientEnBD(
                clientEditar.clientId,
                clientEditar.companyName,
                clientEditar.clientName,
                clientEditar.address,
                clientEditar.postalCode,
                clientEditar.webSite,
                clientEditar.customerEmail,
                clientEditar.clientsDateOfBirth,
                clientEditar.abbreviation,
                clientEditar.brandEmail,
                clientEditar.hostingServer,
                clientEditar.serverName,
                clientEditar.loginCreds,
                clientEditar.mobileNr,
                clientEditar.phoneNr,

            );
            swal.fire("Erfolg", "Der Client wurde erfolgreich aktualisiert", "success");
        } catch (error) {
            console.error("Error al avtualizar datos de el cliente:", error);
            swal.fire("ERROR", "Beim Speichern des Mandanten in der Datenbank ist ein Fehler aufgetreten.", "error");
        }
    };

    const eliminar = (clientId) => {


        swal.fire({
            title: 'Sind Sie sicher?',
            text: 'Einmal gelöscht, können Sie diesen Client nicht mehr wiederherstellen.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ja, löschen',
            cancelButtonText: 'Abbrechen'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, llamar a la función para eliminar el proyecto
                delClientEnBD(clientId, setNuevoClient, navigate)



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
                        swal.fire('Falsch!', 'Beim Löschen des Clients ist ein Fehler aufgetreten.', 'error');
                    });

            }
        });

    };



    return (
        <div className="p-5 p-sm-4">
            <table className={`${theme === 'lights' ? 'lights-theme' : 'darks-theme'} custom-table`}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Kunden</th>
                        <th></th>
                        <th>Adresse</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Abkürzung</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((client, index) => (
                        <React.Fragment key={client.clientId}>
                            <tr>
                            <td>
                                    <Button
                                    className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}>
                                    {index + 1}
                                    </Button>
                                
                                </td>
                                <td colSpan="9">
                                    <Accordion className="w-100" activeKey={activeAccordion} onSelect={handleAccordionToggle}>
                                        <Accordion.Item eventKey={client.clientId.toString()}>
                                            <Accordion.Header>
                                                <div className="d-flex w-100 justify-content-between">
                                                    <div className="me-3">{client.companyName}</div>
                                                    <div className="me-3">{client.clientName}</div>
                                                    <div className="me-3">{client.address}</div>
                                                    <div className="me-3">{client.brandEmail}</div>
                                                    <div className="me-3">{client.abbreviation}</div>
                                                    <div className="me-3">{client.phoneNr}</div>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}>
                                                <Form onSubmit={handleSubmit} className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}>
                                                    <Row className="mb-3">
                                                        <Col md={4}>
                                                            <Form.Group controlId="formCompanyName">
                                                                <Form.Label>Firmenname:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="companyName"
                                                                    value={clientEditar.companyName || ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group controlId="formClientName">
                                                                <Form.Label>Name des Kunden:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="clientName"
                                                                    value={clientEditar.clientName || ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group controlId="formAddress">
                                                                <Form.Label>Adresse:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="address"
                                                                    value={clientEditar.address || ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col md={4}>
                                                            <Form.Group controlId="formPostalCode">
                                                                <Form.Label>Postleitzahl:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="postalCode"
                                                                    value={clientEditar.postalCode || ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group controlId="formWebSite">
                                                                <Form.Label>Website:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="webSite"
                                                                    value={clientEditar.webSite || ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group controlId="formCustomerEmail">
                                                                <Form.Label>Kunden-E-Mail:</Form.Label>
                                                                <Form.Control
                                                                    type="email"
                                                                    name="customerEmail"
                                                                    value={clientEditar.customerEmail || ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col md={4}>
                                                            <Form.Group controlId="formClientsDateOfBirth">
                                                                <Form.Label>Geburtsdatum des Kunden:</Form.Label>
                                                                <Form.Control
                                                                    type="date"
                                                                    name="clientsDateOfBirth"
                                                                    value={clientEditar.clientsDateOfBirth ? new Date(clientEditar.clientsDateOfBirth).toISOString().split('T')[0] : ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group controlId="formAbbreviation">
                                                                <Form.Label>Abkürzung:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="abbreviation"
                                                                    value={clientEditar.abbreviation || ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group controlId="formBrandEmail">
                                                                <Form.Label>Unternehmen Mail:</Form.Label>
                                                                <Form.Control
                                                                    type="email"
                                                                    name="brandEmail"
                                                                    value={clientEditar.brandEmail || ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col md={4}>
                                                            <Form.Group controlId="formHostingServer">
                                                                <Form.Label>Hosting:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="hostingServer"
                                                                    value={clientEditar.hostingServer || ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group controlId="formServerName">
                                                                <Form.Label>Name des Servers:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="serverName"
                                                                    value={clientEditar.serverName || ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group controlId="formLoginCreds">
                                                                <Form.Label>Zugangsberechtigungen:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="loginCreds"
                                                                    value={clientEditar.loginCreds || ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col md={4}>
                                                            <Form.Group controlId="formMobileNr">
                                                                <Form.Label>Handynummer:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="mobileNr"
                                                                    value={clientEditar.mobileNr || ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group controlId="formPhoneNr">
                                                                <Form.Label>Rufnummer:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="phoneNr"
                                                                    value={clientEditar.phoneNr || ''}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col>
                                                            <Button variant="primary" type="submit"
                                                                className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}>
                                                                <i className="bi bi-floppy"></i>
                                                                <br />
                                                                Update
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    <hr />

                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </td>
                                <td>
                                    <Button onClick={() => eliminar(client.clientId)}
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
}
