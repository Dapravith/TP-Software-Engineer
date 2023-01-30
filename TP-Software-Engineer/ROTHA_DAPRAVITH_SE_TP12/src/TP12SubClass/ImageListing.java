package TP12SubClass;
import java.sql.*;

import models.City;
import models.Hotel;
import models.Image;
import orms.CityORM;
import orms.CountryORM;
import orms.HotelORM;
import orms.ImageORM;
import utils.DbManager;

public class ImageListing extends GeneralNeededMethod{
    
    
    public static void main(String[] args) throws SQLException {
        create_database(DB);
        DbManager.getInstance(DB, "root", null);
        int opt;
        do{
            System.out.println("""
                    1. List all images
                    2. Add a new image
                    3. Delete an image by ID
                    0. Exit image listing
                    """);
            System.out.print("Choose option: ");
            opt=validInt();

            switch (opt){
                case 0: break;
                case 1:
                    listAllImage();
                    break;
                case 2:
                    addNewImage();
                    break;
                case 3:
                    deleteImageByID();
                    break;
                default: {System.out.println("choose available option!!"); opt=4;};
            }
            if(opt!=4 ){
                System.out.println("-\nPress enter to continue...");
                sc.nextLine();
            }
        }while(opt!=0);
    }


    private static void listAllImage(){
        ImageORM imageORM=new ImageORM();
        //if no image
        if(imageORM.listAll().size()==0){System.out.println("-\nNo image to display");return;}

        HotelORM hotelORM=new HotelORM();
        //if no hotel
        if(hotelORM.listAll().size()==0){System.out.println("-\nNo hotel to select");return;}

        CityORM cityORM=new CityORM();
        //if no City
        if(cityORM.listAll().size()==0){System.out.println("-\nNo city to select!"); return;}

        CountryORM countryORM=new CountryORM();
        //if no country
        if(countryORM.listAll().size()==0){System.out.println("-\nNo country to select!"); return;}
        System.out.println("Please select country: ");

        for(var country : countryORM.listAll()){
            System.out.println(country.getId()+". " +country.getCountry());
        }

        System.out.print("\nEnter: ");
        var foundCountries=countryORM.rawQueryList("id="+validInt());
        if(foundCountries.size()>0){            
            var images=imageORM.rawQueryList("hotelid IN (SELECT id FROM hotels WHERE countryid ="+
                                                            foundCountries.get(0).getId()+")");
            //if no image in this country
            if(images.size()==0){System.out.println("-\nNo image to display in this country");return;}
            
            var hotels=hotelORM.rawQueryList("countryid="+foundCountries.get(0).getId());
            //if not hotel in city
            if(hotels.size()==0){System.out.println("-\nNo hotel to select in this country");return;}

            //if no city
            var cities=cityORM.rawQueryList("countryID="+foundCountries.get(0).getId());
            if(cities.size()==0) {System.out.println("-\nNo city to select in this country!"); return;}
            
            System.out.println("Please select a city: ");
            for (City c : cities) {
                System.out.println(c.getId() + ". " + c.getCity());
            }
            System.out.print("Enter: ");
            var foundCities = cityORM.rawQueryList("id=" + validInt() + " AND countryid=" + foundCountries.get(0).getId());
            if(foundCities.size()>0){
                images=imageORM.rawQueryList("hotelid in (SELECT id FROM hotels WHERE cityid="+foundCities.get(0).getId()+")");

                //if no image in this country
                if(images.size()==0){System.out.println("-\nNo image to display in this city");return;}

                hotels=hotelORM.rawQueryList("cityid="+foundCities.get(0).getId());
                //if not hotel in city
                if(hotels.size()==0){System.out.println("-\nNo hotel to select in this city");return;}
                
                System.out.println("Please select hotel");
                for(Hotel h: hotels){
                    System.out.println(h.getId()+". "+h.getHotel());
                }

                System.out.print("Enter: ");
               var foundHotels =hotelORM.rawQueryList("id="+validInt()+" AND cityid="+foundCities.get(0).getId()+
                                " AND countryid="+foundCountries.get(0).getId());
                if(foundHotels.size()>0){
                    images=imageORM.rawQueryList("hotelID=" + foundHotels.get(0).getId());
                     //if no image in this hotel
                    if(images.size()==0){System.out.println("-\nNo image to display in this hotel");return;}
                    
                    System.out.println("---------- Images ----------");
                    System.out.printf("%-6s %-12s %s\n", "ID", "HotelID", "ImagePath");
                    for(Image i: images){
                        System.out.printf("%-6d %-12d %s\n", i.getId(), i.getHotel().getId(), i.getImagePath());
                    }
                }
            }else System.out.println("City not fond");
        }else System.out.println("Country not found!");
    }


