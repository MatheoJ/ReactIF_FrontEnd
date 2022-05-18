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
import metier.modele.Intervention;
import metier.service.Service;

/**
 *
 * @author mjoseph
 */
public class EndInterventionAction extends Action {

    public EndInterventionAction(Service service) {
        super(service);
    }

    @Override
    public void executer(HttpServletRequest request) {
        String statut = request.getParameter("statut");
        String commmentaire = request.getParameter("commentaire");
        Employe employe = (Employe) request.getAttribute("employe");
        
        Intervention i = service.cloturerIntervention(service.recupererInterventionEnCours(employe), statut, commmentaire);
        
        if(i==null){
            request.setAttribute("endSuccess",false);
        }
        else{
            request.setAttribute("endSuccess",true);
        }               
    }
    
   
}
