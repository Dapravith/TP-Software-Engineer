package Ex1_StudentClass;

import java.lang.NullPointerException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

public class Students{

    private String name, telephone_number, city, country;
    private String groups;
    private Date date_of_birth;
    
    public Students() {

    }
    static Students students = new Students();

    public static Students dataInput() {
        Students students = new Students();

        Scanner s = new Scanner(System.in);

            System.out.print("Input student's name: ");
            try{
                students.setName(s.nextLine());

            }
            catch(IllegalArgumentException e){
                System.out.println("Name should not be blank\n");
            }

            System.out.print("Enter student's phone number: ");
            try{
                students.setTelephone_number(s.nextLine());
            }
            catch(IllegalArgumentException e){
                System.out.println("Phone number should not be blank\n");
            }

            System.out.print("Enter student location(city): ");
            try{
                students.setCity(s.nextLine());
            }
            catch(IllegalArgumentException e){
                System.out.println("City should not be blank\n");
            }

            System.out.print("Input student's country: ");
            try{
                students.setCountry(s.nextLine());
            }
            catch(IllegalArgumentException e){
                System.out.println("Country should not be blank\n");
            }
            
            System.out.print("Enter student's group: ");
            
            students.setGroups(s.nextLine());
            s.nextLine();

            System.out.print("Input Student's DOB(dd/mm/yyyy): ");
            SimpleDateFormat dob = new SimpleDateFormat("dd/MM/yyyy");

            try{
                students.date_of_birth = dob.parse(s.nextLine());
                students.setDate_of_birth(students.date_of_birth);
            }
            catch(ParseException e){
                System.out.println("Date must not be null\n");
            }
            catch(NullPointerException e) {
                System.out.println("Invalid Date\n");
            }

        s.close();
            
        return students;
    }

    public void dataOutput(Students s) {
        SimpleDateFormat getOnlyDate = new SimpleDateFormat("dd/MM/yyyy");
        String strDate = getOnlyDate.format(s.date_of_birth);
        System.out.println("\n+-----------------+-------+---------------+--------------+-----------------+-----------------+");
        System.out.printf("| %15s | %5s | %13s | %12s | %15s | %15s | %n", "Name", "Group", "Date of Birth", "Phone Number", "City", "Country");
        System.out.println("+-----------------+-------+---------------+--------------+-----------------+-----------------+");
        System.out.printf("| %15s | %5s | %13s | %12s | %15s | %15s | %n", s.name, s.groups, strDate.substring(0,10), s.telephone_number, s.city, s.country);
        System.out.println("+-----------------+-------+---------------+--------------+-----------------+-----------------+\n");
    }


    public void setName(String name) {
        this.name = name;
    }


    public void setTelephone_number(String telephone_number) {
        this.telephone_number = telephone_number;
    }


    public void setCity(String city) {
        this.city = city;
    }


    public void setCountry(String country) {
        this.country = country;
    }


    public void setDate_of_birth(Date date_of_birth) {
        this.date_of_birth = date_of_birth;
    }


    public void setGroups(String groups) {
        this.groups = groups;
    }


    public String getName() {
        return name;
    }


    public String getTelephone_number() {
        return telephone_number;
    }


    public String getCity() {
        return city;
    }


    public String getCountry() {
        return country;
    }


    public Date getDate_of_birth() {
        return date_of_birth;
    }


    public String getGroups() {
        return groups;
    }

    // public static void main(String[] args) {
    //     Students s = new Students();
    //     s = Students.dataInput();
    //     s.dataOutput(s);
    // }
}


