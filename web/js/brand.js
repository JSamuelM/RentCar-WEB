var table;

$(document).ready(function () {
    dataTable();
});

function dataTable() {
    table = $('#tableBrand').DataTable({
        destroy: true,
        ajax: {
            method: 'GET',
            url: 'http://localhost:8081/jerseyrent/webapi/Marca',
            data: {},
            dataSrc: 'marca'
        },
        columns: [{
            data: 'codiMarc',
            "visible": false
            
        }, {
            data: 'nombMarc'
        },{
            data: 'estaMarc',
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
     getDataToUpdate("#tableBrand tbody", table);
     // Llamamos al metodo para obtener el id del registro, para eliminar
     getIdToDelete("#tableBrand tbody", table);
}
// Funcion para obtener datos
function getDataToUpdate(tbody, table) {
    $('tbody').on("click", "a.update", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#nameupd").next("label").addClass("active");
        $("#updaCodi").val(data.codiMarc),
        $("#nameupd").val(data.nombMarc);
        
    });
}
// Funcion para obtener el ID
function getIdToDelete(tbody, table) {
    $('tbody').on("click", "a.delete", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#namedel").next("label").addClass("active");
        var codiTipoVehi = $("#deleCodi").val(data.codiMarc);
        $("#nameupd").val(data.nombMarc);
    });
}
function add(){
    
    var nomb=$('#nameadd').val();

    $.ajax({
        url : 'http://localhost:8081/jerseyrent/webapi/Marca/create',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'POST',
        data : JSON.stringify({
            codiMarc:null,
            nombMarc:nomb,
            estaMarc:1,
            
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
                title: 'Marca guardada exitosamente',
                showConfirmButton: false,
                timer: 1300
              })
            $('.modal-footer').show();
            $('#add').modal('close');
            $('#frmAdd')[0].reset();
        },
        error : function() {
            swal({
                position: 'top-end',
                type: 'error',
                title: 'Error',
                showConfirmButton: false,
                timer: 1300
              })
            console.log("No se pudo contactar con el servidor");

        }
    });
  
}
function update(){
    var codi=$('#updaCodi').val();
    var nomb=$('#nameupd').val();

    $.ajax({
        url : 'http://localhost:8081/jerseyrent/webapi/Marca/update',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiMarc:codi,
            nombMarc:nomb,
            estaMarc:1,
            
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
                title: 'Marca modificada exitosamente',
                showConfirmButton: false,
                timer: 1300
              })
            $('.modal-footer').show();
            $('#update').modal('close');
            $('#frmUpdate')[0].reset();
        },
        error : function() {
            swal({
                position: 'top-end',
                type: 'error',
                title: 'Error',
                showConfirmButton: false,
                timer: 1300
              })
            console.log("No se pudo contactar con el servidor");

        }
    });
  
}
function remove(){
    var codi=$('#deleCodi').val();
    var nomb=$('#nameupd').val();
    $.ajax({
        url : 'http://localhost:8081/jerseyrent/webapi/Marca/delete',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiMarc:codi,
            nombMarc:nomb,
            estaMarc:0,
            
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
                title: 'Marca borrada exitosamente',
                showConfirmButton: false,
                timer: 1300
              })
            $('.modal-footer').show();
            $('#remove').modal('close');
            $('#frmDelete')[0].reset();
        },
        error : function() {
            swal({
                position: 'top-end',
                type: 'error',
                title: 'Error',
                showConfirmButton: false,
                timer: 1300
              })
            console.log("No se pudo contactar con el servidor");

        }
    });
  
}
