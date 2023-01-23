package orms;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Scanner;

import models.Role;

public class RoleORM extends ORM<Role>{
    public RoleORM(){
        tableName = "roles";
    }
    @Override
    public ArrayList<Role>listAll(){
        try(var stmt = connection.createStatement()){
            ArrayList<Role> r = new ArrayList<>();
            var sql = "SELECT * FROM "+tableName;
            ResultSet rs = stmt.executeQuery(sql);
            Role role = new Role();
            while(rs.next()){
                r.add(role = new Role(rs.getInt("id"),rs.getString("role")));
            }
            return r;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    @Override
    public Role add(Role r){
        try(var stmt = connection.createStatement()){
            var sql = "INSERT INTO "+tableName+" (role) VALUES ('"+r.getRole()+"')";
            stmt.executeUpdate(sql, Statement.RETURN_GENERATED_KEYS);
            var rs = stmt.getGeneratedKeys();
            rs.next();
            r.setId(rs.getInt(1));
            return r;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
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
    public void update(Role r){
        try(var stmt = connection.createStatement()){
            var sql = "UPDATE "+tableName+" set role = '"+r.getRole()+"' WHERE id = '"+r.getId()+"'";
            stmt.executeUpdate(sql);
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
    @Override
    public ArrayList<Role> rawQueryList(String query){
        try(var stmt = connection.createStatement()){
            ArrayList<Role> r = new ArrayList<>();
            String[] str = query.split(" ");
            if(str[0].equals("SELECT")){
                ResultSet rs = stmt.executeQuery(query);
                Role role = new Role();
                while(rs.next()){
                    r.add(role = new Role(rs.getInt("id"), rs.getString("role")));
                }
            }else{
                System.out.println("Can only SELECT !!!");
            }
            return r;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        RoleORM orm = new RoleORM();
        ArrayList<Role> role = new ArrayList<>();
        Role r1 = new Role(1, "Admin");
        orm.add(r1);
        orm.update(r1 = new Role(3,"Customer"));
        Role r2 = new Role(2, "Customer");
        orm.add(r2);
        orm.update(r1 = new Role(2,"Customer"));
        role = orm.rawQueryList("SELECT * FROM roles");
        for(int i=0; i<role.size(); i++){
            System.out.println("ID : "+role.get(i).getId()+"\nROLE : "+role.get(i).getRole()+"\n");
        }
        
        System.out.print("Remove a row by id : ");int id = sc.nextInt();
        orm.delete(id);
    }
}
