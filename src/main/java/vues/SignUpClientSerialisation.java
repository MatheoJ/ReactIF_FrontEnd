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
import metier.modele.Client;

/**
 *
 * @author mjoseph
 */
public class SignUpClientSerialisation extends Serialization{

    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Boolean connection =(Boolean) request.getAttribute("signedUp");
        
        JsonObject container = new JsonObject();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        container.addProperty("signedUp", connection);
        if (connection == true){
            JsonObject jsonClient = new JsonObject();
            Client client =(Client) request.getAttribute("client");
            jsonClient.addProperty("id",client.getId());
            jsonClient.addProperty("lastName",client.getNom());
            jsonClient.addProperty("firstName",client.getPrenom());
            jsonClient.addProperty("mail",client.getMail());
            container.add("client", jsonClient);
        }
        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close(); }
    
}
