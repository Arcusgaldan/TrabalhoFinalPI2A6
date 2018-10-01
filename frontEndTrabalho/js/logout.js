document.getElementById("btnLogout").addEventListener("click", logout);

function logout(){
	localStorage.removeItem("id");
	alert("Logout realizado com sucesso!");
	setTimeout(function(){location.href="index.html"} , 2000);  
}