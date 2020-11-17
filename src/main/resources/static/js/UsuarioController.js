/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * @param {cedulaActual} cedula del usuraio actual 
 * @returns {undefined}
 */
function iniciarLocalStorageUsuario(cedulaActual) {

    localStorage.setItem('Actual', cedulaActual);
    //localStorage.removeItem('key');
    //localStorage.clear();
}

/**
 * @param {transaccion} transaccion que crusa el usuario 
 * @returns {undefined}
 */
function iniciarLocalStorageTransaccion(transaccion) {

    localStorage.setItem('Actual', transaccion);
    //alert(localStorage.getItem('Actual'));
    //localStorage.removeItem('key');
    //localStorage.clear();
}

/**
 * @param {idProducto} idProducto de la variedad producto
 * @param {idVProducto} idVProducto del producto a vender
 * @returns {undefined}
 */
function guardarProductoPorVariedadProducto(idProducto, idVProducto) {
    localStorage.setItem('A0' + idVProducto, idProducto);
    //alert(localStorage.getItem('A0'+idVProducto));
}

/**
 * @param {idUsuario} idUsuario del proveedor
 * @param {idVProducto} idVProducto del producto a vender
 * @returns {undefined}
 */
function guardarProveedoresLocalStorage(idUsuario, idVProducto) {

    localStorage.setItem(idVProducto, idUsuario);
    //alert('IdProducto: ' + localStorage.getItem(idVProducto));


}
/**
 * @param {idVProducto} idVProducto del producto a de la transaccion
 * @param {idTransaccion} id de la transaccion 
 * @returns {undefined}
 */
function guardarProductoPorIdTransaccion(idVProducto, idTransaccion) {
    localStorage.setItem('A0t'+idTransaccion, String(idVProducto));
    //alert('IdProducto: ' + localStorage.getItem(idVProducto));
}




/**
 * 
 * @returns {undefined}
 */
function cerrarLocalStorageUsuario() {

//localStorage.removeItem('key');
    localStorage.clear();
}

/// Funcion para llamar las alertas de alertify

function callAlert(text, web) {
    if (web !== null) {
        alertify.alert(text[0], text[1]).set('label', 'OK');
        location.href = web;
    } else {
        alertify.alert(text[0], text[1]).set('label', 'OK');
    }

}

function verificarSesion() {
    if (localStorage.length === 0) {
        alert("Debe iniciar Sesion");
        $('#divRegistro').show();
    } else {
        $('#divRegistro').hide();
        location.href = "panelUsuario.html";
    }
}

/**
 * 
 * @returns {undefined}
 */
function registrarUsuario() {

    var nullAlert = false;
    //document.getElementById("alertDiv").innerHTML = "";
    var alerta;
    if (document.getElementById("upUsername").value === '') {
        nullAlert = true;

        alerta = ' Ingrese usuario.';
        alertify.error(alerta);
        //document.getElementById("alertDiv").innerHTML += divAlerta(alerta);
    }
    
    if (document.getElementById("upPassword").value === '') {
        nullAlert = true;
        alerta = ' Ingrese contraseña.';
        alertify.error(alerta);
    }

    if (document.getElementById("upPassword2").value === '') {
        nullAlert = true;
        alerta = ' Por favor, Repitir contraseña.';
        alertify.error(alerta);

    }
    if (document.getElementById("upPassword2").value !== document.getElementById("upPassword").value) {
        nullAlert = true;
        alerta = ' Contraseñas no coinciden.';
        alertify.error(alerta);

    }

    if (!nullAlert) {
        axios.post('/api/v1/users/', {
            "1": {
                userPassword: document.getElementById("upPassword").value,
                userNickname: document.getElementById("upUsername").value
            }


        })
            .then(function (response) {
                console.log(">>> EXITO REGISTRO");
                console.log(response.data);
                var text = ["Success", "Usuario Registrado"];
                var web = "login.html";
                //alertify.success(text[0]);
                //alert(text[1]);
                alertify.alert(text[0], text[1]).set('label', 'OK');
                alert(text[1]);
                callAlert(text, web);

            })
            .catch(function (error) {
                console.log(">>> ERROR REGISTRO");
                console.log(error.message)
                if (error.message == "Request failed with status code 406") {
                    alertify.error("Usuario ya registrado");
                } else {
                    alertify.error("Server Error, try again later");
                }

            })

    } else {
        alertify.error("<b>>>Please, fill in all the required fields.<<</b>");
    }

}

