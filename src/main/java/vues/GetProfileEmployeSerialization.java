/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package vues;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import metier.modele.Client;
import metier.modele.Employe;
import metier.modele.Intervention;
import metier.modele.InterventionAnimal;
import metier.modele.InterventionIncident;
import metier.modele.InterventionLivraison;

/**
 *
 * @author mjoseph
 */
public class GetProfileEmployeSerialization extends Serialization {

    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response) throws IOException {

        JsonObject container = new JsonObject();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        
        JsonObject jsonCurrentIntervention = new JsonObject();
        Intervention currentIntervention = (Intervention) request.getAttribute("currentIntervention");
        jsonCurrentIntervention.addProperty("exists",(currentIntervention!=null));
        if(currentIntervention!=null){

            jsonCurrentIntervention.addProperty("type", currentIntervention.getType());        
            String pattern = "dd/MM/yyyy";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            jsonCurrentIntervention.addProperty("date", simpleDateFormat.format(currentIntervention.getDateDemande()));
            jsonCurrentIntervention.addProperty("id", currentIntervention.getId());
            jsonCurrentIntervention.addProperty("description", currentIntervention.getDescription());
            jsonCurrentIntervention.addProperty("adresse", currentIntervention.getClient().getAdresse());
            
            JsonObject jsonEmployee = new JsonObject();
            jsonEmployee.addProperty("last_name", currentIntervention.getEmploye().getNom());
            jsonEmployee.addProperty("first_name", currentIntervention.getEmploye().getPrenom());
            jsonCurrentIntervention.add("employee", jsonEmployee);

            switch (currentIntervention.getType())
            {
                case "Animal":
                    jsonCurrentIntervention.addProperty("species", ((InterventionAnimal) currentIntervention).getEspeceAnimal());
                    break;
                case "Incident":
                    // EMPTY
                    break;
                case "Livraison":
                    jsonCurrentIntervention.addProperty("object", ((InterventionLivraison) currentIntervention).getObjet());
                    jsonCurrentIntervention.addProperty("company", ((InterventionLivraison) currentIntervention).getEntreprise());
                    break;
            }
        }
        else{
        }
        
        
        container.add("intervention", jsonCurrentIntervention);
        
               
        JsonObject jsonEmploye = new JsonObject();
        Employe employe = (Employe) request.getAttribute("employe");
        jsonEmploye.addProperty("id", employe.getId());
        jsonEmploye.addProperty("nom", employe.getNom());
        jsonEmploye.addProperty("prenom", employe.getPrenom());
        jsonEmploye.addProperty("mail", employe.getMail());
        container.add("client", jsonEmploye);
        container.addProperty("distance",(Double) request.getAttribute("distance"));
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
    }

}
