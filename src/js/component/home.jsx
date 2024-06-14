import React, { useState, useEffect } from "react";

const Home = () => {
    // Estados para manejar el ingreso de usuario, lista de usuarios, creación de tarea y estado de tarea completada
    const [newUsers, setNewUsers] = useState("Sergio"); // Estado para el nombre de usuario ingresado
    const [tasks, setTasks] = useState([]); // Estado para la lista de tareas del usuario
    const [createTask, setCreateTask] = useState(""); // Estado para la nueva tarea a crear
    

    // Efecto para realizar alguna acción al montar el componente
    useEffect(() => {
        access(); // Llama a la función 'access' al montar el componente
    }, []);

    // Función para manejar el acceso del usuario
    const access = async () => {
        const userLogin = await fetch(`https://playground.4geeks.com/todo/users/${newUsers}`, {
            // Realiza una solicitud para verificar el usuario ingresado
        });

        if (userLogin.ok) {
            // Si la solicitud es exitosa
            const data = await userLogin.json(); // Obtiene los datos de la respuesta
            setTasks(data.todos); // Actualiza el estado 'todos' con las tareas del usuario
        } else {
            // Si la solicitud no es exitosa (usuario no existe)
            createUser(); // Llama a la función 'createUser' para crear un nuevo usuario
        }
    };

    // Función para crear un nuevo usuario
    const createUser = async () => {
        const createNewUsers = await fetch(`https://playground.4geeks.com/todo/users/${newUsers}`, {
            // Realiza una solicitud para crear un nuevo usuario
            method: "POST",
            body: JSON.stringify({}), // Cuerpo de la solicitud POST
            headers: {
                "Content-Type": "application/json" // Encabezados de la solicitud
            }
        });

        if (createNewUsers.ok) {
            // Si la solicitud para crear el usuario es exitosa
            access(); // Llama a la función 'access' para obtener las tareas del nuevo usuario registrado
        }
    };

    // Función para manejar la creación de una nueva tarea
    const addTask = async (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario
        const newTask = { label: createTask, is_done: false }; // Define la nueva tarea a crear
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${newUsers}`, {
            // Realiza una solicitud para crear una nueva tarea
            method: "POST",
            body: JSON.stringify(newTask), // Cuerpo de la solicitud POST
            headers: { "Content-Type": "application/json" } // Encabezados de la solicitud
        });

        if (response.ok) {
            // Si la solicitud para crear la tarea es exitosa
            setCreateTask(""); // Limpia el campo de entrada de la nueva tarea
            access(); // Llama a la función 'access' para obtener las tareas actualizadas
        }
    };

    // Función para eliminar una tarea
    const deleteItem = async (id) => {
        const response1 = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            // Realiza una solicitud para eliminar una tarea
            method: "DELETE", // Método DELETE
            headers: { "Content-Type": "application/json" } // Encabezados de la solicitud
        });

        if (response1.ok) {
            // Si la solicitud para eliminar la tarea es exitosa
            access(); // Llama a la función 'access' para obtener las tareas actualizadas
        }
    };

    // Función para eliminar todos los usuarios
    const deleteUsers = async () => {
        const response1 = await fetch(`https://playground.4geeks.com/todo/users/${newUsers}`, {
            // Realiza una solicitud para eliminar todos los usuarios
            method: "DELETE", // Método DELETE
            headers: { "Content-Type": "application/json" } // Encabezados de la solicitud
        });

        if (response1.ok) {
            // Si la solicitud para eliminar los usuarios es exitosa
            createUser(); // Llama a la función 'createUser' para crear un nuevo usuario
        }
    };

    // Función para manejar la pulsación de tecla Enter
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Lógica a ejecutar al presionar la tecla Enter
        }
    };

    return (
        <div className="container d-flex">
            <div className="d-flex flex-column">
                {/* Formulario para agregar una nueva tarea */}
                <form onSubmit={addTask} className="d-flex p-4">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold fs-5">Agregar Tarea</label>
                        <input value={createTask} type="text" className="form-control" aria-describedby="emailHelp" onChange={(event) => setCreateTask(event.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary mx-3">Agregar Tarea</button>
                </form>
                {/* Lista de tareas del usuario */}
                {tasks.map((item) => (
                    <ul key={item.label}>
                        <li>
                            {item.label}
                            <button
                                className="eliminar"
                                onClick={() => deleteItem(item.id)} // Llama a la función 'deleteItem' al hacer clic en el botón
                            >
                                <i className="fa-solid fa-trash-can fa-lg" style={{ color: "#ff0000" }}></i>
                            </button>
                        </li>
                    </ul>
                ))}
                <button className="btn btn-danger m-3" onClick={deleteUsers}>Borrar lista</button>
            </div>
        </div>
    );
};

export default Home;
