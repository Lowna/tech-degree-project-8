window.onload = function(){
	let allEmployees = [];
	let employees = [];
	function getEmployees() {
		fetch('https://randomuser.me/api/?results=12')
		  .then(function(response) {
		    return response.json();
		  })
		  .then(function(employeeData) {
		    console.log(employeeData);
		    employees = employeeData.results;
		    allEmployees = employeeData.results;
		    employeeData.results.forEach(function(e, i) {
		    	drawEmployeeCard(e, i);
		    });
		  });
	}
	//search function

	document.getElementById('employeeSearch').addEventListener('keyup', function() {
		employees = [];
		document.getElementById('employeeThumbnailContainer').innerHTML = '';
		let searchText = this.value;
		allEmployees.forEach(function(e) {
			let name = (e.name.first + ' ' + e.name.last + e.login.username).toLowerCase();
			if(name.includes(searchText.toLowerCase())) {
				employees.push(e);
			}
		});
	 	employees.forEach(function(e, i) {
	    	drawEmployeeCard(e, i);
	    });
	});
	function drawEmployeeCard(employee, i) {

		//employee card info
		let card = document.createElement('div');
		card.className = 'card';
		let img = document.createElement('img');
		img.className = 'avatar';
		img.setAttribute('src', employee.picture.large)
		card.appendChild(img);
		let name = document.createElement('h2');
		name.className = 'name';
		name.innerHTML = employee.name.first + ' ' + employee.name.last;
		card.appendChild(name);
		let email = document.createElement('a');
		email.className = 'email';
		email.setAttribute('href', 'mailto:' + employee.email)
		email.innerHTML = employee.email;
		card.appendChild(email);
		let city = document.createElement('p');
		city.className = 'city';
		city.innerHTML = employee.location.city
		card.appendChild(city);

		//click handler to open the modal
		card.onclick = function() {
			drawEmployeeModal(employee, i);
		}

		//append employee card info to page
		document.getElementById('employeeThumbnailContainer').appendChild(card)

	}
	function drawEmployeeModal(employee, i) {
		let overlay = document.getElementById('overlay');
		overlay.innerHTML = '';
		overlay.style.display = 'block'

		//employee modal info
		let modal = document.createElement('div');
		modal.className = 'modal';
		//close btn
		let closeBtn = document.createElement('i');
		closeBtn.className = 'fas fa-times';
		closeBtn.onclick = function() {
			overlay.style.display = 'none';
		}
		modal.appendChild(closeBtn);
		//left btn
		let leftBtn = document.createElement('i');
		leftBtn.className = 'fas fa-chevron-left';
		leftBtn.onclick = function() {
			if(i == 0) {
				var prevEmployee = employees.length -1;
				//using var so the variable will be available after the if statement
			} else {
				var prevEmployee = i-1;
			}
			drawEmployeeModal(employees[prevEmployee], prevEmployee)
		}
		modal.appendChild(leftBtn);
		//right btn
		let rightBtn = document.createElement('i');
		rightBtn.className = 'fas fa-chevron-right';
		rightBtn.onclick = function() {
			if(i == employees.length -1) {
				var nextEmployee = 0;
				//using var so the variable will be available after the if statement
			} else {
				var nextEmployee = i+1;
			}
			drawEmployeeModal(employees[nextEmployee], nextEmployee)
		}
		modal.appendChild(rightBtn);
		//
		let img = document.createElement('img');
		img.className = 'avatar';
		img.setAttribute('src', employee.picture.large)
		modal.appendChild(img);
		let name = document.createElement('h2');
		name.className = 'name';
		name.innerHTML = employee.name.first + ' ' + employee.name.last;
		modal.appendChild(name);
		let email = document.createElement('a');
		email.className = 'email';
		email.setAttribute('href', 'mailto:' + employee.email)
		email.innerHTML = employee.email;
		modal.appendChild(email);
		let city = document.createElement('p');
		city.className = 'city';
		city.innerHTML = employee.location.city
		modal.appendChild(city);
		let hr = document.createElement('hr');
		hr.className = 'modal-line';
		modal.appendChild(hr);
		let phone = document.createElement('p');
		phone.className = 'phone';
		phone.innerHTML = employee.phone
		modal.appendChild(phone);
		let address = document.createElement('p');
		address.className = 'address';
		address.innerHTML = employee.location.street + ' '+ employee.location.state + ' ' + employee.location.postcode;
		modal.appendChild(address);
		let birthday = document.createElement('p');
		birthday.className = 'birthday';
		birthday.innerHTML = new Date(employee.dob.date).toDateString();
		modal.appendChild(birthday);
		
		overlay.appendChild(modal)
	}
	getEmployees();


//end window.onload
};
