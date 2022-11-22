//Exercise 5

import java.util.Scanner;

public class CheckPalindrome {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.print("Please gives a word to check: ");
		String input = sc.next();
		Palindrome input2 = new Palindrome(input);
		
		System.out.print("Choose method (REV, LOOP): ");
		String method = sc.next();
		
		boolean bl=false;
		
		if(method.equals("REV")) bl = input2.isPalindromeRev();
		else if(method.equals("LOOP")) bl = input2.isPalindromeLoop();
		
		if(bl == true) {
			System.out.println(input + " is a Palindrome");
		}
		else {
			System.out.println(input + " is not a Palindrome");
		}	
		sc.close();
	}
}

class Palindrome {
	private String str;
	
	public Palindrome(String str) {
		this.str = str;
	}
	
	public boolean isPalindromeRev() {
		int n = str.length();
		String Rstr="";
		for(int i=0;i<n;i++) {
			Rstr = str.charAt(i) + Rstr;
		}
		return str.equals(Rstr);
		
	}
	public boolean isPalindromeLoop() {
		int n = str.length();
		int state = 1;
		for(int i=0;i<(n/2);i++) {
			if(str.charAt(i) != str.charAt(n-(i+1))) {
				state = 0;
				break;
			}
		}
		return state==1;
	}
}
