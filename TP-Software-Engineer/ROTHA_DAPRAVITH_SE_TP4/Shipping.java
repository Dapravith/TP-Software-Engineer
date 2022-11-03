//ex06 program for calculate the minimum amount of litre shipping 
import java.util.Scanner;

public class Shipping {

    Scanner sc = new Scanner(System.in);
    private double weight,aTob,bToc;
    private double litreperkilometer, litremax = 5000,litreTotal,litre;
    public double convertDistanceTolitre(double distance){
        return distance * litreperkilometer;
    }
    public void readData(){

        System.out.println("Program for calculate the minimum amount of litre need to refill to reach point C.");
        System.out.print("Input distance A to B(km): ");
        aTob = sc.nextDouble();
        System.out.print("Input distance B to C(km): ");
        bToc = sc.nextDouble();
        System.out.print("Input weight of good(kg): ");
        weight = sc.nextDouble();        
    }
    public void convertLitre(){

        litreTotal = (aTob+ bToc) * litreperkilometer;
        litre = litremax - litreTotal;
    }
    public void checkLitre(){   

        if(weight > 0 && weight < 10000){
            litreperkilometer= weight *10 / 5000;
        }
        else if(weight >= 10000 && weight < 20000){
            litreperkilometer = weight*20/10000;
        }
        else if(weight >= 20000 && weight < 30000){
            litreperkilometer = weight * 25 / 20000;
        }
        else if(weight == 30000){
            litreperkilometer= weight * 35 / 30000;
        }
        convertLitre();   
    }
    public void displayResult(){

        if(weight <= 30000){
            checkLitre();
            if(litre > 0) {
            System.out.println("\nminimum to refill is 0 to reach to point c and remaining "+ litre +" litre");
            }
            else if(litre >= -5000) {
            System.out.println("\nminimum to refill at B to reach to point c is "+(-litre)+" litres");
            }
            else{
                if(convertDistanceTolitre(aTob) > 5000) {
                System.out.println("\nShip can't reach to point B");
                }
                else if(convertDistanceTolitre(bToc) > 5000) {
                System.out.println("\n Ship at point B cant reach to C");
                } 
                 
            }
        }
        else {
        System.out.println("\nShip cannot loaded!");
        }
    }
    public static void main(String[] args) {
        Shipping ship = new Shipping();
        ship.readData();
        ship.displayResult();
    }
}