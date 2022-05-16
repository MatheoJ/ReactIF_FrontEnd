/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Actions;

//import fr.insalyon.dasi.metier.modele.Client;
//import fr.insalyon.dasi.metier.service.Service;
import javax.servlet.http.HttpServletRequest;
import metier.modele.Employe;
import metier.service.Service;

/**
 *
 * @author mjoseph
 */
public class AuthentificateEmployeAction extends Action {

    public AuthentificateEmployeAction(Service service) {
        super(service);
    }

    @Override
    public void executer(HttpServletRequest request) {
        String login = request.getParameter("login");
        String password = request.getParameter("password");
        
        Employe employe = service.authentifierEmploye(login, password);
        
        if(employe==null){
            request.setAttribute("connection",false);
        }
        else{
            request.setAttribute("connection",true);
            request.setAttribute("employe",employe);
        }       
        
    }
    
   
}
