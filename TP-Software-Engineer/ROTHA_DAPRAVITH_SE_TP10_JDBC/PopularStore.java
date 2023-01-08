import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;
import java.util.Scanner;


class FoodMenu {
    public HashMap<String, Double> foodAndPrice;
    public ArrayList<String> food;

    public FoodMenu() {
        food = new ArrayList<>() {{
                add("Hamburger");
                add("Cookie");
                add("Chicken nugget");
                add("Pizza");
                add("Coffee");
                add("Sandwich");
                add("Egg Omelet");
                add("Sea Food");
                add("Beverages");
            }
        };
        foodAndPrice = new HashMap<String, Double>() {{
                put(food.get(0), 3.0);
                put(food.get(1), 0.5);
                put(food.get(2), 4.49);
                put(food.get(3), 9.99);
                put(food.get(4), 2.99);
                put(food.get(5), 3.49);
                put(food.get(6), 6.99);
                put(food.get(6), 8.50);
                put(food.get(6), 15.75);
            }
        };
    }

    @Override
    public String toString() {
        if (food.size() != 0)
            System.out.printf("No.  %-30s  %s", "Food", "Price");
        int idx = 1;
        for (String key : foodAndPrice.keySet()) {
            System.out.printf("\n %d.  %-30s  %.2f", idx, key, foodAndPrice.get(key));
            idx++;
        }
        return "";
    }
}



public class PopularStore {
    public static Scanner sc;
    public CustomerQueue waitingCustomer;
    public HashMap<String, Integer> orderedList;

    public PopularStore() {
        waitingCustomer = new CustomerQueue();
        orderedList = new HashMap<>();
        sc = new Scanner(System.in);
        CreateDatabase_Table_PopularStore();
    }

    public int getRandomNum() {
        Random rdm = new Random();
        return rdm.nextInt(180, 1200);
    }

    public String changeNumberToTime(int num) {
        java.util.Date D = new java.util.Date(num * 1000 - 1000 * 3600 * 7);
        SimpleDateFormat sdf = new SimpleDateFormat("00:mm:ss");
        return sdf.format(D);
    }

    public String getStartServe_Time() {
        java.util.Date date = new java.util.Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss");

        return sdf.format(date);
    }

