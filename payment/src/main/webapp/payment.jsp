<%@page import="com.payment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payment Service</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/payment.js"></script>
</head>
<body>

<div class="container"><div class="row"><div class="col-6">

	<h1>Payment Service </h1>

	<form id="formPayment" name="formPayment">
 		Payment code:
 		<input id="paymentCode" name="paymentCode" type="text" class="form-control form-control-sm">
 		<br> 
 		Bill ID:
		<input id="billID" name="billID" type="text" class="form-control form-control-sm">
 		<br> 
 		Payment Method:
 		<input id="paymentMethod" name="paymentMethod" type="text" class="form-control form-control-sm">
 		<br> 
 		Card Number:
		<input id="cardNumber" name="cardNumber" type="text" class="form-control form-control-sm">
 		<br>
 		Name On Card:
		<input id="nameOnCard" name="nameOnCard" type="text" class="form-control form-control-sm">
 		<br>
 		CVC Number:
		<input id="cvc" name="cvc" type="text" class="form-control form-control-sm">
 		<br>
 		Expire Date:
		<input id="expireDate" name="expireDate" type="text" class="form-control form-control-sm">
 		<br>
 		Amount:
		<input id="amount" name="amount" type="text" class="form-control form-control-sm">
 		<br>
 		
 		<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
 		<input type="hidden" id="hidPaymentIDSave" name="hidPaymentIDSave" value="">
	</form>
	
	<div id="alertSuccess" class="alert alert-success"></div>
	<div id="alertError" class="alert alert-danger"></div>

	<br>
	<div id="divPaymentGrid">
 		<%
 			payment paymentObj = new payment();
 			out.print(paymentObj.readPayment());
 		%>
	</div>
</div> </div> </div>
</body>
</html>