/**
 * 
 * @returns {undefined}
 */
function iniciarSesion() {
    axios.get('/api/v1/users/' + document.getElementById("inNickname").value)
            .then(function (response) {
                if (response.data["userPassword"] === document.getElementById("inContraseña").value) {
                    iniciarLocalStorageUsuario(response.data["_id"])
                    location.href = "panel.html";
                } else {
                    alert("Contraseña incorrecta");
                }
            })
            .catch(function (error) {
                alert("Este usuario no existe");
            })
}

function cerrarSesion() {
    cerrarLocalStorageUsuario()
    location.href = "index.html";
}



/**
 * 
 * @returns {undefined}
 */
function cargarUsuario() {
    axios.get('/api/v1/users/' + localStorage.getItem('Actual'))
            .then(function (response) {
                document.getElementById("nombreUsuarioActual").innerHTML = response.data["nombreUsuario"] + " " + response.data["apellidoUsuario"];
                document.getElementById("calificacionUsuarioActual").innerHTML = " Clasificacion: " + response.data["calificacionUsuario"];
                document.getElementById("saldoUsuarioActual").innerHTML = "Saldo: $" + response.data["saldoUsuario"] + " USD";
                document.getElementById("avatarUsuario").innerHTML = '<img src="img/' + response.data["imagenUsuario"] + '" class="img-circle" height="80" width="80" alt="Avatar">';

                //Actualizar los productos que estan en venta
                actualizarProductosEnVenta();
                actualizarTransaccionesEnCurso();
                actualizarHistorialDeTransacciones();

                //actualizarHistorialDeTransacciones(response.data["cedulaUsuario"]);
            })
            .catch(function (error) {
                alert("Error, No se pudo cargar usuario");
            })

}



function actualizarProductosEnVenta() {
    var tabla = document.getElementById("TablaProducto");
    tabla.innerHTML = "<th>Variedad</th><th>Proveedor</th><th>Cantidad</th><th>Precio</th><th>Total</th><th>Fecha de Cosecha</th><th></th>" +
            "<tbody id='tbodyTablaProducto'></tbody>";

    var tbody = document.getElementById("tbodyTablaProducto");
    axios.get('/commerceProducto/variedades')
            .then(function (response) {

                for (var x in response.data) {
                    if (response.data[x]["idUsuario"] !== parseInt(localStorage.getItem('Actual'))) {

                        guardarProductoPorVariedadProducto(response.data[x]["idProducto"], response.data[x]["idVProducto"]);
                        guardarProveedoresLocalStorage(response.data[x]["idUsuario"], response.data[x]["idVProducto"]);
                        var filatr = document.createElement("tr");
                        var resultado = response.data[x]["cantidadVProducto"] * response.data[x]["precioProducto"];
                        var idvProducto = "'" + String(response.data[x]["idVProducto"]) + "'";
                        filatr.innerHTML = '<td>' + response.data[x]["nombreVProducto"] + '</td>' +
                                '<td id="tdProveedor' + response.data[x]["idVProducto"] + '"></td>' +
                                '<td>' + response.data[x]["cantidadVProducto"] + 'kg ' + '</td>' +
                                '<td>$' + response.data[x]["precioProducto"] + ' COP (Precio/Kilo)</td>' +
                                '<td><b>$' + resultado + ' COP</b></td>' +
                                '<td>' + response.data[x]["fechaCosecha"] + '</td>' +
                                '<td> <button onclick="crearTransaccion(' + idvProducto +
                                ',' + localStorage.getItem('Actual') +
                                ',' + response.data[x]["idUsuario"] +
                                ')" class="btn btn-primary">COMPRAR</button> </td>';
                        tbody.appendChild(filatr);
                    }
                }

                for (var i = 0; i < localStorage.length - 1; i++) {
                    agregarProveedor(i);
                }

            })
}

