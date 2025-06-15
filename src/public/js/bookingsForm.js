const form = document.getElementById('bookingForm');
const diaHoraReservaInput = document.getElementById('dia_hora_reserva');
const diaHoraFimReservaInput = document.getElementById('dia_hora_fim_reserva');

const DURACAO_RESERVA_HORAS = 2;

function formatToDatetimeLocal(date) {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

diaHoraReservaInput.addEventListener('change', () => {
    const inicioStr = diaHoraReservaInput.value;
    if (inicioStr) {
        const inicio = new Date(inicioStr);
        const fim = new Date(inicio.getTime() + DURACAO_RESERVA_HORAS * 60 * 60 * 1000);

        diaHoraFimReservaInput.value = formatToDatetimeLocal(fim);
    } else {
        diaHoraFimReservaInput.value = '';
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const employee_id = document.getElementById('employee_id').value;
    const room_id = document.getElementById('room_id').value;
    const dia_hora_reserva = diaHoraReservaInput.value;
    const dia_hora_fim_reserva = diaHoraFimReservaInput.value;
    const num_pessoas = document.getElementById('num_pessoas').value;

    const dados = {
        employee_id: parseInt(employee_id),
        room_id: parseInt(room_id),
        dia_hora_reserva: dia_hora_reserva,
        dia_hora_fim_reserva: dia_hora_fim_reserva,
        num_pessoas: parseInt(num_pessoas)
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/bookings/${id}` : '/api/bookings';

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            alert('Reserva salva com sucesso!');
            window.location.href = '/bookings';
        } else {
            const errorText = await response.text();
            let errorMessage = `Erro ao salvar reserva: ${response.statusText}`;

            try {
                if (errorText) {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = `Erro ao salvar reserva: ${errorJson.error || errorJson.message || response.statusText}`;
                }
            } catch (jsonParseError) {
                errorMessage = `Erro ao salvar reserva: ${errorText || response.statusText}`;
            }
            alert(errorMessage);
        }
    } catch (error) {
        alert('Ocorreu um erro na comunicação com o servidor. Verifique o console do navegador para detalhes.');
        console.error('Erro de Fetch API:', error);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    diaHoraReservaInput.dispatchEvent(new Event('change'));
});