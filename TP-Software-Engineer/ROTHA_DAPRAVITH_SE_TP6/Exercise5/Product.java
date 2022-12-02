package Exercise5;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Scanner;

public class Product {
    int number = 120, amount;
    String name;
    double price;
    ArrayList<Product> products = new ArrayList<>();
    Scanner sc = new Scanner(System.in);

    public Product(int number, String name, double price, int amount) {
        this.number = number;
        this.name = name;
        if (price >= 0) {
            this.price = price;
        }

        if (amount >= 0) {
            this.amount = amount;
        }
    }

    public Product () {

    }

    public int getAmount() {
        return amount;
    }

    public int getNumberProduct() {
        return number;
    }

    public double getPrice() {
        return price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAmount(int amount) {
        if (amount > 0) {
            this.amount = amount;
        }
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void displayMenu() {
        System.out.println("1. List all products in shop with products number, name, price, and amount in stock.");
        System.out.println("2. Add new products to the list.");
        System.out.println("3. Remove products from list by index.");
        System.out.println("4. Update products in list.");
        System.out.println("5. Exit program.");
        System.out.println("Enter your options [1 - 4]:  ");
    }

    public void addProductToStock() {
        System.out.println("Add new products to list");
        System.out.println("product's name: ");
        if (number > 120) {
            sc.nextLine();
        }
        name = sc.nextLine();
        System.out.println("Input product's price, amount by space/Enter: ");

        price = sc.nextDouble();
        amount = sc.nextInt();
        Product product = new Product(number, name, price, amount);
        products.add(product);
        System.out.println("Successfully added product's name: " + product.getName());
        number = number + 1;
    }

    public void removeProductByIndex() {
        ListAllProduct();
        System.out.println("Remove product by index: ");
        int index = sc.nextInt();
        int i = 0;
        int check = 0;
        Iterator<Product> itr = products.iterator();
        while (itr.hasNext()) {
            Product product = itr.next();
            if (i == index) {
                itr.remove();
                System.out.println(product.getName()+ " has been removed");
                check = 1;
            }
            i++;
        }
        if (check == 0) {
            System.out.println(" there is no "+ index + "in product list");
        }
    }

    public void updateProductInListByNumberProduct() {
        ListAllProduct();
        int check = 0;
        System.out.println("Input product's number to check: ");
        int numberId = sc.nextInt();
        Iterator<Product> itr = products.iterator();

        while (itr.hasNext()) {
            Product product = itr.next();
            if (product.getNumberProduct() == numberId) {
                System.out.print("Enter product's name: ");
                String nameProduct;
                sc.nextLine();
                nameProduct = sc.nextLine();
                System.out.println("Enter product's price and amount by space/Enter: ");
                double priceProduct = sc.nextDouble();
                int amountProduct = sc.nextInt();
                product.setName(nameProduct);
                product.setAmount(amountProduct);
                product.setPrice(priceProduct);
                check = 1;
                System.out.println("Update product's name to " + nameProduct + " product is successfully");
            }
        }
        if (check == 0) {
            System.out.println("there is no number: " + numberId + " in productList");
        }
    }

    public void ListAllProduct() {
        System.out.println("\nindex\tnumber\tname\tprice\tamount\n");
        int i = 0;
        for (Product product : products) {
            System.out.println(i + "\t" + product.getNumberProduct() + "\t" + product.getName() + "\t" + product.getPrice() + "\t" + product.getAmount());
            i += 1;
        }
        if (products.isEmpty()) {
            System.out.println("There is no product in stock\n");
        }
    }
}

class ProductInStock {
    public static void main(String[] args) {
        Product products = new Product();
        Scanner sc = new Scanner(System.in);
        int option;
        
        while (true) {
            products.displayMenu();
            option = Integer.parseInt(sc.nextLine());
            if (option == 1) {
                products.ListAllProduct();
            }
            else if (option == 2) {
                products.addProductToStock();
            }
            else if (option == 3) {
                products.removeProductByIndex();
            }
            else if (option == 4) {
                products.updateProductInListByNumberProduct();
            }
            else if (option == 5) {
                System.out.println("End of Program, Good Bye!");
                break;
            }
        }
        sc.close();
    }
}