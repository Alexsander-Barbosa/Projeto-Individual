async function deletarSala(id) {
    if (confirm('Tem certeza que deseja excluir esta sala?')) {
        const response = await fetch(`/api/rooms/${id}`, { method: 'DELETE' });

        if (response.ok) {
            alert('Sala excluída com sucesso!');
            window.location.reload();
        } else {
            alert('Erro ao excluir sala.');
        }
    }
}