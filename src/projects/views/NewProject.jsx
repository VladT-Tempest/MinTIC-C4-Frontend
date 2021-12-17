import React, { useState } from 'react'
//import React, {useEffect } from 'react'
import { useMutation, useQuery} from '@apollo/client';
//import DropDown from 'components/Dropdown';
import { gql } from '@apollo/client';
import Box from "@mui/material/Box";
/* import Collapse from '@mui/material/Collapse';
import Alert from "@mui/material/Alert"; */
import { Formik } from "formik";
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';


/* const GET_USUARIOS = gql`
query Usuarios($filtro: FiltroUsuarios) {
  Usuarios(filtro: $filtro) {
    email
    documentId
    fullName
    status
  }
}
`; */

/* const CREAR_PROYECTO  = gql`
mutation Mutation(
    $name: String!
    $generalObjective: String!
    $specificObjectives: [String]!
    $budget: Float!
    $startDate: String!
    $endDate: String!
    $leader_id: ID!
    $status: ProjectStatus!
    $phase: PHASE!
    ) {
    registerNewProject(
      name : $name
      generalObjective : $generalObjective
      specificObjectives : $specificObjectives
      budget : $budget
      startDate: $startDate
      endDate : $endDate
      leader_id : $leader_id
      status : $status
      phase : $phase
    ) }
  `; */
  const CREAR_PROYECTO  = gql`
  mutation RegisterNewProject($input: RegisterNewProjectInput!) {
    registerNewProject(input: $input) {
      name
    }
  }
  `;

  const PROJECT_BY_ID = gql`
  query Query($id: ID!){
      project(_id: $id){
          name
          generalObjective
          specificObjectives
          budget
      }
  }
`;


