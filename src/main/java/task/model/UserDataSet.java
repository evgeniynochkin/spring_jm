package task.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table (name = "userslist")
public class UserDataSet implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "user_id")
    private long id;

    @Column (name = "username", unique = true)
    @Size(min=3, message="Не менее 3 знаков")
    private String username;

    @Column (name = "login")
    @Size(min=3, message="Не менее 3 знаков")
    private String login;

    @Column (name = "password")
    @Size(min=3, message="Не менее 3 знаков")
    private String password;

    @Column
    @Transient
    private String passwordConfirm;

    @Column
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(name="userlist_roles",
            joinColumns = @JoinColumn(name = "user_data_set_user_id"),
            inverseJoinColumns = @JoinColumn(name = "roles_role_id"))
    private Set<Role> roles = new HashSet<>();

    public UserDataSet() {}

    public void setId(long id) { this.id = id; }

    public void setUsername(String username) { this.username = username; }

    public void setLogin(String login) { this.login = login; }

    public void setPassword(String password) { this.password = password; }

    public void setRoles(Set<Role> roles) { this.roles = roles; }

    public void setPasswordConfirm(String passwordConfirm) { this.passwordConfirm = passwordConfirm; }

    public long getId() { return id; }

    public String getLogin() { return login; }

    public Set<Role> getRoles() { return roles; }

    public String getPasswordConfirm() { return passwordConfirm; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> rolesList = getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRole()))
                .collect(Collectors.toList());

        return rolesList;
    }

    public String getPassword() { return password; }

    @Override
    public String getUsername() { return username; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

    @Override
    public String toString() {
        return "model.User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", login='" + login + '\'' +
                ", password=" + password +
//                ", role=" + roles +
                '}';
    }
}