function agregarProveedor(x) {

    var producto = localStorage.key(x);
    if (String(producto).substr(0, 4) === '5c0f') {
        //alert(localStorage.getItem(producto));
        axios.get('/commerceUsuario/usuarios/' + localStorage.getItem(producto))
                .then(function (response) {

                    document.getElementById('tdProveedor' + localStorage.key(x)).innerHTML = response.data["nombreUsuario"] + ' ' +
                            response.data["apellidoUsuario"] + ' ' +
                            '<br> Calificación: ' + response.data["calificacionUsuario"];

                })
    }
}

function actualizarTransaccionesEnCurso() {
    var tabla = document.getElementById("tablaTransaccionesEnCurso");
    tabla.innerHTML = "<thead><tr><th>ID Transacción</th><th>Producto</th><th>Total</th><th></th></tr></thead>" +
            "<tbody id='tbodyTablaTransaccionesEnCursoV'></tbody><tbody id='tbodyTablaTransaccionesEnCursoC'></tbody>";

    var tbodyV = document.getElementById("tbodyTablaTransaccionesEnCursoV");
    axios.get('/commerceTransaccion/transacciones/vendedor/' + localStorage.getItem('Actual'))
            .then(function (response) {
                for (var x in response.data) {
                    if (response.data[x]["completada"] === false) {
                        guardarProductoPorIdTransaccion(response.data[x]["idVProducto"], response.data[x]["idTransaccion"]);

                        var filatr = document.createElement("tr");
                        filatr.innerHTML = '<td>' + response.data[x]["idTransaccion"] + '</td>'
                                + '<td id="tdNombreProducto' + 'A0t'+response.data[x]["idTransaccion"] + '"></td>'
                                + '<td id="tdTotalProducto' + 'A0t'+response.data[x]["idTransaccion"] + '"></td>'
                                + '<td> <a href="transaccion.html" class="label label-primary">VER</a> </td>';
                        tbodyV.appendChild(filatr);
                    }
                }
                for (var i = 0; i < localStorage.length - 1; i++) {
                    agregarPoducto(i);
                }


            })

    var tbodyC = document.getElementById("tbodyTablaTransaccionesEnCursoC");
    axios.get('/commerceTransaccion/transacciones/comprador/' + localStorage.getItem('Actual'))
            .then(function (response) {
                for (var x in response.data) {
                    if (response.data[x]["completada"] === false) {
                        guardarProductoPorIdTransaccion(response.data[x]["idVProducto"], response.data[x]["idTransaccion"]);

                        var filatr = document.createElement("tr");
                        filatr.innerHTML = '<td>' + response.data[x]["idTransaccion"] + '</td>'
                                + '<td id="tdNombreProducto' + 'A0t'+response.data[x]["idTransaccion"] + '"></td>'
                                + '<td id="tdTotalProducto' + 'A0t'+response.data[x]["idTransaccion"] + '"></td>'
                                + '<td> <a href="transaccon.html" class="label label-primary">VER</a> </td>';
                        tbodyC.appendChild(filatr);
                    }
                }
                for (var i = 0; i < localStorage.length - 1; i++) {
                    agregarPoducto(i);
                }
                
                


            })
}

function agregarPoducto(x) {
    var idProducto = localStorage.key(x);

    if (String(idProducto).substr(0, 3) === 'A0t') {
        //alert(localStorage.getItem(producto));
        axios.get('/commerceProducto/variedad/' + String(localStorage.getItem(idProducto)))
                .then(function (response) {
                    //alert('idProducto'+localStorage.getItem(idProducto)+' '+response.data["nombreVProducto"]);
                    
                    //alert(localStorage.key(x)+' '+localStorage.getItem(idProducto) +''+ response.data["nombreVProducto"]);
                    var total = response.data["precioProducto"] * response.data["cantidadVProducto"];
                    
                    document.getElementById('tdNombreProducto' + localStorage.key(x)).innerHTML = response.data["nombreVProducto"] ;
                    document.getElementById('tdTotalProducto' + localStorage.key(x)).innerHTML = total;

                })
    }
}

