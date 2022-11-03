// ex01. Check the input number whether it is prime number or not
import java.util.Scanner;

public class PrimeNumber {
	
	private int num;
    private String number = "";
	
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Input number to check whether it is prime number: ");
        PrimeNumber check = new PrimeNumber(Integer.parseInt(sc.nextLine()));
        System.out.println(check.getNum());
    }
    
    public PrimeNumber(int n) {
        num = n;
        isPrime();
    }

    public boolean isPrime() {
        boolean prime = true;
        if (num > 2) {
            for (int i = 2; i <= num / 2; i++) {
                if (num % i == 0) {
                    prime = false;
                    number += " " + i;
                }
            }
            if (prime) {
                number = num + " is a prime number";
                return true;
            } else {
                number = num + " is not prime, because it is divisible by " + number + ".";
            }
        } else 
            number = num + " is not a prime number, because it is smaller or equal to 2";
        return false;
    }
    
    public String getNum() {
    	return number;
    }
}