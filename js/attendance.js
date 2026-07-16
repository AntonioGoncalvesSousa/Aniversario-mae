const form = document.getElementById('attendance-form');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const attendanceAnswer = form.querySelector('input[name="Estará presente ?"]:checked');
    const alertMessage = attendanceAnswer && attendanceAnswer.value === 'Sim'
      ? 'Presença confirmada'
      : 'Presença não confirmada';

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
