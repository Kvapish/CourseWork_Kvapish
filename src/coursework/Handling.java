package coursework;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.util.ArrayList;

public class Handling {
    /**
     * Считать всех пассажиров с хранилища в строку
     * @return успешность отправления запроса или строка со всеми пассажирами
     * @throws IOException файловое хранилище недоступно
     */
    public static String show() throws IOException {
        try {
            return new BufferedReader(new FileReader(new File("storage/storage.json"))).readLine();
        } catch (IOException e) {
            System.out.println("Не удается прочитать файловое хранилище");
        }
        return "{\"showed_successfully\": false}";
    }

    /**
     * Добавить нового пассажира в хранилище
     * @param passengerJSON
     * @return успешно или неуспешно добавлен (ответ JSON)
     * @throws IOException файловое хранилище недоступно
     */
    public static String add(String passengerJSON) throws IOException, IllegalArgumentException {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            System.out.println(passengerJSON);
            Passenger passenger = objectMapper.readValue(passengerJSON, Passenger.class);
            Main.getPassengers().add(passenger);
            Storage.WriteToStorage(Main.getPassengers().getPassengersList());
            return "{\"added_successfully\": true}";
        } catch (Exception e) {
            System.out.println("Попытка ввести неправильные данные пассажира");
            return "{\"added_successfully\": false}";
        }
    }

    /**
     * Отредактировать пассажира в файловом хранилище
     * @param passengerJSON данные пассажира
     * @return успешно или неуспешно отредактирован (ответ JSON)
     * @throws IOException файловое хранилище недоступно
     * @throws IllegalArgumentException
     */
    public static String edit(String passengerJSON) throws IOException, IllegalArgumentException {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode passengerJsonNode = objectMapper.readTree(passengerJSON);
            int id = Integer.parseInt(passengerJsonNode.get("id").asText());
            Passenger passenger = objectMapper.treeToValue(passengerJsonNode.get("passenger"), Passenger.class);
            Main.getPassengers().set(id, passenger);
            Storage.WriteToStorage(Main.getPassengers().getPassengersList());
            return "{\"edited_successfully\": true}";
        } catch (Exception e) {
            System.out.println("Попытка ввести неправильные данные пассажира для редактирования");
            return "{\"added_successfully\": false}";
        }
    }

    /**
     * Удалить пассажира из хранилища
     * @param ListJSON новый список пассажиров
     * @return успешность удаления
     * @throws IOException файловое хранилище недоступно
     */
    public static String delete(String ListJSON) throws IOException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Main.getPassengers().setPassengersList(objectMapper.readValue(ListJSON, ArrayList.class));
            Storage.WriteToStorage(Main.getPassengers().getPassengersList());
            return "{\"deleted_successfully\": true}";
        } catch (IOException e) {
            System.out.println("Не удается прочитать файловое хранилище");
            return "{\"deleted_successfully\": false}";
        }
    }
}
