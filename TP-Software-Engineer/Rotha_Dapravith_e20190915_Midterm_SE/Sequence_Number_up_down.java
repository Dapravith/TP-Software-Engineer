import java.util.Scanner;

public class Sequence_Number_up_down{

    Sequence_Number_up_down(String num) {
    }
    boolean checkIfInt(String num) {
        try{
            Integer.parseInt(num);
            return true;
        }
        catch(NumberFormatException e) {
            return false;
        }
    }
    boolean checkValid(int n) {
        if(n > 0) {
            return true;
        }
        else{
            return false;
        }
    }
    void displayNum(int n) {
        for(int i = 1; i<n; i=i+1) {
            System.out.printf("%02d ", i);
        }
        for(int i = n; i>0; i=i-1) {
            System.out.printf("%02d ", i);
        }
    }
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        String num;
        while(true) {
            System.out.print("Input positive number: ");
            num = sc.nextLine();

            Sequence_Number_up_down s = new Sequence_Number_up_down(num);
            if(s.checkIfInt(num)) {
                int n = Integer.valueOf(num);
                if(s.checkValid(n)) {
                    s.displayNum(n);
                    break;
                }
            }
            else{
                System.out.print("Input only positive number: ");
                String n = sc.nextLine();
                Sequence_Number_up_down N1 = new Sequence_Number_up_down(n);
                if(s.checkIfInt(num)) {
                    int n1 = Integer.valueOf(num);
                    if(s.checkValid(n1)) {
                        s.displayNum(n1);
                         break;
                    }
                    else{
                        break;
                    }
                }
            }
        }
        sc.close();
    }
}