package task.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import task.DAO.UserDataSetRepository;
import task.service.UserServiceImpl;

@Configuration
@EnableWebSecurity
@EnableJpaRepositories(basePackageClasses = UserDataSetRepository.class)
@EnableGlobalMethodSecurity(securedEnabled=true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserServiceImpl usi;

    @Autowired
    CustomizeAuthenticationSuccessHandler customizeAuthenticationSuccessHandler;

    @Autowired
    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(usi);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/news/**").access("hasAuthority('ROLE_USER')")
                .antMatchers("/adminpage/**", "/news/**").access("hasAuthority('ROLE_ADMIN')")
//                .antMatchers("/", "index").permitAll()
//                .antMatchers("/news/**").hasRole("USER")
//                .antMatchers("/adminpage/**", "/news/**").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and();
        http.formLogin()
                .loginPage("/index")
                .successHandler(customizeAuthenticationSuccessHandler)
//                .defaultSuccessUrl("/")
                .permitAll()
                .and();
        http.logout()
                .permitAll()
                .logoutSuccessUrl("/");
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() { return NoOpPasswordEncoder.getInstance();}

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests()
//                .antMatchers("/","/home").permitAll()
//                .antMatchers("/admin").hasRole("ADMIN")
//                .anyRequest().authenticated()
//                .and()
//                .formLogin().successHandler(customizeAuthenticationSuccessHandler)
//                .loginPage("/login")
//                .permitAll()
//                .and()
//                .logout()
//                .permitAll();
//        http.exceptionHandling().accessDeniedPage("/403");
//    }
//
//    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//        auth
//                .inMemoryAuthentication()
//                .passwordEncoder(NoOpPasswordEncoder.getInstance())
//                .withUser("user").password("user").roles("USER")
//                .and()
//                .withUser("admin").password("admin").roles("ADMIN");
//    }
}
