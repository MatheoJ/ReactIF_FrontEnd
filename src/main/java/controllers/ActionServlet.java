package controllers;


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Actions.Action;
import Actions.AuthentifierClientAction;
import fr.insalyon.dasi.dao.JpaUtil;
import fr.insalyon.dasi.metier.service.Service;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import vues.AuthentifierClientSerialisation;
import vues.Serialisation;

/**
 *
 * @author mjoseph
 */
public class ActionServlet extends HttpServlet {

    
 @Override
  public void init() throws ServletException {
    super.init();
    JpaUtil.init();
  }

  @Override
  public void destroy() {
    JpaUtil.destroy();
    super.destroy();
  }


    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String todo = request.getParameter("todo");
        Service service = new Service();
        response.setContentType("text/html;charset=UTF-8");
        
        switch(todo){
            case "connecter":{
               Action action = new AuthentifierClientAction(service);
               action.executer(request);
               Serialisation serialisation = new AuthentifierClientSerialisation();
               serialisation.appliquer(request, response);
               break;
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
