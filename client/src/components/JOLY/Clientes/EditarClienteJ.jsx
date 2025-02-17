import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import HeaderJoly from '../../../helper/HeaderJoly'
const urlClientes = 'http://localhost:3100/clientes'

const EditarClienteJ = () => {
  const inputs = document.querySelectorAll('#form-clientJ input')
  const documentoj = document.getElementById('documento')
  const nombrej = document.getElementById('nombre')
  const apellidoj = document.getElementById('apellido')
  const telefonoj = document.getElementById('telefono')
  const correoj = document.getElementById('correo')
  const barrioj = document.getElementById('barrio')
  const direccionj = document.getElementById('direccion')
  const fotoj = document.getElementById('foto')
  const est_doc = document.getElementById('est-doc')
  const est_nom = document.getElementById('est-nom')
  const est_ape = document.getElementById('est-ape')
  const est_tel = document.getElementById('est-tel')
  const est_cor = document.getElementById('est-cor')
  const est_bar = document.getElementById('est-bar')
  const est_dir = document.getElementById('est-dir')
  const est_fot = document.getElementById('est-fot')

  const [vDoc, setVdoc] = useState(false)
  const [vNom, setVnom] = useState(false)
  const [vApe, setVape] = useState(false)
  const [vTel, setVtel] = useState(false)
  const [vCor, setVcor] = useState(false)
  const [vBar, setVbar] = useState(false)
  const [vDir, setVdir] = useState(false)
  const [vFot, setVfot] = useState(false)
    
  const letras = /^([A-Za-z]){4,20}$/gm
  const letraNum = /^[a-zA-Z0-9#-\s]{1,30}$/;
  const cel = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g
  const documentId = /^[0-9]{1,12}$/
  const email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  const url = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig


  const validarFormulario = (e)=>{
      switch (e.target.name) {
          case "documento":
              if (documentId.test(e.target.value)) {
                  setVdoc(true)
                  est_doc.textContent=""
              } else {
                  setVdoc(false)
                  est_doc.textContent="Solo se permiten números, maximo 12 caracteres."
              }
              break;
          case "nombre":
              if(letras.test(e.target.value)){
                  setVnom(true)
                  est_nom.textContent=""
              } else {
                  setVnom(false)
                  est_nom.textContent="Solo se permiten letras, guion y guion bajo; minimo 4 y maximo 20 caracteres."
              }
              break;
          case "apellido":
              if (letras.test(e.target.value)) {
                  setVape(true)
                  est_ape.textContent = ""
              } else {
                  setVape(false)
                  est_ape.textContent="Solo se permiten letras."
              }
              break;
          case "telefono":
              if (cel.test(e.target.value)) {
                  setVtel(true)
                  est_tel.textContent = ""
              } else {
                  setVtel(false)
                  est_tel.textContent = "Se permiten numeros, y caracteres especiales."
              }
              break;
          case "correo":
              if (email.test(e.target.value)) {
                  setVcor(true)
                  est_cor.textContent = ""
              } else {
                  setVcor(false)
                  est_cor.textContent = "Estructura de correo invalida."
              }
              break;
          case "barrio":
              if (letraNum.test(e.target.value)) {
                  setVbar(true)
                  est_bar.textContent = ""
              } else {
                  setVbar(false)
                  est_bar.textContent = "Se permiten letras, numeros, numeral y guion."
              }
              break;
          case "direccion":
              if (letraNum.test(e.target.value)) {
                  setVdir(true)
                  est_dir.textContent = ""
              } else {
                  setVdir(false)
                  est_dir.textContent = "Se permiten numeros, letras y caracteres especiales."
              }
              break;
          case "foto":
              if (url.test(e.target.value)) {
                  setVfot(true)
                  est_fot.textContent = ""
              } else {
                  setVfot(false)
                  est_fot.textContent = "Ingrese la direccion url correctamente."
              }
              break;
      }
  };

  inputs.forEach((input)=>{
      input.addEventListener('keyup', validarFormulario);
      input.addEventListener('blur', validarFormulario);
  });
  // Editar
  const [documento, setDocumento] = useState("")
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [telefono, setTelefono] = useState("")
  const [correo, setCorreo] = useState("")
  const [barrio, setBarrio] = useState("")
  const [direccion, setDireccion] = useState("")
  const [foto, setFoto] = useState("")
  const navigate = useNavigate()
  const { id } = useParams();

  const actualizarCliente = async (e) => {
    e.preventDefault()
    const cliente = {
      documento,
      nombre,
      apellido,
      telefono,
      correo,
      barrio,
      direccion,
      foto,
    }
    if (!documentId.test(documentoj.value)||!letras.test(nombrej.value,apellidoj.value)||!cel.test(telefonoj.value)||!email.test(correoj.value)||!letraNum.test(barrioj.value,direccionj.value)||!url.test(fotoj.value)){
      e.preventDefault()
    }else{
      await axios.put(`${urlClientes}/${id}`, cliente)
      navigate("/clientes-joly")
    }
  }

  useEffect(() => {
    listarCliente()
  }, [])

  const listarCliente = async () =>{
    const res = await axios.get(`${urlClientes}/${id}`)
    setDocumento(res.data.documento)
    setNombre(res.data.nombre)
    setApellido(res.data.apellido)
    setTelefono(res.data.telefono)
    setCorreo(res.data.correo)
    setBarrio(res.data.barrio)
    setDireccion(res.data.direccion)
    setFoto(res.data.foto)
  }
  return (
    <section className='container-formClientJ'>
      <HeaderJoly />
      <h1>Actualizar cliente</h1>
    <section className='form-add-client'>
        <form action="" id='form-clientJ'>
          <div className='div-form'>   
            <input className='inputJ' id='documento' name='documento' type="text" placeholder='Documento' onChange={(e) => setDocumento(e.target.value)} value={documento} />
            <i className={vDoc ? 'fa-solid fa-check' : 'fa-solid fa-circle-exclamation'}></i>
          </div>
          <p className='estado' id='est-doc'></p>
          <div className='div-form'>   
            <input className='inputJ' id='nombre' name='nombre' type="text" placeholder='Nombre' onChange={(e) => setNombre(e.target.value)} value={nombre} />
            <i className={vNom ? 'fa-solid fa-check' : 'fa-solid fa-circle-exclamation'}></i>
          </div> 
            <p className='estado' id='est-nom'></p>
          <div className='div-form'>   
            <input className='inputJ' id='apellido' name='apellido' type="text" placeholder='Apellido' onChange={(e) => setApellido(e.target.value)} value={apellido} />
            <i className={vApe ? 'fa-solid fa-check' : 'fa-solid fa-circle-exclamation'}></i>
          </div> 
            <p className='estado' id='est-ape'></p>
          <div className='div-form'>   
            <input className='inputJ' id='telefono' name='telefono' type="text" placeholder='Telefono' onChange={(e) => setTelefono(e.target.value)} value={telefono} />
            <i className={vTel ? 'fa-solid fa-check' : 'fa-solid fa-circle-exclamation'}></i>
          </div> 
            <p className='estado' id='est-tel'></p>
          <div className='div-form'>   
            <input className='inputJ' id='correo' name='correo' type="text" placeholder='Correo' onChange={(e) => setCorreo(e.target.value)} value={correo} />
            <i className={vCor ? 'fa-solid fa-check' : 'fa-solid fa-circle-exclamation'}></i>
          </div> 
            <p className='estado' id='est-cor'></p>
          <div className='div-form'>   
            <input className='inputJ' id='barrio' name='barrio' type="text" placeholder='Barrio' onChange={(e) => setBarrio(e.target.value)} value={barrio} />
            <i className={vBar ? 'fa-solid fa-check' : 'fa-solid fa-circle-exclamation'}></i>
          </div> 
            <p className='estado' id='est-bar'></p>
          <div className='div-form'>   
            <input className='inputJ' id='direccion' name='direccion' type="text" placeholder='Dirección' onChange={(e) => setDireccion(e.target.value)} value={direccion} />
            <i className={vDir ? 'fa-solid fa-check' : 'fa-solid fa-circle-exclamation'}></i>
          </div> 
            <p className='estado' id='est-dir'></p>
          <div className='div-form'>   
            <input className='inputJ' id='foto' name='foto' type="text" placeholder='URL Foto' onChange={(e) => setFoto(e.target.value)} value={foto} />
            <i className={vFot ? 'fa-solid fa-check' : 'fa-solid fa-circle-exclamation'}></i>
          </div>
            <p className='estado' id='est-fot'></p>
            <Link className='cancelarJ' to={'/clientes-joly'}>Cancelar</Link>
            <input id='registrar' className='registrarJ' type="submit" value='Registrar' onClick={actualizarCliente}/>
        </form>
    </section>
    </section>
  )
}

export default EditarClienteJ