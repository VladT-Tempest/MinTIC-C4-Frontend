import {React } from 'react'
import { useQuery, gql } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const USERSTUDENT = gql `
    query UserByRole($role: UserRole!) {
        userByRole(role: $role) {
        email
        documentId
        fullName
        status
        }
    }
`;



const AllStudents = (props) => {
    const { data} = useQuery(USERSTUDENT, {variables: { id:props.id_users } });
    
    /* if (queryData.userByRole) {
        return (
            <div className='p-10'>
                <h1 className='text-center font-bold'>Lista de Proyectos</h1>
                <div className='my-2 self-end'>          
                
                </div>    
                    {queryData.allProjects.map((proyecto) => {
                    return <AccordionProyecto proyecto={proyecto}/>;
                    })}
                </div>
            );
    } */


    return (
    <>
        <Container>
        <Row>
            <Col><h1 class="text-center">ESTUDIANTES</h1></Col>
        </Row>
        </Container>
        <a class="btn btn-info" href="/users">Atras</a>
        <Container>
        <Row>
        <Col><b>Id</b></Col>
        <Col><b>Nombre</b></Col>
        <Col><b>e-mail</b></Col>
        <Col><b>Estado</b></Col>
        </Row>
        </Container>
        {!data ? <></> : data?.UserByRole?.map(user => (
    <>
      <Container>
        <Row>
            <Col>{user.documentId}</Col>
            <Col>{user.fullName}</Col>
            <Col>{user.email}</Col>
            <Col>{user.status}</Col>
        </Row>
      </Container>
    </>
  ))}

    </>
)
}

export default AllStudents
