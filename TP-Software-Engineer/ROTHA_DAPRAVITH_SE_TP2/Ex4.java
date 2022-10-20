import java.util.Scanner;

public class Ex4 {
    private static int number;
    private static int result;
    static Scanner src = new Scanner(System.in);
    public static void readNumber(){
        System.out.println("\n Count as integer");
        System.out.println("\n Program for counting the number of hundred");
        System.out.print("\n Please input positive number: ");
        number = src.nextInt();
    }
    public static void checkNumberCounter(){
        while(true){
            if(number>0 &&number>=100){
                result = number/100;
                break;   
            }else{
                if(number<0)System.out.println("\n"+number+" is not positive.Please try again!\n");
                else if (number<100)System.out.println("\n"+number+" under 100. Please try again\n");
                readNumber();
            }
        }
    }
    public static void displayResult(){
        System.out.println("There are "+result+" hundred in number "+number+".");
    }
    public static void main(String[] args) {
        readNumber();
        checkNumberCounter();
        displayResult();
    }
}