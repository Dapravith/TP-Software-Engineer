package orms;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;

import models.User;
import models.Role;

public class UserORM extends ORM<User>{
    public UserORM(){
        tableName = "users";
    }
    @Override
    public ArrayList<User>listAll(){
        try(var stmt = connection.createStatement()){
            ArrayList<User> u = new ArrayList<>();
            ArrayList<Role> r = new ArrayList<>();
            RoleORM ro = new RoleORM();
            r = ro.listAll();
            var sql = "SELECT * FROM "+tableName;
            ResultSet rs = stmt.executeQuery(sql);
            User user = new User();
            Role role = new Role();
            while(rs.next()){
                for(int i=0; i<r.size(); i++){
                    if(r.get(i).getId() == rs.getInt("roleid")){
                        u.add(user = new User(rs.getInt("id"), rs.getString("username"),rs.getString("pass"),
                        rs.getString("email"),role = new Role(r.get(i).getId()), rs.getShort("discount"),
                        rs.getString("avatar")));
                    }
                }
            }
            return u;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    @Override
    public User add(User u){
        try(var stmt = connection.createStatement()){
            System.out.println(u.getRole().getId());
            var sql = "INSERT INTO "+tableName+" (username,pass,email,roleid,discount,avatar) VALUES ('"+u.getUsername()+"','"+u.getPass()+"','"
            +u.getEmail()+"',"+u.getRole().getId()+","+u.getDiscount()+",'"+u.getAvatar()+"')";
            stmt.executeUpdate(sql);
            return u;
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
        }catch(SQLException e){
            e.printStackTrace();
            return false;
        }
    }
    @Override
    public void update(User u){
        try(var stmt = connection.createStatement()){
            var sql = "UPDATE "+tableName+" set id = '"+u.getRole()+"' WHERE id = "+u.getId();
            if(u.getUsername()!=null){
                sql = "UPDATE "+tableName+" set username = '"+u.getUsername()+"' WHERE id = "+u.getId();
                stmt.executeUpdate(sql);
            }else if(u.getPass()!=null){
                sql = "UPDATE "+tableName+" set pass = '"+u.getPass()+"' WHERE id = "+u.getId();
                stmt.executeUpdate(sql);
            }else if(u.getRole()!=null){
                sql = "UPDATE "+tableName+" set roleid = '"+u.getRole().getId()+"' WHERE id = "+u.getId();
                stmt.executeUpdate(sql);
            }else if(u.getDiscount()!=0){
                sql = "UPDATE "+tableName+" set discount = '"+u.getDiscount()+"' WHERE id = "+u.getId();
                stmt.executeUpdate(sql);
            }else if(u.getAvatar()!=null){
                sql = "UPDATE "+tableName+" set pass = '"+u.getPass()+"' WHERE id = "+u.getId();
                stmt.executeUpdate(sql);
            }
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
    @Override
    public ArrayList<User> rawQueryList(String query){
        try(var stmt = connection.createStatement()){
            ArrayList<User> u = new ArrayList<>();
            ArrayList<Role> r = new ArrayList<>();
            RoleORM ro = new RoleORM();
            r = ro.listAll();
            String[] str = query.split(" ");
            if(str[0].equals("SELECT")){
                ResultSet rs = stmt.executeQuery(query);
                User user = new User();
                Role role = new Role();
                while(rs.next()){
                    for(int i=0; i<r.size(); i++){
                        if(r.get(i).getId() == rs.getInt("roleid")){
                            u.add(user = new User(rs.getInt("id"), rs.getString("username"),rs.getString("pass"),
                            rs.getString("email"),role = new Role(r.get(i).getId()), rs.getShort("discount"),
                            rs.getString("avatar")));
                        }
                    }
                }
            }else{
                System.out.println("Can only SELECT !!!");
            }
            return u;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        UserORM orm = new UserORM();
        User user = new User();
        Role role = new Role();
        ArrayList<User> userList = new ArrayList<>();
         orm.add(user = new User(0, "Vith", "Vith1234346", "Vith@gmail.com", role = new  Role(1), (short) 20, "Vith.png"));
        userList = orm.rawQueryList("SELECT * FROM users");
        for(int i=0; i<userList.size(); i++){
            System.out.println("ID : "+userList.get(i).getId()+
            "\nUsername : "+userList.get(i).getUsername()+
            "\nPassword : "+userList.get(i).getPass()+
            "\nEmail : "+userList.get(i).getEmail()+
            "\nRoleid : "+userList.get(i).getRole().getId()+
            "\nDiscount : "+userList.get(i).getDiscount()+"%"+
            "\nAvatar : "+userList.get(i).getAvatar()+"\n");
        }
        System.out.print("Remove a row by id : "); int id = sc.nextInt();
        orm.delete(id);
    }
}
