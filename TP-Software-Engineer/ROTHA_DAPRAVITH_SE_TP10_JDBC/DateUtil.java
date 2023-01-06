import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.Scanner;

public class DateUtil {
    private final String connectionString = "jdbc:mysql://localhost:3306/times?user=root";

    private int ID;
    private Date date_start;
    private Date date_end;
    private int n_days;
    private String operation_type;
    private String changed_date;


    public DateUtil() {
        this.ID = 0;
        this.date_start = new Date();
        this.date_end = new Date();
        this.n_days = 0;
        this.operation_type = "";
        this.changed_date = "";
    }

    public int getID () {
        return this.ID;
    }

    public void setID (int ID) {
        this.ID = ID;
    }

    public Date getDate_start() {
        return this.date_start;
    }

    public void inputDate_start() {
        Scanner sc = new Scanner(System.in);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        while (true) {
            System.out.print("Input date (yyyy-MM-dd):");
            try {
                date_start = format.parse(sc.nextLine());
                break;
            } catch (ParseException e) {
                System.out.println("Invalid date format.");
            }
        }
    }

    public void setDate_start(Date date_start) {
        this.date_start = date_start;
    }

    public Date getDate_end() {
        return this.date_end;
    }

    public void inputDate_end() {
        Scanner sc = new Scanner(System.in);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        while (true) {
            System.out.print("Input date (yyyy-MM-dd):");
            try {
                date_end = format.parse(sc.nextLine());
                break;
            } catch (ParseException e) {
                System.out.println("Invalid date format.");
            }
        }
    }

    public void setDate_end(Date date_end) {
        this.date_end = date_end;
    }

    public int getN_days() {
        return this.n_days;
    }

    public void setN_days(int n_days) {
        this.n_days = n_days;
    }

    public String getOperation_type () {
        return this.operation_type;
    }

    public void setOperation_type (String operation_type) {
        this.operation_type = operation_type;
    }

    public String getChanged_date () {
        return this.changed_date;
    }

    public void setChanged_date (String changed_date) {
        this.changed_date = changed_date;
    }

    public void subtractDate(){
        Calendar d1 = Calendar.getInstance();
        Calendar d2 = Calendar.getInstance();
        d1.setTime(date_start);
        d2.setTime(date_end);
        int daysBetween = (int) ChronoUnit.DAYS.between(d1.toInstant(), d2.toInstant());
        if (daysBetween < 0){
            n_days = daysBetween * (-1);
        }
        else{
            n_days = daysBetween;
        }
    }

    public void increaseDate() {
        Calendar d = Calendar.getInstance();
        d.setTime(date_start);
        d.add(Calendar.DAY_OF_MONTH, n_days);
        date_end = d.getTime();
    }

    public void display () {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        System.out.printf("%5s %15s %15s %10s %20s %30s\n", ""+ID, dateFormat.format(date_start), dateFormat.format(date_end), ""+n_days, operation_type, changed_date);
    }

    public void log_date () {
        try(Connection conn = DriverManager.getConnection(connectionString)){
            SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd");
            var sql = """
                CREATE TABLE IF NOT EXISTS date_history (
                    ID Integer not null auto_increment primary key,
                    date_start DATE,
                    date_end DATE,
                    n_days INTEGER,
                    operation_type VARCHAR(30),
                    changed_date DATETIME
                );
                    """;
            var stmt = conn.createStatement();
            System.out.println(stmt.executeUpdate(sql));
 
            //insert
            sql = "INSERT INTO date_history(date_start, date_end, n_days, operation_type, changed_date) VALUES( " + 
                    "'" + DateFormat.format(date_start) + "', " +
                    "'" + DateFormat.format(date_end) + "', " +
                    n_days + ", " +
                    "'" + operation_type + "', " +
                    "NOW());";
            stmt.executeUpdate(sql);
            stmt.close();
        }catch(SQLException e){
            System.out.println("Invalid insert into date");
            e.printStackTrace();
        }
    }
}
