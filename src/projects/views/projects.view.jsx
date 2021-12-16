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
    }
  }
`;

const Projects = () => {
  const { data } = useQuery(PROJECTS);
  return <>
    <Container>
      <Row>
        <Col><h2 className="text-center">PROYECTOS</h2></Col>
      </Row>
    </Container>
    <Container>
    <Row>
        <Col><b>Nombre</b></Col>
        <Col><b>Fecha Inicio</b></Col>
        <Col><b>Fecha Final</b></Col>
        <Col><b>status</b></Col>
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
        </Row>
      </Container>
    </>
  ))} </>
};

export default Projects;