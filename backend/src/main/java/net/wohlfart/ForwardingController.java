package net.wohlfart;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ForwardingController {

    // this should match the router config on the client side
    @RequestMapping(
            value = {
                    "/home",
                    "/login",
                    "/user",
                    "/register"
            },
            method = RequestMethod.GET
    )
    public String forward() {
        return "forward:/index.html";
    }
    // see: https://stackoverflow.com/questions/38783773/spring-boot-single-page-application-forward-every-request-to-index-html
}