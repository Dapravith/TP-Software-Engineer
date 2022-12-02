package Exercise1;

import java.util.Scanner;

public class TestCircle {
    public static void main(String[] args) {
        // Point p1 = new Point(1, 5);
        // Point p2 = new Point(2, 6);
        // Circle c = new Circle(p1, p2);
        Scanner sc = new Scanner(System.in);

        System.out.println("Input center ");
        System.out.printf("x= ");
        int x1 = sc.nextInt();
        System.out.printf("y= ");
        int y1 = sc.nextInt();

        System.out.println("Input to point ");
        System.out.printf("x= ");
        int x2 = sc.nextInt();
        System.out.printf("y= ");
        int y2 = sc.nextInt();

        Point p1 = new Point(x1, y1);
        Point p2 = new Point(x2, y2);

        Circle c = new Circle(p1, p2);

        System.out.printf("Length %.2f\n", c.length());
        System.out.printf("Radius %.2f\n", c.radius());
        System.out.printf("Surface %.2f\n", c.surface());

        sc.close();

    }
}
