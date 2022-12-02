package Exercise2;

import java.util.ArrayList;
import java.util.Scanner;

public class Students {
    private String name;
    private String id;
    public Students(int id, String name){
        this.name = name;
        this.id = "e "+id;
    }

    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }
    public String getId(){
        return id;
    }
    public void setId(int id){
        this.id = "e "+ id;
    }
}
