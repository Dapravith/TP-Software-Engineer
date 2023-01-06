import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.Scanner;

public class PopularStore {
    CustomerQueue waitingCustomer;
    CustomerQueue servedCustomer;

    public PopularStore() {
        waitingCustomer = new CustomerQueue();
        servedCustomer=new CustomerQueue();

    }

    public int getRandomNum(){
        Random rdm=new Random();
        return rdm.nextInt(180, 1200);
    }

    public String changeToTime(int num){
        java.util.Date D=new Date(num*1000-1000*3600*7);
        SimpleDateFormat sdf=new SimpleDateFormat("00:mm:ss");
        return sdf.format(D);
    }

    public void serveACustomer(){
        Scanner sc=new Scanner(System.in);
        int servedDuration=getRandomNum();//time ins second
        if (waitingCustomer.customerList.size()==0) System.out.println("-> No record customer in list");
        else if(servedDuration/60<=10){
            System.out.println(">>>Customer is served with time: "+ changeToTime(servedDuration));
            Customer c=waitingCustomer.customerList.poll();
            c.setStatus(true);
            servedCustomer.addNewCustomer(c);
        }else{
            System.out.println(">>>Too long, Please move to next customer.");
            waitingCustomer.moveHeadToTail();
        }
    }

    public void addNewCustomer(){
        Customer c=new Customer();
        c.dataInput();
        waitingCustomer.addNewCustomer(c);
        System.out.println(">>>Add new customer successfully ...");
    }

    public void listServedCustomer(){
        if(servedCustomer.customerCount()==0) System.out.println(">>>data not available");
        else System.out.printf("%-9s %-30s %s\n", "NO.", "Enter date", "Status");
        for(Customer c: servedCustomer.customerList){
            c.dataOutput();
            System.out.println();
        }
    }

    public void listWaitCustomer(){
        if(waitingCustomer.customerCount()==0) System.out.println(">>>No record data");
        else System.out.printf("%-9s %-30s %s\n", "NO.", "Enter date", "Status");
        for(Customer c: waitingCustomer.customerList){
            c.dataOutput();
            System.out.println();
        }
    }


    public static void main(String[] args) {
        PopularStore p=new PopularStore();
        Scanner sc=new Scanner(System.in);

        while(true){
            System.out.println("""
                \n\n\t\t+=====================================================================+
                \t\t|                     Popular Store                                   |
                \t\t+=====================================================================+
                \t\t|    1. Serve a customer follow FIFO                                  |
                \t\t|    2. Display list of customer in queue                             |
                \t\t|    3. List all served customers                                     |
                \t\t|    4. Add a new customer                                            |
                \t\t|    5. Quit                                                          |
                \t\t+=====================================================================+\n
                    """);

            System.out.print("Enter any option: ");
            String opt=sc.next();
            if(opt.equals("1")){
                System.out.println("1. Server a customer follow FIFO");
                p.serveACustomer();
            }else if(opt.equals("2")){
                System.out.println("2. Display list of customer in queue");
                p.listWaitCustomer();
            }else if(opt.equals("3")){
                System.out.println("3. List all served customers");
                p.listServedCustomer();
            }else if(opt.equals("4")){
                System.out.println("4. Add a new customer");
                p.addNewCustomer();
            }else if(opt.equals("5")){
                System.out.println("5. Quit");
                break;
            }else System.out.println(">>>Invalid option!!!");

            System.out.println("-----------------------------------------------");


        }        
    }
    
}
