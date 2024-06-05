import React, { useState, useEffect, } from "react";

// Componente funcional Home
const Home = () => {

    const [newUsers, setNewUsers] = useState("")
    const [users, setUsers] = useState([])
    
    

    useEffect(() => {
        //codigo que se ejecutará cuando mi estado users cambie
        access()
    }, [setNewUsers])



    useEffect(() => {
        //codigo que se ejecutará cuando mi estado users cambie
        setNewUsers("")
    }, [users])


    const access = async (event) => {
        event.preventDefault()
        const response = await fetch(`https://playground.4geeks.com/todo/users/${newUsers}`)
        if (response.ok) {
            const data = await response.json()
            setUsers(data.todos)
            alert("Inició sesión con éxito")
        }
        else {
            alert('El usuario no existe, necesita registrarse')
            createUser()
        }
    }

    const createUser = async (event) => {
        event.preventDefault()
        const response = await fetch(`https://playground.4geeks.com/todo/docs#/User%20operations/create_user_users__user_${newUsers}__post`, {
            method: "POST",
            body: JSON.stringify(todos),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            await response.json()
            setUsers([...users, { label: newUsers, is_done: false }])
            alert("Se registro nuevo usurario")
        }
    }


    const task = async (event) => {
        event.preventDefault()
        const response = await fetch(`https://playground.4geeks.com/todo/docs#/User%20operations/read_user_users__user_${newUsers}`, {
            method: "POST",
            body: JSON.stringify(todos),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            response = await response.json([])
        }

    }


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        }
    };

    return (
        <div className="container" >
            {users.map((item, index) => <div key={index}>{item.todos}</div>)}

            <div className="d-flex">
                <form onSubmit={access} className="d-flex p-4">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold fs-5 ">Nombre de Usuario</label>
                        <input  type="text" className="form-control" aria-describedby="emailHelp" onChange={(event) => setNewUsers(event.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary mx-3">Acceder</button>
                </form>



                <form onSubmit={createUser} className="d-flex p-4">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold fs-5 " > Registrarse</label>
                        <input  value={newUsers}  type="text" className="form-control" aria-describedby="emailHelp"    onChange={createUser} />
                    </div>
                    <button type="submit" className="btn btn-primary mx-3">Registrarse</button>
                </form>

            </div>



            <form onSubmit={task} className="d-flex p-4">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label fw-bold fs-5 " >Crear Tarea</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" />
                </div>
                <button type="submit" className="btn btn-success mx-3">Crear Tarea</button>
            </form>



        </div>

    );
};

// Exporta el componente Home para su uso en otras partes de la aplicación
export default Home;

