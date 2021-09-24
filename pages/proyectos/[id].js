import Styles from '../../styles/Proyectos.module.css'

export const getStaticPaths = async () =>{
    const res = await fetch('http://localhost/wordpress/wp-json/wp/v2/proyecto/');
    const data = await res.json();

    const paths = data.map(proyecto =>{
        return {
            params : { id: proyecto.id.toString() }
        }
        
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('http://localhost/wordpress/wp-json/wp/v2/proyecto/' + id);
    const data = await(res.json());

    return {
        props: {proyecto: data}
    }
}

const Details = ( { proyecto } ) => {
    return ( 
        <div>
            <h1>{proyecto.title.rendered}</h1>
            <p><strong>Empresa: </strong>{proyecto.meta.empresa}</p>
            <p><strong>Fecha: </strong>{proyecto.date}</p>
            <p><strong>Estado: </strong>{proyecto.status}</p>
            <p><strong>Tipo: </strong>{proyecto.type}</p>
            <p><strong>Contenido: </strong>{proyecto.content.rendered}</p>
        </div>
    );
}
 
export default Details;