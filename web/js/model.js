var table;

$(document).ready(function () {
    dataTable();
    obteMarca();
    
});
function obteMarca() {
    $.getJSON('http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Marca', function(data) {
        var marcas = data.marca;
        $('#marca li').remove();
        $('#marcaupd li').remove();
        $.each(marcas, function(index, marca) {
            $('#marca').append('<option value="' + marca.codiMarc + '">' + marca.nombMarc + '</option>');
            $('#marcaupd').append('<option value="' + marca.codiMarc + '">' + marca.nombMarc + '</option>');
        });
        $('select').formSelect();
    });
    
}

function dataTable() {
    table = $('#tableModel').DataTable({
        destroy: true,
        ajax: {
            method: 'GET',
            url: 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Modelo',
            data: {},
            dataSrc: 'modelo'
        },
        columns: [{
            data: 'codiMode',
            "visible": false
            
        }, {
            data: 'nombMode'
        }, {
            data: 'marca.codiMarc',
            "visible": false
        },{
            data: 'marca.nombMarc'
        },{
            data: 'estaMode',
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
     getDataToUpdate("#tableModel tbody", table);
     // Llamamos al metodo para obtener el id del registro, para eliminar
     getIdToDelete("#tableModel tbody", table);
}
// Funcion para obtener datos
function getDataToUpdate(tbody, table) {
    $('tbody').on("click", "a.update", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#nameupd").next("label").addClass("active");
        $("#updaCodi").val(data.codiMode),
        $("#nameupd").val(data.nombMode);
        $("#marcaupd").val(data.marca.codiMarc);
        
    });
}
// Funcion para obtener el ID
function getIdToDelete(tbody, table) {
    $('tbody').on("click", "a.delete", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#namedel").next("label").addClass("active");
        var codiTipoVehi = $("#deleCodi").val(data.codiMode);
        $("#nameupd").val(data.nombMode);
        $("#marcadel").val(data.marca.codiMarc);
    });
}
function add(){
    
    var nomb=$('#nameadd').val();
    var marc=$('#marca').val();
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Modelo/create',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'POST',
        data : JSON.stringify({
            codiMode:null,
            marca:{codiMarc:marc},
            nombMode:nomb,
            estaMode:1,
            
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
                title: 'Modelo agregado exitosamente',
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
    var marc=$('#marcaupd').val();
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Modelo/update',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiMode:codi,
            marca:{codiMarc:marc},
            nombMode:nomb,
            estaMode:1,
            
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
                title: 'Modelo modificado exitosamente',
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
    var marc=$('#marcadel').val();
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Modelo/delete',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiMode:codi,
            marca:{codiMarc:marc},
            nombMode:nomb,
            estaMode:0,
            
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
                title: 'Modelo borrado exitosamente',
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
