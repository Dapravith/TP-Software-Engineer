//Exercise 1

import java.util.Scanner;

public class PrimeNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Input number to list prime numbers from 2 to it: ");
        int num1 = 2;
        int num2 = sc.nextInt();

        if (num1 > num2) {
            System.out.println("Number must be greater than 2.");
            System.exit(0);
        }
        while (num1 <= num2) {
            int i = 2; 
            int count = 0;
            while(i <= num1/2){
                if(num1 % i == 0){
                    count++;
                    break;
                }
                i++;
            }
            if(count == 0){
                System.out.println(num1+  " ");
            }
            num1++;

        }
        System.out.println("is prime number.");
        sc.close();
    }
}
