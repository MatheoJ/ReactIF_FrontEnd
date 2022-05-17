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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import metier.modele.Employe;

/**
 *
 * @author mjoseph
 */
public class AuthentificateEmployeSerialization extends Serialization {

    
    
    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response) throws IOException {
        
        Boolean connection =(Boolean) request.getAttribute("connection");
        
        JsonObject container = new JsonObject();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        container.addProperty("connection", connection);
        if (connection == true){
            JsonObject jsonEmploye = new JsonObject();
            Employe employe =(Employe) request.getAttribute("employe");
            jsonEmploye.addProperty("id",employe.getId());
            jsonEmploye.addProperty("nom",employe.getNom());
            jsonEmploye.addProperty("prenom",employe.getPrenom());
            jsonEmploye.addProperty("mail",employe.getMail());
            container.add("employe", jsonEmploye);
        }
        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
    }
    
}
