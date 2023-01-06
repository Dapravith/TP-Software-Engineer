package Ex3_4_5_BookClass;

import java.util.HashMap;
import java.util.Scanner;

public class TestLibrary {
    public static void main(String[] args)throws Exception{
        Library L=new Library(new HashMap<>(), new HashMap<>());
        Scanner sc=new Scanner(System.in);


        while(true){
            System.out.println("""
                1. List all categories
                2. List books by categories
                3. List books by year
                4. List available books
                5. Add new books
                6. Decrease book by isbn
                7. Remove book by isbn
                8. Add new copies of book
                9. Let student borrow the book, max 5 books, max 1 week
                (if the student not yet return the previous borrowed books, he/she can't borrow more)
                10. List students that borrowed the books
                11. Let student to return book
                12. Quit
                    """);


            int choice;

            while(true){
                System.out.print("Choose an option: ");
                if(sc.hasNextInt()){
                    choice=sc.nextInt();
                    break;
                }else{
                    System.err.println("Check input again");
                    sc.nextLine();
                }
            }

            if(choice==1){
                System.out.println("1. List all categories");
                L.List_all_category();
            }else if(choice==2){
                System.out.println("2. List books by categories");
                L.List_book_byCategory();
            }else if(choice==3){
                System.out.println("3. List books by year");
                L.List_book_by_year();
            }else if(choice==4){
                System.out.println("4. List available books");
                L.List_available_Book();
            }else if(choice==5){
                System.out.println("5. Add new books");
                L.Add_new_Book();
            }else if(choice==6){
                System.out.println("6. Decrease book by isbn");
                L.Decrease_book_byISBN();
            }else if(choice==7){
                System.out.println("7. Remove book by isbn");
                L.Remove_book_byISBN();
            }else if(choice==8){
                System.out.println("8. Add new copies of book");
                L.Add_new_copyBook();
            }else if(choice==9){
                System.out.println("10. Let student borrow the book, max 5 books, max 1 week\nif the student not yet return the previous borrowed books, he/she can't borrow more)");
                L.Let_student_borrowBook();
            }else if(choice==10){
                System.out.println("11. List students that borrowed the books");
                L.List_students_that_borrowBook();
            }else if(choice==11){
                System.out.println("12. Let student to return book");
                L.Let_student_returnBook();
            }else if(choice==12){    
                System.out.println("Exits menu program.");
                break;
            }else System.out.println(">>>OOPs not an existing option !!!");
            

            L.Mark_Book_notAvailable_toBorrow();

            System.out.println("\n-------------------------------------------------");
        }
        sc.close();

    }
}
