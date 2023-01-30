package TP12SubClass;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import models.City;
import orms.CityORM;
import orms.CountryORM;
import utils.DbManager;

public class CityListing extends GeneralNeededMethod{

    public static void main(String[] args) throws SQLException {
        create_database(DB);
        DbManager.getInstance(DB, "root", null);

        int opt;
        do{
            System.out.println("""
                    1. List all city
                    2. Add a new city
                    3. Delete city by ID
                    0. Exist city listing
                    """);
            System.out.print("Choose option: ");
            opt=validInt();

            switch (opt){
                case 0: break;
                case 1:
                    listAllCity();
                    break;
                case 2:
                    addNewCity();
                    break;
                case 3:
                    deleteCityByID();
                    break;
                default: {System.out.println("choose available option!!"); opt=4;};
            }

            if(opt!=4){
                System.out.println("-\nPress enter to continue...");
                sc.nextLine();
            }
        }while(opt!=0);
    }

    private static void listCityIgnoreOtherInfo(){
        CityORM cityORM=new CityORM();
        var cities=cityORM.listAll();
            if(cities.size()==0) {System.out.println("-\nNo City to display in this country!"); return;}
            System.out.println("             -------- Cities ----------");
            System.out.printf("%-6s %-20s %-13s %s\n", "ID", "City", "CountryID", "UCity");
            for(var c : cities){
                System.out.printf("%-6d %-20s %-13s %s\n", c.getId(),c.getCity(), c.getCountry()==null?"Deleted":String.valueOf(c.getCountry().getId()),c.getUcity());       
        }
    }


    private static void listAllCity(){
        CityORM CityORM=new CityORM();
        //if no City
        if(CityORM.listAll().size()==0){System.out.println("-\nNo city to display!"); return;}

        CountryORM countryORM=new CountryORM();
        //if no country
        if(countryORM.listAll().size()==0){System.out.println("-\nNo country to select!"); return;}
        System.out.println("Please select country: ");

        for(var country : countryORM.listAll()){
            System.out.println(country.getId()+". " +country.getCountry());
        }
        System.out.print("(Enter 0 to display all cities)");
        System.out.print("\nEnter: ");
        int id=validInt();
        if(id==0){listCityIgnoreOtherInfo();return;};
        var foundCountries=countryORM.rawQueryList("id="+id);
        if(foundCountries.size()>0){            
            var cities=CityORM.rawQueryList("countryID="+foundCountries.get(0).getId());
            if(cities.size()==0) {System.out.println("-\nNo City to display in this country!"); return;}
            System.out.println("             -------- Cities ----------");
            System.out.printf("%-6s %-20s %-13s %s\n", "ID", "City", "CountryID", "UCity");
            for(var c : cities){
                System.out.printf("%-6d %-20s %-13d %s\n", c.getId(), c.getCity(), c.getCountry().getId(), c.getUcity());
            }
        }else System.out.println("Country not found!");
    }


    private static void addNewCity(){
        CountryORM countryORM=new CountryORM();
        //if no country
        if(countryORM.listAll().size()==0){System.out.println("-\nNo country to select!"); return;}
        System.out.println("Please select country: ");

        for(var country : countryORM.listAll()){
            System.out.println(country.getId()+". " +country.getCountry());
        }

        System.out.print("\nEnter ID: ");
        var foundCountries=countryORM.rawQueryList("id="+validInt());
        if(foundCountries.size()>0){
            CityORM CityORM=new CityORM();
            System.out.print("Enter City name: ");
            City city=new City(0, sc.nextLine(), foundCountries.get(0), null);
            if(city.getCity()==""){System.out.println(">>>City name can not be empty!");return;}
            CityORM.add(city);
            System.out.println("-\n-New City added, ID: "+city.getId());
        }else System.out.println("Country not found!");
    }

    
    // implement method to delete city
    private static boolean delete(int id) {
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost", "root", "");
                var stmt = conn.createStatement();) {
            stmt.executeUpdate("use "+DB);
            if(stmt.executeUpdate("delete from cities where id=" + id)!=0){
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private static void deleteCityByID(){
        CityORM CityORM=new CityORM();
        //when no City
        if(CityORM.listAll().size()==0){System.out.println("-\n>No city to delete!"); return;}

        for(var City : CityORM.listAll()){
            System.out.println(City.getId()+". "+ City.getCity());
        }

        System.out.print("\nEnter: ");
        var foundCities=CityORM.rawQueryList("id="+validInt());
        if(foundCities.size()>0 && delete(foundCities.get(0).getId())){
            System.out.println("City \""+ foundCities.get(0).getCity() +"\" deleted");
        }else System.out.println("City not found!");
    }

}
