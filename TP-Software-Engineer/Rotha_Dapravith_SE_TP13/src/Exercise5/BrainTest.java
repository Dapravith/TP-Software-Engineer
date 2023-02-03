package src.Exercise5;

import java.util.Random;
import java.util.Scanner;

public class BrainTest implements Runnable{
    private String resultInput;
    
   public static Scanner sc=new Scanner(System.in);

    @Override
    public void run() {
        resultInput="";
        if(!sc.hasNextInt()){
            resultInput=sc.nextLine();
            resultInput="X";//just to represent that the input is not int
            System.out.println("Not a number ?\n Marked as incorrect");
        }else{
            resultInput=sc.nextLine();
        }
    }

    public static String  resultTest(int countCorrect){
        String s[]={"->baby brain","->master brain", "->alien brain"};
        return s[countCorrect<=5?0:(countCorrect<=7?1:2)];
    }

    public static int getRandom(){
        return new Random().nextInt(0,11);
    }
    public void setResultInput(String resultInput){
        this.resultInput=resultInput;
    }
    public String getResultInput(){
        return resultInput;
    }

        
    public static void main(String[] args) {
        int countCorrect=0;
        int countWrong=0;

        System.out.println("""
                =======================
                       Brain Test 
                =======================""");

        int rst=0;
        while((countCorrect+countWrong)!=10){
            int A=getRandom();
            int B=getRandom();
            System.out.println(A+" + "+ B +"= ?");

            BrainTest brainTest=new BrainTest();
            brainTest.setResultInput(null);
            Thread tr=new Thread(brainTest);
        
            tr.start();

            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            
            if(brainTest.getResultInput().equals("")){
                System.out.println("\n\n You finished "+(countCorrect+countWrong)+" test"+((countCorrect+countWrong)>1?"s":""));
                break;
            } else if(!brainTest.getResultInput().equals("X")) {
                rst=Integer.valueOf(brainTest.getResultInput());
            }
    
            if((rst==A+B) &&  !brainTest.getResultInput().equals("X")) countCorrect++;
            else countWrong++;
        }

        if(countCorrect+countWrong==10) System.out.println("Congrats!!! You have finished all the tests");

        System.out.print("\nResult: ");
        System.err.println("Correct: "+countCorrect+" "+resultTest(countCorrect));
        System.err.println("        Incorrect: "+countWrong);
    }
}

