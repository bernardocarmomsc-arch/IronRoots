const form = document.getElementById('cadastroForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll('input');
  const email = inputs[0].value;
  const senha = inputs[1].value;
  const confirmar = inputs[2].value;

  if (senha !== confirmar) {
    alert('As senhas não coincidem');
    return;
  }

  const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password: senha
    })
  });

  const data = await response.json();
  alert(data.message);

  if (response.ok) {
    form.reset();
  }
});
