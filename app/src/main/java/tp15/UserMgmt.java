package tp15;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class UserMgmt {

  public Connection openConnection() {
    try {
      return DriverManager.getConnection("jdbc:mysql://localhost:3306/tp15_userdb",
          "root", null);
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return null;
  }

  public boolean hasUser(String username, String password) {
    Connection con = openConnection();
    if (con != null) {
      try (var stmt = con.prepareStatement(
          "Select count(*) from `users` where `username` like ? AND `password` = ?")) {
        stmt.setString(1, username);
        stmt.setString(2, password);
        var rs = stmt.executeQuery();
        if (rs.next() && rs.getInt(1) > 0) {
          return true;
        }
      } catch (SQLException e) {
        e.printStackTrace();
      }
      try {
        con.close();
      } catch (SQLException e) {
        e.printStackTrace();
      }
    }
    return false;
  }

  // to create table that fit in this project is in dbTable.txt
  

  public String insert(String username, String pw, String cfPw, String email) {
    Connection con = openConnection();
    if (con != null) {
      if (!pw.equals(cfPw)) {
        return "Sign Up successfully! <br> Make sure you input the same password!";
      } else {
        try (var stmt = con.prepareStatement("INSERT INTO `users` VALUES(NULL,?,?,?)",
            Statement.RETURN_GENERATED_KEYS)) {
          stmt.setString(1, username);
          stmt.setString(2, pw);
          stmt.setString(3, email);
          stmt.execute();
          return "Sign Up successfully!";
        } catch (SQLException e) {
          e.printStackTrace();
          System.out.println(e.getMessage());
        }
      }
    }
    return "Sorry, Something Wrong!";
  }

}
