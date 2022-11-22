//Exercise 2

public class Oddnumbers {
    public static void main(String[] args) {
        for (int i=0;i<=500;i++){
            OddEven odd = new OddEven(i);
            if(odd.isOdd()){
                System.out.print(i + " ");
            }
        }
    }
}


class OddEven {
    int num;

    public OddEven(int number) {
        num = number;
    }
    public boolean isOdd() {
        if(num%2 == 0){
            return false;
        }
        return true;
    }

    public boolean isEven(){
        if(num%2 == 0){
            return false;
        }
        return true;
    }
    
}
