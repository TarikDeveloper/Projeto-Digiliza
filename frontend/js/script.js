// Ao carregar a página
window.addEventListener('load', function() {
    // Adiciona os listeners nos botões de reserva
    let btnsReserva = document.querySelectorAll('.btn-reserva');
    btnsReserva.forEach(function(btn) {
      btn.addEventListener('click', function(event) {
        event.preventDefault();
        let mesaId = btn.dataset.mesaId;
        reservarMesa(mesaId);
      });
    });
  
    // Adiciona os listeners nos botões de cancelamento de reserva
    let btnsCancelarReserva = document.querySelectorAll('.btn-cancelar-reserva');
    btnsCancelarReserva.forEach(function(btn) {
      btn.addEventListener('click', function(event) {
        event.preventDefault();
        let mesaId = btn.dataset.mesaId;
        cancelarReserva(mesaId);
      });
    });
  });
  
  // Envia uma requisição para reservar uma mesa
  function reservarMesa(mesaId) {
    // Monta o objeto com os dados da reserva
    let reserva = {
      mesaId: mesaId,
      nome: document.querySelector('#nome').value,
      telefone: document.querySelector('#telefone').value,
      email: document.querySelector('#email').value,
      data: document.querySelector('#data').value,
      horario: document.querySelector('#horario').value
    };
  
    // Envia a requisição POST para o backend
    fetch('/api/reservas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reserva)
    })
    .then(function(response) {
      if (response.ok) {
        // Exibe uma mensagem de sucesso e atualiza a página
        alert('Mesa reservada com sucesso!');
        location.reload();
      } else {
        // Exibe uma mensagem de erro
        alert('Erro ao reservar mesa!');
      }
    });
  }
  
  // Envia uma requisição para cancelar uma reserva
  function cancelarReserva(mesaId) {
    // Envia a requisição DELETE para o backend
    fetch('/api/reservas/' + mesaId, {
      method: 'DELETE'
    })
    .then(function(response) {
      if (response.ok) {
        // Exibe uma mensagem de sucesso e atualiza a página
        alert('Reserva cancelada com sucesso!');
        location.reload();
      } else {
        // Exibe uma mensagem de erro
        alert('Erro ao cancelar reserva!');
      }
    });
  }
  