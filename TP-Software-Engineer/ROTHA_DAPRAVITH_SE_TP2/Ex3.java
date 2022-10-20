import java.util.Scanner;
public class Ex3 {
   private static double x;
   private static double y;
   private static double z;
   static Scanner sc = new Scanner(System.in);
   public static void readYZ(){
    System.out.println("Program for calculating equation 1/x = 1/y + 1/z");
    System.out.println("Please input y:  ");
    y = sc.nextDouble();
    System.out.println("Please input z:  ");
    z = sc.nextDouble();
   }
   public static void displayResult(){
    x = (y*z)/(z+y);
    System.out.println("Result x = "+x);
   }
   public static void main(String[] args) {
    readYZ();
    displayResult();
   }
}
