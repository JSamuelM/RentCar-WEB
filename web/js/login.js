$(document).ready(function () {
    if(localStorage.getItem('correo')=== null){
        
    }else{
        window.location.replace("vehicles.html");
    }
});
function login(){
    
    var correo=$('#user').val();
    var contra=$('#pass').val();
    $.ajax({
        url : 'http://ec2-18-223-134-87.us-east-2.compute.amazonaws.com:8080/JerseyHibernateRent/webapi/Usuario/loginw',
        headers: { 
            
            'Content-Type': 'application/json' 
        },
        type : 'POST',
        data : JSON.stringify({
            corrUsua:correo,
            contUsua:contra
            
        }),
        dataType:'JSON',
        success : function(resp) {
            console.log(resp);
            
            // Reset
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Datos Correctos, !Bienvenido!',
                showConfirmButton: false,
                timer: 2000
              })
              localStorage.setItem('correo', correo);
              window.location.replace("vehicles.html");
        },
        error : function() {
            
            swal({
                position: 'top-end',
                type: 'error',
                title: 'Datos incorrectos',
                showConfirmButton: false,
                timer: 6000
              })
        }
        
    });
    $('#user').val('');
    $('#pass').val('');
  
}
