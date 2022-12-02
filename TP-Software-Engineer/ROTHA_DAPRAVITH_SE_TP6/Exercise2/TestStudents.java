package Exercise2;

import java.util.Scanner;

public class TestStudents {
    
    public static void main(String[] args) {
        ListStudents listStudents = new ListStudents();
        int option , i = 0;
        String name, id;
        Scanner sc = new Scanner(System.in);
        while (true) {
            listStudents.showMenu();
            option = sc.nextInt();
            if(option == 1){
                System.out.print("Enter student's name: ");
                name = sc.nextLine();
                name = sc.nextLine();
                Students students = new Students(i, name);
                i++;
                listStudents.addStudent(students);
            }else if(option == 2){
                listStudents.displayListStudent();
            }else if(option == 3){
                listStudents.displayListStudent();
                System.out.print("Input student's name to delete:");
                name = sc.nextLine();
                name = sc.nextLine();
                listStudents.removeStudentByName(name);
        }
        else if(option == 4){
            listStudents.displayListStudent();
            System.out.print("Input student's id to update:");
            id = sc.nextLine();
            id = sc.nextLine();
            listStudents.updateStudentByID(id);
        }
        else if (option == 5) {
            System.out.println("Program End!, Thanks for using our program !");
            break;
        }
    }
    sc.close();
}

}
