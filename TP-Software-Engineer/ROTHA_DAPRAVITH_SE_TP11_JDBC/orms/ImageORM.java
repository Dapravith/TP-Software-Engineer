package orms;

import models.Image;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;

import models.Hotel;


public class ImageORM extends ORM<Image>{
    public ImageORM(){
        tableName = "images";
    }
    @Override
    public ArrayList<Image>listAll(){
        try(var stmt = connection.createStatement()){
            ArrayList<Image> img = new ArrayList<>();
            ArrayList<Hotel> hot = new ArrayList<>();
            HotelORM hotelORM = new HotelORM();
            hot = hotelORM.listAll();
            var sql = "SELECT * FROM images";
            ResultSet rs = stmt.executeQuery(sql);
            Hotel hotel = new Hotel();
            Image image = new Image();
            while(rs.next()){
                for(int i=0; i<hot.size(); i++){
                    if(hot.get(i).getId() == rs.getInt("id")){
                        img.add(image = new Image(rs.getInt("id"), hotel = new Hotel(hot.get(i).getId()), rs.getString("imagepath")));
                    }
                }
            }
            return img;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    @Override
    public Image add(Image img){
        try(var stmt = connection.createStatement()){
            System.out.println(img.getHotel().getId());
            var sql = "INSERT INTO "+tableName+" (hotelid,imagepath) VALUES ("+img.getHotel().getId()+",'"+img.getImagepath()+"')";
            stmt.executeUpdate(sql);
            return img;
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
    public void update(Image img){
        try(var stmt = connection.createStatement()){
            var sql = "UPDATE "+tableName+" set id = '"+img.getHotel()+"' WHERE id = '"+img.getId()+"'";
            if(img.getHotel()!=null){
                sql = "UPDATE "+tableName+" set hotelid = '"+img.getHotel().getId()+"' WHERE id = '"+img.getId()+"'";
                stmt.executeQuery(sql);
            }else if(!img.getImagepath().equals("null")){
                sql = "UPDATE "+tableName+" set imagepath = '"+img.getImagepath()+"' WHERE id = '"+img.getId()+"'";
                stmt.executeQuery(sql);
            }
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
    @Override
    public ArrayList<Image> rawQueryList(String query){
        try(var stmt = connection.createStatement()){
            ArrayList<Image> img = new ArrayList<>();
            ArrayList<Hotel> hot = new ArrayList<>();
            HotelORM hotelORM = new HotelORM();
            hot = hotelORM.listAll();
            String[] str = query.split(" ");
            if(str[0].equals("SELECT")){
                ResultSet rs = stmt.executeQuery(query);
                Image image = new Image();
                Hotel hotel = new Hotel();
                while(rs.next()){
                    for(int i=0; i<hot.size(); i++){
                        if(hot.get(i).getId() == rs.getInt("id")){
                            img.add(image = new Image(rs.getInt("id"), hotel = new Hotel(hot.get(i).getId()), rs.getString("imagepath")));
                        }
                    }
                }
            }else{
                System.out.println("Can only SELECT !!!");
            }
            return img;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ImageORM imgORM = new ImageORM();
        Hotel hotel = new Hotel();
        ArrayList<Image> img = new ArrayList<>();
        var Image = new Image(0, hotel = new Hotel(4), "ABC");
        imgORM.add(Image);
        img=imgORM.rawQueryList("SELECT * FROM images");
        for(int i=0; i<img.size(); i++){
                System.out.println("Id: "+img.get(i).getId()
                    +", Imagepath: "+img.get(i).getImagepath());
        }
        System.out.print("Remove a row by id : ");int id = sc.nextInt();
        imgORM.delete(id);
    }
}