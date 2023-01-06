import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

public class Customer {

    private int number;
    private String dateEnter;
    private boolean status;
    
    public void dataInput() {
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.print("Enter number: ");
            if (sc.hasNextInt()) {
                number = sc.nextInt();
                break;
            } else {
                sc.nextLine();
                System.out.println("Invalid option.");
            }
            
        }


        setDateEnter();
        System.out.println("Date enter : " + dateEnter);
        char opt;
        do {
            System.out.print("Status: (1. Waiting to order, 2. Waiting for food)\n =>Enter choice: ");
            opt = sc.next().charAt(0);
        } while (opt == '1' && opt == '2');
        if (opt == '1')
            status = false;
        else
            status = true;
    }

    public void setDateEnter() {//current date
        Date D = new Date();
        SimpleDateFormat sf = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");

        dateEnter = sf.format(D);
    }

    public void dataOutput() {
        System.out.printf("%-9d %-30s %s", number, dateEnter, status ? "Waiting to order" : "Waiting for food");
    }

    public int getNumber() {
        return number;
    }

    public boolean isStatus() {
        return status;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getDateEnter(){
        return dateEnter;
    }
}
