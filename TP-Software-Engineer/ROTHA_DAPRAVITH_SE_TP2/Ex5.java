import java.util.Scanner;

public class Ex5 {
    public Scanner sc = new Scanner(System.in);
    private int number;
    public void readNumber(){
        System.out.println("number as integer");
        System.out.println("Prgram for guessing your luckiness");
        System.out.print("Please input a positive number: ");
        number = sc.nextInt();
    }
    public void checkNumber(){
        while (true) {
            if(number>0){
                number = number+1;
                break;
            }else{
                readNumber();
                System.out.println("\n"+number+"is not positive. Please try again!");
            }
        }
    }
    public void displayLuckyNumber(){
        System.out.println("\nI got "+number+". I am luckier.");
    }
    public static void main(String[] args) {
        Ex5 game = new Ex5();
        game.readNumber();
        game.checkNumber();
        game.displayLuckyNumber();
    }
}