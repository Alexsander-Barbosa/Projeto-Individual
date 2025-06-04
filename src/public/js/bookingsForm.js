const form = document.getElementById('bookingForm');
const diaHoraReservaInput = document.getElementById('dia_hora_reserva');
const diaHoraFimReservaInput = document.getElementById('dia_hora_fim_reserva');

// Duração fixa da reserva em horas (deve corresponder à lógica do backend)
const DURACAO_RESERVA_HORAS = 2;

// Função para formatar a data para o input datetime-local (YYYY-MM-DDTHH:MM)
function formatToDatetimeLocal(date) {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Adiciona um listener para quando o input de "Dia e Hora de Início" mudar
diaHoraReservaInput.addEventListener('change', () => {
    const inicioStr = diaHoraReservaInput.value;
    if (inicioStr) {
        const inicio = new Date(inicioStr);
        // Adiciona a duração fixa (2 horas) ao horário de início
        const fim = new Date(inicio.getTime() + DURACAO_RESERVA_HORAS * 60 * 60 * 1000); // 2 horas * 60 min * 60 seg * 1000 ms

        // Preenche o input de "Dia e Hora de Fim"
        diaHoraFimReservaInput.value = formatToDatetimeLocal(fim);
    } else {
        // Limpa o campo de fim se o início for limpo
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
            // Tenta ler o corpo da resposta como texto primeiro
            const errorText = await response.text();
            let errorMessage = `Erro ao salvar reserva: ${response.statusText}`; // Fallback padrão

            try {
                // Tenta parsear como JSON se o texto não for vazio
                if (errorText) {
                    const errorJson = JSON.parse(errorText);
                    // Procura por 'error' (formato padrão do backend) ou 'message'
                    errorMessage = `Erro ao salvar reserva: ${errorJson.error || errorJson.message || response.statusText}`;
                }
            } catch (jsonParseError) {
                // Se o texto não for um JSON válido, usa o texto puro ou statusText
                errorMessage = `Erro ao salvar reserva: ${errorText || response.statusText}`;
            }
            alert(errorMessage);
        }
    } catch (error) {
        alert('Ocorreu um erro na comunicação com o servidor. Verifique o console do navegador para detalhes.');
        console.error('Erro de Fetch API:', error);
    }
});

// Ações iniciais ao carregar a página para o caso de edição
// Se estiver editando uma reserva, o dia_hora_reserva já vem preenchido,
// então podemos calcular o fim logo de cara.
document.addEventListener('DOMContentLoaded', () => {
    // Isso vai disparar o 'change' se já houver um valor inicial
    // para garantir que o campo de fim seja preenchido na edição.
    diaHoraReservaInput.dispatchEvent(new Event('change'));
});