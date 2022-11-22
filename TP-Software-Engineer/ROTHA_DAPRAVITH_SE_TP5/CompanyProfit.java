//Exercise 4

import java.util.Scanner;

public class CompanyProfit {
    private double [] profit = new double[12];
   public void inputProfit(){
     Scanner sc = new Scanner(System.in);
     System.out.println("Calculate company profits");
     int i = 0;
     while(i<=11){
        System.out.println("Profit for month "+ (i+1) +": ");
        //input the profit for each month
        profit[i] = sc.nextDouble();
        i++;
     }
     sc.close();
   }

public void displayResult() {
    int i = 0;
        double sum = 0;
        while(i<=11){
            sum = sum + profit[i];
            i++;
        }
        System.out.println("Total profits for 12 months: " + sum);
        
    }
}

class ProfitAYear {
    public static void main(String[] args) {
        CompanyProfit profit = new CompanyProfit();
        profit.inputProfit();
        profit.displayResult();
    }
}




    

