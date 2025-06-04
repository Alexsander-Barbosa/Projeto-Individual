async function deletar(id) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
        const response = await fetch(`/api/employees/${id}`, { method: 'DELETE' });

        if (response.ok) {
            alert('Funcionário excluído com sucesso!');
            window.location.reload();
        } else {
            alert('Erro ao excluir funcionário.');
        }
    }
}