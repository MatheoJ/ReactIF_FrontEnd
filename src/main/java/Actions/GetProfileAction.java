/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Actions;

import com.google.gson.JsonObject;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import metier.modele.Client;
import metier.modele.Intervention;
import metier.service.Service;

/**
 *
 * @author mjoseph
 */
public class GetProfileAction extends Action {

    public GetProfileAction(Service service) {
        super(service);
    }

    @Override
    public void executer(HttpServletRequest request) {
        Client client = (Client) request.getAttribute("client");
        
        // If a client can only have one simultaneous intervention:
        // Intervention currentIntervention = service.recupererInterventionEnCours(client); // return null if it doesn't exist
        // Else:
        
        List<Intervention> interventionList = service.consulterHistoriqueIntervention(client);
        List<Intervention> currentInterventionList = new ArrayList<>();
        int nbInterventionsByType[] = new int[3];
        for (Intervention intervention: interventionList)
        {
            if (intervention.getEtat().equals("En cours"))
            {
                currentInterventionList.add(intervention);
            }
            
            switch (intervention.getType())
            {
                case "Animal":
                    ++nbInterventionsByType[0];
                    break;
                case "Incident":
                    ++nbInterventionsByType[1];
                    break;
                case "Livraison":
                    ++nbInterventionsByType[2];
                    break;
            }
        }
        
        request.setAttribute("current_intervention_list", currentInterventionList);
        request.setAttribute("nbAnimal",nbInterventionsByType[0]);
        request.setAttribute("nbIncident",nbInterventionsByType[1]);
        request.setAttribute("nbDelivery",nbInterventionsByType[2]);
        request.setAttribute("nbTotal",nbInterventionsByType[0]+nbInterventionsByType[1]+nbInterventionsByType[2]);
    }

}
