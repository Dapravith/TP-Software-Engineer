package Ex1_StudentClass;

import java.io.File;
import java.lang.reflect.Field;

public class FieldUtil {
    
    public static void checkNullOrEmptyOrBlank(String field, String label) {
        if(field == null) {
            throw new NullPointerException(label + " should not be null.");
        }
        if(field.isEmpty() || field.isBlank()){
            throw new IllegalArgumentException(label + " should not be empty or blank.");
        }
    }
}
