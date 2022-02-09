var dataObject = []; //global array

//Implementation of jQuery
$(document).ready(function () 
{
  validateInputData();


  $("#addProduct").click(function () 
  {
    var productSKU = $("#productSKU").val();
    var productName = $("#productName").val();
    var productPrice = $("#productPrice").val();
    var productQuantity = $("#productQuantity").val();
    storeData(productSKU, productName, productPrice, productQuantity);

    //Code to perform the edit operation
    $("#tableData").on("click", ".edit", function () 
    {
      var data = $(this).data("id");
      editData(data);
    });

    //Code to perform delete operation
    $("#tableData").on("click", ".delete", function () 
    {
      var data = $(this).data("id");
      deleteData(data);
    });

    
  });
});

//function to take data from the html elements
function storeData(sku, name, price, quantity) 
{
  //checkExistenceFunction()
  var exist = checkExistence(sku, dataObject);

  if (exist == true) {
    $("#error")
      .css("display", "block")
      .html("There is some problem.");
    $("#success").css("display", "none");
  } else {
    var data = {
      "Id": sku,
      "Name": name,
      "Price": price,
      "Quantity": quantity,
    };

    //Inserting data into the array
    dataObject.push(data);

    //Successful addition of data message
    $("#success").css("display", "block").html("Product Added Successfully");
    $("#error").css("display", "none");

    //display data
    display(dataObject);
  }
}

//Function to check the existence of previous Id
function checkExistence(pId, dataObj) 
{
  if(pId == "")
  {
    return true;
  }
  else
  {
    for (var i = 0; i < dataObj.length; i++) 
    {
      if (pId == dataObj[i].Id) 
      {
        return true;
      }
    }
  }
}

//function to display the data
function display(data) 
{
  $("#addProduct").show();
  $("#updateProduct").hide();
  $("#productSKU").css("pointer-events", "visible");

  $("#tableData").html(`<tr>
  <th>SKU</th>
  <th>Name</th>
  <th>Price</th>
  <th>Quantity</th>
  <th>Action</th>
  </tr>`);

   for (i = 0; i < data.length; i++) 
  {
    $("#tableData").append(`<tr>
        <td>${data[i].Id}</td>
        <td>${data[i].Name}</td>
        <td>${data[i].Price}</td>
        <td>${data[i].Quantity}</td>
        <td><a href="#" class="edit" data-id=${data[i].Id}>Edit</a><a href="#" data-id=${data[i].Id} class="delete">Delete</a></td>
        </tr>`);
  }
}

//function to edit or update the data
function editData(id) 
{
  $("#addProduct").hide();
  for (i = 0; i < dataObject.length; i++) 
  {
    if (dataObject[i].Id == id) 
    {
      $("#productSKU").val(dataObject[i].Id).css("pointer-events", "none");
      $("#productName").val(dataObject[i].Name);
      $("#productPrice").val(dataObject[i].Price);
      $("#productQuantity").val(dataObject[i].Quantity);

      $("#updateProduct").show().click(function () 
      {
        var productName = $("#productName").val();
        var productPrice = $("#productPrice").val();
        var productQuantity = $("#productQuantity").val();

        dataObject[i].Price=productPrice;
        dataObject[i].Name=productName;
        dataObject[i].Quantity=productQuantity;

        alert("Element updated with id:"+dataObject[i].Id);
        $("#success").html("Data Updated Successfully");

        display(dataObject);
      });
      break;
    }
  }
}

//Delete data from the list
function deleteData(id)
{
  for(i=0;i<dataObject.length;i++)
  {
    if(dataObject[i].Id == id)
    {
      var deleteData=dataObject.splice(i,1);
      alert("Element deleted with id:" + id);
      $("#success").show().html("The element deleted successfully.");
      display(dataObject);
    }
  }
}

//function to perform the validation
function validateInputData()
{

  //Validation of the SKU field
  $("#productSKU").blur(function()
    {
      var value=$(this).val();
      
      if(isNaN(value))
      {
        console.log("Entered");
        $("#perrorMsg").html("* SKU field should be integer.");
      }
      else if(value == "")
      {
        $("#perrorMsg").html("* SKU field is empty.");
      }
      else
      {
        $("#perrorMsg").html("");
      }
    });

    //Validation of the Name field
    $("#productName").blur(function()
    {
      var value=$(this).val();
      console.log(value);
      if(!isNaN(value))
      {
        console.log("Entered");
        $("#nameErrorMsg").html("* Name field should be string.");
      }
      else if(value == "")
      {
        $("#nameErrorMsg").html("* Name field is empty.");
      }
      else
      {
        $("#nameErrorMsg").html("");
      }
    });

    //Validation of the Price field
    $("#productPrice").blur(function()
    {
      var value=$(this).val();
      console.log(value);
      if(isNaN(value))
      {
        console.log("Entered");
         $("#priceErrorMsg").html("* Price field should be integer.");
      }
      else if(value == "")
      {
        $("#priceErrorMsg").html("* Price field is empty.");
      }
      
      else
      {
        $("#priceErrorMsg").html("");
      }
    });

    //Validation of the Quantity field
    $("#productQuantity").blur(function()
    {
      var value=$(this).val();
      console.log(value);
      if(isNaN(value))
      {
        console.log("Entered");
         $("#quantityErrorMsg").html("* Quantity field should be integer.");
      }
      else if(value == "")
      {
        $("#quantityErrorMsg").html("* Quantity field is empty.");
      }
      else
      {
        $("#quantityErrorMsg").html("");
      }
    });


}