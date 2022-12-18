// TP7.2. SMS Encrypt


import java.util.*;
import java.io.*;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;

enum SMStype {
    TEXT, MMS
}

enum SMSstatus {
    NEW, READ
}
class SMS{
    String Subject;
    String From_phoneNumber;
    String Receive_phoneNumber;
    String Content;
    SMSstatus status = SMSstatus.NEW;
    SMStype type = SMStype.TEXT;

    public String getSubject() {
        return Subject;
    }
    public void setSubject(String subject) {
        Subject = subject;
    }
    public String getFrom() {
        return From_phoneNumber;
    }
    public void setFrom(String fromPhoneNumber) {
        From_phoneNumber = fromPhoneNumber;
    }
    public String getReceive() {
        return Receive_phoneNumber;
    }

    public void setReceive(String receivePhoneNumber) {
        Receive_phoneNumber = receivePhoneNumber;
    }
    public String getContent() {
        return Content;
    }
    public void setContent(String content) {
        Content = content;
    }
    public SMS(String Subject, String Sender, String Receiver, String Content) {
        this.Subject = Subject;
        this.From_phoneNumber = Sender;
        this.Receive_phoneNumber = Receiver;
        this.Content = Content;
    }
    public SMS() {
        this("", "", "", "");
    }
}

public class SMSEncrypt{
    public static void main(String[] args) throws Exception {
        int opt;
        Scanner input = new Scanner(System.in);
        SMSList manageSms = new SMSList();

        do{
            System.out.print("""
                \t+==============================================================+
                \t|        ***  ENCRYPTION MENU ***                              |
                \t+==============================================================+
                \t| 1. SEND NEW SMS WITH ENCRYPTED CONTENT USING PASSWORD METHOD |
                \t| 2. VIEW SMS DETAIL                                           |
                \t| 3. LIST SMSes                                                |
                \t| 4. REMOVE SMSes BY INDEX                                     |
                \t| 5. QUIT                                                      |
                \t+==============================================================+
             """);
            System.out.print("Please choose an option for Encrypt Menu : ");
            opt = input.nextInt();
            switch (opt) {
                case 1: {
                    manageSms.sendSMS();
                    break;
                }
                case 2: {
                    manageSms.viewSMSDetail();
                    break;
                }
                case 3: {
                    manageSms.listSMS();
                    break;
                }
                case 4: {
                    manageSms.viewSMSDetail();
                    manageSms.removeSMS();
                    break;
                }
                case 5: {
                	System.out.print("Thanks for using our program !!!"); 
                	System.out.println("\n-----------------------------------------------------------------------");
                	break;
                }
                default: System.out.println("Enter not found !!!");
            }
        } while (opt != 5);

        input.close();
    }
}

class SMSList {
    Scanner input = new Scanner(System.in);
    ArrayList<SMS> arr = new ArrayList<>();
    SMS sms = new SMS();
    static int maxCharacter = 50; 
    int verify = 1;

    public void sendSMS() throws Exception {
        String con,sub,sender,receiver;
        SMS sms = new SMS();
        System.out.print("Enter Subject : ");
        sub = input.nextLine();
        sms.setSubject(sub);
        System.out.print("From phone number : ");
        sender = input.nextLine();
        sms.setFrom(sender);
        System.out.print("To phone number : ");
        receiver = input.nextLine();
        sms.setReceive(receiver);
        System.out.print("Enter content(Under 50 words) : ");
        con = input.nextLine();
        String encrypt_content = encryptedContent(con,sub,sender,receiver);
        sms.setContent(encrypt_content);
        sms.type = SMStype.TEXT;
        sms.status = SMSstatus.NEW;

        arr.add(sms);
    }
    
    public String encryptedContent(String con, String sub, String sender, String receiver) throws Exception {

        FileOutputStream myWriter = new FileOutputStream("SMSdata.txt", true);
        con = con + ";" + sub + ";" + sender + ";" + receiver + ":\n";
        myWriter.write(con.getBytes());
        myWriter.close();

        FileInputStream inFile = new FileInputStream("SMSdata.txt");
        FileOutputStream outFile = new FileOutputStream("SMSdata.des");

        String password = "123456";

        PBEKeySpec pbeKeySpec = new PBEKeySpec(password.toCharArray());
        SecretKeyFactory secretKeyFactory = SecretKeyFactory
                .getInstance("PBEWithMD5AndTripleDES");
        SecretKey secretKey = secretKeyFactory.generateSecret(pbeKeySpec);

        byte[] salt = new byte[8];
        Random random = new Random();
        random.nextBytes(salt);

        PBEParameterSpec pbeParameterSpec = new PBEParameterSpec(salt, 100);
        Cipher cipher = Cipher.getInstance("PBEWithMD5AndTripleDES");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, pbeParameterSpec);
        outFile.write(salt);

        byte[] input = new byte[64];
        int bytesRead;
        while ((bytesRead = inFile.read(input)) != -1) {
            byte[] output = cipher.update(input, 0, bytesRead);
            if (output != null)
                outFile.write(output);
        }

        byte[] output = cipher.doFinal();
        if (output != null)
            outFile.write(output);

        FileReader fileReader = new FileReader("SMSdata.des");

        BufferedReader bufferedReader = new BufferedReader(fileReader);

