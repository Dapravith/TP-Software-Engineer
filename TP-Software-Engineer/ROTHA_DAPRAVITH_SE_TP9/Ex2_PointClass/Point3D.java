package Ex2_PointClass;

import java.util.Scanner;

public class Point3D {
    
    private int x,y,z;

    private Point3D() {

    }

    public static Point3D inputData() {
        Scanner sc = new Scanner(System.in);
        Point3D p = new Point3D();

        // value of X
        System.out.println("Input value of x = ");

        try {
            p.setX(Integer.parseInt(sc.nextLine()));
        } catch (Exception e) {
            System.out.println("Change to Integer.");
        }

        // value of Y

        System.out.println("Input value of y = ");

        try {
            p.setY(Integer.parseInt(sc.nextLine()));
        } catch (Exception e) {
            System.out.println("Change to Integer.");
        }

        // value of Z

        System.out.println("Input value of z = ");

        try {
            p.setZ(Integer.parseInt(sc.nextLine()));
        } catch (Exception e) {
            System.out.println("Change to Integer.");
        }

        return p;
    }

    public int getValueX() {
        return this.x;
    }

    public void setX(int x) {
        FieldUtil.checkNullOrEmptyOrBlank(String.valueOf(x), "x");
        this.x = x;
    }

    public int getValueY() {
        return this.y;
    }

    public void setY(int y) {
        FieldUtil.checkNullOrEmptyOrBlank(String.valueOf(y), "y");
        this.y = y;
    }

    public int getValueZ() {
        return this.z;
    }

    public void setZ(int z){
        FieldUtil.checkNullOrEmptyOrBlank(String.valueOf(z), "z");
        this.z = z;
    }

    @Override
    
    public String toString() {
        System.out.println("After input all coordinates of points : \n");
        return "{x=" + x+", y=" +y+", z=" +z+"}";
        
    }

    public class inputData {
    }

}

class FieldUtil {

    public static void checkNullOrEmptyOrBlank(String field, String label ) {
        if(field == null) {
            throw new NullPointerException(label + " should not be null.");
        }
         else if(field.isEmpty() || field.isBlank()) {
            throw new IllegalArgumentException(label + " should not be empty or blank.");
        }
        // else {
        //     System.out.println("noting display.");
        // }
    }
}
