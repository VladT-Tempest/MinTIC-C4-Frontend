// vendors
// eslint-disable-next-line
import React from "react";
import { useQuery, gql } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// HU004 Administrador podrá ver la información de los usuarios registrados en la plataforma
// HU005 Administrador podrá cambiar el estado del usuario
const USERS = gql `
  query AllUsers {
    allUsers {
      _id
      email
      documentId
      fullName
      status
    }
  }
`;

const Users = () => {
  const { data } = useQuery(USERS);
  return <>
    <Container>
      <Row>
        <Col><h2 class="text-center">USUARIOS</h2></Col>
      </Row>
    </Container>
    <Container>
    <Row>
        <Col><b>Id</b></Col>
        <Col><b>Nombre</b></Col>
        <Col><b>e-mail</b></Col>
        <Col><b>status</b></Col>
        <Col><b>Aceptar</b></Col> 
    </Row>
  </Container>
  {!data ? <></> : data?.allUsers?.map(user => (
    <>
      <Container>
        <Row>
            <Col>{user.documentId}</Col>
            <Col>{user.fullName}</Col>
            <Col>{user.email}</Col>
            <Col>{user.status}</Col>
            <Col>{(user.status === 'PENDING' ? <button>Aceptar</button>  : <></>) ||
                  (user.status === 'UNAUTHORIZED' ? <button>AUTORIZAR</button>  : <></>)}</Col>
        </Row>
      </Container>
    </>
  ))} </>
};

export default Users;