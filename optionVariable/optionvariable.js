define([
        'jquery',
        'qlik',
        './properties',
        './initialproperties',
        './lib/js/extensionUtils',
        'text!./lib/css/scoped-bootstrap.css',
        'text!./lib/partials/template.html',
        'text!./lib/partials/template2.html'
],
function ($, qlik, props, initProps, extensionUtils, cssContent, template, template2) {
    'use strict';

    extensionUtils.addStyleToHeader(cssContent);

    console.log('Initializing - remove me');

    return {

        definition: props,

        initialProperties: initProps,

        snapshot: { canTakeSnapshot: true },

        // Angular Support (uncomment to use)
        template: template,

        // Angular Controller
        controller: ['$scope', function ($scope) {

            $scope.variableValue = '';
            $scope.values = [];
            var app = qlik.currApp(this);

            $scope.setUp = function(){
                app.variable.getContent($scope.layout.props.variableName,function ( reply ) {
                    //console.log('r',reply);
                    $scope.variableValue = reply.qContent.qString;   
                    
                } );

                //item.value as item.label for item in values
                $scope.values = [];

                var vs = $scope.layout.props.variableOptionValue.split(","),
                    vl = $scope.layout.props.variableOptionDesc.split(","),
                    useDesc = vs.length == vl.length;
                // console.log('vs',vs);
                // console.log('vl',vl);
                // console.log('ud',useDesc);
                
                angular.forEach(vs, function(value, key) {
                    var item = {
                        value: '',
                        label: ''
                    };
                    item.value = value;
                    item.label = value;
                    if(useDesc){
                        item.label = vl[key];
                    }

                    $scope.values.push(item);
                });
                console.log('v',$scope.values);
            };
            $scope.setUp();                    
           
            $scope.changeVar = function(val){
               //console.log('vc',$scope.layout.props.variableName+' = '+val); 

                if(!$scope.layout.props.disabled){
                    console.log('mod var', $scope.layout.props.variableName+' = '+val)
                    app.variable.setContent($scope.layout.props.variableName,val); 
                    $scope.variableValue = val;
                }
                else {
                    console.log('mod var disabled', $scope.layout.props.variableName)
                }
            };

            // $scope.$watch( 'layout.props', function ( newVal ) {
            //     $scope.setUp();
            // } , true);
        }]
    };

});
