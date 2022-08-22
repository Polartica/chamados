
var texto = document.getElementById("texto")
var nome = document.getElementById("nome")
var form = document.getElementById("form")
var div = document.getElementById('msg')

function defaultR() {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("button clicked");
        
    });
}


document.getElementById("msg").style.display = 'none'
function validate() {
    

    if(assunto.value === "") {
        document.getElementById("msg").style.display = 'block'

        div.innerHTML = "Preencha o assunto"
        defaultR();
    }
     else if(texto.value === "") {
        document.getElementById("msg").style.display = 'block'
        div.innerHTML = "Descreva o problema"
        defaultR();

    } else if(nome.value === "") {
        document.getElementById("msg").style.display = 'block'
        div.innerHTML = "Preencha o nome ou setor";
        defaultR();
    }
    else {
        form.submit();
    }
}

function excluir() {
    usuarioSenha = 123456
    senha = 0
    while (usuarioSenha != senha) {
        senha = prompt ("Digite sua senha");
    }
    window.location('href="/remove/<%= details._id %>"')
}
