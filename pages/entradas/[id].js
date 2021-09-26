import Styles from '../../styles/Proyectos.module.css'

export const getStaticPaths = async () =>{
    const res = await fetch('http://localhost/wordpress/wp-json/wp/v2/posts/');
    const data = await res.json();

    const paths = data.map(entrada =>{
        return {
            params : { id: entrada.id.toString() }
        }
        
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('http://localhost/wordpress/wp-json/wp/v2/posts/' + id);
    const data = await(res.json());

    return {
        props: {entrada: data}
    }
}

const Details = ( { entrada } ) => {
    return ( 
        <div>
            <h1>{entrada.title.rendered}</h1>
            <p><strong>Fecha: </strong>{entrada.date}</p>
            <p><strong>Titulo: </strong>{entrada.title.rendered}</p>
            <p><strong>Texto: </strong>{entrada.content.rendered}</p>
            <p><strong>Categoria: </strong>{entrada.categories}</p>
            <p><strong>Tags: </strong>{entrada.tags}</p>
            {/* <p><strong>Foto: </strong>{entrada._links.ws.featuredmedia}</p> */}
            <p><strong>Autor: </strong>{entrada.author}</p>
        </div>
    );
}
 
export default Details;