$(document).ready(function () {
    obteDatos();
});


function obteDatos() {
   
    console.log(localStorage.getItem('correo'));
    $.ajax({
        url: 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Usuario/perfil',
        type: 'POST',
        data:{ corr: localStorage.getItem('correo') },
        success: function(data) {
            console.log(data);
            $("#firstname1").next("label").addClass("active");
            $("#lastname1").next("label").addClass("active");
            $("#direc1").next("label").addClass("active");
            $("#phone1").next("label").addClass("active");
            $("#dui1").next("label").addClass("active");
            $("#nit1").next("label").addClass("active");
            $("#pasa1").next("label").addClass("active");
            $("#email1").next("label").addClass("active");
            $('#updaCodi').val(data.usuario[0].codiUsua);
            $('#firstname1').val(data.usuario[0].nombUsua);
            $('#lastname1').val(data.usuario[0].apelUsua);
            $('#direc1').val(data.usuario[0].direUsua);
            $('#phone1').val(data.usuario[0].teleUsua);
            $('#dui1').val(data.usuario[0].duiUsua);
            $('#nit1').val(data.usuario[0].nitUsua);
            $('#pasa1').val(data.usuario[0].pasaUsua);
            $('#email1').val(data.usuario[0].corrUsua);
        },
        error: function() { 
            console.log('error');
         }
      });
    
    
}
function updatep(){
    var codi=$('#updaCodi').val();
    var nomb = $('#firstname1').val();
    var apel = $('#lastname1').val();
    var dire = $('#direc1').val();
    var tele = $('#phone1').val();
    var dui = $('#dui1').val();
    var nit = $('#nit1').val();
    var pasa = $('#pasa1').val();
    var mail = $('#email1').val();
    
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Usuario/updatePersonalInformation',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            codiUsua:codi,
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
            
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Usuario modificado exitosamente',
                showConfirmButton: false,
                timer: 1300
              })
          
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
function updatepass(){
    var mail = $('#email1').val();
    var pass = $('#pass').val();
    
    $.ajax({
        url : 'http://ec2-18-216-104-139.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Usuario/updatePasswordW',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'PUT',
        data : JSON.stringify({
            corrUsua:mail,
            contUsua:pass
        }),
        dataType:'JSON',
        success : function(resp) {
            console.log(resp);
            
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Contraseña modificada exitosamente',
                showConfirmButton: false,
                timer: 1300
              })
          
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


 