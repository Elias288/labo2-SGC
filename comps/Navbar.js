import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    return(
      <nav>
          <div className="logo">
              {/* <h1>Proyectos List</h1> */}
              <Image src="/Wordpress_Blue_logo.png" width={77} height={77} />
          </div>
          <Link href="/"><a>Inicio</a></Link>
          <Link href="/entradas"><a>Lista de Entradas</a></Link>
          <Link href="/proyectos"><a>Lista de Proyectos</a></Link>
      </nav>  
    )
}

export default Navbar;