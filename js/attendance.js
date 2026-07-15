const form = document.getElementById('attendance-form');
const attendanceInputs = document.querySelectorAll('input[name="attendance"]');
const companionsQuestion = document.getElementById('companions-question');
const companionsField = document.getElementById('companions-field');
const companionsInputs = document.querySelectorAll('input[name="companions"]');
const successMessage = document.getElementById('form-success');

function toggleCompanionFields() {
  const selected = document.querySelector('input[name="attendance"]:checked');
  const show = selected && selected.value === 'yes';

  companionsQuestion.hidden = !show;
  companionsField.hidden = true;

  companionsInputs.forEach((input) => {
    input.checked = false;
  });
}

function toggleCompanionTextField() {
  const selected = document.querySelector('input[name="companions"]:checked');
  companionsField.hidden = !(selected && selected.value === 'yes');
}

attendanceInputs.forEach((input) => {
  input.addEventListener('change', toggleCompanionFields);
});

companionsInputs.forEach((input) => {
  input.addEventListener('change', toggleCompanionTextField);
});

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    successMessage.hidden = false;
    form.reset();
    toggleCompanionFields();
  });
}
