const giftsData = {
  pix: {
    receiver: 'Maria Sueli',
    city: 'São Paulo',
    key: '11963987543'
  },
  gifts: [
    { id: 1, title: 'Café especial para dois', emoji: '☕', price: 180 },
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
    `;

    container.appendChild(card);
  });
}
