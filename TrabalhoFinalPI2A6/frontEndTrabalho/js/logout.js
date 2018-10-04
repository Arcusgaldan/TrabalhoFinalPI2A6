function puxaModal(){

  var modalLogout = document.getElementById('logoutModal');

  if(modalLogout == null){
    console.log("Não há um modal de logout, dando append...");
    $("#page-top").append('\
    <!-- Logout Modal-->\
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
    <div class="modal-dialog" role="document">\
      <div class="modal-content">\
        <div class="modal-header">\
          <h5 class="modal-title" id="exampleModalLabel">Deseja realmente sair?</h5>\
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
            <span aria-hidden="true">×</span>\
          </button>\
        </div>\
        <div class="modal-body">Você deseja realmente sair do sistema?</div>\
        <div class="modal-footer">\
          <button class="btn btn-success" id="btnLogout">SIM</button>\
          <button class="btn btn-danger"  data-dismiss="modal">CANCELAR</button>\
        </div>\
      </div>\
    </div>\
    </div>\
    ');
  }  

  document.getElementById("btnLogout").addEventListener("click", logout);
  $('#logoutModal').modal('show');
}

function logout(){
	localStorage.removeItem("id");
	alert("Logout realizado com sucesso!");
	setTimeout(function(){location.href="index.html"} , 2000);  
}

document.getElementById("logout").addEventListener("click", puxaModal);
