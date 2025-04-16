function getConfiguration(config)
{
  // Esta función permite indicar valores de configuración generales para 
  // todos los dispositivos de este modelo.
  
  // Dependiendo del significado de la "dirección del dispositivo" en este 
  // dispositivo, es posible que desee cambiar la etiqueta que se utiliza 
  // para hacer referencia a la dirección en la interfaz de usuario.
  // Por ejemplo, si la dirección del dispositivo es en realidad una dirección 
  // MAC, es posible que desee utilizar el código siguiente.
  
  config.addressLabel = {en: "DevEUI", es: "DevEUI"};
}

function getEndpoints(deviceAddress, endpoints)
{

    var nodo = endpoints.addEndpoint("1","Familia de nodos", endpointType.genericSensor);
            nodo.variableTypeId = 1195;

    var msj = endpoints.addEndpoint("2","Numero de mensaje", endpointType.genericSensor);
            msj.variableTypeId = 1195;

    var di1 = endpoints.addEndpoint("3","Entrada digital 1", endpointType.genericSensor);
            di1.variableTypeId = 1238;

    var di2 = endpoints.addEndpoint("4","Entrada digital 2", endpointType.genericSensor);
            di2.variableTypeId = 1239;

    var ai1 = endpoints.addEndpoint("5","Entrada analogica 1", endpointType.genericSensor);
            ai1.variableTypeId = 1195;

    var ai2 = endpoints.addEndpoint("6","Entrada analogica 2", endpointType.genericSensor);
            ai2.variableTypeId = 1237;

    var ai3 = endpoints.addEndpoint("7","Entrada analogica 3", endpointType.genericSensor);
            ai3.variableTypeId = 1242;

    var ai4 = endpoints.addEndpoint("8","Entrada analogica 4", endpointType.genericSensor);
            ai4.variableTypeId = 1195;

    var do1 = endpoints.addEndpoint("9","Salida digital 1", endpointType.genericSensor);
            do1.variableTypeId = 1195;

}


function validateDeviceAddress(address, result)
{
  // Esta función permite validar la dirección de un dispositivo, cuando el usuario 
  // lo está creando. Si el dispositivo tiene reglas de validación especiales para 
  // la dirección, pueden verificarse aquí y devolver un mensaje de error en 
  // caso de que el formato de la dirección sea incorrecto.
  
  // En el código siguiente, se realiza una validación para asegurarse de que la 
  // dirección tiene exactamente 10 caracteres.
  
  // if (address.length != 10) {
  //   result.ok = false;
  //   result.errorMessage = {
  //     en: "The address must be 10 characters long", 
  //     es: "La dirección debe tener exactamente 10 caracteres"
  //   };
  // }
}

function updateDeviceUIRules(device, rules)
{
  // Esta función permite especificar reglas de interfaz de usuario en el nivel de 
  // dispositivo. Por ejemplo, es posible habilitar o deshabilitar la creación 
  // de endpoints manualmente al dispositivo después de que se creó.

  // En el código siguiente, el agregado manual de endpoints está deshabilitada 
  // en la interfaz de usuario. Esto significa que el dispositivo se limitará a los 
  // endpoints definidos por la función getEndpoints() anterior.
  
  // rules.canCreateEndpoints = false;
}

function updateEndpointUIRules(endpoint, rules)
{
  // Esta función permite especificar reglas de interfaz de usuario para cada
  // endpoint del dispositivo. Por ejemplo, es posible habilitar o inhabilitar la
  // eliminación de endpoints, o la edición de subtipo de endpoint.

  // En el código siguiente, se definen las siguientes reglas:
  // - Los endpoints no se pueden eliminar.
  // - El subtipo de endpoint se puede cambiar, pero solo para el segundo endpoint.
  
  rules.canDelete = true;
  rules.canEditSubType = true;
}
