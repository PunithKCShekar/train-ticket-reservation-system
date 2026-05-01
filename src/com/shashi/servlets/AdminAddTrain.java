package com.shashi.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.shashi.beans.TrainBean;
import com.shashi.beans.TrainException;
import com.shashi.constant.ResponseCode;
import com.shashi.constant.UserRole;
import com.shashi.service.TrainService;
import com.shashi.service.impl.TrainServiceImpl;
import com.shashi.utility.TrainUtil;

@WebServlet("/adminaddtrain")
public class AdminAddTrain extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private TrainService trainService = new TrainServiceImpl();

	/**
	 * 
	 * @param req
	 * @param res
	 * @throws IOException
	 * @throws ServletException
	 */
	protected void doPost(HttpServletRequest req, HttpServletResponse res)
	        throws IOException, ServletException {

	    res.setContentType("text/html");
	    PrintWriter pw = res.getWriter();
	    TrainUtil.validateUserAuthorization(req, UserRole.ADMIN);

	    try {

	        TrainBean train = new TrainBean();

	        String trainNoStr = req.getParameter("trainno");
	        String trainName = req.getParameter("trainname");
	        String fromStation = req.getParameter("fromstation");
	        String toStation = req.getParameter("tostation");
	        String seatsStr = req.getParameter("available");
	        String fareStr = req.getParameter("fare");

	        // Validate mandatory numeric fields
	        if (trainNoStr == null || trainNoStr.trim().isEmpty() ||
	            seatsStr == null || seatsStr.trim().isEmpty() ||
	            fareStr == null || fareStr.trim().isEmpty()) {

	            RequestDispatcher rd = req.getRequestDispatcher("AddTrains.html");
	            rd.include(req, res);
	            pw.println("<div class='tab'><p1 class='menu'>All numeric fields are mandatory!</p1></div>");
	            return;
	        }

	        // Validate text fields
	        if (trainName == null || trainName.trim().isEmpty() ||
	            fromStation == null || fromStation.trim().isEmpty() ||
	            toStation == null || toStation.trim().isEmpty()) {

	            RequestDispatcher rd = req.getRequestDispatcher("AddTrains.html");
	            rd.include(req, res);
	            pw.println("<div class='tab'><p1 class='menu'>All fields are mandatory!</p1></div>");
	            return;
	        }

	        // Safe parsing after validation
	        train.setTr_no(Long.parseLong(trainNoStr.trim()));
	        train.setTr_name(trainName.trim().toUpperCase());
	        train.setFrom_stn(fromStation.trim().toUpperCase());
	        train.setTo_stn(toStation.trim().toUpperCase());
	        train.setSeats(Integer.parseInt(seatsStr.trim()));
	        train.setFare(Double.parseDouble(fareStr.trim()));

	        String message = trainService.addTrain(train);

	        RequestDispatcher rd = req.getRequestDispatcher("AddTrains.html");
	        rd.include(req, res);

	        if (ResponseCode.SUCCESS.toString().equalsIgnoreCase(message)) {
	            pw.println("<div class='tab'><p1 class='menu'>Train Added Successfully!</p1></div>");
	        } else {
	            pw.println("<div class='tab'><p1 class='menu'>Error in filling the train Detail</p1></div>");
	        }

	    } catch (NumberFormatException e) {

	        RequestDispatcher rd = req.getRequestDispatcher("AddTrains.html");
	        rd.include(req, res);
	        pw.println("<div class='tab'><p1 class='menu'>Numeric fields must contain valid numbers!</p1></div>");

	    } catch (Exception e) {
	        throw new TrainException(422,
	                this.getClass().getName() + "_FAILED",
	                e.getMessage());
	    }
	}
	 protected void doGet(HttpServletRequest req, HttpServletResponse res)
	throws ServletException, IOException{
		 res.sendRedirect("AddTrains.html");
	 }

}