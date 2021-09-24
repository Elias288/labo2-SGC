import Link from 'next/link'

const NotFound = () => {
    return ( 
        <div className="not-found">
            <h1>Ooooops...</h1>
            <h2>Esta pagina no pudo ser encontrada</h2>
            <p>Volver <Link href="/">Inicio</Link> </p>
        </div>
    );
}
 
export default NotFound;