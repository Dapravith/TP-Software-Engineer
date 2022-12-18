

import java.util.HashMap;
import java.util.Map;

public class UserDataStore {

    private static UserDataStore instance = new UserDataStore();

    /**
     * Map of usernames to their passwords.
     */
    private Map<String, String> userMap = new HashMap<>();

    public static UserDataStore getInstance() {
        return instance;
    }

    // This class is a singleton. Call getInstance() instead.
    private UserDataStore() {
    }

    public boolean isUsernameTaken(String username) {
        return userMap.containsKey(username);
    }

    public void registerUser(String username, String password) {
        userMap.put(username, password);
    }

    public boolean isLoginCorrect(String username, String password) {

        // username isn't registered
        if (!userMap.containsKey(username)) {
            return false;
        }

        String storedPassword = userMap.get(username);

        return password.equals(storedPassword);
    }

}