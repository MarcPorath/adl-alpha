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
			}
			
			//read SAP Data
			//BAPI_MATERIAL_GET_DETAIL
			
			
			
	}
);