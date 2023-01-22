var loading;

function load(){    
  sampleVar = setTimeout(alertFunc, 3000);
}

function alertFunc(){
  window.location.href = "../../../shopping-website/shopping-website/dist/index.html";
}
window.onload = load;
