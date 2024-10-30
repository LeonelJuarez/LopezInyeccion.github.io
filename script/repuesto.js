const containerSpare = document.getElementById("spareConteiner")

document.getElementById('btnGuardarRepuesto').addEventListener('click', function (event) {
    event.preventDefault();
    guardarRepuesto();

});


function guardarRepuesto(){
    const spareData = {       
        Nombre_repuesto: document.getElementById("nombreRepuesto").value,
        Descripcion : document.getElementById("descripcionRepuesto").value,
        Precio: parseFloat(document.getElementById("precioRepuesto").value),
    }
    console.log(spareData);
    post(spareData);
}

function renderCard(spare) {

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
    title.innerText = spare.Nombre_repuesto;
    p.innerText = spare.Descripcion;
    p2.innerText = spare.Id;
    price.innerText = spare.Precio;

    //Appender al contenedor padre
    cards.appendChild(title);
    cards.appendChild(p);
    cards.appendChild(p2);
    cards.appendChild(price);

    return cards;
}


function cargarSpare(){
    $.get("http://localhost:55224/api/Repuestos", (data, status) =>{
        const cardHtml = data.map((card) => renderCard(card));        
        containerSpare.append(...cardHtml);
        console.log(data)
    })
} 

document.addEventListener("DOMContentLoaded", cargarSpare);




function post(spareData){
    $.ajax({
        type: "POST",
        dataType: "json",
        data: spareData,
        url : "http://localhost:55224/api/Repuestos",
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


