/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Actions;

import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author mjoseph
 */
public class InscrireClientAction extends Action{

    @Override
    public void executer(HttpServletRequest request) {     
        
        
        String password = request.getParameter("password");
        String firstName = request.getParameter("firstName");
        String surName = request.getParameter("surName");
        String mail = request.getParameter("mail");
        String phoneNumber = request.getParameter("phoneNumber");
        String adress = request.getParameter("adress");        
        String birthDate = request.getParameter("birthDate");
        
        Client newClient = new Client(surName, firstName, mail, password, phoneNumber, adress, birthDate);
        
        Client clientCree = service.inscrireClient(login, password);
        
        if(clientCree==null){
            request.setAttribute("inscription",false);
        }
        else{
            request.setAttribute("inscription",true);
            request.setAttribute("client",client);
        }
    }
    
}
