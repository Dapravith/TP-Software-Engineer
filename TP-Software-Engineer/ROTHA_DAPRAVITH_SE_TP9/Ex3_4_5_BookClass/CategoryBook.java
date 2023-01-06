
// Exercise 4 : Category class using book class from Exercise 3

package Ex3_4_5_BookClass;

import java.util.ArrayList;

public class CategoryBook {
    public String ctg;
    public ArrayList<Book> list ;

    public CategoryBook(String ctg) {
        this.ctg = ctg;
        list=new ArrayList<>();
    }

    public boolean Exist_ISBN(int isbn){
        for(Book book: list ){
            if(book.isbn==isbn){
                return true;
            }
        }
        return false;
    }


    public void Add_book_toCategory(Book book){
        if(!Exist_ISBN(book.isbn)){
            list.add(book);
            System.out.println(">>>Book added");
        }else System.out.println(">>>Book has already existed.");
    }

    public void Remove_Book_fromCategory(int isbn){
        if(Exist_ISBN(isbn)){
            for(Book book: list){
                if(book.isbn==isbn){
                    list.remove(book);
                    break;
                }
            }
            System.out.println(">>>Book removed");
        }else{
            System.out.println("The book ISBN: "+isbn+" does not exit.");
        }
    }

    public void List_all_Book(){
        System.out.printf("%-18s %-18s %-17s %-17s %-12s %-9s %s","Tittle", "Author","ISBN", "Category","Status", "Amount", "Publish date");
        for(Book book: list){
            System.out.println();
            book.Display_Book_Info();
        }
    }


    public int Count_Book_inCategory(String ctg){
        return list.size();
    }

    public void Find_Book_inCategory(String title, int isbn) {
        boolean b=true;
        for(Book book: list){
            if(title.toUpperCase().equals(book.title.toUpperCase())  || isbn==book.isbn){
                System.out.printf("%-15s %-15s %-15s %-15s %s","Tittle", "Author","ISBN", "Category", "Publish date");
                book.Display_Book_Info();
                b=false;
                break;
            }
        }
        if(b){
            System.out.println("Not found.");
        }
    }

}