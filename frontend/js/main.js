const HOST = 'http://localhost:8080/back?';

const KEY_FIRST_NAME = 'firstName';
const KEY_MIDDLE_NAME = 'middleName';
const KEY_LAST_NAME = 'lastName';
const KEY_FLIGHT_NUMBER = 'flightNumber';
const KEY_LUGGAGE_RECEIPT_NUMBER = 'luggageReceiptNumber';
const KEY_LUGGAGE_PLACES_QUANTITY = 'luggagePlacesQuantity';
const KEY_LUGGAGE_SUM_WEIGHT = 'luggageSumWeight';
const KEY_LUGGAGE_PLACEMENT_TIME = 'luggagePlacementTime';
const KEY_LUGGAGE_PLACEMENT_TERM = 'luggagePlacementTerm';

let JsonArr = [];

fetch(HOST + "show", {
    method: 'POST',
}).then(response =>
    response.json().then(data => ({
        data: data,
    })).then(res => {
        try {
            JsonArr = res.data;
            render(JsonArr);
        } catch {
            JsonArr = [];
        }
    }));


let $content_table = document.querySelector('.content-table')

function render(array) {
    $content_table.innerHTML = '<thead class="align-top">\n' +
        '<tr>\n' +

        '<th scope="col">Имя</th>\n' +
        '<th scope="col">Отчество</th>\n' +
        '<th scope="col">Фамилия</th>\n' +
        '<th scope="col">Номер рейса</th>\n' +
        '<th scope="col">Номер багажной квитанции</th>\n' +
        '<th scope="col">Количество мест багажа</th>\n' +
        '<th scope="col">Суммарный вес багажа пассажира</th>\n' +
        '<th scope="col">Время размещения багажа</th>\n' +
        '<th scope="col">Срок размещения</th>\n' +

        '</tr>\n' +
        '</thead>';
    for (let i = 0; i < array.length; i++) {
        $content_table.innerHTML += '<tbody><tr><td>' +

            array[i][KEY_FIRST_NAME] + '</td><td>' +
            array[i][KEY_MIDDLE_NAME] + '</td><td>' +
            array[i][KEY_LAST_NAME] + '</td><td>' +
            array[i][KEY_FLIGHT_NUMBER] + '</td><td>' +
            array[i][KEY_LUGGAGE_RECEIPT_NUMBER] + '</td><td>' +
            array[i][KEY_LUGGAGE_PLACES_QUANTITY] + '</td><td>' +
            array[i][KEY_LUGGAGE_SUM_WEIGHT] + '</td><td>' +
            array[i][KEY_LUGGAGE_PLACEMENT_TIME] + '</td><td>' +
            array[i][KEY_LUGGAGE_PLACEMENT_TERM] + '</td>' +

            '</tr></tbody>';
    }
}

function filterShowWeightMoreThanThirty() {
    let result = [];
    for (let i = 0; i < JsonArr.length; i++) {
        if (JsonArr[i][KEY_LUGGAGE_SUM_WEIGHT] > 30) {
            result.push(JsonArr[i]);
        }
    }
    // Чистим поле поиска для предотвращения потенциальных конфликтов
    document.querySelector('#search-luggage-receipt-number').value = "";
    return result;
}

document.querySelector('#show-luggage-weight-higher-than').addEventListener('change', function () {
    if (this.checked) {
        render(filterShowWeightMoreThanThirty());
    }
});
document.querySelector('#show-all').addEventListener('change', function () {
    if (this.checked) {
        // Чистим поле поиска для предотвращения потенциальных конфликтов
        document.querySelector('#search-luggage-receipt-number').value = "";
        render(JsonArr);
    }
});

let $searchLuggageReceiptNumber = document.querySelector('#search-luggage-receipt-number');
$searchLuggageReceiptNumber.addEventListener('input', function () {
    let result = [];
    for (let i = 0; i < JsonArr.length; i++) {
        if (JsonArr[i][KEY_LUGGAGE_RECEIPT_NUMBER].toString().indexOf($searchLuggageReceiptNumber.value) > -1) {
            result.push(JsonArr[i]);
        }
    }
    render(result);
})

