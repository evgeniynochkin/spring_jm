package task.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name="user_role")
public class Role implements GrantedAuthority {

    @Id
    @Column(name = "role_id")
    private Long id;

    @Column(name = "role")
    private String role;

//    @Transient
//    private Set<UserDataSet> users;

    public Role() {}

    public Role(Long id) {
        this.id = id;
    }

    public Role(Long id, String role) {
        this.id = id;
        this.role = role;
    }

    public void setId(Long id) { this.id = id; }

    public void setRole(String role) { this.role = role; }

//    public void setUsers(Set<UserDataSet> users) { this.users = users; }

    public Long getId() { return id; }

    public String getRole() { return role; }

//    public Set<UserDataSet> getUsers() { return users; }

    @Override
    public String getAuthority() { return role; }
}
