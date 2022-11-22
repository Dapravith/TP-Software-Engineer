//Exercise 3

import java.util.Scanner;

public class EvenNumber {
    public static void main(String[] args) {
        System.out.println("Input the number: ");
        Scanner sc = new Scanner(System.in);
        int num1 = sc.nextInt();

        //even numbers
        for(int i=num1; i<=500; i++){
            OddEven odd = new OddEven(i);
            if(odd.isEven()){
                System.out.println(i + " ");
            }
        }
        sc.close();
    }
}