function actualizarHistorialDeTransacciones() {
    var tabla = document.getElementById("tbodyTablaHitorial");
    tabla.innerHTML = "<thead><tr><th>ID Transacción</th><th>Producto</th><th>Total</th><th></th></tr></thead>" +
            "<tbody id='tbodyTablaHitorialV'></tbody><tbody id='tbodyTablaHitorialC'></tbody>";

    var tbodyV = document.getElementById("tbodyTablaHitorialV");
    axios.get('/commerceTransaccion/transacciones/vendedor/' + localStorage.getItem('Actual'))
            .then(function (response) {

                for (var x in response.data) {
                    if (response.data[x]["completada"] === true) {
                        guardarProductoPorIdTransaccion(response.data[x]["idVProducto"], response.data[x]["idTransaccion"]);

                        var filatr = document.createElement("tr");
                        filatr.innerHTML = '<td>' + response.data[x]["idTransaccion"] + '</td>'
                                + '<td id="tdNombreProducto' + 'A0t'+response.data[x]["idTransaccion"] + '"></td>'
                                + '<td id="tdTotalProducto' + 'A0t'+response.data[x]["idTransaccion"] + '"></td>'
                                + '<td> <a href="transaccon.html" class="label label-primary">VER</a> </td>';
                        tbodyV.appendChild(filatr);
                    }
                }
                for (var i = 0; i < localStorage.length - 1; i++) {
                    agregarPoducto(i);
                }

            })
    var tbodyC = document.getElementById("tbodyTablaHitorialC");
    axios.get('/commerceTransaccion/transacciones/comprador/' + localStorage.getItem('Actual'))
            .then(function (response) {
                for (var x in response.data) {
                    if (response.data[x]["completada"] === true) {
                        guardarProductoPorIdTransaccion(response.data[x]["idVProducto"], response.data[x]["idTransaccion"]);

                        var filatr = document.createElement("tr");
                        filatr.innerHTML = '<td>' + response.data[x]["idTransaccion"] + '</td>'
                                + '<td id="tdNombreProducto' + 'A0t'+response.data[x]["idTransaccion"] + '"></td>'
                                + '<td id="tdTotalProducto' + 'A0t'+response.data[x]["idTransaccion"] + '"></td>'
                                + '<td> <a href="transaccon.html" class="label label-primary">VER</a> </td>';
                        tbodyC.appendChild(filatr);
                    }
                }
                for (var i = 0; i < localStorage.length - 1; i++) {
                    agregarPoducto(i);
                }


            })
}






/* 
 * Funciones para controlador de productos
 * 
 */

function actualizarAnadirProducto() {

    document.getElementById("cedulaUsuarioActual").innerHTML = localStorage.getItem('Actual');
    axios.get('/commerceProducto/productos')
            .then(function (response) {
                var selectCategoriaProducto = document.getElementById("selectCategoriaProducto");
                for (var x in response.data) {
                    //alert(response.data[x]["nombreProducto"]);
                    var opt = document.createElement("option");
                    opt.setAttribute("value", response.data[x]["idProducto"]);
                    var text = document.createTextNode(response.data[x]["nombreProducto"]);
                    opt.appendChild(text);
                    selectCategoriaProducto.appendChild(opt);
                    localStorage.setItem('reg' + response.data[x]["idProducto"], response.data[x]["nombreProducto"]);
                }
            })


}


function registrarNuevoVariedadProducto() {


    axios.post('/commerceProducto/registrarvproducto', {
        "1": {
            precioProducto: document.getElementById('precioProducto').value,
            fechaCosecha: document.getElementById("fechaCosecha").value,
            nombreVProducto: localStorage.getItem('reg' + document.getElementById("selectCategoriaProducto").value) + ' ' + document.getElementById("inNombre").value,
            idProducto: document.getElementById("selectCategoriaProducto").value,
            idUsuario: localStorage.getItem('Actual'),
            cantidadVProducto: document.getElementById("cantidadProducto").value

        }
    })
            .then(function (response) {
                console.log(response.data);
                alert("Producto Registrado Exitosamente.");
            })
}


/* 
 * Funciones para controlador ransacciones
 * 
 */
function crearTransaccion(idVProducto, cedulaComprador, cedulaProveedor) {
    //alert(idVProducto + ' ' + cedulaComprador + ' ' + cedulaProveedor);
    axios.post('/commerceTransaccion/crearTransaccion', {
        "1": {
            cedulaComprador: cedulaComprador,
            cedulaVendedor: cedulaProveedor,
            idVProducto: idVProducto
        }
    })
            .then(function (response) {
                location.href = "transaccion.html";
            })
}
