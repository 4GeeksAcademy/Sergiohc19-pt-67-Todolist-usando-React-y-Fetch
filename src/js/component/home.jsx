import { string } from "prop-types";
import React, { useState, useEffect } from "react";

const Home = () => {
    const [newUsers, setNewUsers] = useState("");
    const [users, setUsers] = useState([]);
    const [registro, setRegistro] = useState("");

    useEffect(() => {
        createUser();
    }, [setNewUsers]);


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
            alert('El usuario no existe, necesita registrarse');

            setNewUsers("");
            createUser();
        }
    };




    const createUser = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://playground.4geeks.com/todo/users/${newUsers}`, {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            const data = await response.json();
            setUsers([...users, data]);
            alert("Se registró un nuevo usuario");
            setRegistro("")
            users([])
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




    {/* const deleteItem = async (id) => {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            setUsers(users.filter(user => user.label !== task.label));
            alert("Se borró la tarea");
        } else {
            alert("No se pudo borrar la tarea");
        }
    };
                                                                */}


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            
        }
    };

    return (
        <div className="container d-flex">

            <form  className="d-flex p-4">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label fw-bold fs-5">Registrarse</label>
                    <input  value={registro} type="text" className="form-control" aria-describedby="emailHelp" onChange={(event) => setRegistro(event.target.value)} />
                </div>
                <button onClick={createUser} type="submit" className="btn btn-primary mx-3">Registrarse</button>
            </form>

            <div className="d-flex flex-column">
                <form onSubmit={access} className="d-flex p-4">
                    <button onClick={tareas}   className="btn btn-success mx-3">Agregar Tareas</button>
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
                                onClick={() => deleteItem(item.id)}
                            >
                                <i className="fa-solid fa-trash-can fa-lg" style={{ color: "#ff0000" }}></i>
                            </button>
                        </li>
                    </ul>

                ))}
                <button type="submit" className="btn btn-danger mx-3">Eliminar Lista</button>
            </div>
        </div>
    );
};

export default Home;
