package models;

public class Hotel{
    private int id;
    private String hotel;
    private Country country;
    private City city;
    private int stars;
    private double cost;
    private String info;

    public Hotel(){}
    public Hotel(int id){
        this.id = id;
    }
    public Hotel(int id, String hotel, Country country, City city, int i, double cost, String info) {
        this.id = id;
        this.hotel = hotel;
        this.country = country;
        this.city = city;
        this.stars = i;
        this.cost = cost;
        this.info = info;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getHotel() {
        return hotel;
    }
    public void setHotel(String hotel) {
        this.hotel = hotel;
    }
    public Country getCountry() {
        return country;
    }
    public void setCountry(Country country) {
        this.country = country;
    }
    public City getCity() {
        return city;
    }
    public void setCity(City city) {
        this.city = city;
    }
    public int getStars() {
        return stars;
    }
    public void setStars(short stars) {
        if(stars>=0 && stars<=5)
            this.stars = stars;
    }
    public double getCost() {
        return cost;
    }
    public void setCost(double cost) {
        this.cost = cost;
    }
    public String getInfo() {
        return info;
    }
    public void setInfo(String info) {
        this.info = info;
    }
    
}
