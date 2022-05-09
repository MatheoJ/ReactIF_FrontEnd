package Actions;


import javax.servlet.http.HttpServletRequest;
import metier.service.Service;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author mjoseph
 */
public abstract class Action {
    Service service;
    public Action(Service service){
        this.service =service;
    }
    public abstract void executer(HttpServletRequest request);
}
