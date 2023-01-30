package TP12SubClass;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Scanner;

public class GeneralNeededMethod {
    public static String DB="database_schema";//database name
    public static Scanner sc = new Scanner(System.in);
    public static boolean superUser;



    public static void create_database(String db){
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost", "root", "");
        var stmt = conn.createStatement();) {
        stmt.executeUpdate("Create database if not exists "+db);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public static int validInt() {
        while (!sc.hasNextInt()) {
            System.out.print("Value only!\n>");
            sc.nextLine();
        }
        int n = sc.nextInt();
        sc.nextLine();
        return n;
    }

    public static double validDouble() {
        while (!sc.hasNextDouble()) {
            sc.nextLine();
            System.out.println("Value only!\n>");

        }
        double d = sc.nextDouble();
        sc.nextLine();
        return d;
    }

    public static byte validByte_0To5() {
        byte b=0;
        while (true) {
            if (!sc.hasNextInt()) {
                sc.nextLine();
                System.out.println("Value only");
                continue;
            }
            b = sc.nextByte();
            sc.nextLine();
            if (b < 0 || b > 5)
                System.out.print("Value from 0 to 5 only!\n>");
            else break;
        }
        return b;
    }
}
