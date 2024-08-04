function LIST_OF_REGIONS(){
	$.ajax({
		url: 'https://api.portaltoo.cloud/ph-location/region/',
		method: 'POST',
		data: {'Request': 'Region'},
		success: function(response){
			var region = document.getElementById("tx_region");
			var option = document.createElement("option");
			for(i = 0; i < response.length; i++){
				region.add(new Option(response[i].name, response[i].code));
			}
			console.log(response);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function DISPLAY_PROVINCE(code){
	$.ajax({
		url: 'https://api.portaltoo.cloud/ph-location/province/' + code,
		method: 'POST',
		data: {'Request': 'Province'},
		success: function(response){
			var province = document.getElementById("tx_province");
			var option = document.createElement("option");
			$('#tx_province option').remove();
			province.add(new Option('-', ''));
			for(i = 0; i < response.length; i++){
				province.add(new Option(response[i].name, response[i].code));
			}
		},
		error: function(err){
			console.log(err);
		}
	});
}


function DISPLAY_CITYMUN(code){
	$.ajax({
		url: 'https://api.portaltoo.cloud/ph-location/citymun/' + code,
		method: 'POST',
		data: {'Request': 'City/Municipality'},
		success: function(response){
			var citymun = document.getElementById("tx_citymun");
			var option = document.createElement("option");
			$('#tx_citymun option').remove();
			citymun.add(new Option('-', ''));
			for(i = 0; i < response.length; i++){
				citymun.add(new Option(response[i].name, response[i].code));
			}
		},
		error: function(err){
			console.log(err);
		}
	});
}

function DISPLAY_BARANGAY(code){
	$.ajax({
		url: 'https://api.portaltoo.cloud/ph-location/brgy/' + code,
		method: 'POST',
		data: {'Request': 'Brgy'},
		success: function(response){
			var citymun = document.getElementById("tx_brgy");
			var option = document.createElement("option");
			$('#tx_brgy option').remove();
			citymun.add(new Option('-', ''));
			for(i = 0; i < response.length; i++){
				citymun.add(new Option(response[i].name, response[i].code));
			}
		},
		error: function(err){
			console.log(err);
		}
	});
}
