function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://150.230.33.50:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionFincas() {
    $.ajax({
        url:"http://150.230.33.50:8080/api/Farm/all",
        //url: "http://localhost:8080/api/Farm/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaFinca(response);
        }

    });

}

function pintarRespuestaFinca(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Direccion</td>";
        myTable+="<td>Extension</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Categoria</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].address + "</td>";
        myTable+="<td>" + response[i].extension + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonFinca2" onclick="borrarInformacionFinca(' + response[i].id + ')">Borrar Finca!</button></td>';
        myTable+='<td><button class = "botonFinca2" onclick="editarDatosFinca(' + response[i].id + ')">Editar Finca!</button></td>';
        myTable+='<td><button class = "botonFinca2" onclick="actualizarDatosFinca(' + response[i].id + ')">Actualizar Finca!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaFinca").html(myTable);
}
//Capturar informacion para Actualizar
function editarDatosFinca(id) {
    $.ajax({
        dataType: 'json',
        url:"http://150.230.33.50:8080/api/Farm/"+id,
        //url: "http://localhost:8080/api/Farm/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#Fname").val(item.name);
            $("#Faddress").val(item.address);
            $("Fextension").val(item.extension);
            $("#Fdescription").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function guardarInformacionFincas() {

    if($("#Fname").val().length == 0 || $("#Faddress").val().length == 0 || $("#Fextension").val().length == 0 || $("#Fdescription").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#Fname").val(),
                address: $("#Faddress").val(),
                extension: $("#Fextension").val(),
                description: $("#Fdescription").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://150.230.33.50:8080/api/Farm/save",
                //url: "http://localhost:8080/api/Farm/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#Fname").val("");
                    $("#Faddress").val("");
                    $("#Fextension").val("");
                    $("#Fdescription").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function borrarInformacionFinca(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://150.230.33.50:8080/api/Farm/"+idElemento,
            //url: "http://localhost:8080/api/Farm/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaFinca").empty();

                alert("Se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizarDatosFinca(idElemento) {
    
    if($("#Fname").val().length == 0 || $("#Faddress").val().length == 0 || $("#Fextension").val().length == 0 || $("#Fdescription").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#Fname").val(),
            addres: $("#Faddress").val(),
            extension: $("#Fextension").val(),
            description: $("#Fdescription").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://150.230.33.50:8080/api/Farm/update",
            //url: "http://localhost:8080/api/Farm/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaFinca").empty();
                listarFinca();
                alert("Se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#Fname").val("");
                $("#Faddress").val("");
                $("#Fextension").val("");
                $("#Fdescription").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
