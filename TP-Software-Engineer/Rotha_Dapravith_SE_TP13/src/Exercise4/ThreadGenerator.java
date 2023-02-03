package src.Exercise4;

import java.util.Scanner;

public class ThreadGenerator implements Runnable {
    public int index, start, end;
    public int primeCount, sumPrime;

    public ThreadGenerator(int index, int start, int end) {
        this.index = index;
        this.start = start;
        this.end = end;
    }

    @Override
    public void run() {
        primeCount = 0;
        sumPrime = 0;
        for (int i = start; i < end; i++) {
            if (isPrime(i)) {
                System.out.print("t" + index + "-" + i + "  ");
                primeCount++;
                sumPrime+=i;
            }
        }
    }

    public boolean isPrime(int num) {
        for (int i = 2; i < num / 2; i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return num == 1 ? false : true;
    }

    public int getPrimeCount() {
        return primeCount;
    }

    public int getSumPrime(){
        return sumPrime;
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        System.out.print("Input start: ");
        int start = sc.nextInt();
        System.out.print("Input end: ");
        int end = sc.nextInt();

        int numThread = (end - start) / 100 + ((end - start) % 100 == 0 ? 0 : 1);// +1 if numThread  has its fraction part

        Thread tr[] = new Thread[numThread];
        ThreadGenerator obj[] = new ThreadGenerator[numThread];
        System.out.println("Running " + numThread + " thread"+(numThread==1?"":"(s)"));

        for (int t = 0; t < numThread; t++) {
            obj[t] = new ThreadGenerator(t, start, (start + 100) < end ? (start + 100) : end);
            tr[t] = new Thread(obj[t]);
            tr[t].start();
            start += 100;
        }

        int numPrime = 0;
        int sum = 0;
        for (int i = 0; i < numThread; i++) {
            try {
                tr[i].join();//get sum and number of prime when the threads are finished
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            numPrime += obj[i].getPrimeCount();
            sum+=obj[i].getSumPrime();
        }

        System.out.println("\n-\nNumber of primes: " + numPrime);
        System.out.println("Sum of primes: " + sum);

        sc.close();
    }
}