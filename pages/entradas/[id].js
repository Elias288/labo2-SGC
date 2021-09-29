export const getStaticPaths = async () =>{
    const res = await fetch('http://localhost/wordpress/wp-json/wp/v2/posts/');
    const data = await res.json();

    const paths = data.map(entrada =>{
        return {params : { id: entrada.id.toString() }}
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;  //POST ID
    
    const resPost = await fetch('http://localhost/wordpress/wp-json/wp/v2/posts/' + id + "?_embed=1");
    const dataPost = await(resPost.json());

    const resMedia = await fetch('http://localhost/wordpress/wp-json/wp/v2/media/' + dataPost.featured_media);
    const dataMedia = await(resMedia.json());

    const resCategories = await fetch('http://localhost/wordpress/wp-json/wp/v2/categories?post=' + id);
    const dataCategories = await(resCategories.json());

    const resTags = await fetch('http://localhost/wordpress/wp-json/wp/v2/tags?post=' + id);
    const dataTags = await(resTags.json());

    const resAuthor = await fetch('http://localhost/wordpress/wp-json/wp/v2/users/' + dataPost.author);
    const dataAuthor = await(resAuthor.json());
    
    return {
        props: {entrada: dataPost, entradaFoto: dataMedia, entradaCategories: dataCategories, entradaTags: dataTags, entradaAuthor: dataAuthor}
    }
}

const Details = ( { entrada, entradaFoto, entradaCategories, entradaTags, entradaAuthor } ) => {
    return ( 
        <div>
            <h1>{entrada.title.rendered}</h1>
            {/* FECHA */}
            <p><strong>Fecha: </strong>{entrada.date}</p>
            {/* TITULO */}
            <p><strong>Titulo: </strong>{entrada.title.rendered}</p>
            {/* TEXTO */}
            <p><strong>Texto: </strong></p>
            <div dangerouslySetInnerHTML={{__html: entrada.content.rendered}}></div>
            {/* CATEGORIAS */}
            <p><strong>Categorias: </strong></p>
            <ul>
                {entradaCategories.map(categoria =>(
                    <li>{categoria.name}</li>
                ))}
            </ul>
            {/* TAGS */}
            <p><strong>Tags: </strong></p>
            <ul>
                {entradaTags.map(tag => (
                    <li>{tag.name}</li>
                ))}
            </ul>
            {/* FOTO */}
            <p><strong>Foto: </strong></p>
            <img src={entradaFoto.source_url} width={100} />
            {/* AUTOR */}
            <p><strong>Autor: </strong>{entradaAuthor.name}</p>
        </div>
    );
}
 
export default Details;