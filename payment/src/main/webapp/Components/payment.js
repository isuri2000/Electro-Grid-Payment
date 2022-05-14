$(document).ready(function()
{
	 $("#alertSuccess").hide();
 	 $("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
 	$("#alertSuccess").hide();
 	$("#alertError").text("");
 	$("#alertError").hide();

	// Form validation-------------------
	var status = validatePaymentForm();
	if (status != true)
	{
		 $("#alertError").text(status);
 		 $("#alertError").show();
 		 return;
 	}
 	
	// If valid-------------------------
 	var type = ($("#hidPaymentIDSave").val() == "") ? "POST" : "PUT";

	$.ajax(
 	{
 		url : "paymentAPI",
 		type : type,
 		data : $("#formPayment").serialize(),
 		dataType : "text",
 		complete : function(response, status)
 		{
 			onPaymentSaveComplete(response.responseText, status);
 		}
 	}); 
 });

function onPaymentSaveComplete(response, status)
	{
		if (status == "success")
		{
			 var resultSet = JSON.parse(response);
 			 if (resultSet.status.trim() == "success")
			 {
 				$("#alertSuccess").text("Successfully saved.");
 				$("#alertSuccess").show();
 				$("#divPaymentGrid").html(resultSet.data);
 			 } 
 			 else if (resultSet.status.trim() == "error")
			 {
 				$("#alertError").text(resultSet.data);
 				$("#alertError").show();
 			 }
 		} 
 		else if (status == "error")
 		{
 			$("#alertError").text("Error while saving.");
 			$("#alertError").show();
 		} 
 		else
 		{
 			$("#alertError").text("Unknown error while saving..");
 			$("#alertError").show();
 		}
		$("#hidPaymentIDSave").val("");
 		$("#formPayment")[0].reset();
}

	// UPDATE==========================================
	$(document).on("click", ".btnUpdate", function(event)
	{
		 $("#hidPaymentIDSave").val($(this).data("paymentID"));
		 $("#paymentCode").val($(this).closest("tr").find('td:eq(0)').text());
		 $("#billID").val($(this).closest("tr").find('td:eq(1)').text());
		 $("#paymentMethod").val($(this).closest("tr").find('td:eq(2)').text());
 		 $("#cardNumber").val($(this).closest("tr").find('td:eq(3)').text());
 		 $("#nameOnCard").val($(this).closest("tr").find('td:eq(4)').text());
 		 $("#cvc").val($(this).closest("tr").find('td:eq(5)').text());
 		 $("#expireDate").val($(this).closest("tr").find('td:eq(6)').text());
 		 $("#amount").val($(this).closest("tr").find('td:eq(7)').text());
	});
	
	
	
	$(document).on("click", ".btnRemove", function(event)
	{
 		$.ajax(
 		{
 			url : "paymentAPI",
 			type : "DELETE",
 			data : "paymentID=" + $(this).data("paymentID"),
 			dataType : "text",
 			complete : function(response, status)
 			{
 				onPaymentDeleteComplete(response.responseText, status);
 			}
 		});
	});


	function onPaymentDeleteComplete(response, status)
	{
		if (status == "success")
 		{
 			var resultSet = JSON.parse(response);
 			if (resultSet.status.trim() == "success")
 			{
 				$("#alertSuccess").text("Successfully deleted.");
 				$("#alertSuccess").show();
 				$("#divPaymentGrid").html(resultSet.data);
 			} 
 			else if (resultSet.status.trim() == "error")
 			{
 				$("#alertError").text(resultSet.data);
 				$("#alertError").show();
 			}
 		} 
 		else if (status == "error")
 		{
 				$("#alertError").text("Error while deleting.");
 				$("#alertError").show();
 		} 
 		else
 		{
 				$("#alertError").text("Unknown error while deleting..");
 				$("#alertError").show();
 		}
}
	

	// CLIENT-MODEL================================================================
	function validatePaymentForm()
	{
		// CODE
		if ($("#paymentCode").val().trim() == "")
		{
 			return "Insert Payment Code.";
 		}

		// BILLID
		var tmpID = $("#billID").val().trim();
		if (!$.isNumeric(tmpID))
		{
 			return "Insert a numerical value for Bill ID.";
 		}
 		
		// PAYMENTMETHOD-------------------------------
		if ($("#paymentMethod").val().trim() == "")
 		{
 			return "Insert Payment Method.";
 		}
		
		// CARDNUMBER
		var tmpNumber = $("#cardNumber").val().trim();
		if (!$.isNumeric(tmpNumber))
		{
 			return "Insert a numerical value for Card Number.";
 		}
		
		// NAMEONCARD-------------------------------
		if ($("#nameOnCard").val().trim() == "")
 		{
 			return "Insert Name On Card.";
 		}
		
		// CVC
		if ($("#cvc").val().trim() == "")
 		{
 			return "Insert CVC.";
 		}
		
		//EXPIREDATE
		if ($("#expireDate").val().trim() == "")
 		{
 			return "Insert Expire Date.";
 		}
		
		//AMOUNT
		if ($("#amount").val().trim() == "")
 		{
 			return "Insert Amount.";
 		}
		
		return true;
	}
	
	
	
	
