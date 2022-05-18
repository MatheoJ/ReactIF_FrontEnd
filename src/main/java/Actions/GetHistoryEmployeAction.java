/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Actions;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import metier.modele.Employe;
import metier.modele.Intervention;
import metier.service.Service;

/**
 *
 * @author mjoseph
 */
public class GetHistoryEmployeAction extends Action {

    public GetHistoryEmployeAction(Service service) {
        super(service);
    }

    @Override
    public void executer(HttpServletRequest request) {
        Employe employe = (Employe) request.getAttribute("employe");
        
        List<Intervention> interventionList = service.consulterHistoriqueIntervention(employe);
        request.setAttribute("interventionList",interventionList);
    }

}
