package Ex3_4_5_BookClass;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

public class Book {
    public String title;
    public String author;
    public int isbn; 
    public String category;
    public String publish_date;
    public int amount;
    public boolean status;

    private int valid_dateInput(String s1) {
        if (s1.matches("[0-9]{2}[ ]{1}[0-9]{2}[ ]{1}[0-9]{4}")) {
            SimpleDateFormat sdf = new SimpleDateFormat("dd MM yyyy");
            sdf.setLenient(false);
            try {
                sdf.parse(s1);
                return 1;
            } catch (ParseException e) {
                return -1;
            }
        } else {
            return -1;
        }
    }
    
    public void Data_Input() throws ParseException{
        Scanner sc=new Scanner(System.in);

        System.out.println("Enter information about the book.");
        System.out.print("Book's title: ");
        title=sc.nextLine();
        while(true){
            System.out.print("Book's ISBN: ");
            if(sc.hasNextInt()){
                isbn=sc.nextInt();
                if(String.valueOf(isbn).length()!=7 && String.valueOf(isbn).length()!=9){
                    System.out.println(">>>ISBN must be positive 7 digits or 9 digits!!!!");
                    System.out.println("Try again.");   
                }else break;
            }else{
                sc.nextLine();
                System.out.println(">>Check ISBN again!!!!!");
            }
        }

        System.out.print("Author's Name:  ");
        sc.nextLine();
        author=sc.nextLine();

        while(true){
            System.out.print("Publish date(DD MM YYYY): ");
            publish_date=sc.nextLine();
            if(valid_dateInput(publish_date)==1){

                ParsePosition ps=new ParsePosition(0);
                SimpleDateFormat simp=new SimpleDateFormat("dd-MM-yyyy");
                Date current_date=simp.parse(simp.format(new Date()));//the current date

                Date d=simp.parse(publish_date.replaceAll(" ", "-"), ps);
                if(d.compareTo(current_date)>0){
                    System.out.println("Publish ahead of time? WOW Try again!!!");
                }else{
                    break;
                }
            }else{
                System.out.println("Invalid date format!!\nTry again");
            }
        }



        System.out.print("Category's Book: ");
        category=sc.nextLine();
        while(true){
            System.out.print("Amount of book: ");
            if(sc.hasNextInt()){
                amount=sc.nextInt();
                if(amount<0){
                    System.out.println("Amount must be positive.");
                }else break;
            }else{
                sc.nextLine();
                System.out.println("Amount must be integer number!!");
            }
        }

        if(amount>2) status=true;
    }

    public void Display_Book_Info(){
        System.out.printf("%-18s %-18s %-17d %-17s %-12s %-9d %s",title, author, isbn, category,status ? " Borrow": " can't Borrow",amount, publish_date);
    }

    public static void main(String[] args) throws Exception {
        Book s=new Book();
        s.Data_Input();
        s.Display_Book_Info();
    }
}
