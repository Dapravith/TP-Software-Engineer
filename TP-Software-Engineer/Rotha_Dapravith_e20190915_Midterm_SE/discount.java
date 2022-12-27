

public class discount {
    private double cost;
    private double discount;
    private double total_price;

    // public discount(double cost, double discount, double total_price) {
    // this.cost = cost;
    // this.discount = discount;
    // this.total_price = total_price;
    // }

    public discount(double cost) {
        this.cost = cost;
    }

    public void discount_price(double dis_price) {
        discount = (cost * dis_price / 100);
        total_price = cost - discount;
        System.out.println("\n\n     Total cost: " + cost + " $");
        System.out.println("       Discount: " + dis_price + " %");
        System.out.println(" Total discount: " + discount + " $");
        System.out.println("--------------------------");

        System.out.println("Total payment: " + total_price + " $");
    }
    public static void main(String[] args) {
        
    }

}
