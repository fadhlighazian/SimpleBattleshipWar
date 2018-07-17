function initialize() {
	// body...
	let products = localStorage.getItem("products");
	let discountFlag = false;

	if (products === null) {

		fetchData();
		products = localStorage.getItem("products")
	}

	products = JSON.parse(products);
	renderAllProduct(products);

	let displayProduct = products;
	let txtSearch = document.getElementById('txtSearch');

	txtSearch.addEventListener('keyup', function(){
		let searchWord = this.value.toLowerCase();
		console.log(searchWord);
		displayProduct = products.filter(products => products.name.toLowerCase().includes(searchWord));
		renderAllProduct(displayProduct, discountFlag);
	})

	let cboDiscount = document.getElementById('cboDiscount');
	cboDiscount.addEventListener('change' , function(){
		if (this.checked) {
			discountFlag = true;
		}

		else{
			discountFlag = false;
		}

		renderAllProduct(displayProduct,discountFlag);
	})

}



function fetchData(){

	let request = new XMLHttpRequest();

	request.onreadystatechange = function(){
		if (request.readyState != 4 || request.status != 200){return;}

		localStorage.setItem("products", request.responseText);
	}

	request.onerror = function(){
		alert(request.responseText);
	}

	request.open('GET','productdata.json',true);
	request.send();

}

function renderAllProduct(products,discountFlag){
	products = JSON.parse(JSON.stringify(products));
	//console.log(products);
	if (discountFlag) {
		products.map(product => {
			product.price *= 0.75;
			return product;
		})
	}
	document.getElementById('card-container').innerHTML = '';
	products.forEach(product => renderProduct(product));
}


function renderProduct(product){
	const cardContainer = document.getElementById('card-container');
	let card = document.createElement('div');
	const cardClass = document.createAttribute('class');
	cardClass.value = 'card';
	card.setAttributeNode(cardClass);

	let img = document.createElement('img');
	img.src = '/images/' + product.image;

	console.log(product);

	card.appendChild(img);

	let container = document.createElement('div');
	const containerClass = document.createAttribute('class');
	containerClass.value = 'container';
	container.setAttributeNode(containerClass);

	let itemName = document.createElement('h4');
	itemName.appendChild(document.createTextNode(product.name));
	container.appendChild(itemName);

	let itemPrice = document.createElement('p');
	itemPrice.appendChild(document.createTextNode(product.price));
	container.appendChild(itemPrice);

	let itemSeller = document.createElement('p');
	let seller = product.seller.name+"("+product.seller.location+")";
	itemSeller.appendChild(document.createTextNode(seller));

	container.appendChild(itemSeller);

	card.appendChild(container);

	cardContainer.appendChild(card);
}