const NewProject = (props) => {
    const {data} = useQuery(PROJECT_BY_ID, {variables: { id:props.id_project } });
    const [error, setError] = useState(false);
    const validationSchema = Yup.object({});
    const [Projectnew] = useMutation(CREAR_PROYECTO);
    //if (loading) return <div>Cargando ...</div>
    const initialValues = {
        name: data?.project?.name,
        generalObjective: '',
        specificObjectives : '',
        budget: '',
        startDate: '',
        endDate: '',
        leader_id: '',
        status: '',
        phase: ''
    }
    

    /* const Input = ({ label, name, defaultValue, type, required, textarea }) => (
        <label htmlFor={name} className='flex flex-col my-2'>
          <span>{label}</span>
          <input
            required={required}
            type={type}
            name={name}
            className='input'
            defaultValue={defaultValue}
            textarea = 'textarea'
          />
        </label>
      );
      const DropDown = ({ label, name, defaultValue = '', required, options }) => {
        const [selectedValue, setSelectedValue] = useState(defaultValue);
        const optionsSelect = [
          ['', 'Seleccione una opción', true],
          ...Object.entries(options),
        ];
        useEffect(() => {
          setSelectedValue(defaultValue);
        }, [defaultValue]);
        return (
          <label htmlFor={name} className=' my-3'>
            <span>{label}</span>
            <select
              required={required}
              name={name}
              className='input'
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              {optionsSelect.map((oo) => (
                <option key={nanoid()} value={oo[0]} disabled={oo[2] ?? false}>
                  {oo[1]}
                </option>
              ))}
            </select>
          </label>
        );
      }; */
    
    
    /* const {data: queryData, loading } = useQuery(GET_USUARIOS, {
        variables: {
            filtro: {role:'LEADER'},
        },
    }); */

    //const [registerNewProject, {data:mutationData}] = useMutation(CREAR_PROYECTO);
    /* useEffect(() => {
        if (queryData){
            const lu = {};
            queryData.Usuarios.forEach((element) => {
                lu[element._id] = element.email;
            });
            console.log('Datos', queryData)
            setListaUsuarios(lu);
            }
    }, [queryData]); */

    /* useEffect(() => {
        console.log('DatosMutacion', mutationData);
    }); */
    /* const submitForm = (e) => {
        e.preventDefault();
        //formData.element = Object.values(formData.element);
        formData.budget = parseFloat(formData.budget);
        registerNewProject({
          variables: formData,
        });
      }; */

    return (
        <div className='p-10 items-center'>
            <><Box>
            {/* <Collapse in={error}>
            <Alert severity="error" onClose={() => setError(false)} sx={{ mt: 2 }}>
            No estas logueado como lider.
            </Alert>
            </Collapse> */}
            </Box></>
            <h1 className='text-center font-bold'> Crear Nuevo Proyecto</h1>
            <Formik enableReinitialize={true} initialValues={initialValues}  validationSchema={validationSchema}
                onSubmit={values => {
                    Projectnew({
                        variables: {
                            ...values,
                            id: props.id_project
                        }
                    })
                    .then(response => {
                        window.location.reload();
                     })
                     .catch(() => setError(true)); 
                }}>

            {({
                handleSubmit,
                getFieldProps,
            }) => (
                <form onSubmit={handleSubmit}>
                
            {/* <button type="submit" variant="contained" sx={{ mt: 1 }} >Actualizar</button> */}
            
            <div className='self-start items-center'>
            <a class="btn btn-info" href="/projectslist">Atras</a>
            </div>
            <div >                
                <table align="center">
                    <tr>
                        <th>Nombre del Proyecto </th>
                        <th><TextField
                            placeholder="Nombre"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            focused
                            {...getFieldProps('name')}
                        /></th>
                    </tr>
                    <tr>
                        <th>Objetivos </th>
                        <td>
                            <TextField
                            label=" General"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            focused
                            {...getFieldProps('generalObjective')}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                        <TextField
                            label=" Especificos"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            focused
                            {...getFieldProps('specificObjectives')}
                        />
                        </td>
                    </tr>
                    <tr>
                        <th>Precio</th>
                        <td>
                        <TextField
                            label="Precio "
                            margin="normal"
                            variant="outlined"
                            size="small"
                            placeholder="$"
                            focused
                            {...getFieldProps('budget')}
                        />
                        </td>
                    </tr>
                    <tr>
                        <th>Fecha de Inicio</th>
                        <td>
                            <TextField
                            margin="normal"
                            variant="outlined"
                            size="small"
                            placeholder="$"
                            type="date"
                            focused
                            {...getFieldProps('startDate')}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Fecha de Fin</th>
                        <td>
                            <TextField
                            margin="normal"
                            variant="outlined"
                            size="small"
                            placeholder="$"
                            type="date"
                            focused
                            {...getFieldProps('endDate')}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Id del Lider</th>
                        <td>                       
                            <TextField
                            label="ID Lider "
                            margin="normal"
                            variant="outlined"
                            size="small"
                            placeholder="Id"
                            focused
                            {...getFieldProps('leader_id')}
                            />
                            {/* <DropDown  options={listaUsuarios} name='lider' required />  */}
                        </td>
                    </tr>
                    <tr>
                        <th>Estado</th>
                        <td>
                            <TextField
                            label="Estado "
                            margin="normal"
                            variant="outlined"
                            size="small"
                            focused
                            {...getFieldProps('status')}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Fase</th>
                        <td>
                            <TextField
                            label="Fase "
                            margin="normal"
                            variant="outlined"
                            size="small"
                            focused
                            {...getFieldProps('phase')}
                            />
                        </td>
                       {/* <DropDown  options={listaFases} name='fases' required={true} /> */}
                    </tr>
                    <tr>
                        <td>
                        <button className="btn btn-primary" style= {{"marginRight": "10px"}} onClick={() => props.onClick( "newproject")}>Crear Proyecto</button>
                        {/* <Button type="submit" variant="contained" sx={{ mt: 1 }} >Crear Proyecto</Button> */}
                        </td>
                    </tr>
                </table>
            </div>
            </form>
          )}
        </Formik>
        </div>
    )
}


class NewPROYECT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_project: null,
            module:null,
        }
    }
    handleClick(id, module)
    {
     this.setState(
         {
             module: module,
             id_project: id
         }
     )   
    }

    render()
    {
        if(this.state.module === "newproject")
        {
            return <NewProject 
            id_project={this.state.id_project} 
            onClick={(id, module) => this.handleClick(id, module)}
            />
        }   
    }
}


export default NewProject