package src.Exercise1;

import java.util.Scanner;

public class StopHits extends Thread {
    public static String s="HitME!";
    public static boolean stop=true;
    public static Scanner sc=new Scanner(System.in); 

    @Override
    public void run() {
        stop=sc.nextLine().equals("")?false:true;        
        System.out.println("\nThank you!");

    }
    public static void main(String[] args) {

        StopHits hitMet=new StopHits();
        hitMet.start();


        while(stop){
            System.out.print("HitMe!");
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        
   
       sc.close();

    }
}

