//ex03 program for reversing number 
import java.util.Scanner;
public class ReversingNumber {
    Scanner sc =new Scanner(System.in);
    private String number;
    private int result;
    public void reverseNumber(){
        String concat="";
        for(int i = number.length()-1;i>=0;i--){
            concat =concat+number.charAt(i);
        }
        result = Integer.parseInt(concat);
    }
    public void readNumber(){
        System.out.println("Program for reversing a 4 digits number.");
        System.out.print("Please input 4 digits number: ");
        number = sc.nextLine();
    }
    public boolean checkDigit(){
        if(number.length()==4) return true;
        return false;
    }
    public void showResult(){
        if(checkDigit()){
            reverseNumber();
            System.out.println("\nAfter reverse: "+result);
        }else {
        System.out.println("\nError: invalid number, please input only 4 digits number.");
        sc.close();
        }
    }
    public static void main(String[] args) {
        ReversingNumber number = new ReversingNumber();
        number.readNumber();
        number.showResult();
    }
}