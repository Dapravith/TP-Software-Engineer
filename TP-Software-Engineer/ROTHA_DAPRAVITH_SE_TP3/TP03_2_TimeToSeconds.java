import java.util.Scanner;

public class TP03_2_TimeToSeconds {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Program for converting time to seconds.");

        int hour;
        int minutes;
        int seconds;

        System.out.println("Please input hours: ");
        hour = sc.nextInt();
        System.out.println("Please input minutes: ");
        minutes = sc.nextInt();
        System.out.println("Please input seconds: ");
        seconds = sc.nextInt();
        int result = hour*(3600) + minutes*(60) + seconds;

        System.out.println("Number of seconds = " + hour + " x 3600 " + minutes + " x 60" + seconds + " = " + result);

    }
}
