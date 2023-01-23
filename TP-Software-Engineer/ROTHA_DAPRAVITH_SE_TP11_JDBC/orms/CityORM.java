package orms;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;

import com.mysql.cj.x.protobuf.MysqlxDatatypes.Array;

import models.City;
import models.Country;

public class CityORM extends ORM<City>{
    public CityORM(){
        tableName = "cities";
    }

    @Override
    public ArrayList<City> listAll(){
        try(var stmt = connection.createStatement()){
            ArrayList<City> ct = new ArrayList<>();
            ArrayList<Country> c= new ArrayList<>();
            CountryORM co = new CountryORM();
            c = co.listAll();
            var sql = "SELECT * FROM "+tableName;
            ResultSet rs = stmt.executeQuery(sql);
            City city = new City();
            Country country = new Country();
            while(rs.next()){
                for(int i=0; i<c.size(); i++){
                    if(c.get(i).getId() == rs.getInt("countryid")){
                        ct.add(city = new City(rs.getInt("id"), rs.getString("city"),
                        country = new Country(c.get(i).getId(), c.get(i).getCountry()), rs.getString("ucity")));
                    }
                }
            }
            return ct;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public City add(City t){
        try(var stmt = connection.createStatement()){
            System.out.println(t.getCountry().getId());
            var sql = "INSERT INTO "+tableName+" (city,countryid,ucity) VALUES ('"+t.getCity()+"',"+t.getCountry().getId()+",CONCAT(city,CONCAT('_',countryid)))";
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
    public void update(City t){
        try(var stmt = connection.createStatement()){
            var sql = "UPDATE "+tableName+" set id = '"+t.getId()+"' WHERE id = '"+t.getId()+"'";
            if(t.getCity()!=null){
                sql = "UPDATE "+tableName+" set city = '"+t.getCity()+"' WHERE id = '"+t.getId()+"'";
                stmt.executeQuery(sql);
            }else if(t.getCountry()!=null){
                sql = "UPDATE "+tableName+" set countryid = '"+t.getCountry().getId()+"' WHERE id = '"+t.getId()+"'";
                stmt.executeQuery(sql);
            }else if(!t.getCity().equals("null")){
                sql = "UPDATE "+tableName+" set ucity = '"+t.getUcity()+"' WHERE id = '"+t.getId()+"'";
                stmt.executeQuery(sql);
            }
        }catch(SQLException e) {
            e.printStackTrace();
        }
    }
    @Override
    public ArrayList<City> rawQueryList(String query){
        try(var stmt = connection.createStatement()){
            ArrayList<City> ct = new ArrayList<>();
            ArrayList<Country> c= new ArrayList<>();
            CountryORM co = new CountryORM();
            c = co.listAll();
            String[] str = query.split(" ");
            if(str[0].equals("SELECT")){
                ResultSet rs = stmt.executeQuery(query);
                City city = new City();
                Country country = new Country();
                while(rs.next()){
                    for(int i=0; i<c.size(); i++){
                        if(c.get(i).getId() == rs.getInt("countryid")){
                            ct.add(city = new City(rs.getInt("id"), rs.getString("city"),
                            country = new Country(c.get(i).getId(), c.get(i).getCountry()), rs.getString("ucity")));
                        }
                    }
                }
            }else{
                System.out.println("Can only SELECT !!!");
            }
            return ct;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        CityORM cityorm = new CityORM();
        Country country = new Country();
        City city = new City();
        ArrayList<City> citylist = new ArrayList<>();
        // cityorm.add(city = new City(0,"VeangChan", country = new Country(2, "Laos"),""));
        citylist = cityorm.listAll();
        citylist = cityorm.rawQueryList("SELECT * FROM cities");
        for(int i=0; i<citylist.size(); i++){
            System.out.println("Id: "+citylist.get(i).getId()
                +", Name: "+citylist.get(i).getUcity());
        }
        int id;
        System.out.print("Remove a row by id : ");id = sc.nextInt();
        cityorm.delete(id);
    }

}
