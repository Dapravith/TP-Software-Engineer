package Exercise1;

public class Circle {
    private Point center;
    private Point p;

    public Circle(Point center, Point p) {
        this.center = center;
        this.p = p;
    }

    public double length() {
        double length = 0;
        length = 2 * Math.PI * center.distance(center, p);
        return length;
    }

    public double radius() {
        double radius = 0;
        radius = center.distance(center, p);
        return radius;
    }

    public double surface() {
        double surface = 0;
        surface = Math.PI * radius() * length();
        return surface;

    }

}
