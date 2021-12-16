// vedors
import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

// styles
import 'projects/styles/projects.styles.scss';

const project = gql `
query AllEnrollmentsE {
    allEnrollmentsE {
        _id
        project {
          name
          generalObjective
          leader {
            fullName
          }
        }
        enrollmentDate
        status
      }
  }
`;
const ADVANCES_PROJECT = gql`
    query Query($id: ID!){
        project(_id: $id){
            name
            generalObjective
            specificObjectives
            budget
            startDate
            endDate
            status
            phase
            advances {
                _id
                description
                observations
                addDate
            }
        }
    }
`;
const AdvancesProject = (props) => {
  const {data} = useQuery(ADVANCES_PROJECT, {variables: { id:props.id_project } });
  let time;
  return(
      <>
          <section className="grid" style={{"--bs-columns": 4, "--bs-gap": '10px 0'}}>
          <span>{'Fecha'}</span>
          <span>{'Observacion'}</span>
          <span className="g-col-2">{'descripcion'}</span>
          {data?.project?.advances?.map(({ addDate, description, observations, _id }) => {
          return (
          <>
              <span>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(addDate)}</span>
              <span>{observations}</span>
              <span>{description}</span>
              <span><button className="btn btn-primary" style= {{"marginRight": "10px"}} onClick={() => props.onClick(_id, "edit_observation")}>Editar</button></span>
          </>
          )
          })}
          </section> 
      </>        
  )
}

const ProjectsE = () => {
  const {data} = useQuery(project);

  return (
    <>
    {!data ? <></> : data?.allEnrollmentsE?.map(enrrolmentE => {
      return (
        <>
            <div key={enrrolmentE._id} className="card" style={{"marginTop": '10px'}}>
                <div className="card-body">
                    <h5 className="card-title">{enrrolmentE.project.name}</h5>
                    <p className="card-text">{enrrolmentE.project.generalObjective}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Lider del proyecto:</h6>
                    <p className="card-text">{enrrolmentE.project.leader.fullName}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Fecha peticion del registro:</h6>
                    <p className="card-text">{enrrolmentE.enrollmentDate}</p>

                    <h6 className="card-subtitle mb-2 text-muted">Estado:</h6>
                    <p className="card-text">{enrrolmentE.status===null ? "PENDIENTE":enrrolmentE.status}</p>
                    {enrrolmentE.status===null || enrrolmentE.status==="RECHAZADO" ? 
                    <button className="btn btn-primary" disabled="disabled" style= {{"marginRight": "10px"}} >Editar</button>
                    :
                    <button className="btn btn-primary" style= {{"marginRight": "10px"}} >Editar</button>}

                </div>
            </div>
        </>
                    
     )
    })}
  </>
)

};

export default ProjectsE;