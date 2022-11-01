import java.util.Scanner;

public class TP03_3_CallingCost {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Program for calculating cost of a call.");
        System.out.println("Please input start hours: ");
        int hs = sc.nextInt(); //start hours 
        System.out.println("Please input start minutes: ");
        int ms = sc.nextInt(); //start minutes
        System.out.println("Please input start seconds: ");
        int ss = sc.nextInt(); //start seconds

        System.out.println("Please input end hours:  ");
        int he = sc.nextInt(); //end hours
        System.out.println("Please input end minutes:  ");
        int me = sc.nextInt(); //end minutes
        System.out.println("Please input end seconds:  ");
        int se = sc.nextInt(); //end seconds


        int h = he - hs;
        int m = me - ms;
        int s = se - ss;

        int seconds = (h*3600) + (m*60) + s;
        
        int hours = seconds / 3600;
        int minutes = (seconds % 3600) / 60;
        int sec = (seconds % 60) % 60;

        float cost = (float) (seconds*(0.05/60));

        System.out.println("Total call duration: " + hours + "h " + minutes + "mn " + seconds + "s");
        System.out.printf("Total cost of this call: %.4f$", cost);
    }
}
