var table;

$(document).ready(function () {
    dataTable();
    obteVehi();
});
function obteVehi() {
    $.getJSON('http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Vehiculo', function(data) {
        var vehiculos = data.vehiculo;
        $('#vehiupd li').remove();
        $('#vehi li').remove();
        $.each(vehiculos, function(index, vehiculo) {
            $('#vehi').append('<option value="' + vehiculo.codiVehi + '">' + vehiculo.modelo.marca.nombMarc +" "+ vehiculo.modelo.nombMode+" "+vehiculo.anioVehi + '</option>');
            $('#vehiupd').append('<option value="' + vehiculo.codiVehi + '">' + vehiculo.modelo.marca.nombMarc +" "+ vehiculo.modelo.nombMode+" "+vehiculo.anioVehi+ '</option>');
        });
        $('select').formSelect();
    });
    
}
function dataTable() {
    table = $('#tableInve').DataTable({
        destroy: true,
        ajax: {
            method: 'GET',
            url: 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/InventarioVehiculo',
            data: {},
            dataSrc: 'inventarioVehiculo'
        },
        columns: [ {
            data: 'codiInve',
            "visible": false
        },{
            data: 'vehiculo.codiVehi',
            "visible": false
        }, {
            data: 'vehiculo.modelo.nombMode',
            "visible": true
        }, {
            data: 'vehiculo.modelo.marca.nombMarc',
            "visible": true
        }, {
            data: 'vehiculo.anioVehi',
            "visible": true
        },{
            data: 'matrVehi'
        }, {
            data: 'circVehi'
        },{
            defaultContent: "<a href='#update' class='update btn-small blue darken-1 waves-effect waves-ligth modal-trigger'>Actualizar</a> <a href='#remove' class='delete btn-small red darken-1 waves-effect waves-ligth modal-trigger'>Eliminar</a>"
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
    getDataToUpdate("#tableInve tbody", table);
   // Llamamos al metodo para obtener el id del registro, para eliminar
   getIdToDelete("#tableInve tbody", table);
}
function getDataToUpdate(tbody, table) {
    $('tbody').on("click", "a.update", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#matri1").next("label").addClass("active");
        $("#circu1").next("label").addClass("active");
        $("#updaCodi").val(data.codiInve),
        $("#circu1").val(data.circVehi);
        $("#matri1").val(data.matrVehi);
        $("#vehiupd").val(data.vehiculo.codiVehi);
        console.log(data);
        
    });
}

function getIdToDelete(tbody, table) {
    $('tbody').on("click", "a.delete", function() {
        var data = table.row($(this).parents("tr")).data();
        var codiTipoVehi = $("#deleCodi").val(data.codiInve);
       
    });
}
function add(){
    
    var matri=$('#matri').val();
    var marc=$('#vehi').val();
    var circ=$('#circu').val();
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/InventarioVehiculo/create',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'POST',
        data : JSON.stringify({
            codiInve:null,
            vehiculo:{codiVehi:marc},
            matrVehi:matri,
            circVehi:circ,
            estaInve:1
            
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
                title: 'Inventario agregado exitosamente',
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
    var matri=$('#matri1').val();
    var marc=$('#vehiupd').val();
    var circ=$('#circu1').val();
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/InventarioVehiculo/update',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiInve:codi,
            vehiculo:{codiVehi:marc},
            matrVehi:matri,
            circVehi:circ,
            estaInve:1
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
    var matri=$('#matri1').val();
    var marc=$('#vehiupd').val();
    var circ=$('#circu1').val();
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/InventarioVehiculo/delete',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiInve:codi,
            vehiculo:{codiVehi:marc},
            matrVehi:matri,
            circVehi:circ,
            estaInve:0
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
                title: 'Vehiculo eliminado exitosamente',
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