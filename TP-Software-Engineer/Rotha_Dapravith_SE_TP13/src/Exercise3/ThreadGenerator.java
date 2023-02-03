package src.Exercise3;

import java.util.Scanner;

public class ThreadGenerator implements Runnable {
    public int threadIndex;

    public ThreadGenerator(int threadIndex) {
        this.threadIndex = threadIndex;
    }

    @Override
    public void run() {
        System.out.print(threadIndex + " ");
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of thread: ");
        int num = sc.nextInt();

        Thread tr[] = new Thread[num];
        for (int i = 0; i < num; i++) {
            tr[i] = new Thread(new ThreadGenerator(i));
            tr[i].start();
        }

        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\nWhen using the join() method, the thread will other thread to complete orderly");

        for (int i = 0; i < num; i++) {
            tr[i] = new Thread(new ThreadGenerator(i));
            tr[i].start();
            try {
                tr[i].join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        sc.close();
    }
}
