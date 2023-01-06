package Ex3_4_5_BookClass;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class Library {
    Scanner sc=new Scanner(System.in);
    public HashMap<String, CategoryBook> lib;
    public HashMap<Student, ArrayList<Book>> std_list;

    
    public Library(HashMap<String, CategoryBook> lib, HashMap<Student, ArrayList<Book>> std_list) {
        this.lib = lib;
        this.std_list = std_list;
    }

    public void List_all_category(){
        if(lib.size()==0) System.out.println(">>No data");
        else {
            System.out.println(lib.keySet());
        }

    }

    private boolean Exist_Category(String ctg){
        for(String s: lib.keySet()){
            if(ctg.equals(s)){
                return true;
            }
        }
        return false;
    }

    public void	List_book_byCategory(){
        System.out.print("Enter category of Book:  ");
        String ctg=sc.nextLine();

        if(Exist_Category(ctg)){
         lib.get(ctg).List_all_Book();
        }else {
            System.out.println(">>>This category does not exist");
        }
    }

    public void List_book_by_year(){
        int Year;
        while(true){
            System.out.print("Enter book by year : ");
            if(sc.hasNextInt()){
                Year=sc.nextInt();
                break;
            }else{
                sc.nextLine();
                System.out.println(">>>Year is...number, check again!!!!");
            }
        }
        
        System.out.printf("%-18s %-18s %-17s %-17s %-12s %-9s %s","Tittle", "Author","ISBN", "Category","Status", "Amount", "Publish date");
        for(String K: lib.keySet()){
            for(Book book : lib.get(K).list){
                String str=book.publish_date.toString();
                String  s=str.split(" ")[2];//convert date to array and year is at index 2
                                                // date format, ex:  28 12 2020
                int y=Integer.valueOf(s);

                if(y==Year){
                    System.out.println();
                    book.Display_Book_Info();
                }
            }
        }
    }

    public void List_available_Book(){
        
        System.out.printf("%-18s %-18s %-17s %-17s %-12s %-9s %s","Tittle", "Author","ISBN", "Category","Status", "Amount", "Publish date");
        for(String K: lib.keySet()){
            for(Book book : lib.get(K).list){
                if(book.status){
                    System.out.println();
                    book.Display_Book_Info();
                }
            }
        }
    }

    public void Add_new_Book()throws Exception{
        Book book=new Book();
        book.Data_Input();
        
        boolean b=true;
        for(String K: lib.keySet()){
            for(Book B: lib.get(K).list){
                if(book.isbn==B.isbn){
                    System.out.println("The ISBN: "+B.isbn+" has already existed. check again!!!!");
                    b=false;
                    break;
                }
            }
        }

        if(b){
            if(!Exist_Category(book.category)){
               lib.put(book.category, new CategoryBook(book.category));
            }
            lib.get(book.category).list.add(book);
            
            System.out.println(">>>Completed");
        }
    }

    public void Decrease_book_byISBN(){

        int isbn=ISBN_input();


        Book book=getBook_byISBN(isbn);
        if(book!=null){
            System.out.printf("%-18s %-18s %-17s %-17s %-12s %-9s %s","Tittle", "Author","ISBN", "Category","Status", "Amount", "Publish date");
            System.out.println();
            book.Display_Book_Info();
            System.out.println("Enter new amount of book:  ");
            Scanner sc=new Scanner(System.in);
            System.out.print("Enter new amount of book:  ");
            int n=sc.nextInt();
            if(n>book.amount){
                System.out.println("Can not decrease with this amount as books only have  "+book.amount);
            }else{
                book.amount=book.amount-n;
                System.out.println(">>>Completed");
            }
        }else{
            System.out.println("Not found.");
        }
    }

    public void Remove_book_byISBN(){

        int isbn=ISBN_input();
        
        boolean b=true;
        for(String K: lib.keySet()){
            int s1=lib.get(K).list.size();
            lib.get(K).Remove_Book_fromCategory(isbn);
            if(lib.get(K).list.size()!=s1){
                b=false;
            }
        }

        if(b)  System.out.println(">>>ISBN not found.");
        else System.out.println("Book removed");

    }

    private int ISBN_input(){
        int isbn;
        while(true){
            System.out.print("Enter Book's ISBN: ");
            if(sc.hasNextInt()){
                isbn=sc.nextInt();
                sc.nextLine();
                break;
            }else{
                System.out.println(">>>Invalid input");
                sc.nextLine();
            }
        }

        return isbn;
   
    }

    public void Add_new_copyBook(){

        int isbn=ISBN_input();
        Book book=getBook_byISBN(isbn);
        if(book!=null){
            Scanner sc=new Scanner(System.in);
            System.out.print("Enter amount of copy: ");
            int n=sc.nextInt();
            book.amount=book.amount+n;
            System.out.println("New amount of book updated.");
        }else{
            System.out.println("Not found.");
        }
    }

    public void Mark_Book_notAvailable_toBorrow(){//when amount  book <=2 automatically mark as not free;
        for(String K: lib.keySet()){
            for(Book book: lib.get(K).list){
                if(book.amount<=2){
                    book.status=false;
                }else book.status=true;
            }
        }
    }

    private Book getBook_byISBN(int isbn){
        for(String K: lib.keySet()){
            for(Book book: lib.get(K).list){
                if(book.isbn==isbn){
                    return book;
                }
            }
        }
        return null;
    }

    public void Let_student_borrowBook()throws Exception{
        Scanner sc=new Scanner(System.in);
        Student std=new Student();
        std.Data_Input();
        int isbn;
        do{
            
            isbn=ISBN_input();

            if(getBook_byISBN(isbn)==null){
                System.out.println("Quit??? Enter 0 to quit");
            }
            if(isbn==0)  break;
        
        }while(getBook_byISBN(isbn)==null);

        if(isbn!=0){
            boolean b=true;
            for(Student K:std_list.keySet()){
               if(std.equals(K)){
                std_list.get(K).add(getBook_byISBN(isbn));
                b=false;
                break;
               }
            }

            if(b){
                std_list.put(std, 	new ArrayList<>());
                std_list.get(std).add(getBook_byISBN(isbn));
            }
        }

    }

    public void List_students_that_borrowBook(){
        System.out.printf("%-15s %-15s %-15s %-15s %-15s", "Name", "Tel", "Group", "Title", "ISBN");
        for(Student K: std_list.keySet()){
            for(Book book: std_list.get(K)){
                System.out.println();
                K.Display_Student_data();
                System.out.printf("%-15s %-15s", book.title, book.isbn);
            }
        }
    }

    private boolean compare_student(Student s1, Student s2){
        if(!s1.getName().equals(s2.getName())) return false;
        else if(!s1.getDoB().equals(s2.getDoB())) return false;
        else if(s1.getTel()!=s2.getTel()) return false;
        else if(!s1.getCity().equals(s2.getCity())) return false;
        else if(!s1.getCountry().equals(s2.getCountry())) return false;
        else if(!s1.getGroup().equals(s2.getGroup()))   return false;

        return true;
    }

    public void Let_student_returnBook() throws Exception{
        Student s=new Student();
        s.Data_Input();
        boolean b=true;
        for(Student K: std_list.keySet()){
            if(compare_student(K, s)){
                std_list.remove(K);
                System.out.print(">>>Successful!!");
                b=false;
                break;
            }
        }
        if(b)   System.out.println("Not found, try again or view the list students");
    }
}