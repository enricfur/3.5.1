const loader = document.getElementById('loader');
const items = document.getElementById('items');
const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const currencies = data.response.Valute;

    Object.values(currencies).forEach((currency) => {
      const item = document.createElement('div');

      item.classList.add('item');
      item.innerHTML = `
        <div class="item__code">${currency.CharCode}</div>
        <div class="item__value">${currency.Value}</div>
        <div class="item__currency">руб.</div>
      `;

      items.appendChild(item);
    });

    loader.classList.remove('loader_active');
  })
  .catch((error) => {
    console.error('Ошибка загрузки:', error);
    loader.classList.remove('loader_active');
  });
