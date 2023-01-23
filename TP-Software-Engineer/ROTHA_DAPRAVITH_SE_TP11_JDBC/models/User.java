package models;

public class User {
    private int id;
    private String username,pass,email;
    private Role role;
    private short discount;
    private String avatar;

    public User(){}
    public User(int id, String username, String pass, String email, Role role, short discount, String avatar) {
        this.id = id;
        this.username = username;
        this.pass = pass;
        this.email = email;
        this.role = role;
        this.discount = discount;
        this.avatar = avatar;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPass() {
        return pass;
    }
    public void setPass(String pass) {
        this.pass = pass;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public short getDiscount() {
        return discount;
    }
    public void setDiscount(short discount) {
        this.discount = discount;
    }
    public String getAvatar() {
        return avatar;
    }
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
    
}
