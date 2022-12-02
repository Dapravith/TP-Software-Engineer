package Exercise2;

import java.util.*;

public class ListStudents {
    // make student as list to add an objects in list
    List<Students> students=new ArrayList<Students>();
    Scanner sc = new Scanner(System.in);
    public List<Students> listAllStudent(){
        return students;
    }
    public Students getAStudents(int i){
        return listAllStudent().get(i);
    }
    public void addStudent(Students student){
        students.add(student);
        System.out.println(student.getName()+" has been added");
    }
    public void deleteAllStudent(){
        students.removeAll(students);
    }
    public void displayListStudent(){
        System.out.println("\n\nStudentList");
        System.out.println("SID\tSName");
        for(Students student: listAllStudent()){
            System.out.println(student.getId()+"\t"+student.getName());
        }
        if (listAllStudent().isEmpty()) {
            System.out.println("There's no student in the list.");
        }
        System.out.println();
    }
    public void updateStudentByID(String id){
        int p = 1;
        String name;
        Iterator<Students> itr = students.iterator();
        while(itr.hasNext()){
            Students student = itr.next();
            if(id.equals(student.getId())){
                System.out.println("Student ID:"+student.getId()+" and name: "+student.getName()+" is updated ");
                System.out.print("Input new student name: ");
                 name = sc.nextLine();
                student.setName(name);
                p=0;
            }
        }
        if(p==1){
            System.out.println("there no "+id+" as"+" id to update in student list!");
        }
    }
    public void removeStudentByName(String name){
        int p=0;
        Iterator<Students> itr = students.iterator();
        while (itr.hasNext()) {
            Students student = itr.next();
            if(name.equals(student.getName())){
                System.out.println("Student ID: "+student.getId()+" and name:  "+student.getName()+" has been deleted !" );
                itr.remove();
                p=1;
            }
        }
        if(p==0){
            System.out.println("there no student's name: "+name+ "\n");
        }
    }
    public void showMenu(){
        System.out.println("Student List System\n");
        System.out.println("1.Add new student\n"+
        "2. List students\n"+
        "3. Remove student by name\n"+
        "4. Update student information by id\n"
        +"5. Quit");
        System.out.print("Enter your option (1 - 5):  ");
    }
}
