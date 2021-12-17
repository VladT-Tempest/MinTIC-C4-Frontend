// vendors
// eslint-disable-next-line
import React from "react";
import { useQuery, gql } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// HU006 Administrador podrá ver la información de los usuarios registrados en la plataforma

const PROJECTS = gql `
  query AllProjects {
    allProjects {
        name
        startDate
        endDate
        status
        phase
    }
  }
`;

const Projects = () => {
  const { data } = useQuery(PROJECTS);
  return <>
    <Container className="mt-2 mb2">
      <Row>
        <Col><h2 className="text-center">PROYECTOS</h2></Col>
      </Row>
    </Container>
    <Container className="mb-2">
      <Row>
          <Col><b>Nombre</b></Col>
          <Col><b>Fecha Inicio</b></Col>
          <Col><b>Fecha Finalización</b></Col>
          <Col><b>Estado</b></Col>
          <Col><b>Fase</b></Col>
      </Row>
      </Container>
  {!data ? <></> : data?.allProjects?.map(project => (
    <>
      <Container>
        <Row>
            <Col>{project.name}</Col>
            <Col>{project.startDate}</Col>
            <Col>{project.endDate}</Col>
            <Col>{project.status}</Col>
            <Col>{project.phase}</Col>
        </Row>
      </Container>
    </>
  ))} </>
};

export default Projects;