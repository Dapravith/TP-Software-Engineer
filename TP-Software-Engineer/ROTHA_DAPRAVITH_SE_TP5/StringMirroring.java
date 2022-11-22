//Exercise 6

import java.util.Scanner;

public class StringMirroring {
	public static void main(String[] args) {
			
			Scanner sc = new Scanner(System.in);
			System.out.print("Please enter a word: ");
			String param = sc.next();
			StringMirror param2 = new StringMirror(param);
			System.out.println(param2.makePalindrome());
			sc.close();
	}
}

class StringMirror {
	private String str;
	
	public StringMirror(String str) {
		this.str = str;
	}
	
	public String makePalindrome() {
		int n = str.length();
		String Rstr="";
		for(int i=0;i<n;i++) {
			Rstr = str.charAt(i) + Rstr;
		}
		return str + Rstr;
	}
}
