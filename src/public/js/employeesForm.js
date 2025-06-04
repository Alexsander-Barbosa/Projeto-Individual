const form = document.getElementById('employeeForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const departamento = document.getElementById('departamento').value;

    const dados = { nome, departamento };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/employees/${id}` : '/api/employees';

    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    if (response.ok) {
        alert('Salvo com sucesso!');
        window.location.href = '/employees';
    } else {
        alert('Erro ao salvar');
    }
});