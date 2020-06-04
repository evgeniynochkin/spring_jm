package task.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import task.DAO.UserDataSetRepository;
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

    @GetMapping(value = {"/", "/index"})
    public ModelAndView login() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("index");
        return mav;
    }

    @GetMapping(value = {"/adminpage"})
    public ModelAndView adminpage() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("adminpage");
        return mav;
    }

    @PostMapping("/adminpage")
    public String saveUser(@ModelAttribute("user") @Valid UserDataSet uds, BindingResult bindingResult, Model model) {

        if (!usi.saveUser(uds)) {
            model.addAttribute("loginError", "Логин уже существует");
            return "redirect:/adminpage";
        }

        if (bindingResult.hasErrors()) {
            return "redirect:/adminpage";
//        } else {
//            usi.saveUser(uds);
        }

        return "redirect:/adminpage";
    }

    @GetMapping(value = "/news")
    public ModelAndView news() {
        ModelAndView mav = new ModelAndView();
        UserDataSet user = (UserDataSet) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        mav.addObject("user", user);
        mav.setViewName("news");
        return mav;
    }
}
