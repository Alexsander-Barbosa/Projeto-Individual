const form = document.getElementById('roomForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const numero_sala = document.getElementById('numero_sala').value;
    const capacidade_maxima = document.getElementById('capacidade_maxima').value;

    const dados = { numero_sala: parseInt(numero_sala), capacidade_maxima: parseInt(capacidade_maxima) };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/rooms/${id}` : '/api/rooms';

    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    if (response.ok) {
        alert('Sala salva com sucesso!');
        window.location.href = '/rooms';
    } else {
        alert('Erro ao salvar sala.');
    }
});