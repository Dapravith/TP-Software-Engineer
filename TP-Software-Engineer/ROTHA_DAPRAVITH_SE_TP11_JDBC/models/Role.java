package models;

import exceptions.InvalidRoleException;

public class Role{
    private int id;
    private String role;

    public Role(){}
    public Role(int id){this.id = id;}
    public Role(int id, String role) {
        this.id = id;
        this.role = role;
    }

    public String getRole() {
        return role;
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setRole(String role) {
        if(role==null || role.isBlank()) throw new InvalidRoleException();
        this.role = role;
    }
}
