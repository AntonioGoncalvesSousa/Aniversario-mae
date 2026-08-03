const giftsData = {
  pix: {
    receiver: 'Maria Sueli',
    city: 'São Paulo',
    key: '11963987543'
  },
gifts: [
    { id: 1, title: 'Café especial de boas vindas no hotel', image: 'assets/experiences/1.jpg', price: 300 },
    { id: 2, title: 'Sobremesa especial em um café charmoso', image: 'assets/experiences/2.jpg', price: 190 },
    { id: 3, title: 'Jantar romântico', image: 'assets/experiences/3.jpg', price: 630 },
    { id: 4, title: 'Vinho importado', image: 'assets/experiences/4.jpg', price: 350 },
    { id: 5, title: 'Tábua de frios especial', image: 'assets/experiences/5.jpg', price: 280 },
    { id: 6, title: 'Transporte para um passeio especial', image: 'assets/experiences/6.jpg', price: 220 },
    { id: 7, title: 'Brinde comemorativo das Bodas de Prata', image: 'assets/experiences/7.jpg', price: 380 },
    { id: 8, title: 'Spa para casal', image: 'assets/experiences/8.jpg', price: 750 },
    { id: 9, title: 'Jantar de comemoração das Bodas de Prata', image: 'assets/experiences/9.jpg', price: 1200 },
    { id: 10, title: 'Cota da passagem aérea', image: 'assets/experiences/10.jpg', price: 300 },
    { id: 11, title: 'Cota da passagem aérea', image: 'assets/experiences/11.jpg', price: 500 },
    { id: 12, title: 'Uma diária de hotel', image: 'assets/experiences/12.jpg', price: 450 },
    { id: 13, title: 'Upgrade de hospedagem', image: 'assets/experiences/13.jpg', price: 800 },
    { id: 14, title: 'Passeio especial', image: 'assets/experiences/14.jpg', price: 450 },
    { id: 15, title: 'Ingresso para atração turística', image: 'assets/experiences/15.jpg', price: 300 },
    { id: 16, title: 'Ensaio fotográfico durante a viagem', image: 'assets/experiences/16.jpg', price: 800 },
    { id: 17, title: 'Contribuição especial', image: 'assets/experiences/17.jpg', price: "Caso prefira, você também pode fazer uma contribuição com qualquer outro valor." }
  ]
};

const container = document.getElementById('gift-cards');

if (container) {
  giftsData.gifts.forEach((gift) => {
    const card = document.createElement('article');
    card.className = 'gift-card';

    const priceText = gift.title === 'Contribuição especial'
      ? gift.price
      : `R$ ${gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    card.innerHTML = `
      <img src="${gift.image}" alt="${gift.title}" class="gift-image" />
      <h3>${gift.title}</h3>
      <p class="gift-price">${priceText}</p>
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
    <div id="gift-amount-group" class="gift-amount-group" hidden>
      <label for="gift-amount">Quanto você quer mandar?</label>
      <input type="number" id="gift-amount" min="1" step="0.01" placeholder="Ex.: 50" />
    </div>
    <button type="button" id="gift-submit-button">Enviar presente</button>
    <button type="button" id="gift-close-button" class="gift-close-button">Cancelar</button>
  </div>
`;

document.body.appendChild(modal);

let currentGiftTitle = '';

function openGiftModal(giftTitle) {
  currentGiftTitle = giftTitle;
  modal.classList.remove('hidden');

  const amountGroup = document.getElementById('gift-amount-group');
  const amountInput = document.getElementById('gift-amount');
  const isContribution = giftTitle === 'Contribuição especial';

  amountGroup.hidden = !isContribution;
  if (!isContribution) {
    amountInput.value = '';
  }

  document.getElementById('gift-recipient-name').focus();
}

function closeGiftModal() {
  modal.classList.add('hidden');
  document.getElementById('gift-recipient-name').value = '';
  document.getElementById('gift-amount').value = '';
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
    let priceValue = selectedGift ? selectedGift.price : '0.00';

    if (currentGiftTitle === 'Contribuição especial') {
      const customAmount = document.getElementById('gift-amount').value.trim();
      if (!customAmount) {
        alert('Por favor, informe o valor que você quer mandar.');
        return;
      }
      priceValue = Number(customAmount).toFixed(2);
    }

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
