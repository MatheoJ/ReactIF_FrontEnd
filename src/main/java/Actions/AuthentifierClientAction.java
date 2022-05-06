/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Actions;

//import fr.insalyon.dasi.metier.modele.Client;
//import fr.insalyon.dasi.metier.service.Service;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author mjoseph
 */
public class AuthentifierClientAction extends Action {

    public AuthentifierClientAction(Service service) {
        super(service);
    }

    @Override
    public void executer(HttpServletRequest request) {
        String login = request.getParameter("login");
        String password = request.getParameter("password");
        
        Client client = service.authentifierClient(login, password);
        
        if(client==null){
            request.setAttribute("connexion",false);
        }
        else{
            request.setAttribute("connexion",true);
            request.setAttribute("client",client);
        }       
        
    }
    
   
}
