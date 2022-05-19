/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package vues;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import metier.modele.Client;
import metier.modele.Intervention;
import metier.modele.InterventionAnimal;
import metier.modele.InterventionIncident;
import metier.modele.InterventionLivraison;

/**
 *
 * @author mjoseph
 */
public class GetProfileSerialization extends Serialization {

    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response) throws IOException {

        JsonObject container = new JsonObject();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();

        List<Intervention> currentInterventionList = (List<Intervention>) request.getAttribute("current_intervention_list");
        JsonArray currentInterventionArray = new JsonArray();
        container.addProperty("current_intervention_exists",(currentInterventionList!=null && !currentInterventionList.isEmpty()));

        for (Intervention i : currentInterventionList) {
            JsonObject jsonIntervention = new JsonObject();
            jsonIntervention.addProperty("type", i.getType());
            String pattern = "dd/MM/yyyy";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            jsonIntervention.addProperty("start_date", simpleDateFormat.format(i.getDateDemande()));
            if (i.getEtat().equals("Terminé")) {
                jsonIntervention.addProperty("end_date", simpleDateFormat.format(i.getDateCloture()));
            }
            jsonIntervention.addProperty("id", i.getId());
            jsonIntervention.addProperty("description", i.getDescription());
            jsonIntervention.addProperty("address", i.getClient().getAdresse());
            jsonIntervention.addProperty("state", i.getEtat());
            jsonIntervention.addProperty("status", i.getStatut());

            JsonObject jsonEmployee = new JsonObject();
            jsonEmployee.addProperty("last_name", i.getEmploye().getNom());
            jsonEmployee.addProperty("first_name", i.getEmploye().getPrenom());
            jsonIntervention.add("employee", jsonEmployee);

            switch (i.getType()) {
                case "Animal":
                    jsonIntervention.addProperty("species", ((InterventionAnimal) i).getEspeceAnimal());
                    break;
                case "Incident":
                    // EMPTY
                    break;
                case "Livraison":
                    jsonIntervention.addProperty("object", ((InterventionLivraison) i).getObjet());
                    jsonIntervention.addProperty("company", ((InterventionLivraison) i).getEntreprise());
                    break;
            }
            currentInterventionArray.add(jsonIntervention);
        }

        container.add("current_intervention_list", currentInterventionArray);

        Boolean connection = (Boolean) request.getAttribute("connection");
        Integer nbTotal = (Integer) request.getAttribute("nbTotal");
        Integer nbAnimal = (Integer) request.getAttribute("nbAnimal");
        Integer nbDelivery = (Integer) request.getAttribute("nbDelivery");
        Integer nbIncident = (Integer) request.getAttribute("nbIncident");

        container.addProperty("nbTotal", nbTotal);
        container.addProperty("nbAnimal", nbAnimal);
        container.addProperty("nbDelivery", nbDelivery);
        container.addProperty("nbIncident", nbIncident);
        
        JsonObject jsonClient = new JsonObject();
        Client client = (Client) request.getAttribute("client");
        jsonClient.addProperty("id", client.getId());
        jsonClient.addProperty("last_name", client.getNom());
        jsonClient.addProperty("first_name", client.getPrenom());
        jsonClient.addProperty("email", client.getMail());
        jsonClient.addProperty("address", client.getAdresse());
        jsonClient.addProperty("phone_number", client.getTelephone());
        String pattern = "dd/MM/yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        jsonClient.addProperty("signup_date", simpleDateFormat.format(client.getDateInscription()));

        container.add("client", jsonClient);

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
    }

}
