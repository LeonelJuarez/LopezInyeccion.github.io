const container = document.getElementsByClassName("services-list")[0];

document.getElementById('btnGuardarServicio').addEventListener('click', function (event) {
    event.preventDefault();
    guardarServicio();

});

document.getElementById('btnModificar').addEventListener('click', function (event) {
    event.preventDefault();
    actualizarSer();

});


function guardarServicio(){
    const servicioData = {       
        Nombre_servicio: document.getElementById("nombreServicio").value,
        Descripcion : document.getElementById("descripcionServicio").value,
        Precio: parseFloat(document.getElementById("precioServicio").value),
    }
    console.log(servicioData);
    post(servicioData);
}

function renderCard(service) {

    container.innerHTML= "";
    //Creamos etiqueta HTML
    const cards = document.createElement("div");
    const title = document.createElement("h3");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    const price = document.createElement("h3");
    const btnEliminar = document.createElement("button");

    //Asiganmos la clase al div contenedor de la card
    cards.classList.add("service-card");
    btnEliminar.classList.add("btnEliminar");


    //Dar los valores 
    title.innerText = service.Nombre_servicio;
    p.innerText = service.Descripcion;
    p2.innerText = `ID: ${service.Id}`;
    price.innerText = `$ ${service.Precio}`;
    btnEliminar.innerText = `Eliminar Servicio`
    btnEliminar.addEventListener('click', function() {
        eliminarServicio(service.Id); // Agrega la llamada a eliminarServicio
    });

    //Appender al contenedor padre
    cards.appendChild(title);
    cards.appendChild(p);
    cards.appendChild(p2);
    cards.appendChild(price);
    cards.appendChild(btnEliminar);

    return cards;
}




//Funcion para actualizar servicio
function actualizarSer() {
    const servicioData = {
        Id: document.getElementById("id").value,
        Nombre_servicio: document.getElementById("nombreRepuestoNew").value,
        Descripcion : document.getElementById("descripcionRepuestoNew").value,
        Precio: parseFloat(document.getElementById("precioRepuestoNew").value),
    }

    console.log("Datos a actualizar: ", servicioData); // Verifica los datos
        put(servicioData);

    };





    //ASINCRONISMOO
function cargarServicios(){
    $.get("http://localhost:55224/api/Servicios", (data, status) =>{
        const cardHtml = data.map((card) => renderCard(card));        
        container.append(...cardHtml);
        console.log(data)
    })
} 
    
document.addEventListener("DOMContentLoaded", cargarServicios);


function post(servicioData){
    $.ajax({
        type: "POST",
        dataType: "json",
        data: servicioData,
        url : "http://localhost:55224/api/Servicios",
        success:function(data){
            alert("Proceso exitoso...");
            cargarServicios();
        },
        error: function(xhr, status, error) {
            alert("Error en el registro: " + error);
            console.error(xhr.responseText);
        }
    })
}

function put(servicioData) {
    $.ajax({
        type: "PUT",
        data: JSON.stringify(servicioData),
        url: `http://localhost:55224/api/Servicios/${servicioData.Id}`,
        contentType: "application/json",
        success: function (data) {
            alert("Cliente actualizado exitosamente.");
            console.log("Respuesta del servidor:", data);
            cargarServicios(); // Vuelve a cargar los clientes para reflejar los cambios
        },
        error: function (xhr, status, error) {
            alert("Error al actualizar el cliente: " + error);
            console.error(xhr.responseText);
        }
    });
}

function eliminarServicio(servicioId) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:55224/api/Servicios/${servicioId}`,
        success: function() {
            alert("Servicio eliminado con éxito.");
            cargarServicios(); // Actualiza la lista de clientes después de eliminar
        },
        error: function(xhr, status, error) {
            alert("Error al eliminar el cliente: " + error);
            console.error(xhr.responseText);
            console.log(status);
        }
    });
}
