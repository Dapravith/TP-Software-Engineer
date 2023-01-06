
import java.sql.Connection;
import java.util.Date;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class ChangesLog {
    private final String connectionString = "jdbc:mysql://localhost:3306/times?user=root";

    @Override
    public String toString () {
        String last5records = "";
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try(Connection conn = DriverManager.getConnection(connectionString)){

            //get data
            String sql = "(SELECT * FROM date_history ORDER BY ID DESC LIMIT 5) ORDER BY ID ASC;";
            var stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            
            //display
            while(rs.next()){
                last5records += rs.getInt(1) + "   " + dateFormat.format(rs.getDate(2)) + "   " + dateFormat.format(rs.getDate(3)) + "   " + rs.getInt(4) + "   " + rs.getString(5) + "   " + rs.getString(6) + "\n";
            }
        }catch(SQLException e){
            System.out.println("Invalid display !!");
            e.printStackTrace();
        }
        return last5records;
    }

    public void getChangesByDate (Date searchDate) {
        try(Connection conn = DriverManager.getConnection(connectionString)){
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            DateUtil d = new DateUtil();

            //get data
            String sql = "SELECT * FROM date_history WHERE changed_date LIKE '" + dateFormat.format(searchDate) + "%'";
            var stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            
            //display
        System.out.printf("%5s %15s %15s %10s %20s %30s\n", "ID", "date start", "date end ", "n days", "operation type", "changed date   ");
            while(rs.next()){
                d.setID(rs.getInt(1));
                d.setDate_start(rs.getDate(2));
                d.setDate_end(rs.getDate(3));
                d.setN_days(rs.getInt(4));
                d.setOperation_type(rs.getString(5));
                d.setChanged_date(rs.getString(6));
                d.display();
            }
        }catch(SQLException e){
            System.out.println("Invalid display !!");
            e.printStackTrace();
        }  
    }

    public void getChangesByWeek (Date searchDate) {
        try(Connection conn = DriverManager.getConnection(connectionString)){
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            DateUtil d = new DateUtil();

            //get data
            String sql = "SELECT * FROM date_history " + 
                         "WHERE  YEARWEEK(`changed_date`, 1) = YEARWEEK('" + dateFormat.format(searchDate) + "', 1);";
            var stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            
            //display
        System.out.printf("%5s %15s %15s %10s %20s %30s\n", "ID", "date start", "date end ", "n days", "operation type", "changed date   ");
            while(rs.next()){
                d.setID(rs.getInt(1));
                d.setDate_start(rs.getDate(2));
                d.setDate_end(rs.getDate(3));
                d.setN_days(rs.getInt(4));
                d.setOperation_type(rs.getString(5));
                d.setChanged_date(rs.getString(6));
                d.display();
            }
        }catch(SQLException e){
            System.out.println("Invalid result !!");
            e.printStackTrace();
        }  
    }

    public void getChangesBetweenDates (Date searchDateStart, Date searchDateEnd) {
        try(Connection conn = DriverManager.getConnection(connectionString)){
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            DateUtil d = new DateUtil();

            //get data
            String sql = "SELECT * " +
                         "FROM date_history " + 
                         "WHERE changed_date >= '" + dateFormat.format(searchDateStart) + "' " + 
                            "AND changed_date <= '" + dateFormat.format(searchDateEnd) + "'";
            var stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            
            //display
        System.out.printf("%5s %15s %15s %10s %20s %30s\n", "ID", "date start", "date end ", "n days", "operation type", "changed date   ");
            while(rs.next()){
                d.setID(rs.getInt(1));
                d.setDate_start(rs.getDate(2));
                d.setDate_end(rs.getDate(3));
                d.setN_days(rs.getInt(4));
                d.setOperation_type(rs.getString(5));
                d.setChanged_date(rs.getString(6));
                d.display();
            }
        }catch(SQLException e){
            System.out.println("Invalid display !!");
            e.printStackTrace();
        }  
    }

    public void getAllChanges () {
        try(Connection conn = DriverManager.getConnection(connectionString)){
            DateUtil d = new DateUtil();

            //get data
            String sql = "SELECT * FROM date_history";
            var stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            
            //display
        System.out.printf("%5s %15s %15s %10s %20s %30s\n", "ID", "date start", "date end ", "n days", "operation type", "changed date   ");
        System.out.println("\n=======================================================================================================================\n");
            while(rs.next()){
                d.setID(rs.getInt(1));
                d.setDate_start(rs.getDate(2));
                d.setDate_end(rs.getDate(3));
                d.setN_days(rs.getInt(4));
                d.setOperation_type(rs.getString(5));
                d.setChanged_date(rs.getString(6));
                d.display();
            }
        }catch(SQLException e){
            System.out.println("Invalid display");
            e.printStackTrace();
        }  
    }

    public static void main(String[] args) {
        ChangesLog ch = new ChangesLog();
        System.out.println(ch.toString());
    }
}
