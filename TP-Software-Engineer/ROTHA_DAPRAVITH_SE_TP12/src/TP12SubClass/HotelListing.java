package TP12SubClass;
import java.sql.*;

import models.City;
import models.Country;
import models.Hotel;
import orms.CityORM;
import orms.CountryORM;
import orms.HotelORM;
import utils.DbManager;

public class HotelListing extends GeneralNeededMethod {



    public static void main(String[] args) throws SQLException {
        create_database(DB);
        DbManager.getInstance(DB, "root", null);
        int opt;

        do {
            System.out.println("""
                    1. List all hotels in a city
                    2. Add new hotel
                    3. View detail
                    4. Delete a hotel by id
                    0. Exit hotel listing
                    """);
            System.out.print("Choose an option: ");
            opt = validInt();

            if(!superUser && (opt==2||opt==4)) opt=5;
            else if(opt==5) opt=6;
            
            switch (opt) {
                case 0: break;
                case 1:
                    listAllHotels();
                    break;
                case 2:
                    AddNewHotel();
                    break;
                case 3:
                    viewDetailOf_AHotel();
                    break;
                case 4:
                    deleteHotelByID();
                    break;
                case 5:
                    System.out.println(">Permission denied");
                    break;
                default: {System.out.println("choose available option!\n-"); opt=6;};
            }

            if(opt!=6){
                System.out.println("-\nPress enter to continue...");
                sc.nextLine();
            }
        } while (opt != 0);
    }


    private static void listAllHotels() {
        HotelORM hotelORM=new HotelORM();
        //if not a single hotel exits
        if(hotelORM.listAll().size()==0){System.out.println("-\nNo hotel to display"); return;}

        CountryORM countryORM=new CountryORM();
        //if not s single country exist
        if(countryORM.listAll().size()==0){System.out.println("-\nNo country to select!"); return;}

        CityORM CityORM=new CityORM();
        //if not a single city exist
        if(CityORM.listAll().size()==0){System.out.println("-\nNo City to to select!"); return;}



        System.out.println("Please select a country: ");
        for (var c : countryORM.listAll()) {
            System.out.println(c.getId() + ". " + c.getCountry());
        }
        System.out.print("Enter: ");
        var foundCountries = countryORM.rawQueryList("id=" + validInt());

        if (foundCountries.size() > 0) {
            Country country = foundCountries.get(0);
            CityORM cityORM = new CityORM();
            var cities = cityORM.rawQueryList("countryid=" + country.getId());

            //if no city to select
            if(cities.size()==0){  System.out.println("-\n>No city select in this country"); return; } 

            System.out.println("Please select a city: ");
            for (City city : cities) {
                System.out.println(city.getId() + ". " + city.getCity());
            }
            System.out.print("Enter: ");
            var foundCities = cityORM.rawQueryList("id=" + validInt() + " AND countryid=" + country.getId());

            if (foundCities.size() > 0) {
                City city = foundCities.get(0);
                var hotels = hotelORM.rawQueryList("countryid=" + country.getId()
                        + " AND cityid=" + city.getId());
                
                //if no hotels
                if (hotels.size() == 0){System.out.println("-\nNo hotel to display in this city"); return;}
                    
                System.out.println("-------- Hotels ----------");
                for (Hotel hotel : hotels) {
                    System.out.println(hotel.getId() + ". " + hotel.getHotel());
                }         
            } else System.out.println("City not found.");
        } else System.out.println("Country not found!");
    }

    private static void AddNewHotel() {
        CountryORM countryORM=new CountryORM();
        //if no country
        if(countryORM.listAll().size()==0){System.out.println("-\nNo country to select!"); return;}

        CityORM CityORM=new CityORM();
        //if no City
        if(CityORM.listAll().size()==0){System.out.println("-\nNo City to to select!"); return;}
 
        System.out.println("Please select a country: ");
        for (var c : countryORM.listAll()) {
            System.out.println(c.getId() + ". " + c.getCountry());
        }
        System.out.print("Enter: ");
        var foundCountries = countryORM.rawQueryList("id=" + validInt());

        if (foundCountries.size() > 0) {
            Country country = foundCountries.get(0);
            CityORM cityORM = new CityORM();
            var cities = cityORM.rawQueryList("countryid=" + country.getId());

            //stop function if no city to select
            if(cities.size()==0){  System.out.println("-\n>No city select in this country"); return; } 

            System.out.println("Please select a city: ");
            for (City city : cities) {
                System.out.println(city.getId() + ". " + city.getCity());
            }
            System.out.print("Enter: ");
            var foundCities = cityORM.rawQueryList("id=" + validInt() + " AND countryid=" + country.getId());

            if (foundCities.size() > 0) {
                City city = foundCities.get(0);
                Hotel hotel = new Hotel(0, null, country, city, (byte) 0, 0, null);
                System.out.println("-");
                System.out.print("Hotel name: ");
                hotel.setHotel(sc.nextLine());
                if(hotel.getHotel().equals("")){System.out.println(">>>Hotel name can not be empty!!!");return;}
                System.out.print("Cost: ");
                hotel.setCost(validDouble());
                System.out.print("Stars: ");
                hotel.setStars(validByte_0To5());
                System.out.print("Detail info: ");
                hotel.setInfo(sc.nextLine());
                System.out.print("Comment: ");
                String comt=sc.nextLine();

                HotelORM hotelORM = new HotelORM();
                hotelORM.add(hotel);
                addCommentToHotels(comt, hotel.getId());
                System.out.println("-\n-New Hotel added, ID: " + hotel.getId());
            } else
                System.out.println("City not found.");
        } else
            System.out.println("Country not found!");
    }

