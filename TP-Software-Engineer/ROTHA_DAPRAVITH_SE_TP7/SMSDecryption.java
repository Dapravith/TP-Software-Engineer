// TP7.3.SMS Decrypt

import java.util.*;

public class SMSDecryption {

    static SMSList list = new SMSList();
    SMS sms = new SMS();
    ArrayList<SMS> arr = new ArrayList<>();
    Scanner sc = new Scanner(System.in);

    // Password = 123456; Use to generate from  Encrypted SMS */

    public static void main(String[] args) throws Exception {
        Scanner input = new Scanner(System.in);
        SMSList list = new SMSList();
        int decrypt = 0;
        int choice;

        do {
            System.out.print("""

                \t+=================================================================================+
                \t|                 *** DECRYPTION MENU ***                                         |
                \t+=================================================================================+
                \t| 1. LIST ALL SMSes                                                               |
                \t| 2. VIEW SMS DETAIL (decrypt content using password)                             |
                \t| 3. VIEW READABLE SMSes (all SMS that can be decrypted using given password)     |
                \t| 4. REMOVE SMSes BY INDEX                                                        |
                \t| 5. QUIT                                                                         |
                \t+=================================================================================+
                """);
            System.out.print("Please select an option : ");
            choice = Integer.parseInt(input.next());
            
            switch (choice) {
                case 1: {
                    list.decryptedContent(decrypt);
                    list.listSMS();
                    break;
                }
                case 2: {
                    String res = list.decryptedContent(decrypt+1);
                    if (res != "false") {
                        list.viewSMSDetail();
                        decrypt = decrypt+2;
                    }
                    break;
                }
                case 3: {
                    if (decrypt != 0) {
                        list.viewSMSDetail();
                        list.readableSms();
                    } else {
                        System.out.println("First, we need to decrypted content in option 2 !!");
                    }
                    break;
                }
                case 4: {
                    list.removeSMS();
                }
                case 5: {
                    System.out.println("GOOD BYE!,Thanks for using our program !");
                    System.out.print("\n-----------------------------------------------------------------------");
                    break;
                }
                default: System.out.println("INVALID OPTION !!!");
            }
                
        } while (choice != 5);
        input.close();
    }
}
