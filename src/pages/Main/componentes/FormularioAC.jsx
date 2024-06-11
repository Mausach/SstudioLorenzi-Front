import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import swal from 'sweetalert2';
import { guardarClientEnBD } from '../helpers/SaveClient';


export const FormularioAC = ({ cargarClientes, setNuevoClient, setOpcionSeleccionada,theme }) => {

    const [clienteEditar, setClienteEditar] = useState({
        companyName: '',
        clientName: '',
        address: '',
        postalCode: '',
        webSite: '',
        customerEmail: '',
        clientsDateOfBirth: '',
        abbreviation: '',
        brandEmail: '',
        hostingServer: '',
        serverName: '',
        loginCreds: '',
        mobileNr: '',
        phoneNr: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setClienteEditar(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const onSubmitForCliente = async (e) => {
        e.preventDefault();

        const { companyName, clientName, address, postalCode, webSite, customerEmail, clientsDateOfBirth,
            abbreviation, brandEmail, hostingServer, serverName, loginCreds, mobileNr, phoneNr } = clienteEditar;
            console.log("Estado del formulario:", clienteEditar);

        if (
            companyName === '' ||
            clientName === '' ||
            address === '' ||
            postalCode === '' ||
            webSite === '' ||
            customerEmail === '' ||
            clientsDateOfBirth === '' ||
            abbreviation === '' ||
            brandEmail === '' ||
            hostingServer === '' ||
            serverName === '' ||
            loginCreds === '' ||
            mobileNr === '' ||
            phoneNr === ''
        ) {
            swal.fire({
                title: "Alle Felder sind obligatorisch",
                icon: "error",
            });
        } else {

            guardarClientEnBD(
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
                setNuevoClient,
                 setOpcionSeleccionada
            );

        }
    };

    return (
        <div>
            <Form onSubmit={onSubmitForCliente}>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="companyName">
                            <Form.Label>Firmenname:</Form.Label>
                            <Form.Control type="text" value={clienteEditar.companyName} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="clientName">
                            <Form.Label>Name des Kunden:</Form.Label>
                            <Form.Control type="text" value={clienteEditar.clientName} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="address">
                            <Form.Label>Adresse:</Form.Label>
                            <Form.Control type="text" value={clienteEditar.address} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="postalCode">
                            <Form.Label>Postleitzahl:</Form.Label>
                            <Form.Control type="text" value={clienteEditar.postalCode} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="webSite">
                            <Form.Label>Website:</Form.Label>
                            <Form.Control type="text" value={clienteEditar.webSite} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="customerEmail">
                            <Form.Label>Kunden-E-Mail:</Form.Label>
                            <Form.Control type="email" value={clienteEditar.customerEmail} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="clientsDateOfBirth">
                            <Form.Label>Geburtsdatum des Kunden:</Form.Label>
                            <Form.Control type="date" value={clienteEditar.clientsDateOfBirth} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="abbreviation">
                            <Form.Label>Abkürzung:</Form.Label>
                            <Form.Control type="text" value={clienteEditar.abbreviation} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="brandEmail">
                            <Form.Label>Unternehmen Mail:</Form.Label>
                            <Form.Control type="email" value={clienteEditar.brandEmail} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="hostingServer">
                            <Form.Label>Hosting:</Form.Label>
                            <Form.Control type="text" value={clienteEditar.hostingServer} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="serverName">
                            <Form.Label>Name des Servers:</Form.Label>
                            <Form.Control type="text" value={clienteEditar.serverName} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="loginCreds">
                            <Form.Label>Zugangsberechtigungen:</Form.Label>
                            <Form.Control type="text" value={clienteEditar.loginCreds} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="mobileNr">
                            <Form.Label>Handynummer:</Form.Label>
                            <Form.Control type="text" value={clienteEditar.mobileNr} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="phoneNr">
                            <Form.Label>Rufnummer:</Form.Label>
                            <Form.Control type="text" value={clienteEditar.phoneNr} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Button variant="primary" type="submit"
                        className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}>
                            <i className="bi bi-floppy"></i>
                            <br />
                            Kunde speichern
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