document.querySelector('#modal-add-send').addEventListener('click', function () {
    let luggageReceiptNumber = Number(document.querySelector('#modal-input-luggage-receipt-number').value);
    let duplicateLuggageReceiptNumber = false;

    for (let i = 0; i < JsonArr.length; i++) {
        if (JsonArr[i][KEY_LUGGAGE_RECEIPT_NUMBER] === luggageReceiptNumber) {
            // Если в массиве существует дубликат номера багажной квитанции, меняем значение флага
            duplicateLuggageReceiptNumber = true;
            break;
        }
    }

    // Если дубликат не нашли, то можно пытаться добавлять
    if (!duplicateLuggageReceiptNumber) {

        let result = {
            firstName: document.querySelector('#modal-input-first-name').value,
            middleName: document.querySelector('#modal-input-middle-name').value,
            lastName: document.querySelector('#modal-input-last-name').value,
            flightNumber: Number(document.querySelector('#modal-input-flight-number').value),
            luggageReceiptNumber: Number(document.querySelector('#modal-input-luggage-receipt-number').value),
            luggagePlacesQuantity: Number(document.querySelector('#modal-input-luggage-places-quantity').value),
            luggageSumWeight: Number(document.querySelector('#modal-input-luggage-sum-weight').value),
            luggagePlacementTime: Number(document.querySelector('#modal-input-luggage-placement-time').value),
            luggagePlacementTerm: Number(document.querySelector('#modal-input-luggage-placement-term').value),
        };
        fetch(HOST + "add", {
            method: 'POST',
            body: JSON.stringify(result),
        }).then(response =>
            response.json().then(data => ({
                data: data,
            })).then(res => {
                if (res.data["added_successfully"] === true) {
                    JsonArr.push(result);
                    render(JsonArr);

                    alert("Пассажир успешно добавлен");

                    const addModalWrapper = document.querySelector('#add-modal');
                    const addModal = bootstrap.Modal.getInstance(addModalWrapper);
                    addModal.hide();

                    document.querySelector('#modal-input-first-name').value = "";
                    document.querySelector('#modal-input-middle-name').value = "";
                    document.querySelector('#modal-input-last-name').value = "";
                    document.querySelector('#modal-input-flight-number').value = "";
                    document.querySelector('#modal-input-luggage-receipt-number').value = "";
                    document.querySelector('#modal-input-luggage-places-quantity').value = "";
                    document.querySelector('#modal-input-luggage-sum-weight').value = "";
                    document.querySelector('#modal-input-luggage-placement-time').value = "";
                    document.querySelector('#modal-input-luggage-placement-term').value = "";
                } else {
                    alert("Введены некорректные данные пассажира")
                }
            }));

    } else {
        alert("Запись с таким номером багажной квитанции уже существует")
    }
})

let editId = -1;
document.querySelector('#edit-element-button').addEventListener('click', function () {
    let passengerFound = false;
    let passengerEditLuggageReceiptNumber = Number(document.querySelector('#edit-element').value);
    for (let i = 0; i < JsonArr.length; i++) {
        if (JsonArr[i][KEY_LUGGAGE_RECEIPT_NUMBER] === passengerEditLuggageReceiptNumber) {
            let editModalWrapper = document.querySelector('#edit-modal');
            let editModal = new bootstrap.Modal(editModalWrapper);
            editModal.show();

            editId = i;

            document.querySelector('#modal-input-first-name-edit').value = JsonArr[i][KEY_FIRST_NAME];
            document.querySelector('#modal-input-middle-name-edit').value = JsonArr[i][KEY_MIDDLE_NAME];
            document.querySelector('#modal-input-last-name-edit').value = JsonArr[i][KEY_LAST_NAME];
            document.querySelector('#modal-input-flight-number-edit').value = JsonArr[i][KEY_FLIGHT_NUMBER];
            document.querySelector('#modal-input-luggage-receipt-number-edit').value = JsonArr[i][KEY_LUGGAGE_RECEIPT_NUMBER];
            document.querySelector('#modal-input-luggage-places-quantity-edit').value = JsonArr[i][KEY_LUGGAGE_PLACES_QUANTITY];
            document.querySelector('#modal-input-luggage-sum-weight-edit').value = JsonArr[i][KEY_LUGGAGE_SUM_WEIGHT];
            document.querySelector('#modal-input-luggage-placement-time-edit').value = JsonArr[i][KEY_LUGGAGE_PLACEMENT_TIME];
            document.querySelector('#modal-input-luggage-placement-term-edit').value = JsonArr[i][KEY_LUGGAGE_PLACEMENT_TERM];

            passengerFound = true;

            break;
        }
    }

    if (passengerFound === false) {
        alert("Пассажир с таким номером багажной квитанции не найден");
    }
})

