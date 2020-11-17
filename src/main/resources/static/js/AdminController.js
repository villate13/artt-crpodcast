/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cedulaAdministrador = 0;

/**
 * 
 * @returns {undefined}
 */
function iniciarSesion() {

    cedulaAdministrador = document.getElementById("inCedula").value;

    axios.get('/commerceAdmin/admins/' + document.getElementById("inCedula").value)
            .then(function (response) {
                console.log(response.data["contraseñaAdministrador"]);
                if (response.data["contraseñaAdministrador"] === document.getElementById("inContraseña").value) {
                    location.href = "panelAdministrador.html";
                } else {
                    alert("Contraseña incorrecta");
                }
            })
            .catch(function (error) {
                alert("Este administrador no existe")
            })
}

/**
 * 
 * @returns {undefined}
 */
function verificarAdmin() {
    console.log("Hola");
    if (cedulaAdministrador === 0) {
        alert("Al parecer no ha ingresado");
        location.href = "iniciarSesionAdmin.html";
    }
}

/**
 * 
 * @returns {undefined}
 */
function cargarCrearProducto() {
    document.getElementById("title").innerHTML = "Crear nuevo producto";
    document.getElementById("phrase").innerHTML = "Ingresa los siguientes datos para crear un nuevo producto";

    var form = document.getElementById("regForm");
    form.setAttribute("onsubmit", "crearProducto(); return false");

    form.innerHTML = "";

    form.appendChild(crearInput("inNombre", "Nombre"));
    form.appendChild(crearInput("inCategoria", "Categoria"));

    form.appendChild(crearBoton("Crear producto"));
}

/**
 * 
 * @returns {undefined}
 */
function cargarEliminarProducto() {
    document.getElementById("title").innerHTML = "Eliminar un producto";
    document.getElementById("phrase").innerHTML = "Selecciona un producto que quieres eliminar";

    var form = document.getElementById("regForm");
    form.setAttribute("onsubmit", "eliminarProducto(); return false");

    form.innerHTML = "";

    form.appendChild(crearBoton("Eliminar producto"));

    form.appendChild(document.createElement("br"));

    form.appendChild(cargarProductos());
}

/**
 * 
 * @returns {undefined}
 */
function eliminarProducto() {

    var boton = document.getElementById("dropdownMenuButton");

    var producto;

    axios.get('commerceProducto/productos')
            .then(function (response) {
                for (var x in response.data) {
                    for (var y in response.data[x]) {
                        if (y === "nombreProducto") {
                            if (response.data[x][y] === boton.innerHTML) {
                                axios.delete('commerceProducto/eliminarProducto/' + response.data[x]["idProducto"])
                                        .then(function (response) {
                                            alert("Producto eliminado");
                                            cargarEliminarProducto();
                                        })
                            }

                        }
                    }
                }
            })
}

/**
 * 
 * @returns {undefined}
 */
function cargarProductos() {

    var firstDiv = document.createElement("div");
    firstDiv.style.display = "flex";
    firstDiv.style.justifyContent = "center";
    firstDiv.style.alignItems = "center";

    var secondDiv = document.createElement("div");
    secondDiv.className = "dropdown";

    var boton = document.createElement("button");
    boton.className = "btn btn-secondary dropdown-toggle";
    boton.type = "button";
    boton.id = "dropdownMenuButton";
    boton.setAttribute("data-toggle", "dropdown");
    boton.setAttribute("aria-haspopup", "true");
    boton.setAttribute("aria-expanded", "false");
    boton.innerHTML = "Productos";

    var thirdDiv = document.createElement("div");
    thirdDiv.className = "dropdown-menu";
    thirdDiv.setAttribute("ariaLabelledby", "dropdownMenuButton");

    axios.get('commerceProducto/productos')
            .then(function (response) {
                for (var x in response.data) {
                    var a = document.createElement("a");
                    a.className = "dropdown-item";
                    a.innerHTML = response.data[x]["nombreProducto"];
                    a.setAttribute("onclick", "changeDropName(\"" + response.data[x]["nombreProducto"] + "\")");
                    thirdDiv.appendChild(a);
                }
            })

    secondDiv.appendChild(boton);
    secondDiv.appendChild(thirdDiv);
    firstDiv.appendChild(secondDiv);

    return firstDiv;
}

/**
 * 
 * @returns {undefined}
 */
function changeDropName(nombre) {
    document.getElementById("dropdownMenuButton").innerHTML = nombre;
}

/**
 * 
 * @param {type} idInput
 * @returns {undefined}
 */
function crearInput(idInput, titulo) {

    var firstDiv = document.createElement("div");
    firstDiv.style.display = "flex";
    firstDiv.style.justifyContent = "center";
    firstDiv.style.alignItems = "center";

    var secondDiv = document.createElement("div");
    secondDiv.className = "input-group mb-3";
    secondDiv.style.width = "30%";

    var thirdDiv = document.createElement("div");
    thirdDiv.className = "input-group-prepend";

    var span = document.createElement("span");
    span.className = "input-group-text";
    span.id = "basic-addon3";
    span.innerHTML = titulo;

    var input = document.createElement("input");
    input.type = "text";
    input.required = true;
    input.className = "form-control";
    input.id = idInput;
    input.ariaDescribedby = "basic-addon3";

    thirdDiv.appendChild(span);
    secondDiv.appendChild(thirdDiv);
    secondDiv.appendChild(input);
    firstDiv.appendChild(secondDiv);

    return firstDiv;
}

/**
 * 
 * @returns {undefined}
 */
function crearBoton(titulo) {
    var fourthDiv = document.createElement("div");
    fourthDiv.style.display = "flex";
    fourthDiv.style.justifyContent = "center";
    fourthDiv.style.alignItems = "center";

    var boton = document.createElement("button");
    boton.type = "submit";
    boton.className = "btn btn-secondary";
    boton.style.width = "30%";
    boton.innerHTML = titulo;

    fourthDiv.appendChild(boton);

    return fourthDiv;
}

/*
 * 
 * @param {type} alerta
 * @param {type} frase
 * @returns {undefined}
 */
function crearAlerta(alerta, frase) {

    var firstDiv = document.createElement("div");
    firstDiv.className = alerta;
    firstDiv.role = "alert";
    firstDiv.innerHTML = frase;
    firstDiv.id = "alerta";

    var secondDiv = document.createElement("div");
    secondDiv.style.display = "flex";
    secondDiv.style.justifyContent = "center";
    secondDiv.style.alignItems = "center";

    secondDiv.appendChild(firstDiv);

    return secondDiv;
}

/*
 * 
 */
function crearProducto() {
    axios.post('commerceProducto/registrarproducto', {
        "1": {
            "nombreProducto": document.getElementById("inNombre").value,
            "categoriaProducto": document.getElementById("inCategoria").value
        }
    })
            .then(function (response) {
                document.getElementById("regForm").appendChild(document.createElement("br"));
                document.getElementById("regForm").appendChild(crearAlerta("alert alert-success", "Producto creado exitosamente!"));
            })
            .catch(function (error) {
                document.getElementById("regForm").appendChild(document.createElement("br"));
                document.getElementById("regForm").appendChild(crearAlerta("alert alert-danger", "Error al crear el producto!"));
            })

    setTimeout(function () {
        $('#alerta').remove();
    }, 3000);
    
    cargarCrearProducto();
}