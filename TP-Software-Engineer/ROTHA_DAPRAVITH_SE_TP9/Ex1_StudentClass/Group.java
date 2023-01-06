package Ex1_StudentClass;

public class Group {
    private String name;
    private String description;
    public Group(String name) {
        this.name = name;
        description="";

    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return name;
    }
}
