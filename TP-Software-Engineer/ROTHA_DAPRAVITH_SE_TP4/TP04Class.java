// Bonus Challenge Exercise TP04 

import java.util.Scanner;

public class TP04Class {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int Choice;
    do {
        System.out.println("\n-----------Menu------------");
        System.out.println("1. Prime number ");
        System.out.println("2. Lucky number ");
        System.out.println("3. Reversing number ");
        System.out.println("4. Money Exchanges ");
        System.out.println("5. Max among 8 numbers ");
        System.out.println("6. Shipping ");
        System.out.println("7. Leap Year ");
        System.out.println("0. Exit ");

        System.out.println("Choose an option: ");
        System.out.println("-----------------------");
        Choice = sc.nextInt();
    
    switch (Choice) {
        case 1: { 
        PrimeNumber.main(null);
        break;
        }
        case 2: 
            LuckyNumber.main(null);
            break;
        
        case 3: 
            ReversingNumber.main(null);
            break;
        
        case 4: 
            MoneyExchanges.main(null);
            break;
        
        case 5: 
            MaxAmong8Number.main(null);
            break;
        
        case 6: 
            Shipping.main(null);
            break;
        
        case 7: 
            LeapYear.main(null);
            break;
            default:
            System.out.println("Exit ");
        
    }
  }
  while(Choice != 0);
 }
 }
