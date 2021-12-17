// vedors
import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, gql } from '@apollo/client';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'projects/styles/projects.styles.scss';

// // styles


// const REPOSITORIES_QUERY = gql`
//   query MyRepositories ($first: Int!){
//     viewer { 
//       name
//       repositories (first: $first){
//         nodes {
//           id
//           name
//           viewerHasStarred
//           stargazers {
//             totalCount
//           }
//         }
//       }
//     }
//   }
// `;

// const ADD_START = gql`
//   mutation AddStart($starrableId: ID!) {
//     addStar(input: {
//       starrableId: $starrableId
//     }) {
//       starrable {
//         stargazers {
//           totalCount
//         }
//       }
//     }
//   }
// `;

// const REMOVE_START = gql`
//   mutation RemoveStart($starrableId: ID!) {
//     removeStar(input: {
//       starrableId: $starrableId
//     }) {
//       starrable {
//         stargazers {
//           totalCount
//         }
//       }
//     }
//   }
// `;

// const Projects = () => {
//   const [first, setFirst] = useState(1);
//   const { data, refetch } = useQuery(REPOSITORIES_QUERY, { variables: { first } });
//   const [addStar] = useMutation(ADD_START, {
//     refetchQueries: [ REPOSITORIES_QUERY ]
//   });
//   const [removeStar] = useMutation(REMOVE_START, {
//     refetchQueries: [ REPOSITORIES_QUERY ]
//   });

//   const memoizedRefetch = useCallback(() => {
//     refetch();
//   }, [refetch]);

//   useEffect(() => {
//     if(first > 1) {
//       memoizedRefetch();
//     }
//   }, [first, memoizedRefetch]);

//   return (
//     <>
//       <section className="grid" style={{"--bs-columns": 4, "--bs-gap": '10px 0'}}>
//         <span>{'Repository name'}</span>
//         <span className="g-col-3">{'Stars count'}</span>
//         {data?.viewer?.repositories?.nodes?.map(({ name, stargazers, id, viewerHasStarred }) => (
//         <>
//           <span>{name}</span>
//           <span>{stargazers.totalCount}</span>
//           <span className="g-col-2">
//             {viewerHasStarred ? <button className="btn btn-dark" onClick={() => removeStar({ variables: { starrableId: id } })}>Remove star</button> 
//             : <button className="btn btn-dark" onClick={() => addStar({ variables: { starrableId: id } })}>Add star</button>}
//           </span>
//         </>
//         ))}
//       </section>
//       <button className="btn btn-primary" onClick={() => setFirst(first + 1)}>Load more</button>
//     </>
//   )
// };

// export default Projects;

const PROYECTS = gql`
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
  
      const {data} = useQuery(PROYECTS);
          
      return<>
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
          <Col>{project.status} </Col>
          <Col>{project.phase}</Col>
      </Row>
      </Container>



        </>
      ))}</>
  };


export default Projects

/* <>
<section className="grid" style={{"--bs-columns": 4, "--bs-gap": '10px 0'}}>
<span>{'Nombre'}</span>
<span>{'Fecha de Inicio'}</span>
<span className="g-col-2">{'Estado'}</span>
{data?.project?.map(({ name, startDate, status }) => {
return (
<>
  <span>{Projects?.name}</span>
  <span>{Projects?.startDate}</span>
  <span>{Projects.status}</span>
</>
)})}
</section>
</> */