    public String getEndServe_Time(String startTIme, int servedDuration) {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss");
        java.util.Date date = null;
        try {
            date = sdf.parse(startTIme);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        date = new java.util.Date(date.getTime() + servedDuration * 1000);

        return sdf.format(date);
    }

    public int getValidInput_int(String caption, String whenInvalid) {
        while (true) {
            System.out.print(caption);
            if (sc.hasNextInt()) {
                int n = sc.nextInt();
                sc.nextLine();
                return n;
            } else {
                sc.nextLine();
                System.out.print(whenInvalid);
            }
        }
    }

    // Credit cards
    public boolean validCreditNumber(String cardNumber) {
        return cardNumber.matches("[0-9]{4}[ ]{1}[0-9]{4}[ ]{1}[0-9]{4}[ ]{1}[0-9]{4}");// pattern for credit card
                                                                                        // number 16 digits
    }

    public String getCreditCard() {
        String creditCard = "";
        while (true) {
            System.out.print("Enter credit card number: ");
            creditCard = sc.nextLine();
            if (validCreditNumber(creditCard))
                break;
            else
                System.out.println(">>>Invalid card number");
        }
        return creditCard;
    }

    // Passcode
    public boolean vaildPassCode(String passCode) {
        return passCode.matches("[0-9]{3,4}");// passcode 3-4 digit?
    }

    public String getPassode() {
        String passcode = "";
        while (true) {
            System.out.print("and passcode: ");
            passcode = sc.next();
            if (vaildPassCode(passcode))
                break;
            else
                System.out.println(">>>Invalid Pin number");
        }
        return passcode;

    }
    // ----------

    // get what the customer order and the amount put into hashmap orderedList
    public void getOrderList() {
        FoodMenu menu = new FoodMenu();

        int roundLoop = 1;
        System.out.print(menu);

        while (true) {
            if (roundLoop % 10 == 0)
                System.out.println(menu);

            int n = getValidInput_int("-\n>>>Enter choice: ",
                    ">>>OOPs, not a valid choice, try again or enter 0 to quit.");

            if (n == 0 && roundLoop == 1) {
                System.out.println("OOPs, not a valid choice, try again.");
                continue;
            } else if (n == 0)
                break;
            else if (n < 0 || n > 6)
                System.out.println(">>>OOPs, not a valid choice, try again or enter 0 to quit.");
            else {
                String key = menu.food.get(n - 1);
                if (!orderedList.keySet().contains(key))
                    orderedList.put(key, 0);

                orderedList.put(key, orderedList.get(key) + 1);
                System.out.println("-------");
                System.out.println(">>>Add more? Enter choice or 0 to quit.");
                roundLoop++;
            }
        }
    }

    public String printCustomer_Order() {
        String s = "";
        int i = 1;
        boolean b1 = true;
        boolean b2 = true;
        for (String key : orderedList.keySet()) {
            String tmp = "";

            if (i == orderedList.size() && orderedList.size() != 1)
                tmp = "and ";

            if (orderedList.get(key) == 1 && i == 1)
                tmp = "A";
            else if (orderedList.get(key) == 1)
                tmp = tmp + " a";
            else
                tmp = tmp + orderedList.get(key).toString();

            if (s.length() > 27 && b1) {
                b1 = false;
                s = s + "\n";
            }
            if (s.length() > 53 && b2) {
                b2 = false;
                s = s + "\n";
            }

            s = s + tmp + " " + key + (!tmp.equals("A") && !tmp.equals(" a") && !tmp.equals("and  ")? "s" : "")
                    + (i < orderedList.size() - 1 ? "," : "") + " ";
            i++;

            if (s.length() > 85)
                s = s + "\n";
        }

        return s;
    }

    public int getPaymentMethod() {
        int n;
        while (true) {
            System.out.print("Pays by (0: cash, 1 credit card): ");
            n = getValidInput_int("", "");
            if (n == 0 || n == 1)
                break;
            else
                System.out.println(">>>Invalid option!!!");
        }
        return n;
    }

    public Double getPayment() {
        Double pay = 0.0;
        FoodMenu menu = new FoodMenu();

        for (String key : orderedList.keySet()) {
            pay = pay + orderedList.get(key) * menu.foodAndPrice.get(key);
        }
        return pay;
    }

    public void printReceipt(int ID, String orderedLis, Double pay, String creditCardOrCash,
            String issueDate, String endServeTime, String serveDuration) {
        System.out.printf("""
                -\n
                Receipt:
                ----------------------------------------
                Customer No.: %05d
                %s = %.2f$
                %s
                ------------ Thanks you!!! -------------
                Issue date: %s
                ----------------------------------------
                End serving time: %s
                Serving duration: %s\n
                """,
                ID,
                orderedLis, pay,
                !creditCardOrCash.equals("") ? "(In credit card **** **** **** " + creditCardOrCash.split(" ")[3] + ")"
                        : "(In cash)",
                issueDate,
                endServeTime,
                serveDuration);

        orderedList.clear();
    }

    public void serveACustomer() {
        int servedDuration = getRandomNum();// time ins second
        if (waitingCustomer.customerCount() == 0)
            System.out.println(">>>No customer in list");
        else if (servedDuration / 60 <= 10) {
            Customer ctm = waitingCustomer.getHeadList();

            System.out.print("Start serving time:  " + getStartServe_Time());
            System.out.println("\nWhat do you prefer this menu?");

            getOrderList();
            Double payment = getPayment();
            System.out.printf("Amount to pay: %.2f$\n", payment);
            int opt = getPaymentMethod();

            String creditCard = "";
            if (opt == 1) {
                creditCard = getCreditCard();
                getPassode();

            }
            recordServedCustomer_ToDatabase(ctm.getNumber(), printCustomer_Order(), payment,
                    changeNumberToTime(servedDuration), ctm.getDateEnter());

            printReceipt(ctm.getNumber(), printCustomer_Order(), payment, creditCard,
                    getEndServe_Time(getStartServe_Time(), servedDuration + 4),
                    getEndServe_Time(getStartServe_Time(), servedDuration),
                    changeNumberToTime(servedDuration));

        } else {
            System.out.println(">>>The estimated time is too long, Please move to the next customer.");
            waitingCustomer.moveHeadToTail();
        }
    }

    public int getUniqueID() {
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost", "root", "");) {
            Statement stmt = conn.createStatement();
            stmt.executeUpdate("use store");
            ResultSet rs = stmt.executeQuery("select number from servedCustomerData;");
            int id = 1;
            while (rs.next()) {
                if (id == rs.getInt("number")) {
                    id++;
                }
            }

            for (Customer c : waitingCustomer.customerList) {
                if (id == c.getNumber()) {
                    id++;
                }
            }

            return id;

        } catch (SQLException e) {
            e.printStackTrace();
            return 0;

        }
    }

