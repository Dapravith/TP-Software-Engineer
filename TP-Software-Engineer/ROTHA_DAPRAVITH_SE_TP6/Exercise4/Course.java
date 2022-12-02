package Exercise4;

import java.util.*;
import java.util.Scanner;

public class Course {
    
    private static Scanner sc;

    public static void main(String[] args) {
        ArrayList<String> courses = new ArrayList<>();
        sc = new Scanner(System.in);

        //List all courses in DICE
        courses.add("Software Engineering");
        courses.add("Internet Programming");
        courses.add("Operating System");
        courses.add("Network");
        courses.add("Advanced Database Management System");
        courses.add("Telecommunication");

        while (true) {
            System.out.println();
            System.out.println("1. List all courses.");
            System.out.println("2. Find courses by name.");
            System.out.println("3. Add new course.");
            System.out.println("4. Quit");
            System.out.println("Choose your options (1 - 4):  ");
            int option = sc.nextInt();

            switch (option) {
                case 1 -> {
                    for (String i : courses) {
                        System.out.println(i);
                    }
                }

                case 2 -> {
                    System.out.print("Enter the course 's name: ");
                    String course = sc.nextLine();
                    course  = sc.nextLine();
                    for (String i : courses) {
                        if (i.equals(course)) {
                            System.out.println(i);
                        }
                    }
                }

                case 3 -> {
                    System.out.println("Enter the new course's name: ");
                    String newCourse = sc.nextLine();
                    newCourse = sc.nextLine();
                    courses.add(newCourse);
                }

                case 4 -> 
                    System.exit(0);
                    default -> System.err.println("You choice is invalid !!");

                
            }
        }
    }   
}
