const form     = document.getElementById('uploadForm');
const progress = document.getElementById('progress');
const status   = document.getElementById('status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const xhr = new XMLHttpRequest();

  // Отслеживаем прогресс отправки
  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      const value = e.loaded / e.total;
      progress.value = value;
      status.textContent = `Загружено: ${Math.round(value * 100)}%`;
    }
  });

  xhr.addEventListener('load', () => {
    if (xhr.status === 200 || xhr.status === 201) {
      progress.value = 1;
      status.textContent = '✅ Файл успешно загружен!';
    } else {
      status.textContent = `❌ Ошибка сервера: ${xhr.status}`;
    }
  });

  xhr.addEventListener('error', () => {
    status.textContent = '❌ Ошибка соединения';
  });

  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
  xhr.send(formData);
});
