import java.util.Scanner;

public class BonusExChallenge {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;
        do{
            System.out.println("\n-------- Menu --------- ");
            System.out.println("1. Seconds to Time ");
            System.out.println("2. Time to Seconds ");
            System.out.println("3. Calling Cost ");
            System.out.println("4. Riels to Dollars ");
            System.out.println("5. Traveling Duration ");
            System.out.println("0. Exit ");
            
            System.out.println("Choose an option: ");
            System.out.println("-----------------------");
            choice = sc.nextInt();

        switch(choice){
            case 1: {
                TP03_1_SecondsToTime.main( null);
                break;
            }
            case 2:
                TP03_2_TimeToSeconds.main( null);
                break;
            case 3:
                TP03_3_CallingCost.main(null);
                break;
            case 4:
                TP03_4_RielsToDollar.main(null);
                break;
            case 5:
                TP03_5_TravelingDuration.main(null);
                break;
                default:
                System.out.println("exit");
        }
    }
    while(choice !=0);
    }
}
