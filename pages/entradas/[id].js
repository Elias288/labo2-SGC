import Image from 'next/image'

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
    
    const resPost = await fetch('http://localhost/wordpress/wp-json/wp/v2/posts/' + id + "?_embed=1");
    const dataPost = await(resPost.json());
    
    const resMedia = await fetch('http://localhost/wordpress/wp-json/wp/v2/media/' + dataPost.featured_media);
    const dataMedia = await(resMedia.json());
    
    return {
        props: {entrada: dataPost, entradaFoto: dataMedia}
    }
}

const Details = ( { entrada, entradaFoto } ) => {
    return ( 
        <div>
            <h1>{entrada.title.rendered}</h1>
            <p><strong>Fecha: </strong>{entrada.date}</p>
            <p><strong>Titulo: </strong>{entrada.title.rendered}</p>

            <p><strong>Texto: </strong></p>
            
            <div dangerouslySetInnerHTML={{__html: entrada.content.rendered}}></div>
            
            <p><strong>Categoria: </strong>{entrada.categories}</p>
            <p><strong>Tags: </strong>{entrada.tags}</p>

            <p><strong>Foto: </strong></p>
            <img src={entradaFoto.source_url} width={100} />

            <p><strong>Autor: </strong>{entrada.author}</p>
        </div>
    );
}
 
export default Details;