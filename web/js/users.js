var table;

$(document).ready(function () {
    dataTable();
    obteTipo();
});

function obteTipo() {
    $.getJSON('http://ec2-52-14-245-189.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/TipoUsuario', function(data) {
        var vehiculos = data.tipoUsuario;
        $('#tipoupd li').remove();
        $('#tipo li').remove();
        $.each(vehiculos, function(index, vehiculo) {
            $('#tipou').append('<option value="' + vehiculo.codiTipoUsua + '">' +vehiculo.tipoUsua+'</option>');
            $('#tipoupd1').append('<option value="' + vehiculo.codiTipoUsua + '">' +vehiculo.tipoUsua+ '</option>');
        });
        $('select').formSelect();
    });
    
}
function dataTable() {
    table = $('#tableUser').DataTable({
        destroy: true,
        ajax: {
            method: 'GET',
            url: 'http://ec2-52-14-245-189.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Usuario',
            data: {},
            dataSrc: 'usuario'
        },
        columns: [{
            data: 'codiUsua',
            "visible": false
            
        }, {
            data: 'nombUsua',
            "visible": true
        }, {
            data: 'apelUsua',
            "visible": true
        }, {
            data: 'teleUsua',
            "visible": true
        }, {
            data: 'duiUsua',
            "visible": true
        }, {
            data: 'nitUsua',
            "visible": false
        },{
            data: 'corrUsua'
        }, {
            data: 'tipoUsuario.codiTipoUsua',
            "visible": false
        }, {
            data: 'tipoUsuario.tipoUsua',
            "visible": true
        }, {
            defaultContent: "<a href='#update' class='update btn-small blue darken-1 waves-effect waves-ligth modal-trigger'>Modificar</a> <a href='#remove' class='delete btn-small red darken-1 waves-effect waves-ligth modal-trigger'>Eliminar</a>"
        }],
        language: {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        iDisplayLength: 5
    });
    $('select').formSelect();
     // Llamamos al metodo para obtener los datos, para actualizar
     getDataToUpdate("#tableUser tbody", table);
     getIdToDelete("#tableUser tbody", table);
}
function getDataToUpdate(tbody, table) {
    $('tbody').on("click", "a.update", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#firstname1").next("label").addClass("active");
        $("#lastname1").next("label").addClass("active");
        $("#direc1").next("label").addClass("active");
        $("#phone1").next("label").addClass("active");
        $("#dui1").next("label").addClass("active");
        $("#nit1").next("label").addClass("active");
        $("#pasa1").next("label").addClass("active");
        $("#email1").next("label").addClass("active");
        $('#updaCodi').val(data.codiUsua);
        $('#firstname1').val(data.nombUsua);
        $('#lastname1').val(data.apelUsua);
        $('#direc1').val(data.direUsua);
        $('#phone1').val(data.teleUsua);
        $('#dui1').val(data.duiUsua);
        $('#nit1').val(data.nitUsua);
        $('#pasa1').val(data.pasaUsua);
        $('#email1').val(data.corrUsua);
        $('#tipoupd1').val(data.tipoUsuario.tipoUsua);
        console.log(data);
        
    });
}
// Funcion para obtener el ID
function getIdToDelete(tbody, table) {
    $('tbody').on("click", "a.delete", function() {
        var data = table.row($(this).parents("tr")).data();
        $('#deleCodi').val(data.codiUsua);
       
    });
}
function add(){
    var nomb = $('#firstname').val();
    var apel = $('#lastname').val();
    var dire = $('#direc').val();
    var tele = $('#phone').val();
    var dui = $('#dui').val();
    var nit = $('#nit').val();
    var pasa = $('#pasa').val();
    var mail = $('#email').val();
    var pass = $('#pass').val();
    var tipo = $('#tipou').val();
    $.ajax({
        url : 'http://ec2-52-14-245-189.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Usuario/create',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'POST',
        data : JSON.stringify({
            codiUsua:null,
            tipoUsuario : {codiTipoUsua:tipo},
            nombUsua : nomb,
            apelUsua : apel,
            direUsua : dire,
            teleUsua : tele,
            duiUsua : dui,
            nitUsua : nit,
            pasaUsua : pasa,
            corrUsua : mail,
            contUsua : pass,
            liceUsua:null,
            estaUsua:1
        }),
        dataType:'JSON',
        success : function(resp) {
            console.log(resp);
            
            // Recargando la tabla
            table.ajax.reload();
            // Reset
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Usuario agregado exitosamente',
                showConfirmButton: false,
                timer: 1300
              })
            $('.modal-footer').show();
            $('#add').modal('close');
            $('#frmAdd')[0].reset();
        },
        error : function() {
            console.log("No se pudo contactar con el servidor");
            swal({
                position: 'top-end',
                type: 'error',
                title: 'Error',
                showConfirmButton: false,
                timer: 1300
              })
        }
    });
  
}
//Pendiente
function update(){
    var codi=$('#updaCodi').val();
    var nomb = $('#firstname1').val();
    var apel = $('#lastname1').val();
    var dire = $('#direc1').val();
    var tele = $('#phone1').val();
    var dui = $('#dui1').val();
    var nit = $('#nit1').val();
    var pasa = $('#pasa1').val();
    var mail = $('#email1').val();
    var tipo = $('#tipoupd1').val();
    $.ajax({
        url : 'http://ec2-52-14-245-189.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Usuario/update',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiUsua:codi,
            tipoUsuario : {codiTipoUsua:tipo},
            nombUsua : nomb,
            apelUsua : apel,
            direUsua : dire,
            teleUsua : tele,
            duiUsua : dui,
            nitUsua : nit,
            pasaUsua : pasa,
            corrUsua : mail,
            liceUsua:null,
            estaUsua:1
        }),
        dataType:'JSON',
        success : function(resp) {
            console.log(resp);
            
            // Recargando la tabla
            table.ajax.reload();
            // Reset
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Usuario modificado exitosamente',
                showConfirmButton: false,
                timer: 1300
              })
            $('.modal-footer').show();
            $('#add').modal('close');
            $('#frmAdd')[0].reset();
        },
        error : function() {
            console.log("No se pudo contactar con el servidor");
            swal({
                position: 'top-end',
                type: 'error',
                title: 'Error',
                showConfirmButton: false,
                timer: 1300
              })
        }
    });
  
}
function remove(){
    var codi=$('#deleCodi').val();
    var nomb = $('#nombdel').val();
    var apel = $('#apeldel').val();
    var dire = $('#direcdel').val();
    var tele = $('#teledel').val();
    var dui = $('#duidel').val();
    var nit = $('#nitdel').val();
    var pasa = $('#pasadel').val();
    var mail = $('#corrdel').val();
    var pass = $('#contdel').val();
    var tipo = $('#tipoudel').val();
    $.ajax({
        url : 'http://ec2-52-14-245-189.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Usuario/delete',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiUsua:codi,
            estaUsua:0
        }),
        dataType:'JSON',
        success : function(resp) {
            console.log(resp);
            // Recargando la tabla
            table.ajax.reload();
            // Reset
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Usuario eliminado exitosamente',
                showConfirmButton: false,
                timer: 1300
              })
            $('.modal-footer').show();
            $('#remove').modal('close');
            $('#frmDelete')[0].reset();
        },
        error : function() {
            console.log("No se pudo contactar con el servidor");
            swal({
                position: 'top-end',
                type: 'error',
                title: 'Error',
                showConfirmButton: false,
                timer: 1300
              })
        }
    });
  
}