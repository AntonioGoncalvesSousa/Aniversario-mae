const form = document.getElementById('attendance-form');
const countdownElement = document.getElementById('contador');

if (countdownElement) {
  const targetDate = new Date('2026-09-27T00:00:00');

  const updateCountdown = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      countdownElement.innerHTML = '<p class="contador-final">Hoje é o grande dia! 🎉</p>';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
      <div class="contador-item">
        <span class="contador-number">${String(days).padStart(2, '0')}</span>
        <span class="contador-label">Dias</span>
      </div>
      <div class="contador-item">
        <span class="contador-number">${String(hours).padStart(2, '0')}</span>
        <span class="contador-label">Horas</span>
      </div>
      <div class="contador-item">
        <span class="contador-number">${String(minutes).padStart(2, '0')}</span>
        <span class="contador-label">Min</span>
      </div>
      <div class="contador-item">
        <span class="contador-number">${String(seconds).padStart(2, '0')}</span>
        <span class="contador-label">Seg</span>
      </div>
    `;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const attendanceAnswer = form.querySelector('input[name="Presença"]:checked');
    const alertMessage = attendanceAnswer && attendanceAnswer.value === 'Sim'
      ? 'Presença confirmada' 
      : 'Obrigada pela resposta!';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form)
      });

      if (response.ok) {
        alert(alertMessage);
        form.reset();
      } else {
        alert('Não foi possível enviar a confirmação. Tente novamente.');
      }
    } catch (error) {
      alert('Não foi possível enviar a confirmação. Tente novamente.');
    }
  });
}
