package coursework;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Passenger implements Serializable {
    private String firstName;
    private String middleName;
    private String lastName;
    private int flightNumber;
    private int luggageReceiptNumber;
    private int luggagePlacesQuantity;
    private double luggageSumWeight;
    private int luggagePlacementTime; // В минутах
    private int luggagePlacementTerm;// В минутах

    public Passenger(String firstName, String middleName, String lastName, int flightNumber,
                     int luggageReceiptNumber, int luggagePlacesQuantity, double luggageSumWeight,
                     int luggagePlacementTime, int luggagePlacementTerm) {
        try {
            this.setFirstName(firstName);
            this.setMiddleName(middleName);
            this.setLastName(lastName);
            this.setFlightNumber(flightNumber);
            this.setLuggageReceiptNumber(luggageReceiptNumber);
            this.setLuggagePlacesQuantity(luggagePlacesQuantity);
            this.setLuggageSumWeight(luggageSumWeight);
            this.setLuggagePlacementTime(luggagePlacementTime);
            this.setLuggagePlacementTerm(luggagePlacementTerm);
        } catch (Exception e) {
            throw new IllegalArgumentException("Попытка создать пассажира с неправильными данными");
        }
    }
    public Passenger(){}

    public String getFirstName() {
        return firstName;
    }
    public String getMiddleName() {
        return middleName;
    }
    public String getLastName() {
        return lastName;
    }
    public int getFlightNumber() {
        return flightNumber;
    }
    public int getLuggageReceiptNumber() {
        return luggageReceiptNumber;
    }
    public int getLuggagePlacesQuantity() {
        return luggagePlacesQuantity;
    }
    public double getLuggageSumWeight() {
        return luggageSumWeight;
    }
    public int getLuggagePlacementTime() {
        return luggagePlacementTime;
    }
    public int getLuggagePlacementTerm() {
        return luggagePlacementTerm;
    }

    public void setFirstName(String firstName) throws IllegalArgumentException {
        if (Checkers.isFirstLetterCapital(firstName) && firstName.length() < 30) {
            this.firstName = Checkers.removeExtraSpaces(firstName);
        } else {
            throw new IllegalArgumentException("Имя пассажира должно начинаться с большой буквы и быть меньше 30 символов");
        }
    }

    public void setMiddleName(String middleName) throws IllegalArgumentException {
        if (Checkers.isFirstLetterCapital(middleName) && middleName.length() < 30) {
            this.middleName = Checkers.removeExtraSpaces(middleName);
        } else {
            throw new IllegalArgumentException("Отчество пассажира должно начинаться с большой буквы и быть меньше 30 символов");
        }
    }
    public void setLastName(String lastName) throws IllegalArgumentException {
        if (Checkers.isFirstLetterCapital(lastName) && lastName.length() < 30) {
            this.lastName = Checkers.removeExtraSpaces(lastName);
        } else {
            throw new IllegalArgumentException("Фамилия пассажира должно начинаться с большой буквы и быть меньше 30 символов");
        }
    }

    public void setFlightNumber(int flightNumber) throws IllegalArgumentException {
        if (flightNumber >= 0 && flightNumber < 15000) {
            this.flightNumber = flightNumber;
        } else {
            throw new IllegalArgumentException("Номер рейса должен быть от 0 до 15000");
        }
    }

    public void setLuggageReceiptNumber(int luggageReceiptNumber) throws IllegalArgumentException {
        if (luggageReceiptNumber >= 0 && luggageReceiptNumber < 15000) {
            this.luggageReceiptNumber = luggageReceiptNumber;
        } else {
            throw new IllegalArgumentException("Номер багажной квитанции должен быть от 0 до 15000");
        }
    }

    public void setLuggagePlacesQuantity(int luggagePlacesQuantity) throws IllegalArgumentException {
        if (luggagePlacesQuantity >= 0 && luggagePlacesQuantity <= 15) {
            this.luggagePlacesQuantity = luggagePlacesQuantity;
        } else {
            throw new IllegalArgumentException("Количество мест для багажа должно быть от 1 до 15");
        }
    }

    public void setLuggageSumWeight(double luggageSumWeight) throws IllegalArgumentException {
        if (luggageSumWeight >= 0 && luggageSumWeight <= 300) {
            this.luggageSumWeight = luggageSumWeight;
        } else {
            throw new IllegalArgumentException("Суммарный вес багажа должен быть от 0 до 300");
        }
    }

    public void setLuggagePlacementTime(int luggagePlacementTime) throws IllegalArgumentException {
        final int maxLuggagePlacementTime = 24 * 60; // сколько минут в дне
        if (luggagePlacementTime >= 0 && luggagePlacementTime <= maxLuggagePlacementTime) {
            this.luggagePlacementTime = luggagePlacementTime;
        } else {
            throw new IllegalArgumentException("Время размещения багажа должно быть между 0 и 1440");
        }
    }

    public void setLuggagePlacementTerm(int luggagePlacementTerm) throws IllegalArgumentException {
        final int maxLuggagePlacementTerm = 24 * 60 * 5; // сколько минут в пяти днях
        if (luggagePlacementTerm >= 0 && luggagePlacementTerm <= maxLuggagePlacementTerm) {
            this.luggagePlacementTerm = luggagePlacementTerm;
        } else {
            throw new IllegalArgumentException("Срок размещения багажа должен быть между 0 и 7200");
        }
    }

    @Override
    public String toString() {
        return "Passenger{" +
                "firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", flightNumber=" + flightNumber +
                ", luggageReceiptNumber=" + luggageReceiptNumber +
                ", luggagePlacesQuantity=" + luggagePlacesQuantity +
                ", luggageSumWeight=" + luggageSumWeight +
                ", luggagePlacementTime=" + luggagePlacementTime +
                ", luggagePlacementTerm=" + luggagePlacementTerm +
                '}';
    }
}
