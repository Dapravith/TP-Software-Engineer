//ex04 Money Exchanges program 
import java.util.Scanner;

public class MoneyExchanges {
    static Scanner sc =new Scanner(System.in);
    private static double money;
    private static int option;
    private static double result;
    private static String message = "";
    public static void readChoice(){
        System.out.println("Welcome to program Money Exchanges!");
        System.out.println("1. Reils to Dollar");
        System.out.println("2. Reils to Thai Baht");
        System.out.println("3. Dollar to Reils");
        System.out.println("4. Dollar to Thai Baht");
        System.out.println("5. Thai Baht to Riels");
        System.out.println("6. Exit");
        System.out.print("Choose an option:");
        option = sc.nextInt();
    }

    public static void convertReilToDollar(){
        result=money/4000;
        message = "\n"+(int)money+" RIELS = "+result+" USD";
    }

    public static void convertReilToBaht(){
        result=money*0.0075;
        message ="\n" +(int)money+" RIELS = "+result+" Baht";
    }

    public static void convertDollarToReil(){
        result = money*4000;
        message="\n"+ money+" USD ="+(int)Math.floor(result)+" RIELS";
    }

    public static void convertDollarToBaht(){
        result = money*30;
        message="\n"+ money+" USD ="+result+" Baht";
    }

    public static void convertBahtToReil(){
        result = money/0.0075;
        message= "\n"+money+" Baht ="+(int)Math.floor(result)+" RIELS";
    }
    
    public static void showMoney(){

        if (option == 1) {
            System.out.print("Input money In RIELS:");
            money=sc.nextDouble();
            convertReilToDollar();
        }

        else if(option == 2){
            System.out.print("Input money In RIELS:");
            money=sc.nextDouble();
            convertReilToBaht();
        }

        else if(option == 3){
            System.out.print("Input money In Dollars:");
            money=sc.nextDouble();
            convertDollarToReil();
        }
        
        else if(option == 4){
            System.out.print("Input money In Dollars:");
            money=sc.nextDouble();
            convertDollarToBaht();
        }
        
        else if(option == 5){
            System.out.print("Input money In Thai Baht:");
            money=sc.nextDouble();
            convertBahtToReil();
        }

        else if(option == 6){
            message="";
        }

        System.out.println(message);
    }
    public static void main(String[] args) {
        while (true) {

            readChoice();
            showMoney();

            if(option == 6){
                System.out.println("End of Menu, Thanks for using Money Exchanges Program !");
                break;
                
            }
           
        }
        
    }
}