import java.util.Scanner;

public class RescueTheQueen{

    Scanner sc = new Scanner(System.in);
    public void readQuestionAndAnswer(){

        while (true) {
            // Q1
            System.out.println("You enter into the first room, here it is a lot of gold.\nWhether you will take it?(A. Yes, B. No) ");
            String input = sc.nextLine();

            // Result 1
            if(input.equalsIgnoreCase("A")||input.equalsIgnoreCase("Yes")){
                System.out.println("Gold remains to you, but you have ruined test. GAME is over!!!");
            }
            else if(input.equalsIgnoreCase("B")||input.equalsIgnoreCase("No")){
                System.out.println("Congratulation, you have passed the first test honor! (Game goes on to Q2)");
            // Q2

                System.out.println("(Only if pass Q1)You pass in a following room. It is full of diamonds, whether you will take diamonds?\n(A. Yes, B. No)");
                input=sc.nextLine();
            
            // Result 2
            
                if(input.equalsIgnoreCase("A")||input.equalsIgnoreCase("Yes")){
                    System.out.println("Diamonds remain to you, but you have ruined the second test");
                }
                else if(input.equalsIgnoreCase("B")||input.equalsIgnoreCase("No")){
                    System.out.println("Congratulation, you have passed the second test of honor (Game goes on to Q3)!!!");
            // Q3
                    System.out.println("(Only if pass Q2)You enter into the third room. A person was attacking by a dragon! To move further, not paying to them of attention?\n(A. Yes, B. No)");
                    input=sc.nextLine();
            
            // Result 3
                    if(input.equalsIgnoreCase("B")||input.equalsIgnoreCase("No")){
                        System.out.println("Congratulation, you have pass all tests of honor. Princess gets to you!!!");
                        break;
                    }
                    else if(input.equalsIgnoreCase("A")||input.equalsIgnoreCase("Yes")){
                        System.out.println("Game Over!");

                    }else{
                        System.out.println("There is no that choice. Please try again");

                    }
                }else{
                    System.out.println("There is no that choice. Please try again");

                }
            }else{
                System.out.println("There is no that choice. Please try again");
            }
        }
    }
}

class MainRescueTheQueen{
    public static void main(String[] args) {
        RescueTheQueen queen = new RescueTheQueen();
        queen.readQuestionAndAnswer();
    }
}