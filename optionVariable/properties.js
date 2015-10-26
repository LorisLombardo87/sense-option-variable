define( [], function () {
	'use strict';

	
	var variableName = {
		ref: "props.variableName",
		label: "Varible Name",
		type: "string",
		expression: "optional",
		show: true
	};

	var variableOptionValue = {
		ref: "props.variableOptionValue",
		label: " Option Values",
		type: "string",
		expression: "optional",
		show: true
	};

	var variableOptionDesc = {
		ref: "props.variableOptionDesc",
		label: " Option Descriptions",
		type: "string",
		expression: "optional",
		show: true
	};

	// variable Panel
	var variablePanel = {
		items: {
			variable: {
				type: "items",
				label: "Variable",
				items: {
					variableName: variableName,
					variableOptionValue: variableOptionValue,
					variableOptionDesc: variableOptionDesc
				}
			}
		}
	};

	// Appearance Panel
	var variableTitle = {
		ref: "props.variableTitle",
		label: "Option Title",
		type: "string",
		expression: "optional",
		show: true
	};

	var variableDesc = {
		ref: "props.variableDesc",
		label: "Varible Help Text",
		type: "string",
		expression: "optional",
		show: true
	};

	var optionsType = {
		ref: "props.optionsType",
		label: "input type",
		type: "string",
		show: true,
		component: 'dropdown',
		defaultValue: 'd',
		options: [
			{
				value: "d",
				label: "Drop Down List"
			}, 
			{
				value: "c",
				label: "Check boxes"
			}, 
			{
				value: "l",
				label: "Cycle Button"
			}
		]
	};

	var inputDisabled = {
		ref: "props.disabled",
		label: "Disable Input",
		type: "string",
		expression: "optional",
		show: true
	};

	var appearancePanel = {
		items: {
			label: "Settings",
			settings: {
				type: "items",
				label: "Settings",
				items: {
					variableTitle: variableTitle,
					variableDesc: variableDesc,
					optionsType: optionsType,
					inputDisabled: inputDisabled
				}
			}
		}
	};

	// Return values
	return {
		type: "items",
		component: "accordion",
		items: {
			variablePanel: variablePanel,
			appearance: appearancePanel
		}
	};

} );
