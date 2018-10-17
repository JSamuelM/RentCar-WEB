var table;

$(document).ready(function () {
    dataTable();
});

function dataTable() {
    table = $('#tableType').DataTable({
        destroy: true,
        ajax: {
            method: 'GET',
            url: 'http://ec2-52-14-245-189.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/TipoVehiculo',
            data: {},
            dataSrc: 'tipoVehiculo'
        },
        columns: [{
            data: 'codiTipoVehi',
            "visible": false
            
        }, {
            data: 'tipoVehi'
        },{
            data: 'estaTipoVehi',
            "visible": false
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
     getDataToUpdate("#tableType tbody", table);
     // Llamamos al metodo para obtener el id del registro, para eliminar
     getIdToDelete("#tableType tbody", table);
}
// Funcion para obtener datos
function getDataToUpdate(tbody, table) {
    $('tbody').on("click", "a.update", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#nameupd").next("label").addClass("active");
        $("#updaCodi").val(data.codiTipoVehi),
        $("#nameupd").val(data.tipoVehi);
        
    });
}
// Funcion para obtener el ID
function getIdToDelete(tbody, table) {
    $('tbody').on("click", "a.delete", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#namedel").next("label").addClass("active");
        var codiTipoVehi = $("#deleCodi").val(data.codiTipoVehi);
        $("#nameupd").val(data.tipoVehi);
    });
}
function add(){
    
    var nomb=$('#nameadd').val();

    $.ajax({
        url : 'http://ec2-52-14-245-189.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/TipoVehiculo/create',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'POST',
        data : JSON.stringify({
            codiTipoVehi:null,
            tipoVehi:nomb,
            estaTipoVehi:1,
            
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
                title: 'Tipo de vehiculo guardado exitosamente',
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
function update(){
    var codi=$('#updaCodi').val();
    var nomb=$('#nameupd').val();

    $.ajax({
        url : 'http://ec2-52-14-245-189.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/TipoVehiculo/update',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiTipoVehi:codi,
            tipoVehi:nomb,
            estaTipoVehi:1,
            
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
                title: 'Tipo de vehiculo modificado exitosamente',
                showConfirmButton: false,
                timer: 1300
              })
            $('.modal-footer').show();
            $('#update').modal('close');
            $('#frmUpdate')[0].reset();
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
    var nomb=$('#nameupd').val();
    $.ajax({
        url : 'http://ec2-52-14-245-189.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/TipoVehiculo/delete',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiTipoVehi:codi,
            tipoVehi:nomb,
            estaTipoVehi:0,
            
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
                title: 'Tipo de vehiculo borrado exitosamente',
                showConfirmButton: false,
                timer: 1300
              })
            
            $('.modal-footer').show();
            $('#remove').modal('close');
            
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
