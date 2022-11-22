//Exercise 7

import java.util.*;

public class EscapeCharacterReplacement {

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.printf("Please enter a sentence: ");
    String input = sc.nextLine();
    
    String replaceSen = input.replace("\\n","(new_line)");
    replaceSen = replaceSen.replace("\\t", "(tab)");
    replaceSen = replaceSen.replace("\\\\","(slash)");
    replaceSen = replaceSen.replace("//","(comment_line)");
    replaceSen = replaceSen.replace(":)","(smile)");
    System.out.printf(replaceSen);
    sc.close();
  }
}