package Ex3_4_5_BookClass;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

public  class Student{
    private String name;
    private String DoB;
    private int tel;
    private String city;
    private String country;
    private String group;

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
        } else
            return -1;
    }


    public void Data_Input() throws Exception{
        Scanner sc=new Scanner(System.in);
      


        System.out.println("*** Input of List Student for Borrow Book ***\n");
        System.out.print("Student's Name: ");
        name=sc.nextLine();

        while(true){
            System.out.print("Date of Birth(DD MM YYYY): ");
            DoB=sc.nextLine();
            if(valid_dateInput(DoB)==1){

                ParsePosition ps=new ParsePosition(0);
                SimpleDateFormat simp=new SimpleDateFormat("dd-MM-yyyy");
                Date current_date=simp.parse(simp.format(new Date()));//the current date

                Date d=simp.parse(DoB.replaceAll(" ", "-"), ps);
                if(d.compareTo(current_date)>0){
                    System.out.println("Date of birth can not be ahead of current");
                }else{
                    break;
                }
                
            }else{
                System.out.println("Invalid date format!!!\nTry again");
            }
        }

        while(true){
            System.out.print("Student's phone number: ");
            if(sc.hasNextInt()){
                tel=sc.nextInt();
                break;
            }else{
                System.out.println("Phone is number!!!!!\nTry again!!!!");
                sc.nextLine();
            }
        }

        System.out.print("Student's City: ");
        sc.nextLine();
        city=sc.nextLine();
        System.out.print("Student's Country: ");
        country=sc.nextLine();
        System.out.print("Student's Group: ");
        group=sc.next();        
    }

    public String getName() {
        return name;
    }


    public String getDoB() {
        return DoB;
    }


    public int getTel() {
        return tel;
    }


    public String getCity() {
        return city;
    }


    public String getCountry() {
        return country;
    }


    public String getGroup() {
        return group;
    }


    public void setName(String name) {
        this.name = name;
    }


    public void setDoB(String doB) {
        DoB = doB;
    }


    public void setTel(int tel) {
        this.tel = tel;
    }


    public void setCity(String city) {
        this.city = city;
    }


    public void setCountry(String country) {
        this.country = country;
    }


    public void setGroup(String group) {
        this.group = group;
    }


    public void Display_Student_data(){ 
        System.out.println("\n================ Table of Student Borrow Books =========================\n");
        System.out.printf("%-15s %-15s %-15s %-15s %-15s %-15s", name,DoB,tel, group,city,country);
        System.out.println("\n========================================================================\n");

    }

    public static void main(String[] args) throws Exception {
        Student s=new Student();
        s.Data_Input();
        s.Display_Student_data();
    }
}