document.querySelector('#modal-edit-send').addEventListener('click', function () {

    let editLuggageReceiptNumber = Number(document.querySelector('#modal-input-luggage-receipt-number-edit').value);
    let editDuplicateLuggageReceiptNumber = false;

    for (let i = 0; i < JsonArr.length; i++) {
        // Пропускаем текущий элемент при проходе (ведь у него номер багажной квитанции будет одинаковым с введенным)
        if (i === editId) {
            continue;
        }
        if (JsonArr[i][KEY_LUGGAGE_RECEIPT_NUMBER] === editLuggageReceiptNumber) {
            // Если нашли вкладчика с введенной фамилией, меняем значение флага
            editDuplicateLuggageReceiptNumber = true;
            break;
        }
    }

    if (!editDuplicateLuggageReceiptNumber) {

        let result = {
            firstName: document.querySelector('#modal-input-first-name-edit').value,
            middleName: document.querySelector('#modal-input-middle-name-edit').value,
            lastName: document.querySelector('#modal-input-last-name-edit').value,
            flightNumber: Number(document.querySelector('#modal-input-flight-number-edit').value),
            luggageReceiptNumber: Number(document.querySelector('#modal-input-luggage-receipt-number-edit').value),
            luggagePlacesQuantity: Number(document.querySelector('#modal-input-luggage-places-quantity-edit').value),
            luggageSumWeight: Number(document.querySelector('#modal-input-luggage-sum-weight-edit').value),
            luggagePlacementTime: Number(document.querySelector('#modal-input-luggage-placement-time-edit').value),
            luggagePlacementTerm: Number(document.querySelector('#modal-input-luggage-placement-term-edit').value),
        };

        let editData = {
            id: editId,
            passenger: result
        }

        fetch(HOST + "edit", {
            method: 'POST',
            body: JSON.stringify(editData),
        }).then(response =>
            response.json().then(data => ({
                data: data,
            })).then(res => {
                if (JSON.stringify(res.data) === '{"edited_successfully":true}') {

                    JsonArr[editId] = result;
                    render(JsonArr);

                    alert("Пассажир успешно отредактирован");

                    const editModalWrapper = document.querySelector('#edit-modal');
                    const editModal = bootstrap.Modal.getInstance(editModalWrapper);
                    editModal.hide();

                    document.querySelector('#modal-input-first-name-edit').value = "";
                    document.querySelector('#modal-input-middle-name-edit').value = "";
                    document.querySelector('#modal-input-last-name-edit').value = "";
                    document.querySelector('#modal-input-flight-number-edit').value = "";
                    document.querySelector('#modal-input-luggage-receipt-number-edit').value = "";
                    document.querySelector('#modal-input-luggage-places-quantity-edit').value = "";
                    document.querySelector('#modal-input-luggage-sum-weight-edit').value = "";
                    document.querySelector('#modal-input-luggage-placement-time-edit').value = "";
                    document.querySelector('#modal-input-luggage-placement-term-edit').value = "";
                } else {
                    alert("Введены неправильные данные при редактировании")
                }
            }));

    } else {
        alert("Пассажир с таким номером багажной квитанции уже существует")
    }

})

document.querySelector('#delete-element-button').addEventListener('click', function () {
    let passengersDeleteFound = false;
    let passengersDeleteLastName = document.querySelector('#delete-element').value;
    let result = [];
    for (let i = 0; i < JsonArr.length; i++) {
        if (JsonArr[i][KEY_LAST_NAME] === passengersDeleteLastName) {
            // Флаг для хранения состояния нашли ли мы пассажира с введенной фамилией
            passengersDeleteFound = true;
        } else {
            // Всех пассажиров где фамилия не совпадает со введенной сохраняем в отдельный список
            result.push(JsonArr[i]);
        }
    }
    if (passengersDeleteFound === false) {
        alert("Ни одного пассажира с введенной фамилией не найдено");
    } else {
        fetch(HOST + "delete", {
            method: 'POST',
            body: JSON.stringify(result),
        }).then(response =>
            response.json().then(data => ({
                data: data,
            })).then(res => {
                if (JSON.stringify(res.data) === '{"deleted_successfully":true}') {
                    alert('Удалено успешно');
                    JsonArr = result;
                    render(JsonArr);
                } else {
                    alert("Ошибка при удалении")
                }
            }));

    }
})


document.querySelector('#sum-of-weights-button').addEventListener('click', function () {
    let passengersFound = false;
    let result = [];
    let passengersFindFlightNumber = Number(document.querySelector('#sum-of-weights').value);
    for (let i = 0; i < JsonArr.length; i++) {
        if (JsonArr[i][KEY_FLIGHT_NUMBER] === passengersFindFlightNumber) {
            passengersFound = true;
            result.push(JsonArr[i]);
        }
    }
    if (passengersFound === false) {
        alert("Не найдено ни одного пассажира с таким номером рейса");
    } else {
        let sumOfWeights = 0;
        // Проходимся по всем найденным пассажирам
        for (let i = 0; i < result.length; i++) {
            // Прибавляем к сумме текущий вес
            sumOfWeights += result[i][KEY_LUGGAGE_SUM_WEIGHT];
        }

        alert("Суммарный вес багажа всех пассажиров рейса: " + sumOfWeights);
    }
})