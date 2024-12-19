from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='.')

# Глобальные переменные для хранения данных
scanned_codes = {}
missing_qr_codes = set()
duplicate_count = 0

# Функция для очистки QR-кода от управляющих символов
def clean_qr_code(qr_code):
    return ''.join(char for char in qr_code if char.isprintable())

# Функция для разделения строки на части фиксированной длины
def split_by_length(text, length):
    return [text[i:i+length] for i in range(0, len(text), length)]

# Функция для обработки загруженного файла QR-кодов
def count_qr_codes(file):
    try:
        # Читаем весь файл как строку
        qr_codes_list = file.read().decode('utf-8')

        # Разделяем строку на части длиной по 40 символов
        qr_codes_list = split_by_length(qr_codes_list, 40)

        # Чистим строки и проверяем на пустые строки
        qr_codes_list = [clean_qr_code(qr_code.strip()) for qr_code in qr_codes_list if qr_code.strip()]

        return qr_codes_list
    except Exception as e:
        return [], f"Ошибка при обработке файла: {e}"

# Главная страница
@app.route('/')
def index():
    # Сброс данных при загрузке страницы
    global scanned_codes, duplicate_count
    scanned_codes = {}
    duplicate_count = 0
    return render_template('index.html')

# Загрузка файла и обработка QR-кодов
@app.route('/upload', methods=['POST'])
def upload_file():
    global missing_qr_codes, scanned_codes, duplicate_count

    file = request.files['file']
    if file:
        qr_codes_list = count_qr_codes(file)
        if qr_codes_list:
            # Сбрасываем глобальные переменные
            missing_qr_codes = set(qr_codes_list)
            scanned_codes = {}
            duplicate_count = 0

            # Возвращаем список оставшихся и количество оставшихся QR-кодов
            return jsonify({
                'status': 'success',
                'qr_codes': sorted(list(missing_qr_codes)),
                'remaining_count': len(missing_qr_codes),
                'scanned_count': len(scanned_codes),
                'duplicate_count': duplicate_count
            })
        else:
            return jsonify({'status': 'error', 'message': 'Ошибка при обработке файла.'})

    return jsonify({'status': 'error', 'message': 'Файл не загружен.'})

# Обработка отсканированных QR-кодов
@app.route('/scan', methods=['POST'])
def scan_qr_code():
    global scanned_codes, missing_qr_codes, duplicate_count

    qr_code = request.json.get('qr_code', '').strip()
    if qr_code:
        if qr_code in scanned_codes:
            # Увеличиваем счетчик дубликатов
            scanned_codes[qr_code] += 1
            duplicate_count += 1

            return jsonify({
                'status': 'duplicate',
                'message': f'Этот QR-код уже отсканирован {scanned_codes[qr_code]} раз.',
                'scanned_count': len(scanned_codes),  # Отправляем количество отсканированных QR-кодов
                'remaining_codes': list(missing_qr_codes),
                'duplicate_count': duplicate_count
            })
        elif qr_code in missing_qr_codes:
            scanned_codes[qr_code] = 1
            missing_qr_codes.remove(qr_code)
            return jsonify({
                'status': 'success',
                'scanned_count': len(scanned_codes),  # Отправляем количество отсканированных QR-кодов
                'remaining_codes': list(missing_qr_codes),
                'duplicate_count': duplicate_count
            })
        else:
            return jsonify({'status': 'error', 'message': 'QR-код не найден в загруженном списке.'})
    return jsonify({'status': 'error', 'message': 'QR-код не предоставлен.'})


if __name__ == '__main__':
    app.run(debug=True)
