package com;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.payment;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

@WebServlet("/paymentAPI")
public class paymentAPI extends HttpServlet
{
	private static final long serialVersionUID = 1L;
    
	payment paymentObj = new payment(); 
	
    public paymentAPI() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//NOT USED
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			 throws ServletException, IOException
	{
		String output = paymentObj.insertPayment(request.getParameter("paymentCode"),
							request.getParameter("billID"),
							request.getParameter("paymentMethod"),
							request.getParameter("cardNumber"),
							request.getParameter("nameOnCard"),
							request.getParameter("cvc"),
							request.getParameter("expireDate"),
							request.getParameter("amount"));
		
		response.getWriter().write(output);
	}

	// Convert request parameters to a Map
	private static Map getParasMap(HttpServletRequest request)
    {
		Map<String, String> map = new HashMap<String, String>();
		try
		{
			Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
			String queryString = scanner.hasNext() ?
					scanner.useDelimiter("\\A").next() : "";
			scanner.close();
	 
			String[] params = queryString.split("&");
			for (String param : params)
			{ 
				String[] p = param.split("=");
				map.put(p[0], p[1]);
		    }
		 }
				
		 catch (Exception e)
	     {
		 }
		 
		return map;
	}


	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			 throws ServletException, IOException
	{
		Map paras = getParasMap(request);
		String output = paymentObj.updatePayment(paras.get("hidPaymentIDSave").toString(),
										   paras.get("paymentCode").toString(),
										   paras.get("billID").toString(),
										   paras.get("paymentMethod").toString(),
										   paras.get("cardNumber").toString(),
										   paras.get("nameOnCard").toString(),
										   paras.get("cvc").toString(),
										   paras.get("expireDate").toString(),
										   paras.get("amount").toString());
			
		response.getWriter().write(output);
	}
			
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			 throws ServletException, IOException
	{
		Map paras = getParasMap(request);
		String output = paymentObj.deletePayment(paras.get("paymentID").toString());
		response.getWriter().write(output);
	}
	
	

}
