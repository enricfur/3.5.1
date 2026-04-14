// Создаём один общий элемент подсказки
const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
document.body.appendChild(tooltip);

document.querySelectorAll('.has-tooltip').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();

    // Если кликнули по уже активному — скрываем
    if (tooltip.tooltip_owner === el && tooltip.classList.contains('tooltip_active')) {
      tooltip.classList.remove('tooltip_active');
      tooltip.tooltip_owner = null;
      return;
    }

    // Берём текст из атрибута title
    tooltip.textContent = el.getAttribute('title');

    // Позиционируем по положению элемента
    const rect = el.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top  = `${rect.bottom + window.scrollY + 6}px`;

    tooltip.classList.add('tooltip_active');
    tooltip.tooltip_owner = el; // запоминаем владельца
  });
});

// Клик вне элемента — скрываем подсказку
document.addEventListener('click', (e) => {
  if (!e.target.closest('.has-tooltip')) {
    tooltip.classList.remove('tooltip_active');
    tooltip.tooltip_owner = null;
  }
});