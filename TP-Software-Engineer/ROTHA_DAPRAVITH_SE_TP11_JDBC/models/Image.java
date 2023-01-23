package models;

public class Image{
    private int id;
    private Hotel hotel;
    private String imagepath;
    public Image(){}
    public Image(int id, Hotel hotel, String imagepath) {
        this.id = id;
        this.hotel = hotel;
        this.imagepath = imagepath;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public Hotel getHotel() {
        return hotel;
    }
    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }
    public String getImagepath() {
        return imagepath;
    }
    public void setImagepath(String imagepath) {
        this.imagepath = imagepath;
    }
    
}
