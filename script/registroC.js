
//Formulario Registro
document.getElementById('register-client-form').addEventListener('submit', function (event) {
    event.preventDefault(); // formulario no se envíe de forma automatica
    Guardar(); // Llama a la función que captura los datos y los envía
});
//Formulario Actualizar
document.getElementById('update-client-form').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("Form enviado");
    actualizarCliente();
})




document.getElementById("lista").addEventListener("click", function(event){
    event.preventDefault();
    get();
})



//Funcion para guardar al cliente
function Guardar(){
    const formData = {       
        dni: document.getElementById("dni").value,
        nombre: document.getElementById("nombreCliente").value,
        apellido : document.getElementById("apellidoCliente").value,
        email:document.getElementById("emailCliente").value,
        telefono : document.getElementById("telefonoCliente").value,
        marcaVehiculo: document.getElementById("marcaAuto").value,
        modeloVehiculo: document.getElementById("modeloAuto").value,
        patente: document.getElementById("patenteAuto").value
    }

    post(formData)
}




//Funcion para actualizar cliente
function actualizarCliente() {
    const formDataAct = {
        id: document.getElementById("id").value,
        dni: document.getElementById("dniNew").value,
        nombre: document.getElementById("nombreClienteNew").value,
        apellido: document.getElementById("apellidoClienteNew").value,
        email: document.getElementById("emailClienteNew").value,
        telefono: document.getElementById("telefonoClienteNew").value,
        marcaVehiculo: document.getElementById("marcaAutoNew").value,
        modeloVehiculo: document.getElementById("modeloAutoNew").value,
        patente: document.getElementById("patenteAutoNew").value
    }

    console.log("Datos a actualizar: ", formDataAct); // Verifica los datos
        put(formDataAct);

    };


    function put(formDataAct) {
        $.ajax({
            type: "PUT",
            data: JSON.stringify(formDataAct),
            url: `http://localhost:55224/api/Clientes/${formDataAct.id}`,
            contentType: "application/json",
            success: function (data) {
                alert("Cliente actualizado exitosamente.");
                console.log("Respuesta del servidor:", data);
                get(); // Vuelve a cargar los clientes para reflejar los cambios
            },
            error: function (xhr, status, error) {
                alert("Error al actualizar el cliente: " + error);
                console.error(xhr.responseText);
            }
        });
    }



//Funcion para mostar los clientes
function mostrarDatosEnTabla(data) {
    const tbody = document.querySelector('#tablaClientes tbody');
    tbody.innerHTML = ''; // Limpiar el cuerpo de la tabla

    // Recorro los datos y agregar filas
    data.forEach(cliente => {
        const row = document.createElement('tr'); // Crear una nueva fila
        row.innerHTML = `
            
            <td>${cliente.DNI}</td>
            <td>${cliente.Apellido}</td>
            <td>${cliente.Nombre}</td>
            <td>${cliente.Email}</td>
            <td>${cliente.Telefono}</td>
            <td>${cliente.Marca_Vehiculo}</td>
            <td>${cliente.Modelo_Vehiculo}</td>
            <td>${cliente.Patente}</td>
            <td><button onclick="eliminarCliente(${cliente.Id})">Eliminar</button></td>
        `;
        tbody.appendChild(row); // Agregar la fila al cuerpo de la tabla
    });

    alert("Datos obtenidos exitosamente...");
}



function post(formData){
    $.ajax({
        type: "POST",
        dataType: "json",
        data: formData,
        url : "http://localhost:55224/api/Clientes",
        success:function(data){
            alert("Proceso exitoso...")
        },
        error: function(xhr, status, error) {
            alert("Error en el registro: " + error);
            console.error(xhr.responseText);
        }
    })
}

function get(){
    $.ajax({
        type: "GET",
        dataType: "json",
        url : "http://localhost:55224/api/Clientes",
        success:function(data){
            console.log("Datos obtenidos:", data);
            mostrarDatosEnTabla(data);
        },
        error: function(xhr, status, error) {
            alert("Error en mostar la lista " + error);
            console.error(xhr.responseText);
        }
    })
}

function eliminarCliente(clienteId) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:55224/api/Clientes/${clienteId}`,
        success: function() {
            alert("Cliente eliminado con éxito.");
            get(); // Actualiza la lista de clientes después de eliminar
        },
        error: function(xhr, status, error) {
            alert("Error al eliminar el cliente: " + error);
            console.error(xhr.responseText);
            console.log(status);
        }
    });
}























/*document.getElementById('register-client-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que se recargue la página


    //Capturamos los datos
    const formData = {
        dni: document.getElementById("dni").value,
        nombre: document.getElementById("nombreCliente").value,
        apellido : document.getElementById("apellidoCliente").value,
        email:document.getElementById("emailCliente").value,
        telefono : document.getElementById("telefonoCliente").value,
        marcaVehiculo: document.getElementById("marcaAuto").value,
        modeloVehiculo: document.getElementById("modeloAuto").value,
        patente: document.getElementById("patenteAuto").value
    }


    $.ajax({
        type: "POST",
        dataType: "json",
        data: formData,
        url : "http://localhost:55224/api/Clientes",
        success:function(data){
            alert("Proceso exitoso...")
        },
        error: function(xhr, status, error) {
            alert("Error en el registro: " + error);
            console.error(xhr.responseText);
        }
    })

   /* $.ajax({
        type: "",
        dataType: "json",
        data: formData,
        url : "http://localhost:55224/api/Clientes",
        success:function(data){
            alert("Proceso exitoso...")
        }
    })*/
  /*  fetch("http://localhost:55224/api/Clientes",{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json' // Indicamos que estamos enviando JSON
        },

        body:JSON.stringify(formData) //Convertimos el objeto a JSON
    
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cliente registrado exitosamente');
            // Opcional: limpiar el formulario
            document.getElementById('register-client-form').reset();
        } else {
            alert('Error al registrar el cliente');
        }
    })
    .catch(error => console.error('Error:', error));*/

///});