package Exercise3;

import java.util.ArrayList;

public class List {
    int id;
    String condition;
    ArrayList<List> list = new ArrayList<>();

    public List() {
    }

    public List(int id, String condition) {
        this.id = id;
        this.condition = condition;
    }

    public void addList(int id, String condition) {
        list.add(new List(id, condition));
    }

    public void displayList() {
        for (List list2 : list) {
            System.out.printf("Computer %d\t: Condition: %s\n", list2.id, list2.condition);
        }
    }

    public void listGood() {
        for (List list2 : list) {
            if (list2.condition.equals("good")) {
                System.out.printf("Computer %d\t: Condition: %s\n", list2.id, list2.condition);
            }
        }
    }
    
    public void listDamage() {
        for (List list2 : list) {
            if (list2.condition.equals("damage")) {
                System.out.printf("Computer %d\t: Condition: %s\n", list2.id, list2.condition);
            }
        }
    }

    public void markGood(int id) {
        int index = 0;
        for (List list2 : list) {
            if (list2.id == id) {
                list.set(index, new List(id, "good"));
            } else {
                index++;
            }
        }
    }
    
    public void markDamage(int id) {
        int index = 0;
        for (List list2 : list) {
            if (list2.id == id) {
                list.set(index, new List(id, "damage"));
            } else {
                index++;
            }
        }
    }
}