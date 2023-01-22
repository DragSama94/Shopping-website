var $btn = document.getElementById("submit");
var $form = document.getElementById("form")


function signIn() {
  if ($form.checkValidity()) {
    $btn.classList.add('pending');
    window.setTimeout(function(){ $btn.classList.add('granted'); }, 1500);
  }
}

var loading;

function load(){    
  sampleVar = setTimeout(alertFunc, 2500);
}

function alertFunc(){
  window.location.href = "../../../welcome-animation/welcome-animation/dist/index.html";
}
$btn.addEventListener("click", signIn);