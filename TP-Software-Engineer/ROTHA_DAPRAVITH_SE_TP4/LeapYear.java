//ex07 program for find leap year or not
import java.util.Scanner;

public class LeapYear {

    int year;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Input the year to see whether it is a leap year or not: ");
        new LeapYear(Integer.parseInt(sc.nextLine()));
    }
    public LeapYear(int years) {
        year = years;
        if (lapYear()) {
            System.out.print(years + " is a leap year.");
        } else {
            System.out.print(years + " is not a leap year.");
        }
    }

    public boolean lapYear() {
        boolean status;
        if (year % 4 == 0 || year % 400 == 0) {
            status = (year % 100 != 0) ? true : false;
        } else {
            status = false;
        }
        return status;
    }
}
