import java.util.Scanner;

public class SMSTool {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        UserDataStore.getInstance();
        UserDataStore.getInstance().registerUser("sasa", "123");
        UserDataStore.getInstance().registerUser("vanny", "123456");
        UserDataStore.getInstance().registerUser("bopha", "7273");

        System.out.print("Please enter username: ");
        String username = sc.nextLine();
        System.out.print("Password: ");
        String pass = sc.nextLine();
        UserDataStore.getInstance();
        if (UserDataStore.getInstance().isLoginCorrect(username, pass)) {

            while (true) {
                System.out.println("-------------Welcome to private SMS app-----------");
                System.out.println("1. List all SMS");
                System.out.println("2. View SMS Detail");
                System.out.println("3. Send SMS");
                System.out.println("4. Remove SMS by index");
                System.out.println("5. Quit");
                System.out.println();
                System.out.print("Choose an option: ");
                int op = sc.nextInt();

                if (op == 1) {
                    
                } else if (op == 2) {

                } else if (op == 3) {

                } else if (op == 4) {

                } else if (op == 5) {
                    break;
                } else {
                    System.out.println("Invalid option please choose again");
                }

            }

        } else {
            System.out.println("Log in fail please log in again");
            SMSTool.main(args);
        }

    }

}

