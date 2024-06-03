import React, { useState, useEffect, } from "react";

// Componente funcional Home
const Home = () => {
    // Define el estado para el valor del input (inputValue) y la lista de tareas (items)
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);



    // Función que añade todas las tareas que tienes guardadas en el usuario de la API 
    useEffect(() => {
        const añadirTarea = async () => {
            const response = await fetch('https://playground.4geeks.com/todo/users/Sergiohc.19');

            if (response.ok) {
                const data = await response.json()
                setItems(data.todos)
            }
            else {
                console.log("error")
            }

        }

        añadirTarea()

    }, []);
    // Función que elimina una tarea desde la API 
    useEffect(() => {
        const deleteTask = async () => {
            const response2 = await fetch('https://playground.4geeks.com/todo/docs#/Todo%20operations/delete_user_todo_todos__todo_id__delete');
            method: 'DELETE'
            if (response2.ok) {
                const data2 = await response2.json()
                setItems(data2.todos)
            }
            else {
                console.log("error")
            }

        }

        deleteTask()

    }, []);
    //  Función que modifica la tarea desde la API
    useEffect(() => {
        const modificarTarea = async () => {
            const response2 = await fetch('');
            method: 'PUT'
            if (response2.ok) {
                const data2 = await response2.json()
                setItems(data2.todos)
            }
            else {
                console.log("error")
            }

        }

        modificarTarea()

    }, [])


    // Maneja el evento de presionar una tecla en el input
    const handleKeyPress = (event) => {
        // Si la tecla presionada es Enter, agrega una tarea
        if (event.key === 'Enter') {
            addTask();

        }
    };


    // Función para agregar una tarea a la lista
    const addTask = () => {
        // Verifica si el valor del input no está vacío o compuesto solo de espacios
        if (inputValue.trim() !== '') {
            // Agrega una nueva tarea al estado de items
            setItems([...items, { label: inputValue, is_done: true }]);
            // Limpia el input

            setInputValue('');
        }
    };

    // Función para eliminar una tarea de la lista
    const deleteItem = (index) => {
        // Filtra la lista de tareas eliminando la que corresponde al índice proporcionado
        setItems(items.filter((_, i) => i !== index));
        eliminarTarea()
    };

    // Función para marcar una tarea como completada o no completada
    const toggleTask = (index) => {
        // Mapea la lista de tareas y cambia el estado de completado de la tarea en el índice proporcionado
        setItems(items.map((item, i) => {
            if (i === index) {
                return { ...item, completed: !item.completed };
            }
            return item;
        }));
    };

    // Calcula el número de tareas pendientes
    const countPendingTasks = () => {
        // Inicializa un contador en 0
        let count = 0;
        // Itera sobre la lista de tareas y cuenta las que no están completadas
        for (const item of items) {
            if (!item.completed) {
                count++;
            }
        }
        return count;
    };

    // Obtiene el número de tareas pendientes llamando a la función countPendingTasks
    const pendingTasks = countPendingTasks();

    return (
        <div className="container">
            <h1>Tareas</h1>


            <form className="Usuario d-flex justify-content-center mt-4">
                <div className="mb-3">
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>

                <button type="submit" className="btn btn-primary mx-2">Ingresar Usuario</button>
            </form>


            
            <form className="Usuario d-flex justify-content-center mb-4">
                <div className="mb-3">
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>

                <button type="submit" className="btn btn-primary mx-2">Registrar Usuario</button>
            </form>



            <div className="Task">
                {/* Input para escribir la tarea */}

                <input
                    // Maneja el evento de tecla presionada en el input
                    onKeyDown={handleKeyPress}
                    // Asocia el valor del input al estado inputValue
                    value={inputValue}
                    // Actualiza el estado inputValue cuando el valor del input cambia
                    onChange={(e) => setInputValue(e.target.value)}
                    type="text"
                    placeholder="Escribe aquí la tarea"
                    className="input1"
                    id="exampleInputPassword1"
                />
                {/* Botón para agregar la tarea */}
                <button
                    // Llama a la función addTask cuando se hace clic en el botón
                    onClick={addTask}
                    type="submit"
                    className="btn btn-success mx-2"
                >
                    Agregar Tarea
                </button>
            </div>
            {/* Lista de tareas */}
            <ol className="list-group pt-2">
                {/* Mapea la lista de tareas para renderizar cada una */}
                {items.map((item, index) => (
                    <li key={index}


                        className={`list-group-item fs-5 rounded d-flex justify-content-start ${item.is_done ? 'is_done' : ''}`}>
                        {/* Muestra el texto de la tarea con una línea si está completada */}
                        <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.label}</span>
                        {/* Botón para marcar la tarea como completada o no */}
                        <button onClick={() => toggleTask(index)} className="completado">
                            <i className={`fa-solid fa-clipboard-check fa-lg ${item.is_done ? 'text-success' : ''}`}></i>
                        </button>
                        {/* Botón para eliminar la tarea */}
                        <button onClick={() => deleteItem(index)} className="papelera">
                            <i className="fa-solid fa-trash-can fa-lg" style={{ color: "#ff0000" }}></i>
                        </button>
                    </li>
                ))}
            </ol>
            {/* Mostrar el número de tareas pendientes y el total de tareas */}
            <div className="countTareas d-flex p-1">
                <p className="pendientes px-5" style={{ fontWeight: "bold", color: "white", fontSize: "25px" }}>
                    {/* Muestra el número de tareas pendientes o un mensaje si no hay tareas pendientes */}
                    {pendingTasks !== 0 ? 'nº de tareas pendientes: ' + pendingTasks : <span>No tienes tareas pendientes</span>}
                </p>
                <p className="añadidas px-5" style={{ fontWeight: "bold", color: "white", fontSize: "25px" }}>
                    {/* Muestra el número total de tareas o un mensaje si no hay tareas */}
                    {items.length !== 0 ? 'nº de tareas: ' + items.length : <span>No hay tareas</span>}
                </p>
            </div>
        </div>
    );
};

// Exporta el componente Home para su uso en otras partes de la aplicación
export default Home;

