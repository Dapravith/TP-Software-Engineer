package orms;

import models.Hotel;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;

import models.City;
import models.Country;
import models.Hotel;

public class HotelORM extends ORM<Hotel>{
    public HotelORM(){
        tableName = "hotels";
    }

    @Override
    public ArrayList<Hotel>listAll(){
        try(var stmt = connection.createStatement()){
            ArrayList<Hotel> hot = new ArrayList<>();
            ArrayList<Country> coun = new ArrayList<>();
            ArrayList<City> ct = new ArrayList<>();
            CountryORM co = new CountryORM();
            CityORM cto = new CityORM();
            Hotel hotel = new Hotel();
            Country country = new Country();
            City city = new City();
            coun = co.listAll();
            ct = cto.listAll();
            var sql = "SELECT * FROM "+tableName;
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()){
                for(int i=0; i<coun.size(); i++){
                    if(coun.get(i).getId() == rs.getInt("countryid")){
                        country = new Country(coun.get(i).getId());
                    }
                }
                for(int i=0; i<ct.size(); i++){
                    if(ct.get(i).getId() == rs.getInt("cityid")){
                        city = new City(ct.get(i).getId());
                    }
                }
                hot.add(hotel = new Hotel(rs.getInt("id"), rs.getString("hotel"), country, city, 
                rs.getInt("stars"), rs.getDouble("cost"), rs.getString("info")));
            }
            return hot;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Hotel add(Hotel t){
        try(var stmt = connection.createStatement()){
            System.out.println(t.getCountry().getId());
            var sql = "INSERT INTO "+tableName+" (hotel,countryid,cityid,stars,cost,info) VALUES ('"+t.getHotel()+"',"+t.getCountry().getId()+
            ","+t.getCity().getId()+","+t.getStars()+","+t.getCost()+",'"+t.getInfo()+"')";
            stmt.executeUpdate(sql);
            return t;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean delete(int id){
        try(var stmt = connection.createStatement()){
            var sql = "DELETE FROM "+tableName+" WHERE id = '"+id+"'";
            stmt.executeUpdate(sql);
            return true;
        }catch(SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void update(Hotel h){
        try(var stmt = connection.createStatement()){
            var sql = "UPDATE "+tableName+" set id = '"+h.getId()+"' WHERE id = '"+h.getId()+"'";
            if(h.getHotel()!=null){
                sql = "UPDATE "+tableName+" set hotel = '"+h.getHotel()+"' WHERE id = '"+h.getId()+"'";
                stmt.executeQuery(sql);
            }else if(h.getCountry()!=null){
                sql = "UPDATE "+tableName+" set countryid = '"+h.getCountry().getId()+"' WHERE id = '"+h.getId()+"'";
                stmt.executeQuery(sql);
            }else if(h.getCity()!=null){
                sql = "UPDATE "+tableName+" set cityid = '"+h.getCountry().getId()+"' WHERE id = '"+h.getId()+"'";
                stmt.executeQuery(sql);
            }else if(h.getHotel()!=null){
                sql = "UPDATE "+tableName+" set stars = '"+h.getStars()+"' WHERE id = '"+h.getId()+"'";
                stmt.executeQuery(sql);
            }else if(h.getHotel()!=null){
                sql = "UPDATE "+tableName+" set cost = '"+h.getCost()+"' WHERE id = '"+h.getId()+"'";
                stmt.executeQuery(sql);
            }else if(!h.getHotel().equals("null")){
                sql = "UPDATE "+tableName+" set info = '"+h.getInfo()+"' WHERE id = '"+h.getId()+"'";
                stmt.executeQuery(sql);
            }
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
    @Override
    public ArrayList<Hotel> rawQueryList(String query){
        try(var stmt = connection.createStatement()){
            ArrayList<Hotel> hot = new ArrayList<>();
            ArrayList<Country> coun = new ArrayList<>();
            ArrayList<City> ct = new ArrayList<>();
            CountryORM co = new CountryORM();
            CityORM cto = new CityORM();
            coun = co.listAll();
            ct = cto.listAll();
            String[] str = query.split(" ");
            if(str[0].equals("SELECT")){
                ResultSet rs = stmt.executeQuery(query);
                Hotel hotel = new Hotel();
                Country country = new Country();
                City city = new City();
                while(rs.next()){
                    for(int i=0; i<coun.size(); i++){
                        if(coun.get(i).getId() == rs.getInt("countryid")){
                            country = new Country(coun.get(i).getId(), coun.get(i).getCountry());
                        }
                    }
                    for(int i=0; i<ct.size(); i++){
                        if(ct.get(i).getId() == rs.getInt("cityid")){
                            city = new City(ct.get(i).getId(), ct.get(i).getCity(), country, ct.get(i).getUcity());
                        }
                    }
                    hot.add(hotel = new Hotel(rs.getInt("id"), rs.getString("hotel"), country, city, 
                    rs.getInt("stars"), rs.getDouble("cost"), rs.getString("info")));
                }
            }else{
                System.out.println("Can only SELECT !!!");
            }
            return hot;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        HotelORM hotelorm = new HotelORM();
        Country country = new Country();
        City city = new City();
        Hotel hotel = new Hotel();
        hotelorm.add(hotel = new Hotel(0, "Cruise", country = new Country(10), city = new City(8), 3, 100, "Good"));
        
        ArrayList<Hotel> hotellist = new ArrayList<>();
        hotellist = hotelorm.listAll();
        hotellist = hotelorm.rawQueryList("SELECT * FROM hotels");
        for(int i=0; i<hotellist.size(); i++){
            System.out.println("Id: "+hotellist.get(i).getId()
                +", Name: "+hotellist.get(i).getHotel()
                +", Stars: "+hotellist.get(i).getStars()
                +", Price: "+hotellist.get(i).getCost()+"$ "
                +", Info: "+hotellist.get(i).getInfo()+"\n");
        }
        System.out.print("Remove a row by id : "); int id = sc.nextInt();
        hotelorm.delete(id);
    }
}
