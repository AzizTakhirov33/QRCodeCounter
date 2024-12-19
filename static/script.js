// let qrCodesList = [];
// let scannedCodes = new Set();
// let qrCodeCount = {};
// let missingQrCodes = new Set();

// // Функция для загрузки файла
// function uploadFile() {
//     const fileInput = document.getElementById('qrFile');
//     const file = fileInput.files[0];

//     if (!file) {
//         alert("Пожалуйста, выберите файл для загрузки.");
//         return;
//     }

//     const reader = new FileReader();
//     reader.onload = function(event) {
//         const fileContent = event.target.result;
//         processFile(fileContent);
//     };
//     reader.readAsText(file);
// }

// // Функция для обработки файла и извлечения QR-кодов
// function processFile(fileContent) {
//     console.log('Start processing the file...');
//     console.log('File Content:', fileContent); // Логируем содержимое файла как есть

//     // Здесь мы просто сохраняем содержимое файла как оно есть
//     qrCodesList = fileContent.trim(); // Убираем лишние пробелы в начале и конце файла

//     console.log('QR Codes List (full text):', qrCodesList);  // Логируем все QR-коды в одном тексте

//     // Если нужно вывести их в список на веб-странице, то можно сделать так:
//     const remainingList = document.getElementById('remainingCodes').querySelector('ul');
//     remainingList.innerHTML = '';  // Очищаем текущий список

//     const li = document.createElement('li');
//     li.textContent = qrCodesList; // Печатаем все QR-коды как один текст
//     remainingList.appendChild(li);

//     updateRemainingCodes();  // Обновляем список оставшихся QR-кодов (если требуется)
// }


// // Функция для обновления списка оставшихся QR-кодов
// function updateRemainingCodes() {
//     const remainingList = document.getElementById('remainingCodes').querySelector('ul');
//     remainingList.innerHTML = '';
//     missingQrCodes.forEach(code => {
//         const li = document.createElement('li');
//         li.textContent = code;
//         remainingList.appendChild(li);
//     });
// }

// // Функция для сканирования QR-кода (можно реализовать через форму или ввод вручную)
// function scanQRCode(code) {
//     // Удаление управляющих символов
//     const cleanedCode = cleanQRCode(code);

//     if (missingQrCodes.has(cleanedCode)) {
//         missingQrCodes.delete(cleanedCode);
//         scannedCodes.add(cleanedCode);
//         qrCodeCount[cleanedCode] = (qrCodeCount[cleanedCode] || 0) + 1;
//         updateRemainingCodes();
//         updateScannedCodes();
//         updateDuplicates();
//     }
// }

// // Функция для обновления списка отсканированных QR-кодов
// function updateScannedCodes() {
//     const scannedList = document.getElementById('scannedCodes').querySelector('ul');
//     scannedList.innerHTML = '';
//     scannedCodes.forEach(code => {
//         const li = document.createElement('li');
//         li.textContent = code;
//         scannedList.appendChild(li);
//     });
// }

// // Функция для обновления списка дубликатов QR-кодов
// function updateDuplicates() {
//     const duplicatesList = document.getElementById('duplicates').querySelector('ul');
//     duplicatesList.innerHTML = '';
//     for (let code in qrCodeCount) {
//         if (qrCodeCount[code] > 1) {
//             const li = document.createElement('li');
//             li.textContent = `${code}: ${qrCodeCount[code]}`;  // Шаблонная строка
//             duplicatesList.appendChild(li);
//         }
//     }
// }

// // Функция для очистки QR-кода от незначащих символов
// function cleanQRCode(qrCode) {
//     return qrCode.replace(/[^A-Za-z0-9]/g, '');
// }

// // Пример сканирования QR-кода (можно заменить на реальную логику сканирования)
// setTimeout(() => scanQRCode("0104780069000147215!!EHt%br%//j9337+/"), 1000);
// setTimeout(() => scanQRCode("0104780069000147215!!IDk/>QreNE936jXq"), 2000);