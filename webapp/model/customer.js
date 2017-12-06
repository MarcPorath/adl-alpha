sap.ui.define([
		"sap/ui/model/json/JSONModel",
		"sap/ui/Device"
	], function Basket(kunnr) {
			// Attributes
			this.kunnr = kunnr;
			this.basket = [];
			this.info = [];
			this.contacts = [];
			
			this.addBasket = new function(basket){
				this.basket.push(basket);
			}
			
			this.readCustomer = new function(){
				return this.kunnr;
			}
			
			this.changeCustomerContact = new function(){
				//Ansprechpartner ändern
			}
			
			this.readBusinessContact = new function(){
				return this.contacts;
			}
	}
);