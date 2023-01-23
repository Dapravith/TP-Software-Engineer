package orms;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Scanner;

import models.Country;

public class CountryORM extends ORM<Country> {
    public CountryORM(){
        tableName = "countries";
    }
    @Override
    public ArrayList<Country> listAll() {
        ArrayList<Country> ar = new ArrayList<>();
        try(var stmt = connection.createStatement()){
            ResultSet rs = stmt.executeQuery("SELECT * FROM "+tableName);
            while(rs.next()){
                ar.add(new Country(rs.getInt("id"),
                     rs.getString(2)));
            }
        }catch(SQLException e){
            e.printStackTrace();
        }
        return ar;
    }
    @Override
    public Country add(Country t) {
        try(var stmt = connection.prepareStatement("INSERT INTO "+tableName
            +" VALUES(NULL,?)", Statement.RETURN_GENERATED_KEYS)){
            stmt.setString(1, t.getCountry());
            stmt.execute();
            var rs = stmt.getGeneratedKeys();
            if(rs.next()) t.setId(rs.getInt(1));
        }catch(SQLException e){
            e.printStackTrace();
        }
        return t;
    }

    @Override
    public boolean delete(int id){
        try(var stmt = connection.createStatement()){
            var sql = "DELETE FROM "+tableName+" WHERE id = '"+id+"'";
            stmt.executeUpdate(sql);
            return true;
        }catch(SQLException e){
            e.printStackTrace();
            return false;
        }
    }
    @Override
    public void update(Country c){
        try(var stmt = connection.createStatement()){
            var sql = "UPDATE "+tableName+" set country = '"+c.getCountry()+"' WHERE id = '"+c.getId()+"'";
            stmt.executeQuery(sql);
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
    @Override
    public ArrayList<Country> rawQueryList(String query){
        try(var stmt = connection.createStatement()){
            ArrayList<Country> c = new ArrayList<>();
            String[] str = query.split(" ");
            if(str[0].equals("SELECT")){
                ResultSet rs = stmt.executeQuery(query);
                Country co = new Country();
                while(rs.next()){
                    c.add(co = new Country(rs.getInt("id"), rs.getString("country")));
                }
            }else{System.out.println("Can only SELECT !!!");}
            return c;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        CountryORM orm = new CountryORM();
        var country = new Country(0,"Laos");
        orm.add(country);
        System.out.println("New added country id: "+country.getId());
        ArrayList<Country> c = new ArrayList<>();
        c=orm.rawQueryList("SELECT * FROM countries");
        for(int i=0; i<c.size(); i++){
                System.out.println("Id: "+c.get(i).getId()
                    +", Name: "+c.get(i).getCountry());
        }
        System.out.print("Remove a row by id : ");int id = sc.nextInt();
        orm.delete(id);
    }
}
