//ex02 program for testing for lucky numbers
import java.util.Scanner;
public class LuckyNumber {
    Scanner sc = new Scanner(System.in);
    private String number;
    private int sum,summation;
    //sum all number in string
    public void sumLuckyNumber(){
        sum=0;
        summation = 0;
        for(int i =0;i<number.length();i++){
            int convertor = Character.getNumericValue(number.charAt(i));
            if(i<=2){
                sum+=convertor;
            }
            else{
                summation +=convertor;
            }
        }
    }
    //check LuckyNumber
    public boolean checkLuckyNumber(){
        if(summation==sum){
            return true;
        }
        return false;
    }
    //Check bit number
    public boolean checkBitNumber(){
        if(number.length()==6){
            return true;
        }
        return false;
    }

    //read value from input
    public void readNumber(){
        System.out.println("Program for testing for lucky number. ");
        System.out.print("Please input 6 digit number: ");
        number = sc.nextLine();
    }
    //check and display the output
    public void displayOutput(){
        if(checkBitNumber()){
            sumLuckyNumber();
            if(checkLuckyNumber()){
                System.out.println("\n"+number+" is lucky number ");
            }else{
                System.out.println("\n"+number+" is not lucky number ");
            }
        }else {
        System.out.println("\nInvalid input number, please input only 6 digits number ");
        }
    }

    public static void main(String[] args) {
        LuckyNumber lucky = new LuckyNumber();
        lucky.readNumber();
        lucky.displayOutput();
    }
    
}