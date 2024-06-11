
import React, { useState, useEffect } from "react";

const Home = () => {
    const [newUsers, setNewUsers] = useState("");
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        access()
    }, [setUsers]);

    useEffect(() => {
        setNewUsers("");
    }, [users]);

    const access = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://playground.4geeks.com/todo/users/${newUsers}`, {

        })
        if (response.ok) {
            const data = await response.json();
            setUsers(data.todos)
            alert("Inició sesión con éxito");
            tareas()
        } else {
            console.log("adios")
            alert('El usuario no existe, necesita registrarse');
            createUser(newUsers)
            setNewUsers("");
            console.log("finalizamos else")
        }
    };

    const createUser = async (newUsers) => {
        console.log("Hola")
        const response1 = await fetch(`https://playground.4geeks.com/todo/users/${newUsers}`, {
            method: "POST",
            body: JSON.stringify({
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response1.ok) {
            const data1 = await response1.json();
            acees(data1)
            console.log(data1)
            alert("Se registró un nuevo usuario");
            setRegistro("")
            
        }
        else {
            alert("No se pudo registrar el usuario")
            setRegistro("")
        }

    };


     const tareas = async (event) => {
        event.preventDefault();
        const response = await fetch('https://playground.4geeks.com/todo/todos/Sergiohc.19', {
            method: "POST",
            body: JSON.stringify( label),
            headers: { "Content-Type": "application/json" }
        });
        if (response.ok) {
            const data = await response.json();
            setUsers(data.label);
            alert("Se creó la tarea correctamente");
        } else {
            alert("No se pudo crear la tarea");
        }
    };    

    const deleteItem = async () => {
        const response1 = await fetch(`https://playground.4geeks.com/todo/todos/${newUsers}`, {
            method: "DELETE",
            headers: { 'Accept': 'application/json' }
        });

        if (response1.ok) {
            const data = await response1.json()
            setUsers(data([]))
            alert("Se borró la tarea");
        } else {
            alert("No se pudo borrar la tarea");
        }
    };
                                                                

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            
        }
    };
 
    return (
        <div className="container d-flex">

         

            <div className="d-flex flex-column">
                <form onSubmit={access} className="d-flex p-4">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold fs-5">Usuario</label>
                        <input value={newUsers} type="text" className="form-control" aria-describedby="emailHelp" onChange={(event) => setNewUsers(event.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary mx-3">Acceder</button>

                </form>
                {users.map((item) => (
                    <ul key={item.label}>
                        <li>
                            {item.label}
                            <button
                                className="eliminar"
                                onClick={() => (item.label)}
                            >
                                <i className="fa-solid fa-trash-can fa-lg" style={{ color: "#ff0000" }}></i>
                            </button>
                        </li>
                        
                    </ul>
                    

                ))}
                <button onClick={deleteItem}   type="submit" className="btn btn-danger mx-3">Eliminar Lista</button>
            </div>
        </div>
    );
};

export default Home;
