document.getElementById('formUsuario').addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();

  if (nome && email) {
    const usuario = {
      nome,
      email,
      data: new Date().toLocaleString()
    };

    let lista = JSON.parse(localStorage.getItem('usuarios')) || [];
    lista.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(lista));

    mostrarUsuarios();
    this.reset();
  }
});

function mostrarUsuarios(filtro = '') {
  const lista = JSON.parse(localStorage.getItem('usuarios')) || [];
  const ul = document.getElementById('listaUsuarios');
  ul.innerHTML = '';

  lista.forEach((usuario, index) => {
    if (
      usuario.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      usuario.email.toLowerCase().includes(filtro.toLowerCase())
    ) {
      const li = document.createElement('li');
      li.textContent = `${usuario.data} - ${usuario.nome} - ${usuario.email}`;
      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = '❌';
      btnExcluir.onclick = () => excluirUsuario(index);
      li.appendChild(btnExcluir);
      ul.appendChild(li);
    }
  });
}

function limparCampos() {
  document.getElementById('formUsuario').reset();
}

function excluirUsuario(index) {
  let lista = JSON.parse(localStorage.getItem('usuarios')) || [];
  lista.splice(index, 1);
  localStorage.setItem('usuarios', JSON.stringify(lista));
  mostrarUsuarios();
}

function excluirTodosUsuarios() {
  if (confirm('Deseja excluir todos os usuários?')) {
    localStorage.removeItem('usuarios');
    mostrarUsuarios();
  }
}

function pesquisarUsuarios() {
  const termo = document.getElementById('pesquisa').value;
  mostrarUsuarios(termo);
}

window.onload = mostrarUsuarios;
