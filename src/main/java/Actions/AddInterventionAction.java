/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Actions;

import com.google.gson.JsonObject;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import metier.modele.Client;
import metier.modele.Intervention;
import metier.modele.InterventionAnimal;
import metier.modele.InterventionIncident;
import metier.modele.InterventionLivraison;
import metier.service.Service;

/**
 *
 * @author mjoseph
 */
public class AddInterventionAction extends Action {

    public AddInterventionAction(Service service) {
        super(service);
    }

    @Override
    public void executer(HttpServletRequest request) {
        Client client = (Client) request.getAttribute("client");
        String description = (String) request.getAttribute("description");
        Intervention intervention = null;
        switch ((String) request.getParameter("todo")) {
            case "intervention-animal":
                String animal = (String) request.getAttribute("species");
                intervention = new InterventionAnimal(animal, description);
                break;
            case "intervention-delivery":
                String object = (String) request.getAttribute("object");
                String company = (String) request.getAttribute("company");
                intervention = new InterventionLivraison(object, company, description);
                break;
            case "intervention-incident":
                intervention = new InterventionIncident(description);
                break;

        }
        if (intervention != null) {
            Intervention newIntervention = service.demanderIntervention(intervention, client);
            request.setAttribute("intervention", newIntervention);
        } else {
            request.setAttribute("intervention", null);
        }

    }

}
