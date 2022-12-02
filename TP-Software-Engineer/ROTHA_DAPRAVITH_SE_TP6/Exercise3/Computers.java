package Exercise3;

import java.util.*;

public class Computers {
	
	public static Scanner sc = new Scanner(System.in);
	
    public static void main(String[] args) {
        List list = new List();
        int damage = 0;// Let's assume that we have 10 computers
        for (int i = 1; i <= 10; i++) {
            ++damage;
            if (damage == 2) {
                list.addList(i, "damage");
                damage = 0;
            } else {
                list.addList(i, "good");
            }
        }
        while (true) {
            System.out.println();
            System.out.println("1. List all PCs");
            System.out.println("2. List all good PCs");
            System.out.println("3. List all damage PCs");
            System.out.println("4. Mark PC as damage");
            System.out.println("5. Mark PC as not damage");
            System.out.println("6. Quit");
            System.out.print("Enter your option: ");
            int key = sc.nextInt();
            switch (key) {
                case 1 -> list.displayList();
                case 2 -> list.listGood();
                case 3 -> list.listDamage();
                case 4 -> {
                    System.out.print("Enter the damaged computer's ID: ");
                    int id = sc.nextInt();
                    list.markDamage(id);
                    list.displayList();
                }
                case 5 -> {
                    System.out.print("Enter the fixed computer's ID: ");
                    int id = sc.nextInt();
                    list.markGood(id);
                    list.displayList();
                }
                case 6 -> 
                System.exit(0);
                default -> System.out.print("Your option is incorrect, Please choose option (1 - 6):  !!!!");
            }
        }
    }
}