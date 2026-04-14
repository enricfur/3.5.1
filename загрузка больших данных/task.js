const form = document.getElementById('uploadForm');
const progress = document.getElementById('progress');
const status = document.getElementById('status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const xmlHttpReq = new XMLHttpRequest();

  // Отслеживаем прогресс отправки
  xmlHttpReq.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      const value = e.loaded / e.total;
      progress.value = value;
      status.textContent = `Загружено: ${Math.round(value * 100)}%`;
    }
  });

  xmlHttpReq.addEventListener('load', () => {
    if (xmlHttpReq.status === 200 || xmlHttpReq.status === 201) {
      progress.value = 1;
      status.textContent = 'Файл успешно загружен!';
    } else {
      status.textContent = `Ошибка сервера: ${xmlHttpReq.status}`;
    }
  });

  xmlHttpReq.addEventListener('error', () => {
    status.textContent = 'Ошибка соединения';
  });

  xmlHttpReq.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
  xmlHttpReq.send(formData);
});
