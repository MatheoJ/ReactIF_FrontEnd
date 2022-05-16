/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Actions;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import metier.modele.Client;
import metier.service.Service;

/**
 *
 * @author mjoseph
 */
public class SignUpClientAction extends Action{

    public SignUpClientAction(Service service) {
        super(service);
    }

    @Override
    public void executer(HttpServletRequest request) {     
        
        String pattern = "dd/MM/yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        
        String password = request.getParameter("password");
        String firstName = request.getParameter("firstName");
        String surName = request.getParameter("surName");
        String mail = request.getParameter("mail");
        String phoneNumber = request.getParameter("phoneNumber");
        String adress = request.getParameter("adress");        
        Date birthDate=null;
        try {
            birthDate = simpleDateFormat.parse(request.getParameter("birthDate"));
        } catch (ParseException ex) {
            Logger.getLogger(SignUpClientAction.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        Client newClient = new Client(surName, firstName, mail, password, phoneNumber, adress, birthDate);
        
        Client clientCree = service.inscrireClient(newClient);
        
        if(clientCree==null){
            request.setAttribute("signedUp",false);
        }
        else{
            request.setAttribute("signedUp",true);
            request.setAttribute("client",clientCree);
        }
    }
    
}
