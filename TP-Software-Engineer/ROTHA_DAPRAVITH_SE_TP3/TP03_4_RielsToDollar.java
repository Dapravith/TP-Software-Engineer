import java.util.Scanner;

public class TP03_4_RielsToDollar {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Program for converting money in Riels to Dollars.");
        System.out.println("Conversion rate is: 1 USD = 4000 RIELS");
        System.out.println("Please input money in Riels: ");
        int riel = sc.nextInt();

        float usd = (float) riel/4000;

        System.out.printf("%d RIELS = %.4f USD", riel, usd);
    }
}
