import java.util.LinkedList;
import java.util.Queue;

public class CustomerQueue {
    Queue<Customer> customerList;

    public CustomerQueue() {
        customerList = new LinkedList<>();
    }

    public int customerCount() {
        return customerList.size();
    }

    public boolean addNewCustomer(Customer c) {
        if (customerList.size() <= 100) {
            customerList.add(c);    
            return true;
        }
        return false;
    }

    private Customer getCustomerByNumber(int number) {
        for (Customer c : customerList) {
            if (c.getNumber() == number) {
                return c;
            }
        }
        return null;
    }

    public boolean removeCustomer(int number) {
        if(customerList.remove(getCustomerByNumber(number))){
           return true;
        }
        return false;
    }


    public void moveHeadToTail(){
        customerList.add(customerList.poll());
    }


    public boolean checkNumber(int num){
        for(Customer c: customerList){
            if(c.getNumber()==num)  return true;
        }
            return false;
    }

    public Customer getHeadList() {
        return customerList.poll();
    }

}
