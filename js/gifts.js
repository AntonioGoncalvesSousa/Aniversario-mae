const giftsData = {
  pix: {
    receiver: 'Maria Sueli',
    city: 'São Paulo',
    key: '11963987543'
  },
  gifts: [
    { id: 1, title: 'Café especial para dois', emoji: '☕', price: 0.10 },
    { id: 2, title: 'Sobremesa especial em um café charmoso', emoji: '🍨', price: 200 },
    { id: 3, title: 'Jantar romântico', emoji: '🍽️', price: 590 },
    { id: 4, title: 'Vinho importado', emoji: '🍷', price: 350 },
    { id: 5, title: 'Tábua de frios especial', emoji: '🧀', price: 180 },
    { id: 6, title: 'Passeio ao pôr do sol', emoji: '🌅', price: 250 },
    { id: 7, title: 'Transporte para um passeio especial', emoji: '🚕', price: 220 },
    { id: 8, title: 'Brinde comemorativo das Bodas de Prata', emoji: '🥂', price: 280 },
    { id: 9, title: 'Drinks especiais para o casal', emoji: '🍸', price: 240 },
    { id: 10, title: 'Café da manhã especial no hotel', emoji: '🍰', price: 320 },
    { id: 11, title: 'Spa para casal', emoji: '💆', price: 650 },
    { id: 12, title: 'Jantar de comemoração das Bodas de Prata', emoji: '🍾', price: 700 },
    { id: 13, title: 'Contribuição livre', emoji: '🎁', price: 0 }
  ]
};

const container = document.getElementById('gift-cards');

if (container) {
  giftsData.gifts.forEach((gift) => {
    const card = document.createElement('article');
    card.className = 'gift-card';

    card.innerHTML = `
      <div class="gift-emoji">${gift.emoji}</div>
      <h3>${gift.title}</h3>
      <p class="gift-price">R$ ${gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
      <button class="gift-button" type="button" data-gift-title="${gift.title}">
        Gerar código PIX
      </button>
    `;

    container.appendChild(card);
  });
}

const modal = document.createElement('div');
modal.className = 'gift-modal hidden';
modal.innerHTML = `
  <div class="gift-modal-content">
    <h3>Enviar presente</h3>
    <p>Digite o nome da pessoa para confirmar o presente.</p>
    <input type="text" id="gift-recipient-name" placeholder="Seu nome" />
    <button type="button" id="gift-submit-button">Enviar presente</button>
    <button type="button" id="gift-close-button" class="gift-close-button">Cancelar</button>
  </div>
`;

document.body.appendChild(modal);

let currentGiftTitle = '';

function openGiftModal(giftTitle) {
  currentGiftTitle = giftTitle;
  modal.classList.remove('hidden');
  document.getElementById('gift-recipient-name').focus();
}

function closeGiftModal() {
  modal.classList.add('hidden');
  document.getElementById('gift-recipient-name').value = '';
}

document.addEventListener('click', async (event) => {
  const button = event.target.closest('.gift-button');
  if (button) {
    openGiftModal(button.dataset.giftTitle);
  }

  if (event.target.id === 'gift-close-button') {
    closeGiftModal();
  }

  if (event.target.id === 'gift-submit-button') {
    const recipientName = document.getElementById('gift-recipient-name').value.trim();
    if (!recipientName) {
      alert('Por favor, informe o seu nome.');
      return;
    }

    const selectedGift = giftsData.gifts.find((gift) => gift.title === currentGiftTitle);
    const priceValue = selectedGift ? selectedGift.price.toFixed(2) : '0.00';
    const pixLink = `https://linkspix.app/tonhao/${priceValue}`;

    try {
      const formData = new FormData();
      formData.append('Nome', recipientName);
      formData.append('Presente', currentGiftTitle);
      formData.append('_captcha', 'false');
      formData.append('_subject', 'Presente selecionado');
      formData.append('_template', 'table');

      await fetch('https://formsubmit.co/sousa.mg@hotmail.com', {
        method: 'POST',
        body: formData
      });

      closeGiftModal();
      window.location.href = pixLink;
    } catch (error) {
      alert('Não foi possível enviar o presente no momento. Tente novamente.');
    }
  }
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeGiftModal();
  }
});
