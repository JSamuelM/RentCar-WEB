var table;

$(document).ready(function () {
    dataTable();
    obteVehi();
});
function obteVehi() {
    $.getJSON('http://localhost:8081/jerseyrent/webapi/Vehiculo', function(data) {
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
            url: 'http://localhost:8081/jerseyrent/webapi/Vehiculo',
            data: {},
            dataSrc: 'inventarioVehiculo'
        },
        columns: [ {
            data: 'codiVehi',
            "visible": false
        }, {
            data: 'modelo.nombMode',
            "visible": true
        }, {
            data: 'modelo.marca.nombMarc',
            "visible": true
        }, {
            data: 'vehiculo.anioVehi',
            "visible": true
        },{
            data: 'cantVehi'
        }, {
            defaultContent: "<a href='#update' class='update btn-small blue darken-1 waves-effect waves-ligth modal-trigger'>Modificar</a> "
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
    
}
function getDataToUpdate(tbody, table) {
    $('tbody').on("click", "a.update", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#cantiupd").next("label").addClass("active");
        $("#updaCodi").val(data.codiInve),
        $("#cantiupd").val(data.cantVehi);
        $("#vehiupd").val(data.vehiculo.codiVehi);
        console.log(data);
        
    });
}
function add(){
    
    var cant=$('#canti').val();
    var marc=$('#vehi').val();
    $.ajax({
        url : 'http://localhost:8081/jerseyrent/webapi/InventarioVehiculo/create',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'POST',
        data : JSON.stringify({
            codiInve:null,
            vehiculo:{codiVehi:marc},
            cantVehi:cant
            
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
    var cant=$('#cantiupd').val();
    var marc=$('#marcaupd').val();
    $.ajax({
        url : 'http://localhost:8081/jerseyrent/webapi/Modelo/update',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiInve:codi,
            vehiculo:{codiVehi:marc},
            cantVehi:cant
            
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