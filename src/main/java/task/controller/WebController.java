package task.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import task.model.UserDataSet;
import task.service.UserServiceImpl;

import javax.validation.Valid;
import java.util.List;

@Controller
public class WebController {

    private UserServiceImpl usi;

    @Autowired
    public void setUsi(UserServiceImpl usi) {
        this.usi = usi;
    }

    @RequestMapping(value = {"/", "/index"})
    public String viewHomePage(Model model){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if ((!(auth instanceof AnonymousAuthenticationToken)) && auth != null) {
            UserDataSet loguser = (UserDataSet) auth.getPrincipal();
            model.addAttribute("userlogined", loguser);
//            return "adminpage";
        }
        return "login";
    }

    @GetMapping(value = "/login")
    public ModelAndView login() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("login");
        return mav;
    }

    @GetMapping("/adminpage")
    public String usersList(Model model) {
        List<UserDataSet> usersList = usi.findAllUsers();
        model.addAttribute("usersList", usersList);
        model.addAttribute("user", new UserDataSet());
        return "adminpage";
    }

    @PostMapping("/adminpage")
    public String saveUser(@ModelAttribute("user") @Valid UserDataSet uds, BindingResult bindingResult, Model model) {

        if (!usi.saveUser(uds)) {
            model.addAttribute("loginError", "Логин уже существует");
            return "adminpage";
        }

        if (bindingResult.hasErrors()) {
            return "adminpage";
        } else {
            usi.saveUser(uds);
        }

        return "adminpage";
    }

    @RequestMapping("/adminpage/save")
    public String saveUser(@ModelAttribute("user") UserDataSet uds)  {
        usi.saveUser(uds);
        return "adminpage";
    }

    @RequestMapping("/adminpage/edit/{id}")
    public ModelAndView editUser(@PathVariable(name = "id") long id) {
        ModelAndView mav = new ModelAndView("AdminForm");
        UserDataSet usd = usi.getUserById(id);

        mav.addObject("user", usd);
        return mav;
    }

    @RequestMapping("/adminpage/delete/{id}")
    public String deleteUser(@PathVariable(name = "id") long id) {
        usi.removeUser(id);
        return "redirect:/";
    }

    @GetMapping(value = "/news")
    public ModelAndView news() {
        ModelAndView mav = new ModelAndView();
        UserDataSet user = (UserDataSet) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        mav.addObject("user", user);
        mav.setViewName("news");
        return mav;
    }

//    @RequestMapping(value={"/","home"})
//    public String home(){
//        return "home";
//    }
//
//    @RequestMapping(value="/user")
//    public String user(){
//        return "user";
//    }
//
//    @RequestMapping(value="/admin")
//    public String admin(){
//        return "admin";
//    }
//
//    @RequestMapping(value="/login")
//    public String login(){
//        return "login";
//    }
//
//    @RequestMapping(value="/403")
//    public String Error403(){
//        return "403";
//    }
}
