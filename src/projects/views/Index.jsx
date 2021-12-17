import { gql } from '@apollo/client';
import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/client';


const PROYECTOS = gql`
query User {
  allProjects {
    name
    generalObjective
    specificObjectives
    budget
    startDate
    endDate
    leader_id
    status
    phase
  }
}
`;

const AccordionStyled = styled((props) => <Accordion {...props} />)(({ theme}) => ({
    backgroundColor: '#D8CDCB',
}));
const AccordionSummaryStyled = styled((props) => <AccordionSummary {...props} />)(({ theme}) => ({
    backgroundColor: '#ABA9A8',
    color:'#F00707',
    margin: "center"
}));
const AccordionDetailsStyled = styled((props) =><AccordionDetails {...props} />)(({ theme}) => ({
    backgroundColor: '#ccc',
}));

const IndexProyectos = () => {
    const { data: queryData, loading } = useQuery(PROYECTOS);
    
    /* useEffect(() => {
        console.log('Datos de proyectos', queryData)
    }, [queryData]); */

    if (loading) return <div>Cargando ...</div>
    
    if (queryData.allProjects) {
        return (
            <div className='p-10'>
                <h1 className='text-center font-bold'>Lista de Proyectos</h1>
                <div className='my-2 self-end'>          
                <a class="btn btn-success" href="projects/New">Crear Nuevo Proyecto</a>
                </div>    
                    {queryData.allProjects.map((proyecto) => {
                    return <AccordionProyecto proyecto={proyecto}/>;
                    })}
                </div>
            );
    }

    return <></>;
    
}
const  AccordionProyecto = ({proyecto}) => {
   
    return (
    <div>
        <AccordionStyled> 
    <AccordionSummaryStyled >
        <div>
            <span>
                <div >{ proyecto.name} - {proyecto.phase}</div>
            </span>
        </div>        
        </AccordionSummaryStyled>    
        <AccordionDetailsStyled>
         <div className='text-lg font-bold'>
             Objetivos Generales = {proyecto.generalObjective}
         </div>
         <div className='text-lg font-bold'>
             Objetivos Especificos = {proyecto.specificObjectives}
         </div>
         <div className='text-lg font-bold'>
             Precio = {proyecto.budget}
         </div>
         <div className='text-lg font-bold'>
             Fecha de Inicio = {proyecto.startDate}
         </div>
         <div className='text-lg font-bold'>
             Fecha de Fin = {proyecto.endDate}
         </div>
         <div className='text-lg font-bold'>
             Id del lider = {proyecto.leader_id}
         </div>
         <div className='text-lg font-bold'>
             Estado = {proyecto.status}
         </div>
         <div className='text-lg font-bold'>
             Fase = {proyecto.phase}
         </div>
        </AccordionDetailsStyled>
    </AccordionStyled> 
        </div>
   
)
}

export default IndexProyectos
