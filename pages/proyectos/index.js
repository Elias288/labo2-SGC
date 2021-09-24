import Styles from '../../styles/Proyectos.module.css'
import Link from 'next/link'

export const getStaticProps = async () =>{
    const res = await fetch('http://localhost/wordpress/wp-json/wp/v2/proyecto/');
    const data = await res.json();

    return {
        props : { proyectos: data }
    }
}

const proyectos = ( { proyectos } ) =>{
    return (
        <div>
            <h2>Proyectos</h2>
            {proyectos.map(proyecto => (
                <Link href={'/proyectos/' + proyecto.id} key={proyecto.id}>
                    <a className={Styles.single}>
                        <h3>{ proyecto.title.rendered } - {proyecto.meta.empresa} </h3>
                    </a>
                </Link>
            ))}
        </div>
    )
};

export default proyectos;