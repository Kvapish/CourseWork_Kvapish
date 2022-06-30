package coursework;

import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {

    private static Passengers passengers = new Passengers();
    public static Passengers getPassengers() {
        return passengers;
    }

    public static void main(String[] args) throws IOException, IllegalArgumentException {
        try {
            passengers.setPassengersList(Storage.LoadFromStorage());
        }
        catch (Exception e){
            passengers = new Passengers();
        }
        servlet();
    }

    public static void servlet() throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress("localhost", 8080), 0);
        server.createContext("/back", new Servlet());
        server.start();
        System.out.println(System.lineSeparator() + "Server started at:\tlocalhost:8080");
    }
}
