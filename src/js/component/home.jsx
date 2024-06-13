import React, { useState, useEffect } from "react";

const Home = () => {
    // Estados para manejar el ingreso de usuario, lista de usuarios, creación de tarea y estado de tarea completada
    const [newUsers, setNewUsers] = useState("Sergio"); // Estado para el nombre de usuario ingresado
    const [todos, settodos] = useState([]); // Estado para la lista de usuarios y sus tareas
    const [createTask, setCreateTask] = useState(""); // Estado para la nueva tarea a crear
    const [isDone, setIsDone] = useState("false"); // Estado para el estado de la tarea (completada o no)

    // Efecto para realizar alguna acción al actualizar 'users'
    useEffect(() => {
        access(); // Llama a la función 'access' al actualizar 'users'
    }, []);

    // Función para manejar el acceso del usuario
    const access = async () => {
        
        const userLogin = await fetch(`https://playground.4geeks.com/todo/users/${newUsers}`, {
            // Realiza una solicitud para verificar el usuario ingresado
        });

        if (userLogin.ok) {
            // Si la solicitud es exitosa
            const data = await userLogin.json(); // Obtiene los datos de la respuesta
            settodos(data.todos); // Actualiza el estado 'users' con las tareas del usuario
           // alert("Inició sesión con éxito"); // Muestra un mensaje de éxito al iniciar sesión
        } else {
            // Si la solicitud no es exitosa (usuario no existe)
           // alert('El usuario no existe, necesita registrarse'); // Muestra un mensaje de que el usuario necesita registrarse
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
            const data = await createNewUsers.json(); // Obtiene los datos de la respuesta
            access()
            //alert("Se registró un nuevo usuario"); // Muestra un mensaje de éxito al registrar el usuario

            // Realiza una solicitud para obtener las tareas del nuevo usuario registrado
        } else {
            // Si la solicitud para crear el usuario no es exitosa
           // alert("No se pudo registrar el usuario"); // Muestra un mensaje de error al registrar el usuario
        }
    };

    // Función para manejar la creación de una nueva tarea
    const task = async (event) => {
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
            const data = await response.json(); // Obtiene los datos de la respuesta
            if(data) {
                setCreateTask("")
                access()
            }
           // setUsers(data); // Actualiza el estado 'users' con los datos actualizados
           // alert("Se creó la tarea correctamente"); // Muestra un mensaje de éxito al crear la tarea
        } else {
            // Si la solicitud para crear la tarea no es exitosa
          //  alert("No se pudo crear la tarea"); // Muestra un mensaje de error al crear la tarea
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
            await response1.text(); // Obtiene los datos de la respuesta
            access();
           // alert("Se borró la tarea"); // Muestra un mensaje de éxito al borrar la tarea
        } else {
            // Si la solicitud para eliminar la tarea no es exitosa
           // alert("No se pudo borrar la tarea"); // Muestra un mensaje de error al borrar la tarea
        }
    };


    const deleteusers = async () => {
        const response1 = await fetch(`https://playground.4geeks.com/todo/users/${newUsers}`, {
            // Realiza una solicitud para eliminar una tarea
            method: "DELETE", // Método DELETE
            headers: { "Content-Type": "application/json" } // Encabezados de la solicitud
        });

        if (response1.ok) {
            // Si la solicitud para eliminar la tarea es exitosa
            await response1.text(); // Obtiene los datos de la respuesta
            createUser();
           // alert("Se borró la tarea"); // Muestra un mensaje de éxito al borrar la tarea
        } else {
            // Si la solicitud para eliminar la tarea no es exitosa
           // alert("No se pudo borrar la tarea"); // Muestra un mensaje de error al borrar la tarea
        }
    };

    // Función para manejar la pulsación de tecla Enter
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
           
        }
    };

    return (
        <div className="container d-flex">
            <div className="d-flex flex-column">
               

              
              

                {/* Formulario para agregar una nueva tarea */}
                <form onSubmit={task} className="d-flex p-4">
                <button   className="btn btn-danger m-3" onClick={deleteusers} >Borrar el usario</button>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold fs-5">Agregar Tarea</label>
                        <input value={createTask} type="text" className="form-control" aria-describedby="emailHelp" onChange={(event) => setCreateTask(event.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary mx-3">Agregar Tarea</button>
                </form>
                  {/* Lista de tareas del usuario */}
                  {todos.map((item) => (
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
                    <button   className="btn btn-danger m-3" >Borrar toda la lista</button>
                    
            </div>
        </div>
    );
};

export default Home;
