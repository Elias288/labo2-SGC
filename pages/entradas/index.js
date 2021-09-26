import Styles from '../../styles/Proyectos.module.css'
import Link from 'next/link'

export const getStaticProps = async () =>{
    const res = await fetch('http://localhost/wordpress/wp-json/wp/v2/posts/');
    const data = await res.json();

    return {
        props : { entradas: data }
    }
}

const Entradas = ( { entradas } ) => {
    return ( 
        <div>
            <h2>Entradas</h2>
            {entradas.map(entrada => (
                <Link href={'/entradas/' + entrada.id} key={entrada.id}>
                    <a className={Styles.single}>
                        <h3> { entrada.date } - { entrada.slug } </h3>
                    </a>
                </Link>
            ))}
        </div>
    );
}
 
export default Entradas;