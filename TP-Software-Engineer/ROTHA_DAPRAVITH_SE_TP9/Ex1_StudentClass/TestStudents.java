package Ex1_StudentClass;

public class TestStudents {
    public static void main(String[] args) throws Exception {
        // Students student = Students.dataInput();
        // System.out.println(student);
        Students s = new Students();
        s = Students.dataInput();
        s.dataOutput(s);
    }
}
