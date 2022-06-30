package coursework;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Passengers implements Serializable {
    private ArrayList<Passenger> passengersList;

    public Passengers() {
        passengersList = new ArrayList<>();
    }
    public ArrayList<Passenger> getPassengersList() {
        return passengersList;
    }
    public void setPassengersList(ArrayList<Passenger> passengersList){
        this.passengersList = passengersList;
    }

    /**
     * Добавить в список пассажира
     * @param passenger пассажир
     */
    public void add(Passenger passenger){
        passengersList.add(passenger);
    }

    /**
     * Поменять пассажира в списке по айди
     * @param id порядковый номер пассажира в списке
     * @param passenger пассажир
     */
    public void set(int id, Passenger passenger){
        passengersList.set(id, passenger);
    }

    /**
     * Удалить пассаижра из списка переда его объект
     * @param passenger пассажир
     */
    public void remove(Passenger passenger){
        passengersList.remove(passenger);
    }

    /**
     * Удаление пассажира из списка по порядковому номеру
     * @param id порядковый номер пассажира в списке
     */
    public void remove(int id) throws IllegalArgumentException {
        if (id < passengersList.size() && id >= 0){
            passengersList.remove(id);
        } else {
            throw new IllegalArgumentException("Некорректный индекс пассажира к удалению");
        }
    }

    @Override
    public String toString() {
        return "Passengers{" +
                "passengersList=" + passengersList +
                '}';
    }
}
