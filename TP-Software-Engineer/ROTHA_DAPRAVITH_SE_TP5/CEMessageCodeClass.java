//Challenge Exercise 2

import java.util.Scanner;

public class CEMessageCodeClass {
    Scanner sc = new Scanner(System.in);
    private String message;

    public void getinputMessage() {
        System.out.printf("Enter a message : ");
        message = sc.nextLine();
    }

    public void encoder() {
        String removeSpecialCharacters = message.replaceAll("[^a-zA-Z0-9]", " ");
        System.out.println("Encoder message: ");
        System.out.printf("%s\n\n", removeSpecialCharacters);
    }

    public void decoder() {
        System.out.println("Decoder message: ");
        System.out.println(message);
    }
}

class MessageCoder {

    public static void main(String[] args) {
        CEMessageCodeClass text = new CEMessageCodeClass();
        text.getinputMessage();
        text.encoder();
        text.decoder();
    }
}
