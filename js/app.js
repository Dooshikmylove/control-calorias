// Variables globales
var gastos = JSON.parse(localStorage.getItem("gastos")) || [];
var comida = JSON.parse(localStorage.getItem("gastos")) || [];
var tcomida=0;
var tGastos = 0;
var disponible = 0;

// Guardar nuevo gasto
const guardarGasto = () => {
    let descripcion = document.getElementById("descripcion").value.trim();
    let costo = parseInt(document.getElementById("costo").value);
    let categoria = document.getElementById("categoria").value;

    if (descripcion === "" || isNaN(costo) || costo <= 0) {
        Swal.fire({ title: "ERROR", text: "Datos incorrectos",         imageUrl: 'img/2.png', // Puedes cambiar la imagen aquí
            imageWidth: 200,
            imageHeight: 200, });
        return;
    }

    gastos.push({ descripcion, costo, categoria });
    localStorage.setItem("gastos", JSON.stringify(gastos));
    document.getElementById("descripcion").value = "";
    document.getElementById("costo").value = "";
    bootstrap.Modal.getInstance(document.getElementById("nuevoGasto")).hide();
    mostrarGastos();
};

// Mostrar gastos filtrados
const mostrarGastos = () => {
    let gastosHTML = '';
    tGastos = 0;
    tcomida=0;
    gastos.forEach((gasto, index) => {
        if(gasto.categoria === "ejercicio"){
            gastosHTML += `
            <div class="card text-center w-100 m-auto mt-3 p-2" style="border: 3px solid #FF9FE5; color: white">
                <div class="row">
                    <div class="col"><img src="img/${gasto.categoria}.png" class="imgCategoria" width="100px" height="100px"></div>
                    <div class="col text-start">
                        <p><b>Descripción: </b><small>${gasto.descripcion}</small></p>
                        <p><b>Calorias : </b><small>${gasto.costo.toFixed(2)}</small></p>
                    </div>
                    <div class="col">
                        <button class="btn" onclick="cargarGasto(${index})" data-bs-toggle="modal" data-bs-target="#cargarGasto"> <img src="img/editar.png" width="50px" height="50px" alt=""></button>
                        <button class="btn" onclick="deleteGasto(${index})">  <img src="img/borrar.png" width="50px" height="50px" alt=""></button>
                    </div>
                </div>
            </div>`;
        tGastos +=parseInt(gasto.costo);
        }else if(gasto.categoria === "comida"){
        gastosHTML += `
            <div class="card text-center w-100 m-auto mt-3 p-2" style="border: 3px solid #FF9FE5; color: white">
                <div class="row">
                    <div class="col"><img src="img/${gasto.categoria}.png" class="imgCategoria" width="100px" height="100px"></div>
                    <div class="col text-start">
                        <p><b>Descripción: </b><small>${gasto.descripcion}</small></p>
                        <p><b>Calorias : </b><small>${gasto.costo.toFixed(2)}</small></p>
                    </div>
                    <div class="col">
                        <button class="btn" onclick="cargarGasto(${index})" data-bs-toggle="modal" data-bs-target="#cargarGasto"> <img src="img/editar.png" width="50px" height="50px" alt=""></button>
                        <button class="btn" onclick="deleteGasto(${index})">  <img src="img/borrar.png" width="50px" height="50px" alt=""></button>
                    </div>
                </div>
            </div>`;
            tcomida+= parseInt(gasto.costo);
}
    });

    if(tGastos>0){
        let totalDisponible = document.querySelector("#totalDisponible");
        totalDisponible.innerHTML=`${tGastos.toFixed(2)} Cal`;
    }
    if(tcomida>0){
        let totalPresupuesto = document.querySelector("#totalPresupuesto");
        totalPresupuesto.innerHTML=`${tcomida.toFixed(2)} Cal`;
    }  
    let compara= document.querySelector("#totalGastos") ;
    if(tcomida> tGastos){
        compara.innerHTML=`${(tcomida-tGastos).toFixed(2)} Cal`;
    }else
    if(tcomida<tGastos){
        compara.innerHTML=`${(tcomida-tGastos).toFixed(2)} Cal`;
    }
    else{
        compara.innerHTML= `${(0).toFixed(2)} Cal`;
    }

    document.getElementById('listaGastos').innerHTML = gastosHTML || "<b>NO HAY ACTIVIDADES</b>";
    pintarDatos();
};

// Pintar datos del progreso
const pintarDatos = () => {
    let totalPresupuesto = document.querySelector("#totalPresupuesto");
    let totalDisponible = document.querySelector("#totalDisponible");

    disponible = totalPresupuesto - totalDisponible;

};

// Cargar gasto para editar
const cargarGasto = (index) => {
    let gasto = gastos[index];
    document.getElementById("eindex").value = index;
    document.getElementById("edescripcion").value = gasto.descripcion;
    document.getElementById("ecosto").value = gasto.costo;
    document.getElementById("ecategoria").value = gasto.categoria;
};

// Actualizar gasto
const actualizarGasto = () => {
    let index = document.getElementById("eindex").value;
    let descripcion = document.getElementById("edescripcion").value.trim();
    let costo = parseInt(document.getElementById("ecosto").value);
    let categoria = document.getElementById("ecategoria").value;

    if (descripcion === "" || isNaN(costo) || costo <= 0) {
        Swal.fire({ title: "ERROR", text: "Datos incorrectos",         imageUrl: 'img/2.png', // Puedes cambiar la imagen aquí
            imageWidth: 200,
            imageHeight: 200,});
        return;
    }

    gastos[index] = { descripcion, costo, categoria };
    localStorage.setItem("gastos", JSON.stringify(gastos));
    bootstrap.Modal.getInstance(document.getElementById("cargarGasto")).hide();
    mostrarGastos();
    Swal.fire({
        title: 'Gasto actualizado',
        text: 'El gasto se ha actualizado correctamente.',
        imageUrl: 'img/1.png', // Puedes cambiar la imagen aquí
        imageWidth: 200,
        imageHeight: 200,
    });
};

// Eliminar gasto
const deleteGasto = (index) => {
    gastos.splice(index, 1);
    localStorage.setItem("gastos", JSON.stringify(gastos));
    mostrarGastos();
};

// Reset de datos
const reset = () => {
    localStorage.removeItem("gastos");
    localStorage.removeItem("presupuesto");
    gastos = [];
    tPresupuesto = 0;
    tGastos = 0;
    disponible = 0;
    pintarDatos();
    mostrarGastos();
};

// Inicializar la aplicación
const inicio = () => {
    tPresupuesto = parseInt(localStorage.getItem("presupuesto")) || 0;
    mostrarGastos();
};

const reiniciar=()=>{
    location.reload()
}
