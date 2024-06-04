import React, { useState, useEffect, } from "react";

// Componente funcional Home
const Home = () => {


    const [users, setUsers] = useState([])
    const [newUsers, setNewUsers] = useState("")

   

 
const acceder = async(event) => {
    event.preventDefault()
    const response = await fetch(`https://playground.4geeks.com/todo/docs#/User%20operations/read_user_users__{user_name}__get`)
    if(response.ok) {
        const data = await response.json()
        setUsers(data.todos)}
     }
    
     
    const createUser = async(event) => {
    event.preventDefault()
    const response1 = await fetch(`https://playground.4geeks.com/todo/users/${name}`,{
    method : 'POST'})
    if(response1.ok) {
        const dataNewUser = await response1.json()
        setNewUsers([...users, dataNewUser])}     
    }


useEffect(() => {
    //codigo que se va a ejcutar ni bien se cargue mi plataforma
    acceder()
   
}, [])

useEffect(() => {
    //codigo que se va a ejcutar ni bien se cargue mi plataforma
   
    createUser()
}, [acceder()])



    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        }
    };

    return (
        <div className="container" >
             {users.map((item, index) => <div key={index}>{item.name}</div>)} 
            <form onSubmit={acceder} className="d-flex p-4">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label fw-bold fs-5 ">Nombre de Usuario</label>
                    <input  value={newUsers} type="text" className="form-control" i aria-describedby="emailHelp"   onChange={(e) => setNewUsers(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary mx-3">Acceder</button>
            </form>

            <ol className="list-group pt-2">
                {/* Mapea la lista de tareas para renderizar cada una */}
                {users.map((item, index) => (
                    <li key={index}


                        className={`list-group-item fs-5 rounded d-flex justify-content-start ${item.is_done ? 'is_done' : ''}`}>
                  
                    </li>
                ))}
            </ol>












            <div className="d-flex">

                <form onSubmit={createUser} className="d-flex p-4">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold fs-5 " >Registrar Usuario</label>
                        <input  type="text" className="form-control" i aria-describedby="emailHelp" />
                    </div>
                    <button type="submit" className="btn btn-primary mx-3">Registrarse</button>
                </form>


                <form className="d-flex p-4">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold fs-5 " >Eliminar Usuario</label>
                        <input  type="text" className="form-control" i aria-describedby="emailHelp" />
                    </div>
                    <button type="submit" className="btn btn-danger mx-3">Eliminar Usuario</button>
                </form>
            </div>



          

              

            </div>
      
    );
};

// Exporta el componente Home para su uso en otras partes de la aplicación
export default Home;

