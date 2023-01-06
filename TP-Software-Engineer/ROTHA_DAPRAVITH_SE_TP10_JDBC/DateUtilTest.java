
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

public class DateUtilTest {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd");

        while (true) {
            DateUtil dates = new DateUtil();
            System.out.println("""
                ========================= MENU =======================================\n
                1. Find the day difference between 2 dates by subtract date\n
                2. Increasing the date by a certain number of days by increment date\n
                3. Quit\n
                =======================================================================
            """);
            System.out.print("Enter your option: ");
            int op = sc.nextInt();
            if (op == 1){
                System.out.println("\nInput date start data.");
                dates.inputDate_start();
                System.out.println("\nInput date end data.");
                dates.inputDate_end();
                System.out.print("\n");
                dates.subtractDate();
                dates.setOperation_type("Subtraction");
                System.out.println("The day difference between " + DateFormat.format(dates.getDate_start()) + " and " + DateFormat.format(dates.getDate_end()) + " is " + dates.getN_days() + " days.");
                dates.log_date();
            }
            else if (op == 2) {
                System.out.print("\n");
                dates.inputDate_start();
                System.out.print("\nInput amount of days to increase: ");
                int day = sc.nextInt();
                dates.setN_days(day);
                dates.increaseDate();
                dates.setOperation_type("Increment");
                System.out.println("\n" + dates.getN_days() + " days after " + DateFormat.format(dates.getDate_start()) + " is " + DateFormat.format(dates.getDate_end()));
                dates.log_date();
            }
            else {
                break;
            }
        }        
    }
}

