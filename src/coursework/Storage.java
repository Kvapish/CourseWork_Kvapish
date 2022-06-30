package coursework;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

public class Storage {

    /**
     * Запись всех пассажиров в хранилище
     * @param passengers список всех пассажиров
     * @throws IOException файл хранилища недоступен
     */
    public static void WriteToStorage(ArrayList<Passenger> passengers) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(new File("storage/storage.json"), passengers);
    }

    /**
     * Считать всех пассажиров с хранилища в список
     * @return список пассажиров
     * @throws IOException файл хранилища недоступен
     */
    public static ArrayList<Passenger> LoadFromStorage() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(new File("storage/storage.json"), ArrayList.class);
    }
}
