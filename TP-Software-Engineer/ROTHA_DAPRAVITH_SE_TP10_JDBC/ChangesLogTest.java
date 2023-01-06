import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Scanner;

public class ChangesLogTest {
    public static Date inputDate() {
        Scanner sc = new Scanner(System.in);
        Date date = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        while (true) {
            System.out.print("Input date (yyyy-MM-dd):");
            try {
                date = format.parse(sc.nextLine());
                return date;
            } catch (ParseException e) {
                System.out.println("Invalid date format.");
            }
        }
    }
    public static void main(String[] args) {
        ChangesLog logs = new ChangesLog();
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("""
                \n============= Menu ======================\n
                \n1. Returns a last 5 changes in date history
                \n2. Listing changes by date
                \n3. Listing changes by week
                \n4. Listing changes by date range
                \n5. List all changes
                \n6. Quit
                \n=========================================\n
            """);
            System.out.print("Enter your option: ");
            int op = sc.nextInt();
            if (op == 1) {
                System.out.println(logs.toString());
            }
            else if (op == 2) {
                System.out.println("Input date of changes !");
                Date searchDate = inputDate();
                logs.getChangesByDate(searchDate);
            }
            else if (op == 3) {
                System.out.println("Input a date in the week that you want the changes! ");
                Date dateOfWeek = inputDate();
                logs.getChangesByWeek(dateOfWeek);
            }
            else if (op == 4){
                System.out.println("Input date of changes from.");
                Date searchDateStart = inputDate();
                System.out.println("Input date of changes until.");
                Date searchDateEnd = inputDate();
                logs.getChangesBetweenDates(searchDateStart, searchDateEnd);
            }
            else if (op == 5) {
                logs.getAllChanges();
            }
            else{
                break;
            }
        }
    }
}
