import java.util.Scanner;
public class Ex2 {
    private static double width;
    private static double height;
    static Scanner rtc = new Scanner(System.in);
    public static void readRectangle(){
        System.out.println("Program for calculating perimeter and surfacce of a Rectangle");
        System.out.print("Please input width (in meter): ");
        width   = rtc.nextDouble();
        System.out.print("Please input height (in meter): ");
        height  = rtc.nextDouble();
    }
    public static void displayRectangle(){
        double perimeter = (width+height) * 2;
        double surface = (width*height);
        System.out.println("Perimeter = ("+width+"+"+height+") x 2 = "+perimeter+" m");
        System.out.println("Surface = "+width+"+"+height+" = "+surface+" m^2");
    }
    public static void main(String[] args) {
        readRectangle();
        displayRectangle();
    }   
}
