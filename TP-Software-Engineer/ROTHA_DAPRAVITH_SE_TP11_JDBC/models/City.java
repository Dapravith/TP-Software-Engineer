package models;

public class City{
    private int id;
    private String city;
    private Country country;
    private String ucity;

    
    public City(){}
    public City(int id){
        this.id = id;
    }
    public City(int id, String city, Country country, String ucity) {
        this.id = id;
        this.city = city;
        this.country = country;
        this.ucity = ucity;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
        this.ucity = city+"_";
        if(this.country != null) this.ucity += country.getId();
    }
    public Country getCountry() {
        return country;
    }
    public String getUcity() {
        return ucity;
    }
    public void setUcity(String ucity) {
        this.ucity = ucity;
    }
}
