import React, {useState} from 'react';
import './App.css';
import './index.css';
import ListaVideos from './componentes/listaVideos';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import imagenDebut from './imagenes/debut.jpg';
import imagenDebut2 from './imagenes/debut2.jpg';
import imagenHistoria from './imagenes/Historia.jpg';
import imagenHistoria2 from './imagenes/Historia2.jpg';
import imagenJungwon from './imagenes/junwon.jpg';
import imagenHeeseung from './imagenes/heeseung.jpg';
import imagenJay from './imagenes/jay.jpg';
import imagenJake from './imagenes/jake.jpg';
import imagenSunghoon from './imagenes/sunghoon.jpg';
import imagenSunoo from './imagenes/sunoo.jpg';
import imagenNiki from './imagenes/riki.jpg';
import enhypen1 from './imagenes/enhypen1.jpg';
import enhypen2 from './imagenes/enhypen2.jpg';
import enhypen3 from './imagenes/enhypen3.jpg';
import enhypen4 from './imagenes/enhypen4.jpg';
import enhypen5 from './imagenes/enhypen5.jpg';
import enhypen6 from './imagenes/enhypen6.jpg';
import enhypen7 from './imagenes/enhypen7.jpg';

function App() {
  const [activeSection, setActiveSection] = useState('Home');
  const [isFormVisible, setFormVisible] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]); 
  const [dataArr, setDataArr] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [phone, setPhone] = useState('');

  const showSection = (id) => {
    setFormVisible(false);
    setActiveSection(id);
  };

  const showForm = () => {
    setFormVisible(true);
    setActiveSection('formSection');
  };

  const BotonEnviar = () => {
    const acepterm = document.getElementById('acepterm').checked;
    const escala = document.getElementById('escala').value;
    const fecha = new Date().toLocaleDateString();
    const correo = document.getElementById('correo').value;
    const comentario = document.getElementById('comentario').value;
    const mensaje1 = document.getElementById('mensaje1');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo && comentario && emailRegex.test(correo)) {
      const solicitudExistente = solicitudes.find(solicitud => solicitud.correo === correo);

      if (solicitudExistente) {
        solicitudExistente.acepterm = acepterm;
        solicitudExistente.escala = escala;
        solicitudExistente.fecha = fecha;
        solicitudExistente.comentario = comentario;
        mensaje1.innerHTML = '¡Datos actualizados correctamente!';
      } else {
        const nuevaSolicitud = {
          id: Date.now(),
          acepterm: acepterm,
          escala: escala,
          fecha: fecha,
          correo: correo,
          comentario: comentario
        };
        setSolicitudes([...solicitudes, nuevaSolicitud]);
        mensaje1.innerHTML = '¡Muchas gracias por tu opinión, esto nos ayudará a brindarte un mejor servicio en el futuro!';
      }

      const data = {
        escala: escala,
        fecha: fecha,
        correo: correo,
        comentario: comentario
      };

      setDataArr([...dataArr, data]);
      document.getElementById('escala').value = '';
      document.getElementById('correo').value = '';
      document.getElementById('comentario').value = '';

      var downloadbutton = document.getElementById('downloadbutton');
      downloadbutton.disabled = dataArr.length === 0;

      ActualizarTabla();
      mensaje1.style.color = 'white';
    } else {
      mensaje1.innerHTML = '¡Por favor, rellene todos los campos!';
      mensaje1.style.color = 'white';
    }
  };

  const ActualizarTabla = () => {
    const tbody = document.querySelector('#tabla1 tbody');
    tbody.innerHTML = '';
    solicitudes.forEach(solicitud => {
      const row = tbody.insertRow();
      row.insertCell(0).textContent = solicitud.acepterm ? 'Sí' : 'No';
      row.insertCell(1).textContent = solicitud.escala;
      row.insertCell(2).textContent = solicitud.fecha;
      row.insertCell(3).textContent = solicitud.correo;
      row.insertCell(4).textContent = solicitud.comentario;
      const actionsCell = row.insertCell(5);
      actionsCell.appendChild(EditarBoton(solicitud.id));
      actionsCell.appendChild(EliminarBoton(solicitud.id));
    });
  };

  const EditarBoton = (id) => {
    const button = document.createElement('button');
    button.textContent = 'Editar';
    button.className = 'botonEditar';
    button.onclick = () => {
      const solicitud = solicitudes.find(s => s.id === id);
      document.getElementById('acepterm').checked = solicitud.acepterm;
      document.getElementById('escala').value = solicitud.escala;
      document.getElementById('fecha').value = solicitud.fecha;
      document.getElementById('correo').value = solicitud.correo;
      document.getElementById('comentario').value = solicitud.comentario;
      document.getElementById('contactoForm').onsubmit = (event) => {
        event.preventDefault();
        solicitud.acepterm = document.getElementById('acepterm').checked;
        solicitud.escala = document.getElementById('escala').value;
        solicitud.fecha = new Date().toLocaleDateString();
        solicitud.correo = document.getElementById('correo').value;
        solicitud.comentario = document.getElementById('comentario').value;
        ActualizarTabla();
        document.getElementById('mensaje1').textContent = '¡Datos actualizados correctamente!';
        document.getElementById('contactoForm').onsubmit = defaultSubmit;
      };
    };
    return button;
  };

  const EliminarBoton = (id) => {
    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.className = 'botonEliminar';
    button.onclick = () => {
      const nuevasSolicitudes = solicitudes.filter(s => s.id !== id);
      setSolicitudes(nuevasSolicitudes);
      ActualizarTabla();
      document.getElementById('mensaje1').textContent = '¡Opinión eliminada correctamente!';
    };
    return button;
  };

  const defaultSubmit = (event) => {
    event.preventDefault();
    BotonEnviar();
  };

  const downloadJSON = () => {
    const jsonData = JSON.stringify(dataArr);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'datos.json';
    link.click();
    URL.revokeObjectURL(url);
    setDataArr([]);
    var downloadbutton = document.getElementById('downloadbutton');
    downloadbutton.disabled = true;
  };

  const validacionNumero = (event) => {
    const telefono = event.target.value;
    const regex = /^\d+$/;
    if (!regex.test(telefono)) {
      alert("Por favor, ingrese solo números en el campo de teléfono.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nombre = event.target.nombre.value;
    const apellido = event.target.apellido.value;
    const razon = event.target.razon.value;
    const telefono = phone;
    const email = event.target.email.value;

    if (nombre && apellido && razon && telefono && email) {
      const inscripcion = {
        id: Date.now(),
        nombre: nombre,
        apellido: apellido,
        razon: razon,
        telefono: telefono,
        email: email
      };
      setInscripciones([...inscripciones, inscripcion]);
      document.getElementById('mensaje').textContent = 'Hemos recibido tu inscripción. Nuestro equipo leerá tu solicitud y te estaremos contactando cuando tengamos una respuesta sólida. Muchas gracias por querer ser parte de este equipo de engenes.';
      event.target.reset();
    } else {
      document.getElementById('mensaje').textContent = 'Por favor, complete todos los campos.';
    }
  };

  const updateTable = () => {
    return inscripciones.map((inscripcion) => (
      <tr key={inscripcion.id}>
        <td>{inscripcion.nombre}</td>
        <td>{inscripcion.apellido}</td>
        <td>{inscripcion.razon}</td>
        <td>{inscripcion.telefono}</td>
        <td>{inscripcion.email}</td>
        <td>
          <button className="botonEditar" onClick={() => editInscripcion(inscripcion.id)}>Editar</button>
          <button className="botonEliminar" onClick={() => deleteInscripcion(inscripcion.id)}>Eliminar</button>
        </td>
      </tr>
    ));
  };

  const editInscripcion = (id) => {
    const inscripcion = inscripciones.find(i => i.id === id);
    document.getElementById('nombre').value = inscripcion.nombre;
    document.getElementById('apellido').value = inscripcion.apellido;
    document.getElementById('razon').value = inscripcion.razon;
    setPhone(inscripcion.telefono);
    document.getElementById('email').value = inscripcion.email;

    document.getElementById('inscripcionForm').onsubmit = (event) => {
      event.preventDefault();
      const updatedInscripciones = inscripciones.map(i => 
        i.id === id 
          ? {
              ...i,
              nombre: document.getElementById('nombre').value,
              apellido: document.getElementById('apellido').value,
              razon: document.getElementById('razon').value,
              telefono: phone,
              email: document.getElementById('email').value,
            }
          : i
      );
      setInscripciones(updatedInscripciones);
      document.getElementById('inscripcionForm').reset();
      document.getElementById('mensaje').textContent = 'Inscripción actualizada correctamente.';
      document.getElementById('inscripcionForm').onsubmit = handleSubmit;
    };
  };

  const deleteInscripcion = (id) => {
    setInscripciones(inscripciones.filter(i => i.id !== id));
    document.getElementById('mensaje').textContent = 'Inscripción eliminada correctamente.';
  };

  return (
    <>
      <div className="menucont">
        <nav className="menu">
          <ul>
              <li class="nav-link">
                  <a href="#Home" onClick={() => showSection('Home')}>Home</a>
              </li>
              <li class="nav-link">
                  <a href="#Miembros" onClick={() => showSection('Miembros')}>Integrantes</a>
              </li>
              <li class="nav-link">
                  <a href="#RedesSociales" onClick={() => showSection('RedesSociales')}>Redes Sociales</a>
              </li>
              <li class="nav-link">
                  <a href="#Contacto" onClick={() => showSection('Contacto')}>Contactanos</a>
              </li>
              <li class="nav-link">
                  <a href="#" onClick={() => showSection('Discografia')}>Discografia</a>
              </li>
              <li class="nav-link">
                  <a href="#formSection" onClick={() => showSection('formSection')}>Inscripción</a>
              </li>
          </ul>
        </nav>
      </div>
      
      <div id="Home" className={`cont section ${activeSection === 'Home' ? 'active' : ''}`}>
        <ul className='list'>
          <li className='item' style={{ backgroundImage: `url(${enhypen1})` }}></li>
          <li className='item' style={{ backgroundImage: `url(${enhypen2})` }}></li>
          <li className='item' style={{ backgroundImage: `url(${enhypen3})` }}></li>
          <li className='item' style={{ backgroundImage: `url(${enhypen4})` }}></li>
          <li className='item' style={{ backgroundImage: `url(${enhypen5})` }}></li>
          <li className='item' style={{ backgroundImage: `url(${enhypen6})` }}></li>
          <li className='item' style={{ backgroundImage: `url(${enhypen7})` }}></li>
        </ul>
        <img className="img_historia" src={imagenDebut} alt="Debut" />
        <img className="img_historia" src={imagenDebut2} alt="Debut 2" />
        <div className="parrafo-derecho">
          <h1 className="fuente_times">ENHYPEN</h1>
          <ul>
            <h3>NOMBRE:</h3>
            <li>엔하이픈 (enhaipeun) en Corea.</li>
            <li>エンハイフン (enhaifun) en Japón.</li>
            <li>ENHYPEN (Internacional).</li>
          </ul>
          <br />
          <h3>¿Por qué se llama "ENHYPEN"?</h3>
          <p>
            ENHYPEN significa conectar, descubrir y progresar",
            además utilizan la abreviación EN-, y en inglés "hypen" significa guion (-).
          </p>
          <p>
            ENHYPEN debuto en Corea del Sur el 30 de noviembre del 2020, con 7 integrantes donde
            4 de ellos son de nacionalidad coreana, uno es australiano, uno estadounidense y el último es japonés.
          </p>
          <p>
            El nombre del fanclub es  엔진 / ENGENE y tiene dos significados.
            El primero es que los fans de ENHYPEN son los "motores" que les permiten crecer y avanzar.
            El segundo es que ENHYPEN y los fans "comparten el mismo ADN para conectarse,
            desarrollarse y crecer juntos".
          </p>
          <br />
          <h3>Pre Debut.</h3>
          <p>
            En 2019, CJ E&M y Big Hit Entertainment se unieron para realizar una audición
            global llamada "Belift Global Audition" con el objetivo de formar un nuevo grupo de ídolos K-pop.
            Esta colaboración dio lugar al reality show llamado I-LAND, que se transmitió a partir
            de junio de 2020 en Mnet. El programa documentó el proceso de planificación y producción de un grupo de K-pop,
            con competidores que incluían raperos, bailarines, cantantes, atletas, modelos y actores que nacieron
            entre 1997-2006. El 18 de septiembre de 2020 se anunciaron los ganadores del programa, quienes
            formarían el grupo ENHYPEN, compuesto por: Heeseung, Jay, Jake, Sunghoon, Sunoo, Jungwon y Ni-Ki.
          </p>
          <br />
          <h3>Debut Enhypen.</h3>
          <p>
            En octubre de 2020, ENHYPEN anunció su debut con el primer mini álbum "Border: Day One". A través de
            tráilers y fotos conceptuales, generaron expectación antes del lanzamiento el 30 de noviembre.
            Su canción principal, "Given-Taken", con un video musical oscuro inspirado en vampiros, presentó a
            los miembros en diferentes escenarios, desde una escuela hasta una casa antigua.
            La letra habla de la transformación en vampiros y los conflictos mentales que enfrentan.
            ENHYPEN debutó en televisión con "ENHYPEN DEBUT SHOW: DAY ONE" en Mnet el 30 de noviembre.
            Su video musical para "Let Me In (20 CUBE)", lanzado en diciembre, trata sobre el deseo de ser
            aceptado en un nuevo mundo.
          </p>
        </div>
      </div>
      <div id="Miembros" className={`div_table section ${activeSection === 'Miembros' ? 'active' : ''}`}>
        <img className="img_menu" src={imagenHistoria} alt="Historia" />
        <img className="img_menu2" src={imagenHistoria2} alt="Historia 2" />
        <br />
        <h1 style={{ color: 'rgb(206, 0, 0)', textAlign: 'center'}}>Integrantes de ENHYPEN</h1>
        <table>
          <tr>
            <th>Integrantes</th>
            <th>Nombres</th>
            <th>Datos</th>
          </tr>
          <tr>
            <td><img src={imagenJungwon} width="200" height="230" alt="Jungwon" /></td>
            <td>정원/Jung Won y su nombre completo es 양정원/Yang Jung Won</td>
            <td>Jungwon nació el 09 de febrero del año 2004 en Corea del Sur. 
                Es el líder del grupo, es cantante y bailarín. Si quieres saber más sobre Jungwon, 
                puedes darle clic al siguiente link: <a href="https://www.enhypenguide.com/jungwon" target="_blank" rel="noopener noreferrer">"Datos sobre Jungwon"</a></td>
          </tr>
          <tr>
            <td><img src={imagenHeeseung} width="200" height="230" alt="Heeseung" /></td>
            <td>희승/Hee Seung y su nombre completo es 이희승 / Lee Hee Seung</td>
            <td>Heeseung nació el 15 de octubre del año 2001 en Corea del Sur. 
                Es cantante, rapero y bailarín. Si quieres saber más sobre Heeseung, puedes darle clic al siguiente link: 
                <a href="https://www.enhypenguide.com/heeseung" target="_blank" rel="noopener noreferrer">"Datos sobre Heeseung"</a></td>
          </tr>
          <tr>
            <td><img src={imagenJay} width="200" height="230" alt="Jay" /></td>
            <td>제이/Jay y su nombre completo es 박제이/Jay Park</td>
            <td>Jay nació el 20 de abril del año 2002 en Estados Unidos. 
                Además es cantante, rapero y bailarín. Para saber más sobre Jay, puedes darle clic al siguiente link: 
                <a href="https://www.enhypenguide.com/jay" target="_blank" rel="noopener noreferrer">"Datos sobre Jay"</a></td>
          </tr>
          <tr>
            <td><img src={imagenJake} width="200" height="230" alt="Jake" /></td>
            <td>제이크/Jake y su nombre completo es 제이크 심/Jake Sim</td>
            <td>Jake nació el 15 de noviembre del año 2002 en Corea del Sur, pero creció en Australia, 
                por lo que tiene dos nacionalidades. Además es cantante, rapero y bailarín. 
                Para saber más sobre Jake, puedes darle clic al siguiente link: 
                <a href="https://www.enhypenguide.com/jake" target="_blank" rel="noopener noreferrer">"Datos sobre Jake"</a></td>
          </tr>
          <tr>
            <td><img src={imagenSunghoon} width="200" height="230" alt="Sunghoon" /></td>
            <td>성훈/Sung Hoon y su nombre completo es 박성훈/Park Sung Hoon</td>
            <td>Sunghoon nació el 21 de diciembre del año 2002 en Corea del Sur. 
                Además es cantante, rapero, actor, bailarín y fue MC. 
                Para saber más sobre Sunghoon, puedes darle clic al siguiente link:  
                <a href="https://www.enhypenguide.com/sunghoon" target="_blank" rel="noopener noreferrer">"Datos sobre Sunghoon"</a></td>
          </tr>
          <tr>
            <td><img src={imagenSunoo} width="200" height="230" alt="Sunoo" /></td>
            <td>선우/Sunoo y su nombre completo es 김선우/Kim Seon Woo</td>
            <td>Sunoo nació el 24 de junio del año 2003 en Corea del Sur. 
                Además es cantante, rapero y bailarín. 
                Para saber más sobre Sunoo, puedes darle clic al siguiente link:  
                <a href="https://www.enhypenguide.com/sunoo" target="_blank" rel="noopener noreferrer">"Datos sobre Sunoo"</a></td>
          </tr>
          <tr>
            <td><img src={imagenNiki} width="200" height="230" alt="Ni-Ki" /></td>
            <td>니키/Ni-Ki y su nombre completo es 西村力 (にしむら りき)/Nishimura Riki</td>
            <td>Ni-Ki nació el 09 de diciembre del año 2005 en Japón. 
                Además es rapero, cantante y bailarín. 
                Para saber más sobre Ni-Ki, puedes darle clic al siguiente link: 
                <a href="https://www.enhypenguide.com/ni-ki" target="_blank" rel="noopener noreferrer">"Datos sobre Ni-Ki"</a></td>
          </tr>
        </table>
      </div>
      <div id="Discografia" className={`div_enlaces section ${activeSection === 'Discografia' ? 'active' : ''}`}>
        <ul>
          <h3 style={{ color: 'rgb(201, 0, 0)' }}>Discografia</h3>
          <li><a href="https://open.spotify.com/intl-es/artist/5t5FqBwTcgKTaWmfEbwQY9?si=gJwxX4V6SLywQ7u_1XHfnQ" target="_blank">Spotify</a></li>
          <li><a href="https://music.apple.com/es/artist/enhypen/1541011620" target="_blank">Apple Music</a></li>
          <li><a href="https://music.youtube.com/channel/UC5bxTdrcWXji987o_LlcNNA" target="_blank">YouTube Music</a></li>
          <li><a href="https://www.deezer.com/es/artist/113915572" target="_blank">Deezer</a></li>
        </ul>
        <ListaVideos />
      </div>
      

      <div id="Contacto" className={`encuesta section ${activeSection === 'Contacto' ? 'active' : ''}`}>
        <h3>¡Queremos mejorar tu experiencia! Te dejamos este formulario de contacto para que nos cuentes tus inquietudes.<br /></h3>
        <div>
          <div className="mt-3">
            <form id="contactoForm" onSubmit={defaultSubmit}>
              <label htmlFor="escala">En escala de 1 al 7, ¿en qué medida evalúa nuestro contenido?</label><br />
              <select name="escala" id="escala">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select><br /><br />

              <label htmlFor="fecha">Fecha: </label><br />
              <input type="text" id="fecha" name="fecha" readOnly /><br /><br />
              <label htmlFor="correo">Ingrese su correo: </label><br />
              <input type="email" id="correo" name="correo" required /><br /><br />
              <label htmlFor="comentario">Ingresa tus inquietudes o comentarios aquí: </label><br />
              <textarea id="comentario" name="comentario" rows="4" required></textarea><br /><br />
              <label htmlFor="acepterm">Acepto los términos y condiciones:</label><br />
              <input type="checkbox" id="acepterm" name="acepterm" /><br /><br />
              <button type="button" onClick={BotonEnviar} className="boton"><h4>Enviar</h4></button><br />
              <button type="button" onClick={downloadJSON} id="downloadbutton" disabled className="boton">Descargar datos guardados</button>
            </form>
            <p id="mensaje1"></p>
            <table id="tabla1">
              <thead>
                <tr>
                  <th>términos</th>
                  <th>Evaluación</th>
                  <th>Fecha</th>
                  <th>Correo</th>
                  <th>Comentario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map(solicitud => (
                  <tr key={solicitud.id}>
                    <td>{solicitud.acepterm ? 'Sí' : 'No'}</td>
                    <td>{solicitud.escala}</td>
                    <td>{solicitud.fecha}</td>
                    <td>{solicitud.correo}</td>
                    <td>{solicitud.comentario}</td>
                    <td>
                      <button className="botonEditar" onClick={() => EditarBoton(solicitud.id)}>Editar</button>
                      <button className="botonEliminar" onClick={() => EliminarBoton(solicitud.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="formSection" className={`section ${activeSection === 'formSection' ? 'active' : ''}`}>
        <h3 style={{ color: 'white' }} className="encuesta">Formulario de inscripción</h3>
        <form id="inscripcionForm" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required /><br /><br />
          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" name="apellido" required /><br /><br />
          <label htmlFor="razon">¿Por qué quiere ser parte de la fanbase?</label><br />
          <textarea id="razon" name="razon" required></textarea><br /><br />
          <label htmlFor="telefono">Número de Teléfono:</label>
          <PhoneInput
            country={'cl'}
            value={phone}
            onChange={setPhone}
            inputProps={{
              name: 'telefono',
              required: true,
              autoFocus: true,
            }}
          /><br /><br />
          <label htmlFor="email">Correo:</label>
          <input type="email" id="email" name="email" required /><br /><br />
          <button type="submit" className="boton">Enviar</button>
        </form>
        <p id="mensaje"></p>

        <table id="tablainscripcion">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Razón</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {updateTable()}
          </tbody>
        </table>
      </div>

      <div id="RedesSociales" className="div_enlaces">
        <ul>
          <h3 style={{ color: 'rgb(201, 0, 0)' }}>Redes sociales ENHYPEN</h3>
          <li><a target="_blank" href="https://beliftlab.com/eng/enhypen">Sitio Web Oficial</a></li>
          <li><a target="_blank" href="https://search.daum.net/search?nil_suggest=btn&amp;w=tot&amp;DA=SBC&amp;q=enhypen">Perfil (daum)</a></li>
          <li><a target="_blank" href="https://search.naver.com/search.naver?sm=top_sug.pre&amp;fbm=1&amp;acr=1&amp;acq=Enhypen&amp;qdt=0&amp;ie=utf8&amp;query=enhypen">Perfil (naver)</a></li>
          <li><a target="_blank" href="https://enhypen-jp.weverse.io/">Sitio Web de Japón Oficial</a></li>
          <li><a target="_blank" href="https://twitter.com/enhypen">Twitter Oficial</a></li>
          <li><a target="_blank" href="https://twitter.com/ENHYPEN_JP">Twitter Oficial Japón</a></li>
          <li><a target="_blank" href="https://twitter.com/ENHYPEN_members">Twitter Oficial de los integrantes</a></li>
          <li><a target="_blank" href="https://www.facebook.com/officialENHYPEN">Facebook Oficial</a></li>
          <li><a target="_blank" href="https://www.instagram.com/enhypen/">Instagram Oficial</a></li>
          <li><a target="_blank" href="https://www.youtube.com/channel/UCArLZtok93cO5R9RI4_Y5Jw">Canal de YouTube</a></li>
          <li><a target="_blank" href="https://weverse.io/enhypen/feed">Weverse Oficial</a></li>
          <li><a target="_blank" href="https://weibo.com/u/7501166991?is_all=1">Weibo Oficial</a></li>
          <li><a target="_blank" href="https://www.tiktok.com/@enhypen?">TikTok Oficial</a></li>
        </ul>
      </div>
    </>
  );
}

export default App;
