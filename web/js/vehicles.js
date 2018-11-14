var table;

$(document).ready(function () {
    dataTable();
    obteMode();
    obteCombu();
    obteTipoV();
    obteTrans();
    obteLice();
});
function obteMode() {
    $.getJSON('http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Modelo', function(data) {
        var vehiculos = data.modelo;
        $('#mode li').remove();
        $('#mode1 li').remove();
        $.each(vehiculos, function(index, vehiculo) {
            $('#mode').append('<option value="' + vehiculo.codiMode + '">' + vehiculo.nombMode + '</option>');
            $('#mode1').append('<option value="' + vehiculo.codiMode + '">' + vehiculo.nombMode + '</option>');
        });
        $('select').formSelect();
    });
    
}
function obteCombu() {
    $.getJSON('http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Combustible', function(data) {
        var vehiculos = data.combustible;
        $('#combu li').remove();
        $('#combu1 li').remove();
        $.each(vehiculos, function(index, vehiculo) {
            $('#combu').append('<option value="' + vehiculo.codiComb + '">' + vehiculo.nombComb + '</option>');
            $('#combu1').append('<option value="' + vehiculo.codiComb + '">' + vehiculo.nombComb + '</option>');
        });
        $('select').formSelect();
    });
    
}
function obteTipoV() {
    $.getJSON('http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/TipoVehiculo', function(data) {
        var vehiculos = data.tipoVehiculo;
        $('#tipov li').remove();
        $('#tipov1 li').remove();
        $.each(vehiculos, function(index, vehiculo) {
            $('#tipov').append('<option value="' + vehiculo.codiTipoVehi + '">' + vehiculo.tipoVehi + '</option>');
            $('#tipov1').append('<option value="' + vehiculo.codiTipoVehi + '">' + vehiculo.tipoVehi + '</option>');
        });
        $('select').formSelect();
    });
    
}
function obteTrans() {
    $.getJSON('http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Transmision', function(data) {
        var vehiculos = data.transmision;
        $('#transm li').remove();
        $('#transm1 li').remove();
        $.each(vehiculos, function(index, vehiculo) {
            $('#transm').append('<option value="' + vehiculo.codiTran + '">' + vehiculo.nombTran + '</option>');
            $('#transm1').append('<option value="' + vehiculo.codiTran + '">' + vehiculo.nombTran + '</option>');
        });
        $('select').formSelect();
    });
    
}
function obteLice() {
    $.getJSON('http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Licencia', function(data) {
        var vehiculos = data.licencia;
        $('#lice li').remove();
        $('#lice1 li').remove();
        $.each(vehiculos, function(index, vehiculo) {
            $('#lice').append('<option value="' + vehiculo.codiLice + '">' + vehiculo.nombLice + '</option>');
            $('#lice1').append('<option value="' + vehiculo.codiLice + '">' + vehiculo.nombLice + '</option>');
        });
        $('select').formSelect();
    });
    
}
function dataTable() {
    table = $('#tableVehi').DataTable({
        destroy: true,
        ajax: {
            method: 'GET',
            url: 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Vehiculo',
            data: {},
            dataSrc: 'vehiculo'
        },
        columns: [{
            data: 'codiVehi',
            "visible": false
            
        },{
            data: 'modelo.codiMode',
            "visible": false
        }, {
            data: 'modelo.nombMode',
            "visible": true
        }, {
            data: 'modelo.marca.codiMarc',
            "visible": false
        },{
            data: 'modelo.marca.nombMarc',
            "visible": true
        }, {
            data: 'anioVehi',
            "visible": true
        },{
            data: 'licencia.codiLice',
            "visible":false
        },{
            data: 'licencia.nombLice'
        }, {
            data: 'tipoVehiculo.codiTipoVehi',
            "visible":false
        },{
            data: 'tipoVehiculo.tipoVehi'
        },{
            data: 'estaVehi',
            "visible":false
        },{
            defaultContent: "<a href='#update' class='update btn-small blue darken-1 waves-effect waves-ligth modal-trigger'>Modificar</a> <a href='#remove' class='delete btn-small red darken-1 waves-effect waves-ligth modal-trigger'>Eliminar</a> <a href='#im' class='delete btn-small green darken-1 waves-effect waves-ligth modal-trigger' >Subir imagen</a>"
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
     getDataToUpdate("#tableVehi tbody", table);
     // Llamamos al metodo para obtener el id del registro, para eliminar
     getIdToDelete("#tableVehi tbody", table);
     idima("#tableVehi tbody", table)
    
}
// Funcion para obtener datos
function getDataToUpdate(tbody, table) {
    $('tbody').on("click", "a.update", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#updaCodi").val(data.codiVehi);
        $('#combu1').val(data.combustible.codiComb);
        $('#mode1').val(data.modelo.codiMode);
        $("#pasa1").next("label").addClass("active");
        $('#pasa1').val(data.pasaVehi);
        $("#puertas1").next("label").addClass("active");
        $('#puertas1').val(data.puerVehi);
        $("#anio1").next("label").addClass("active");
        $('#anio1').val(data.anioVehi);
        $('#transm1').val(data.transmision.codiTran);
        $("#audio1").next("label").addClass("active");
        $('#audio1').val(data.audiVehi);
        $('#lice1').val(data.licencia.codiLice);
        $('#aire1').val(data.aireVehi);
        $("#depo1").next("label").addClass("active");
        $('#depo1').val(data.depoVehi); 
        $('#tipov1').val(data.tipoVehiculo.codiTipoVehi);
        
    });
}
// Funcion para obtener el ID
function getIdToDelete(tbody, table) {
    $('tbody').on("click", "a.delete", function() {
    var data = table.row($(this).parents("tr")).data();
    $("#deleCodi").val(data.codiVehi);

        
    });
}
function idima(tbody, table) {
    $('tbody').on("click", "a.delete", function() {
        var data = table.row($(this).parents("tr")).data();
       $("#imageCodi").val(data.codiVehi);

    });
}
function add(){
    
    var comb=$('#combu').val();
    var mode=$('#mode').val();
    var pasa=$('#pasa').val();
    var puer=$('#puertas').val();
    var anio=$('#anio').val();
    var trans=$('#transm').val();
    var audi=$('#audio').val();
    var lice=$('#lice').val();
    var aire=$('#aire').val();
    var depo=$('#depo').val();
    var tipov=$('#tipov').val();
    var precd=$('#precd').val();
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Vehiculo/create',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'POST',
        data : JSON.stringify({
            codiVehi:null,
            combustible:{codiComb:comb},
            licencia:{codiLice:lice},
            modelo:{codiMode:mode},
            tipoVehiculo:{codiTipoVehi:tipov},
            transmision:{codiTran:trans},
            anioVehi:anio,
            pasaVehi:pasa,
            puerVehi:puer,
            aireVehi:aire,
            audiVehi:audi,
            depoVehi:depo,
            precDia:precd,
            estaVehi:1
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
                title: 'Vehiculo agregado exitosamente',
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
    var comb=$('#combu1').val();
    var mode=$('#mode1').val();
    var pasa=$('#pasa1').val();
    var puer=$('#puertas1').val();
    var anio=$('#anio1').val();
    var trans=$('#transm1').val();
    var audi=$('#audio1').val();
    var lice=$('#lice1').val();
    var aire=$('#aire1').val();
    var depo=$('#depo1').val(); 
    var tipov=$('#tipov1').val();
    var precd=$('#precd1').val();
    console.log({
        codiVehi:codi,
        combustible:{codiComb:comb},
        licencia:{codiLice:lice},
        modelo:{codiMode:mode},
        tipoVehiculo:{codiTipoVehi:tipov},
        transmision:{codiTran:trans},
        anioVehi:anio,
        pasaVehi:pasa,
        puerVehi:puer,
        aireVehi:aire,
        audiVehi:audi,
        depoVehi:depo,
        precDia:precd,
        estaVehi:1
    });
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Vehiculo/update',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiVehi:codi,
            combustible:{codiComb:comb},
            licencia:{codiLice:lice},
            modelo:{codiMode:mode},
            tipoVehiculo:{codiTipoVehi:tipov},
            transmision:{codiTran:trans},
            anioVehi:anio,
            pasaVehi:pasa,
            puerVehi:puer,
            aireVehi:aire,
            audiVehi:audi,
            depoVehi:depo,
            precDia:precd,
            estaVehi:1
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
                title: 'Vehiculo modificado exitosamente',
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
    
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Vehiculo/delete',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiVehi:codi,
            estaVehi:0
            
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
function imag(){
    var file = $('input[name="file"').get(0).files[0];
    var formData = new FormData();
    var respuesta="";
    formData.append('file', file);
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/imagenes/upload',
        type : 'POST',
        data : formData,
        cache : false,
        contentType : false,
        processData : false,
        cache: true,
        success : function(resp) {   
            console.log(resp);         
            respuesta=resp;
            imagebase(respuesta);
           
         
        },
        error : function() {
            swal({
                position: 'top-end',
                type: 'error',
                title: 'Error al subir la imagen',
                showConfirmButton: false,
                timer: 1300
              })
        }
    });
}
function imagebase(resp){
    
    var codi=$('#imageCodi').val();

    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/imagenes/create',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'POST',
        data : JSON.stringify({
            codiImag:null,
            vehiculo:{codiVehi:codi},
            fotoVehi:resp,
            estaImag:1
            
        }),
        dataType:'JSON',
        success : function(resp) {
            console.log(resp);
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Error',
                showConfirmButton: false,
                timer: 1300
              })
           
            
            $('.modal-footer').show();
            $('#im').modal('close');
            $('#frmImg')[0].reset();
        },
        error : function() {
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Imagen subida correctamente',
                showConfirmButton: false,
                timer: 1300
              })
              
              
              $('.modal-footer').show();
              $('#im').modal('close');
              $('#frmImg')[0].reset();
        }
    });
}