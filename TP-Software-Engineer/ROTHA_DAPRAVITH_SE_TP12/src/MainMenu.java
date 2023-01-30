import java.sql.SQLException;

import TP12SubClass.*;
import models.User;
import orms.RoleORM;
import orms.UserORM;
import utils.DbManager;

public class MainMenu {
    public static void main(String[] args) throws SQLException {
        GeneralNeededMethod.create_database(GeneralNeededMethod.DB);
        System.out.println();
        boolean userAcc=false;//just use to change menu;
        //userName="root"
        //password=""
        //root is only one who can do everything other user without admin role will be restricted to insert, delete and update
        int opt=0;
        do{

            System.out.println("""
            ========================
            **** Main Menu APP ****
            ========================

            1. Hotel listing
            2. Country listing
            3. City listing 
            4. Image listing
            5. Users listing 
            6. Role listing""");
            System.out.print((userAcc?"7. Logout":"7. Login")+ "\n0. Exit app\n\n");

            System.out.print("Choose an option in Menu APP: ");
            opt=GeneralNeededMethod.validInt();
            System.out.println("-");
            switch (opt){
                case 0:break;
                case 1:
                    HotelListing.main(args);
                    break;
                case 2:
                    CountryListing.main(args);
                    break;
                case 3:
                    CityListing.main(args);
                    break;
                case 4:
                    ImageListing.main(args);
                    break;
                case 5:
                    UserListing.main(args);
                    break;
                case 6:
                    RoleListing.main(args);
                    break;
                case 7:
                    if(userAcc){
                        GeneralNeededMethod.superUser=false; 
                        userAcc=false;
                        System.out.println("=========================");
                        System.out.println(">>>>>>>-Logged out->>>>>>");
                        System.out.println("=========================");
                        System.out.println("Account has been Logged out !\nPress enter to continue...");
                        GeneralNeededMethod.sc.nextLine();
                        break;
                    }

                    System.out.print("Username: ");
                    String userName=GeneralNeededMethod.sc.nextLine();
                    System.out.print("Password: ");
                    String pswd=GeneralNeededMethod.sc.nextLine();
                    if(verifyUser(userName, pswd)){
                        System.out.println("=====================================");
                        System.out.println("<<<<<<-Logged in as "+userName+"->>>>>>");
                        System.out.println("=====================================");
                        userAcc=true;
                    }else System.out.println("=> Username or password incorrect Please try again !!");
                             System.out.println("Account Logged in Successfully!!!\nPress enter to continue...");
                            GeneralNeededMethod.sc.nextLine();
                    break;
                default: System.out.println("Invalid option!! Choose any available option in Menu app!");
            }

        }while(opt!=0);

        GeneralNeededMethod.sc.close();
    }

    private static boolean verifyUser(String userName, String pswd) throws SQLException{
        DbManager.getInstance(GeneralNeededMethod.DB, "root", null);
        UserORM userORM=new UserORM();
        models.User u=new User(0, userName, null, null, null, null, null);
        u.setPass(pswd);
        var foundUser =userORM.rawQueryList("username='"+u.getUsername()+
                                        "' AND pass='"+u.getPass()+"'");

                                        
        if(pswd.equals("")&& userName.equals("root")){
            GeneralNeededMethod.superUser=true;
            return true; // logged in as root 
        }
        
        
        if(foundUser.size()>0){
            RoleORM roleORM =new RoleORM();
            var checkRole=roleORM.rawQueryList("id="+u.getId() +" AND role='Admin'"); // logged in as admin
            if(checkRole.size()>0) GeneralNeededMethod.superUser=true;
            return true;
        }
        return false;
    }
}