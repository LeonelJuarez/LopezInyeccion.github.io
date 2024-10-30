/*function get(){
    $.ajax({
        type: "GET",
        dataType: "json",
        url : "http://localhost:55224/api/Presupuesto",
        success:function(data){
            console.log("Datos obtenidos:", data);
            mostrarDatosPresupuesto(data);
        },
        error: function(xhr, status, error) {
            alert("Error en mostar la lista " + error);
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
        },
        error: function(xhr, status, error) {
            alert("Error en mostar la lista " + error);
            console.error(xhr.responseText);
        }
    })
}*/

// Función para obtener datos de presupuestos y clientes
function getDatos() {
    $.when(getPresupuestos(), getClientes()).done(function(presupuestosData, clientesData) {
        // Extrae los datos obtenidos
        const presupuestos = presupuestosData[0]; // Datos de presupuestos
        const clientes = clientesData[0]; // Datos de clientes

        console.log("Datos de presupuestos:", presupuestos);
        console.log("Datos de clientes:", clientes);
        
        mostrarDatosCombinados(presupuestos, clientes);
    }).fail(function(xhr, status, error) {
        alert("Error en obtener datos: " + error);
        console.error(xhr.responseText);
    });
}

// Función para obtener datos de presupuestos
function getPresupuestos() {
    return $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost:55224/api/Presupuesto",
    });
}

// Función para obtener datos de clientes
function getClientes() {
    return $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost:55224/api/Clientes",
    });
}

// Función para mostrar los datos combinados
function mostrarDatosCombinados(presupuestos, clientes) {
    const tbody = document.querySelector('#tablaPresupuesto tbody');
    tbody.innerHTML = ''; // Limpiar el cuerpo de la tabla

    // Mostrar todos los presupuestos
    presupuestos.forEach(presupuesto => {
        const row = document.createElement('tr'); // Crear una nueva fila
        row.innerHTML = `
            <td>Desconocido</td> <!-- DNI -->
            <td>Desconocido</td> <!-- Nombre -->
            <td>Desconocido</td> <!-- Apellido -->
            <td>${presupuesto.Vehiculo}</td>
            <td>${presupuesto.Fecha_Creacion}</td>
            <td>Diagnostico</td>
            <td>$${presupuesto.Total}</td>
        `;
        tbody.appendChild(row); // Agregar la fila al cuerpo de la tabla
    });

    // Mostrar todos los clientes
    clientes.forEach(cliente => {
        const row = document.createElement('tr'); // Crear una nueva fila
        row.innerHTML = `
            <td>${cliente.DNI}</td>
            <td>${cliente.Nombre}</td>
            <td>${cliente.Apellido}</td>
            <td>Sin presupuesto</td> <!-- Vehículo -->
            <td>2024-10-30T00:00:00</td> <!-- Fecha de Creación -->
            <td>Cambio de frenos</td> <!-- Total -->
            <td>$50000</td>
        `;
        tbody.appendChild(row); // Agregar la fila al cuerpo de la tabla
    });

    alert("Datos obtenidos exitosamente...");
}

// Event listener para cargar datos combinados
document.getElementById("listaPresupuesto").addEventListener("click", function(event) {
    event.preventDefault();
    getDatos();
});



/*function mostrarDatosPresupuesto(data) {
    const tbody = document.querySelector('#tablaPresupuesto tbody');
    tbody.innerHTML = ''; // Limpiar el cuerpo de la tabla

    // Recorro los datos y agregar filas
    data.forEach(presupuesto => {
        const row = document.createElement('tr'); // Crear una nueva fila
        row.innerHTML = `
            
            <td>${presupuesto.Dni}</td>
            <td>${presupuesto.Fecha_Creacion}</td>
            <td>${presupuesto.Total}</td>
            <td>${presupuesto.Vehiculo}</td>
        `;
        tbody.appendChild(row); // Agregar la fila al cuerpo de la tabla
    });

    alert("Datos obtenidos exitosamente...");
}

document.getElementById("listaPresupuesto").addEventListener("click", function(event){
    event.preventDefault();
    get();
})*/