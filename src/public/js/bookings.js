async function deletarReserva(id) {
    if (confirm('Tem certeza que deseja excluir esta reserva?')) {
        const response = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });

        if (response.ok) {
            alert('Reserva excluída com sucesso!');
            window.location.reload();
        } else {
            alert('Erro ao excluir reserva.');
        }
    }
}