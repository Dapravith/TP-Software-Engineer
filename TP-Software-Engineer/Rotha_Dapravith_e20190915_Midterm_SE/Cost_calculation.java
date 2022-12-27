import java.util.Scanner;




public class Cost_calculation {
    private float cost;
    private int discont;
    private float total_price;
    private float total_discount;


    public Cost_calculation(float cost, int age) {
        this.cost = cost;
       
    }

    public int getDiscount(){
        return discont;
    }


    public float getTotal_cost(){
        return total_price;
    }

    public float getCost(){
        return cost ;
    }
    public float getTotal_discount(){
        return total_discount;
    }

    public void caulate_cost(){
        if(cost>=10 && cost<30){
            discont=5;
        }else if(cost>=30 && cost<80){
            discont=10;
        }else if(cost>=80 && cost<150){
            discont=15;
        }else if(cost>=150 && cost<300){
            discont=20;
        }else if(cost>=300){
            discont=25;
        }else discont=0;
        
        total_discount=discont/100;
        total_price=cost+cost*total_discount;
    }
    

    public static void main(String []agrs){
        Scanner sc=new Scanner(System.in);


        float bc=0;
        while(bc<=0){
            System.out.print("Input total buying cost: ");
            bc=sc.nextInt();
            if(bc<0){
                System.out.println("Cost must be psoitive.");
            }
        }
      
        int ag = sc.nextInt();
        Cost_calculation ex2=new Cost_calculation(bc, ag);
        

        System.out.printf("%20s:  %f $\n", "Total cost", ex2.getCost());
        System.out.printf("%20s:  %d $\n", "Discount", ex2.getDiscount());
        System.out.printf("%20s:  %f $\n", "Total discount", ex2.getTotal_cost());
        System.out.println("-------------------------------------------------------------");
        System.out.printf("%20s:  %f $\n", "Total payments", ex2.getTotal_cost());

        sc.close();

    }
}