    //this will display detail and even if the country/city no longer in list, will replace by Deleted
    private static void viewDetailOf_AHotel() {
        HotelORM hotelORM = new HotelORM();
        var hotels = hotelORM.listAll();
        //stop function if no show to select/display
        if(hotels.size()==0){  System.out.println("-\nNo hotels to display"); return; } 

        System.out.println("Please select a  hotel: ");
        for (Hotel hotel : hotels) {
            System.out.println(hotel.getId() + ". " + hotel.getHotel());
        }
        System.out.print("Enter: ");
        var foundHotels = hotelORM.rawQueryList("id=" + validInt());
        if (foundHotels.size() > 0) {
            Hotel h = foundHotels.get(0);
            System.out.printf("-\n %-7s %-20s %-10s %-10s %-6s %-13s %-30s %s\n", "ID", "Hotel", "CountryID", "CityID",
                    "Stars", "Cost", "Info", "Comment");
            System.out.printf(" %-7d %-20s %-10s %-10s %-6d %-13.2f %-30s %s\n", 
                    h.getId(), 
                    h.getHotel(),
                    h.getCountry()==null?"Deleted":String.valueOf(h.getCountry().getId()),
                    h.getCity()==null?"Deleted":String.valueOf(h.getCity().getId()), 
                    h.getStars(), h.getCost(), 
                    h.getInfo()==null||h.getInfo().equalsIgnoreCase("")?"Empty": h.getInfo(),
                    getComment(h.getId())==null||getComment(h.getId()).equals("")?"Empty":getComment(h.getId()));
        } else
            System.out.println("Hotel not found");
    }

    // as the delete method was not implemented yet so create a method to delete
    // Hotel by id
    private static boolean delete(int id) {
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost", "root", "");
                var stmt = conn.createStatement();) {
            stmt.executeUpdate("use "+DB);
            stmt.executeUpdate("delete from hotels where id=" + id);
            HotelORM hotelORM = new HotelORM();
            var ch = hotelORM.rawQueryList("id=" + id);
            if (ch.size() == 0)
                return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private static void deleteHotelByID() {
        HotelORM hotelORM = new HotelORM();
        var hotels = hotelORM.listAll();
        //stop function if no show to select/display
        if(hotels.size()==0){  System.out.println("-\n>No hotel to delete"); return; } 
        System.out.println("Please select hotel: ");
        for (Hotel hotel : hotels) {
            System.out.println(hotel.getId() + ". " + hotel.getHotel());
        }
        System.out.print("Enter: ");
        var foundHotels = hotelORM.rawQueryList("id=" + validInt());
        if (foundHotels.size() > 0 && delete(foundHotels.get(0).getId())) {

            System.out.println("-\nHotel " + foundHotels.get(0).getHotel() + " deleted");
        } else
            System.out.println("Hotel not found");
    }
    private static void addCommentToHotels(String comt, int id){
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost", "root", "");
        var stmt = conn.createStatement();) {
        stmt.executeUpdate("use "+DB);
        ResultSet rs= stmt.executeQuery("SELECT*FROM Information_Schema.Columns WHERE Table_Schema='"+DB+"' AND Table_Name='hotels' AND Column_Name='comment'");
        if(!rs.next()){
            stmt.executeUpdate("ALTER TABLE hotels ADD COLUMN comment varchar(250)");
        }
        stmt.executeUpdate("UPDATE hotels SET comment='"+comt+"' WHERE id="+id);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    private static String getComment(int id){
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost", "root", "");
        var stmt = conn.createStatement();) {
        stmt.executeUpdate("use "+DB);
        ResultSet rs=stmt.executeQuery("select comment from hotels where id="+id);
        if(rs.next()){
            return rs.getString("Comment");
        }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "";
    }

}