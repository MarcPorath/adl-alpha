sap.ui.define([
		"sap/ui/model/json/JSONModel",
		"sap/ui/Device"
	], function Material(material) {
			// Attributes
			this.matnr = material;
			this.basketinfo = new Array("");
			
			// Functions
			this.readBasketInfo = function(){
				return this.basketinfo;
			};
			
			this.showAvailability = function(){
				//SAP Availability Check
				// BAPI_MATERIAL_AVAILABILITY
				return null;
			};
			
			this.readSAPdata = function(){
				return null;
			};		
	}
);