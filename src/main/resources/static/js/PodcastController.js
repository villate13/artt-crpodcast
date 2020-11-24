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
    localStorage.setItem('A0t' + idTransaccion, String(idVProducto));
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






/**
 * 
 * @returns {undefined}
 */
function cargarPodcast() {
    axios.get('/api/v1/podcast/')
        .then(function (response) {
            console.log(response.data);
            let pPodcast = response.data[0];
            console.log(pPodcast);
            document.getElementById("podcastTitle").innerHTML = pPodcast["podcastTitle"];
            document.getElementById("category").innerHTML = pPodcast["category"];
            document.getElementById("podcastLikes").innerHTML = pPodcast["podcastLikes"];
            document.getElementById("podcastShares").innerHTML = pPodcast["podcastShares"];
            document.getElementById("podcastDate").innerHTML = pPodcast["podcastDate"];

            // video
            if (pPodcast["podcastURL"].indexOf("youtube") !== -1) {
                let url = pPodcast["podcastURL"];
                let posicion = url.indexOf("?v=");
                let referencia = url.substr(posicion + 3);
                console.log(referencia);
                document.getElementById("podcastURL").innerHTML = '<iframe ' +
                    'src="https://www.youtube.com/embed/' + referencia + '"' +
                    'frameborder="0" allowfullscreen' +
                    '</iframe>';
            }

            // feedback
            //Feedback
            var div = document.getElementById("podcastFeedback");
            var feedback = pPodcast["podcastFeedback"];
            var starFull = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>' +
                '</svg>';

            var starEmpty = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                '<path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>' +
                '</svg>';

            for (var i = 0; i < 5; i++) {
                if (feedback - 1 >= i) {
                    div.innerHTML += starFull;
                } else {
                    div.innerHTML += starEmpty;
                }
            }


            // comentarios
            var divComments = document.getElementById("comentarios");

            var comentarios = pPodcast["commentaries"];

            for (var i = 0; i < comentarios.length; i++) {
                var comentario = comentarios[i];

                var col = '<div style="margin: 15px; padding:15px; box-shadow: 0px 1px 1px #888, 0px -1px 3px #888;" class="media">' +
                    '<img class="mr-3" src="./img/avatar.png" alt="avatar" width="75" height="75">' +
                    '<div class="media-body">' +
                    '<h5 class="mt-0">' + comentario[0] + '</h5>' +
                    comentario[1] +
                    '</div>' +
                    '</div>'

                divComments.innerHTML += col;

            }

            // otros podcast
            let otrosPodcast = response.data;
            var divComments = document.getElementById("otrosPodcast");


            for (var i = 1; i < 3; i++) {
                let podcast = otrosPodcast[i];


                // video
                let videoPodcast;
                if (podcast["podcastURL"].indexOf("youtube") !== -1) {
                    let url = podcast["podcastURL"];
                    let posicion = url.indexOf("?v=");
                    let referencia = url.substr(posicion + 3);
                    console.log(referencia);
                    videoPodcast = '<iframe ' +
                        'src="https://www.youtube.com/embed/' + referencia + '"' +
                        'frameborder="0" allowfullscreen' +
                        '</iframe>';
                }

                var fila = '<div class="card my-2 border-dark bg-light">' +
                    '<div class="card-header">' +
                    '<h5>' + podcast['podcastTitle'] + '</h5>' +
                    '</div>' +
                    '<div class="card-body">' +
                    videoPodcast +
                    '</div>' +
                    '</div>'

                divComments.innerHTML += fila;
            }






            //actualizarPodcastVista();
        })
        .catch(function (error) {
            alert("Error, No se pudo cargar podcasts");
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
                        '<td id="tdProveedor' + response.data[x][" idVProducto"] + '"></td>' +
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
                        + '<td id="tdNombreProducto' + 'A0t' + response.data[x]["idTransaccion"] + '"></td>'
                        + '<td id="tdTotalProducto' + 'A0t' + response.data[x]["idTransaccion"] + '"></td>'
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
                        + '<td id="tdNombreProducto' + 'A0t' + response.data[x]["idTransaccion"] + '"></td>'
                        + '<td id="tdTotalProducto' + 'A0t' + response.data[x]["idTransaccion"] + '"></td>'
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

                document.getElementById('tdNombreProducto' + localStorage.key(x)).innerHTML = response.data["nombreVProducto"];
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
                        + '<td id="tdNombreProducto' + 'A0t' + response.data[x]["idTransaccion"] + '"></td>'
                        + '<td id="tdTotalProducto' + 'A0t' + response.data[x]["idTransaccion"] + '"></td>'
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
                        + '<td id="tdNombreProducto' + 'A0t' + response.data[x]["idTransaccion"] + '"></td>'
                        + '<td id="tdTotalProducto' + 'A0t' + response.data[x]["idTransaccion"] + '"></td>'
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
