(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
  var modalSucessoLogout = document.getElementById('logoutSucessoModal');

  if(modalSucessoLogout == null){
    console.log("Não há um modal de logout, dando append...");
    $("#page-top").append('\
    <!-- Logout Modal-->\
    <div class="modal fade" id="logoutSucessoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
    <div class="modal-dialog" role="document">\
      <div class="modal-content">\
        <div class="modal-header">\
          <h5 class="modal-title" id="exampleModalLabel">Sucesso</h5>\
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
            <span aria-hidden="true">×</span>\
          </button>\
        </div>\
        <div class="modal-body">Logout realizado com sucesso!</div>\
        <div class="modal-footer">\
        </div>\
      </div>\
    </div>\
    </div>\
    ');
  }
  $('#logoutSucessoModal').modal('show');
  setTimeout(function(){location.href="index.html"} , 2000);  
}

document.getElementById("logout").addEventListener("click", puxaModal);

},{}]},{},[1]);