        String line, conline = "";
        while ((line = bufferedReader.readLine()) != null) {
            conline = conline + line;
        }
        bufferedReader.close();
        inFile.close();
        outFile.flush();
        outFile.close();
        return conline;
    }

    public String decryptedContent(int pass) throws Exception {

        String password = "123456";
        String res = "";
        if (pass == 1) {
            do {
                System.out.print("Enter password for using decryption("+(4-pass)+" try): ");
                password = input.next();
                if (password.compareTo("123456") == 0) {
                    System.out.println("Password corrected!");
                    break;
                } else {
                    System.out.println("INCORRECT password!");
                }
                pass++;
            } while (pass != 4);
        }
        if (password.compareTo("123456") == 0) {
            PBEKeySpec pbeKeySpec = new PBEKeySpec(password.toCharArray());
            SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance("PBEWithMD5AndTripleDES");
            SecretKey secretKey = secretKeyFactory.generateSecret(pbeKeySpec);

            FileInputStream fis = new FileInputStream("SMSdata.des");
            byte[] salt = new byte[8];
            fis.read(salt);

            PBEParameterSpec pbeParameterSpec = new PBEParameterSpec(salt, 100);

            Cipher cipher = Cipher.getInstance("PBEWithMD5AndTripleDES");
            cipher.init(Cipher.DECRYPT_MODE, secretKey, pbeParameterSpec);
            FileOutputStream fos = new FileOutputStream("SMSdata_decrypted.txt");
            byte[] in = new byte[64];
            int read;
            while ((read = fis.read(in)) != -1) {
                byte[] output = cipher.update(in, 0, read);
                if (output != null)
                    fos.write(output);
            }

            byte[] output = cipher.doFinal();
            if (output != null)
                fos.write(output);
            fis.close();
            fos.flush();
            fos.close();
            if (verify == 1) {
                readSMS();
            }
            verify = 0;
        } else {
            System.out.println("Your PASSWORDS is INCORRECT!! Please try again!!");
            res = "false";
        }
        return res;
    }
   
    public void readSMS() throws Exception {
        
        int num = 100;
        String[] subject = new String[num];
        String[] sender = new String[num];
        String[] receiver = new String[num];
        String[] content = new String[num];

        FileReader fileReader = new FileReader("SMSdata_decrypted.txt");

        BufferedReader bufferedReader = new BufferedReader(fileReader);

        String line, str = "";
        while ((line = bufferedReader.readLine()) != null) {
            str = str + line;
        }
        
        bufferedReader.close();
        

        String[] student_data = str.split(":");

        int c = 0;
        for (String a : student_data) {
            SMS sms = new SMS();
            String[] student = a.split(";");

            content[c] = student[0];
            subject[c] = student[1];
            sender[c] = student[2];
            receiver[c] = student[3];

            sms.setSubject(subject[c]);
            sms.setFrom(sender[c]);
            sms.setContent(content[c]);
            sms.setReceive(receiver[c]);
            sms.type = SMStype.TEXT;
            sms.status = SMSstatus.NEW;
            arr.add(sms);

            c++;
        }

    }
    
    public void readableSms() {
        System.out.print("Input index of Sms[0-" + (arr.size() - 1) + "]: ");
        int index = Integer.parseInt(input.next());

        if (index >= 0 && index < arr.size()) {
            System.out.println(
                    "\nSubject: " + arr.get(index).getSubject() + "\tFrom: " + arr.get(index).getFrom());
            System.out.println("To: " + arr.get(index).getReceive());
            System.out.println("\nContent:");
            System.out.println("\t" + arr.get(index).getContent());
            arr.get(index).status = SMSstatus.READ;
        } else {
            System.out.println("Index out of bound!");
        }
    }

    public void viewSMSDetail() {
        if(verify == 1) {
            System.out.printf("""
                +============================================================================================================================+
                |    %-15s    |  %-20s | %-20s |  %-10s  |   %-20s   | %-10s |
                +============================================================================================================================+\n""","SUBJECT","SENDER PHONE NUMBER","RECEIVER PHONE NUMBER","TYPE","CONTENT","STATUS");
        }else {
            System.out.printf("""
                +============================================================================================================================+
                |    %-15s    |  %-20s | %-20s |  %-10s  |   %-20s   | %-10s |
                +============================================================================================================================+\n""","SUBJECT","SENDER PHONE NUMBER","RECEIVER PHONE NUMBER","TYPE","CONTENT","STATUS");
        }
        for (SMS sms : arr) {
            System.out.printf("|    %-15s    |  %-20s | %-20s  |  %-7s  |   %-17.17s...   | %-7s |\n", sms.getSubject(),
                    sms.getFrom(),
                    sms.getReceive(), sms.type,
                    sms.getContent(),sms.status);
        }
        System.out.println(
                "--------------------------------------------------------------------------------------------------------------------------");
    }
    
    public void listSMS() {
        System.out.println("""
                        +===============================================================================+
                        |        SUBJECT        |  SENDER PHONE NUMBER | RECEIVER PHONE NUMBER |  TYPE  |
                        +===============================================================================+""");
        for (SMS sms : arr) {
            System.out.printf("| %-20s  | %-20s | %-21s | %-6s |\n", sms.getSubject(),
                    sms.getFrom(),
                    sms.getReceive(), sms.type);
        }
        System.out.println("---------------------------------------------------------------------------------");
    }

    public void removeSMS() {
        int removeSms;
        System.out.print("\nInput index[0-" + (arr.size() - 1) + "] to remove: ");
        removeSms = Integer.parseInt(input.next());

        if (removeSms < arr.size() && removeSms >= 0) {
            arr.remove(removeSms);
            System.out.println("SMS has been SUCCESSFULLY REMOVED!");
        } else {
            System.out.println("ERROR: INDEX OUT OF RANK!");
        }
    }
}
    