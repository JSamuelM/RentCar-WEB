$(document).ready(function () {
  /*  if(localStorage.getItem('correo')=== null){
        window.location.replace("index.html");
    }else{
        
    }*/
});
function logout(){
    
    localStorage.removeItem('correo');
    window.location.replace("index.html");
  
}