    public void recordServedCustomer_ToDatabase(int number, String customerOrder, Double moneyPaid, String duration,
            java.sql.Timestamp dat) {
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost", "root", "");) {
            Statement stmt = conn.createStatement();
            stmt.executeUpdate("use store");
            PreparedStatement pstmt = conn.prepareStatement("insert into servedCustomerData value(?,?,?,?,?);");
            pstmt.setInt(1, number);
            pstmt.setString(2, customerOrder);
            pstmt.setDouble(3, moneyPaid);
            pstmt.setString(4, duration);
            pstmt.setTimestamp(5, dat);

            pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();

        }
    }

    public void CreateDatabase_Table_PopularStore() {
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost", "root", "");
                Statement stmt = conn.createStatement();) {

            stmt.executeUpdate("create database if not exists store");

            stmt.executeUpdate("use store");
            String create_table = """
                    create table if not exists servedCustomerData(
                        number int not null,
                        ordered varchar(1000) not null,
                        paid decimal(10,2) not null,
                        duration varchar(200) not null,
                        date_enter datetime not null,
                        primary key(number)
                    );
                    """;
            stmt.executeUpdate(create_table);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void listAllServedCustomer() {
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost", "root", "");) {
            Statement stmt = conn.createStatement();
            stmt.executeUpdate("use store");
            ResultSet rs = stmt.executeQuery("select *from servedCustomerData order by date_enter asc;");

            boolean b = true;
            while (rs.next()) {
                if (b) {
                    System.out.printf("-\n   %-5s %-10s %-16s %-30s %s\n", "NO.", "Payment", "Duration", "Date enter",
                            "Order");
                    b = false;
                }
                System.out.printf("   %-5d %-10.2f %-16s %-30s %s\n", rs.getInt("number"), rs.getDouble("paid"),
                        rs.getString("duration"), rs.getString("date_enter"),
                        rs.getString("ordered").replaceAll("\n", " "));

            }
            if (b)
                System.out.println(">>>No customer on the list!!!");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void addNewCustomerToQueue() {
        Customer c = new Customer();
        // c.dataInput();
        c.setNumber(getUniqueID());
        c.setStatus(false);
        c.setDateEnter();
        System.out.printf("-\n%-9s %-30s %s\n", "NO.", "Enter date", "Status");
        c.dataOutput();
        waitingCustomer.addNewCustomer(c);
        System.out.println("\n>>>Done");
    }

    public void displayCustomerInQueue() {
        if (waitingCustomer.customerCount() == 0)
            System.out.println(">>>No customer in the queue.");
        else
            System.out.printf("-\n%-9s %-30s %s\n", "NO.", "Enter date", "Status");
        for (Customer c : waitingCustomer.customerList) {
            c.dataOutput();
            System.out.println();
        }
    }

    public static void main(String[] args) {
        // PopularStore2_0 PPLS = new PopularStore2_0();

        PopularStore p = new PopularStore();
        while (true) {
            System.out.println("""
                \n\n\t\t+=====================================================================+
                \t\t|                     Popular Store                                   |
                \t\t+=====================================================================+
                \t\t|    1. Serve a customer follow FIFO                                  |
                \t\t|    2. Display list of customer in queue                             |
                \t\t|    3. List all served customers                                     |
                \t\t|    4. Add a new customer                                            |
                \t\t|    5. Quit                                                          |
                \t\t+=====================================================================+\n
                    """);

            System.out.print("Enter option: ");
            String opt = sc.next();
            if (opt.equals("1")) {
                System.out.println("1. Server a customer follow FIFO");
                p.serveACustomer();
            } else if (opt.equals("2")) {
                System.out.println("2. Display list of customer in queue");
                p.displayCustomerInQueue();
            } else if (opt.equals("3")) {
                System.out.println("3. List all served customers");
                p.listAllServedCustomer();
            } else if (opt.equals("4")) {
                System.out.println("4. Add customer to waiting list for serving");
                p.addNewCustomerToQueue();
            } else if (opt.equals("5")) {
                System.out.println("5. Quit");
                break;
            } else
                System.out.println(">>>Invalid option!!!");

            System.out
                    .println("____________________________________________________________________________________\n");

        }
        sc.close();

    }

}
