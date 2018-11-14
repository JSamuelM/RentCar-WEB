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
    table = $('#tableDiscount').DataTable({
        destroy: true,
        ajax: {
            method: 'GET',
            url: 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/DescuentoVehiculo',
            data: {},
            dataSrc: 'descuentoVehiculo'
        },
        columns: [{
            data: 'codiDesc',
            "visible": false
            
        }, {
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
            data: 'diasVehi'
        }, {
            data: 'descVehi'
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
     getDataToUpdate("#tableDiscount tbody", table);
     getIdToDelete("#tableDiscount tbody", table);
}
function getDataToUpdate(tbody, table) {
    $('tbody').on("click", "a.update", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#minupd").next("label").addClass("active");
        $("#priceupd").next("label").addClass("active");
        $("#updaCodi").val(data.codiDesc),
        $("#minupd").val(data.diasVehi);
        $("#priceupd").val(data.descVehi);
        $("#vehiupd").val(data.vehiculo.codiVehi);
        console.log(data);
        
    });
}
// Funcion para obtener el ID
function getIdToDelete(tbody, table) {
    $('tbody').on("click", "a.delete", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#deleCodi").val(data.codiDesc),
        $("#diasdel").val(data.diasVehi);
        $("#descdel").val(data.descVehi);
        $("#vehidel").val(data.vehiculo.codiVehi);
    });
}
function add(){
    var pric=$('#price').val();
    var cant=$('#min').val();
    var marc=$('#vehi').val();
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/DescuentoVehiculo/create',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'POST',
        data : JSON.stringify({
            codiDesc:null,
            vehiculo:{codiVehi:marc},
            diasVehi:cant,
            descVehi:pric
            
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
                title: 'Descuento agregado exitosamente',
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
    var pric=$('#priceupd').val();
    var cant=$('#minupd').val();
    var marc=$('#vehiupd').val();
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/DescuentoVehiculo/update',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiDesc:codi,
            vehiculo:{codiVehi:marc},
            diasVehi:cant,
            descVehi:pric
            
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
                title: 'Descuento modificado exitosamente',
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
    var pric=$('#descdel').val();
    var cant=$('#diasdel').val();
    var marc=$('#vehidel').val();
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/DescuentoVehiculo/delete',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'DELETE',
        data : JSON.stringify({
            codiDesc:codi,
            vehiculo:{codiVehi:marc},
            diasVehi:cant,
            descVehi:pric
            
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
                title: 'Descuento eliminado exitosamente',
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