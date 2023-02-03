
import java.util.Scanner;

import com.github.kwhat.jnativehook.GlobalScreen;
import com.github.kwhat.jnativehook.NativeHookException;
import com.github.kwhat.jnativehook.keyboard.NativeKeyEvent;
import com.github.kwhat.jnativehook.keyboard.NativeKeyListener;

public class StopHits2 implements NativeKeyListener, Runnable {

    public static Scanner sc = new Scanner(System.in);
    public static String stop = "HitMe!";

    public String getStop() {
        return stop;
    }

    @Override
    public void run() {
        try {
            GlobalScreen.registerNativeHook();
        } catch (NativeHookException ex) {
            System.err.println("There was a problem registering the native hook.");
            System.err.println(ex.getMessage());
            System.exit(1);
        }
        GlobalScreen.addNativeKeyListener(new StopHits2());
    }

    public void nativeKeyPressed(NativeKeyEvent e) {
        stop=NativeKeyEvent.getKeyText(e.getKeyCode());
        //String stop here does not always have what is type, ex: . will return Period instead of.
        // enter key will return 'Enter' as String
         
        if (e.getKeyCode() == NativeKeyEvent.VC_ENTER) {
            try {
                GlobalScreen.unregisterNativeHook();
            } catch (NativeHookException nativeHookException) {
                nativeHookException.printStackTrace();
            }
        }
    }

    public void nativeKeyReleased(NativeKeyEvent e) {
        // System.out.println("Key Released: " +
        // NativeKeyEvent.getKeyText(e.getKeyCode()));
    }

    public void nativeKeyTyped(NativeKeyEvent e) {
        if(!stop.equals("Enter")) stop =e.getKeyChar() + "";
        //when press enter, could not get what e.getChar return,  tried '\0' and "" don't seem working
        //so have to check if the result from nativePresses() is not 'Enter' the String stop will get its value from here 
    }

    public static void main(String[] args) {
        StopHits2 hitMe = new StopHits2();
        Thread tr = new Thread(hitMe);
        tr.start();

        while (!hitMe.getStop().equals("Enter")) {

            System.out.print(hitMe.getStop());
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        System.out.println("\nThank You");
        sc.close();
    }

}
