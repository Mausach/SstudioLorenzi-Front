import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import swal from 'sweetalert2';
import { guardarProyectoEnBD } from '../helpers/SaveProyect';

export const FormullarioAP = ({ cargarProyectos,setNuevoProyect,setOpcionSeleccionada,theme }) => {

    //dice proyectEditar pero son los metodos para guardar un proyecto
    const [proyectEditar, setProyectEditar] = useState({
        companyName: '',
        address: '',
        task: '',
        taskDescription: '',
        formDate: '',
        untilDate: '',
        madeDate:'',
        resposiblePerson: '',
        weekDuration:'',
        hourDuration: '',
        costs: '',
        costsGoogle: '',
        clientId:'',
        status:false,

    });

    const handleCompanyChange = (e) => {
        const selectedCompanyName = e.target.value;
        const selectedProyect = cargarProyectos.find(proyecto => proyecto.companyName === selectedCompanyName);
    
        setProyectEditar({
            ...proyectEditar,
            companyName: selectedCompanyName,
            address: selectedProyect ? selectedProyect.address : '',
            clientId: selectedProyect ? selectedProyect.clientId : '', // Asignar clientId
        });
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProyectEditar(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    //funcion que prueba si todos los datos se ingresaron y pasa a guardar el proyecto nuevo ala DB
    const onSubmitForProy = (e) => {
        e.preventDefault();

        const { companyName, address, task, taskDescription, formDate, untilDate,madeDate, resposiblePerson,
            weekDuration, hourDuration, costs, costsGoogle, clientId,status} = proyectEditar;

        
        console.log("Estado del formulario:", proyectEditar);
        if (
            companyName.length === 0 ||
            address.length === 0 ||
            task.length === 0 ||
            taskDescription.length === 0 ||
            formDate.length === 0 ||
            untilDate.length === 0 ||
            madeDate.length ===0 ||
            resposiblePerson.length === 0 ||
            weekDuration.length ===0 ||
            hourDuration.length ===0 ||
            costs.length === 0 ||
            costsGoogle.length === 0
        ) {
            swal.fire({
                title: "Alle Felder sind obligatorisch",
                icon: "error",
            });
        } else {



            // Llamar a la función para guardar en la base de datos
            guardarProyectoEnBD(
                companyName,
                address,
                task,
                taskDescription,
                formDate,
                untilDate,
                madeDate,
                resposiblePerson,
                weekDuration,
                hourDuration,
                costs,
                costsGoogle,
                clientId,
                status,
                setNuevoProyect,
                setOpcionSeleccionada
            );

            

            
        }
    };

    return (
        <div>
            <Form onSubmit={onSubmitForProy}>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="companyName">
                            <Form.Label>Firmenname:</Form.Label>
                            <Form.Control as="select" value={proyectEditar.companyName} onChange={handleCompanyChange}>
                                <option value="">Wählen Sie eine Firma</option>
                                {cargarProyectos.map((proyecto) => (
                                    <option key={proyecto.proyectId} value={proyecto.companyName}>
                                        {proyecto.companyName}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="address">
                            <Form.Label>Adresse:</Form.Label>
                            <Form.Control type="text" value={proyectEditar.address} readOnly />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="task">
                            <Form.Label>Aufgabe:</Form.Label>
                            <Form.Control type="text" value={proyectEditar.task} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="taskDescription">
                            <Form.Label>Aufgabe Beschreibung:</Form.Label>
                            <Form.Control type="text" value={proyectEditar.taskDescription} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formDate">
                            <Form.Label>Datum des Beginns:</Form.Label>
                            <Form.Control type="date" value={proyectEditar.formDate} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="untilDate">
                            <Form.Label>Datum des Endes:</Form.Label>
                            <Form.Control type="date" value={proyectEditar.untilDate} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="resposiblePerson">
                            <Form.Label>Verantwortliche Person:</Form.Label>
                            <Form.Control type="text" value={proyectEditar.resposiblePerson} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="costs">
                            <Form.Label>Kosten:</Form.Label>
                            <Form.Control type="text" value={proyectEditar.costs} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="costsGoogle">
                            <Form.Label>Google Kosten:</Form.Label>
                            <Form.Control type="text" value={proyectEditar.costsGoogle} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="weekDuration">
                            <Form.Label>Wochen:</Form.Label>
                            <Form.Control type="text" value={proyectEditar.weekDuration} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="hourDuration">
                            <Form.Label>Stunden:</Form.Label>
                            <Form.Control type="text" value={proyectEditar.hourDuration} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="madeDate">
                            <Form.Label>Datum der Erfassung:</Form.Label>
                            <Form.Control type="date" value={proyectEditar.madeDate} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Button variant="primary" type="submit"
                        className={`w-100 ${theme === 'lights' ? 'navbar-button-light' : 'navbar-button-dark'} border-0`}>
                            <i className="bi bi-floppy"> </i>
                            <br />
                            Speichern
                        </Button>
                    </Col>
                    
                </Row>
                <hr />
                <Row className="mb-3">
    <Col md={6}>
        <Form.Group controlId="additionalField1">
            
            <Form.Control type="text" placeholder="briefing erfassen" />
        </Form.Group>
    </Col>
    <Col md={6}>
        <Form.Group controlId="additionalField2">
            
            <Form.Control type="text" placeholder="briefing erfassen" />
        </Form.Group>
    </Col>
</Row>
                
                
            </Form>
        </div>
    );
};