    private static void addNewImage(){

        HotelORM hotelORM=new HotelORM();
        //if no hotel
        if(hotelORM.listAll().size()==0){System.out.println("-\nNo hotel to select");return;}

        CityORM cityORM=new CityORM();
        //if no City
        if(cityORM.listAll().size()==0){System.out.println("-\nNo city to select!"); return;}

        CountryORM countryORM=new CountryORM();
        //if no country
        if(countryORM.listAll().size()==0){System.out.println("-\nNo country to select!"); return;}
        System.out.println("Please select country: ");

        for(var country : countryORM.listAll()){
            System.out.println(country.getId()+". " +country.getCountry());
        }

        System.out.print("\nEnter: ");
        var foundCountries=countryORM.rawQueryList("id="+validInt());
        if(foundCountries.size()>0){            
            var hotels=hotelORM.rawQueryList("countryid="+foundCountries.get(0).getId());
            //if no hotel in city
            if(hotels.size()==0){System.out.println("-\nNo hotel to select in this country");return;}

            //if no city
            var cities=cityORM.rawQueryList("countryID="+foundCountries.get(0).getId());
            if(cities.size()==0) {System.out.println("-\nNo city to select in this country!"); return;}
            
            System.out.println("Please select a city: ");
            for (City c : cities) {
                System.out.println(c.getId() + ". " + c.getCity());
            }
            System.out.print("Enter: ");
            var foundCities = cityORM.rawQueryList("id=" + validInt() + " AND countryid=" + foundCountries.get(0).getId());
            if(foundCities.size()>0){
                hotels=hotelORM.rawQueryList("cityid="+foundCities.get(0).getId());
                //if not hotel in city
                if(hotels.size()==0){System.out.println("-\nNo hotel to select in this city");return;}
                
                System.out.println("Please select hotel");
                for(Hotel h: hotels){
                    System.out.println(h.getId()+". "+h.getHotel());
                }

                System.out.print("Enter: ");
               var foundHotels =hotelORM.rawQueryList("id="+validInt()+" AND cityid="+foundCities.get(0).getId()+
                                " AND countryid="+foundCountries.get(0).getId());
                if(foundHotels.size()>0){
                    ImageORM imageORM=new ImageORM();
                    Image image=new Image(0, foundHotels.get(0), null);
                    System.out.print("Enter Image path: ");
                    image.setImagePath(sc.nextLine());
                    if(image.getImagePath().equals("")){System.out.println(">>>Image path can not be empty");return;}
                    imageORM.add(image);
                    System.out.println("-\n-New added image, ID: "+image.getId());
                }else System.out.println("Hotel not found");
            }else System.out.println("City not fond");
        }else System.out.println("Country not found!");
     }

    
    // as the delete method was not implemented yet so create a method to delete
    // Hotel by id
    private static boolean delete(int id) {
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost", "root", "");
                var stmt = conn.createStatement();) {
            stmt.executeUpdate("use "+DB);
            if(stmt.executeUpdate("delete from images where id=" + id)!=0){
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private static void deleteImageByID(){
        ImageORM ImageORM=new ImageORM();
        //if no Image
        if(ImageORM.listAll().size()==0){System.out.println("-\n>No Image to delete!"); return;}

        for(var i : ImageORM.listAll()){
            System.out.println( i.getId()+". "+ i.getImagePath());
        }

        System.out.print("Enter: ");
        var foundCountries=ImageORM.rawQueryList("id="+validInt());
        if(foundCountries.size()>0 && delete(foundCountries.get(0).getId())){
            System.out.println("-\nImage \""+ foundCountries.get(0).getImagePath() +"\" deleted");
        }else System.out.println("Image not found");
    }
    
}
