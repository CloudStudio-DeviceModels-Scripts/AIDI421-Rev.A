function parseUplink(device, payload)
{

    var payloadb = payload.asBytes();
    var decoded = WarriotAIDI421Decoder(payloadb, device.port)
//    var ep1 = device.endpoints.byAddress("1");
//    var ep2 = device.endpoints.byAddress("2");
    var ep3 = device.endpoints.byAddress("3");
    var ep4 = device.endpoints.byAddress("4");
    var ep5 = device.endpoints.byAddress("5");
    var ep6 = device.endpoints.byAddress("6");
    var ep7 = device.endpoints.byAddress("7");
    var ep8 = device.endpoints.byAddress("8");
    var ep9 = device.endpoints.byAddress("9");
    
//    ep1.updateGenericSensorStatus(decoded.NodeId);
//    ep2.updateGenericSensorStatus(decoded.MsgNum);
    
    ep3.updateGenericSensorStatus(decoded.DigitalInput1);
    ep4.updateGenericSensorStatus(decoded.DigitalInput2);

    let AI1 = decoded.AnalogInput1;
    let AI2 = decoded.AnalogInput2;
    let AI3 = decoded.AnalogInput3;
    let AI4 = decoded.AnalogInput4;
    let DO = decoded.DigitalOutput;

    if (AI1.enabled)
    {
        AI1C = Math.round((((AI1.value)*100*1116)/1943)*100)/100
        ep5.updateGenericSensorStatus(AI1C);

    } 

    if (AI2.enabled)
    {
        AI2C = Math.round((((AI2.value)*10*20)/1943)*100)/100
        ep6.updateGenericSensorStatus(AI2C);

    }
    
    if (AI3.enabled)
    {
        AI3C = Math.round((((AI3.value)*10*10)/1943)*100)/100
        ep7.updateGenericSensorStatus(AI3C);
    }
    
/*    if (AI4.enabled)
    {
        ep8.updateGenericSensorStatus(AI4.value);

    }

    if (DO.enabled)
    {
        ep9.updateGenericSensorStatus(Do.state);

    }
*/    
    env.log("Warriot Data", decoded);
}


function WarriotAIDI421Decoder(bytes, port)
{
    
    function ReadWarriotNode(bytes)
    {
        return (bytes[0] * 65536) + (bytes[1] * 256) + bytes[2];
    }
    
    function readAI(bytes)
    {
        let val = bytes[0] * 256 + bytes[1];
        if (val === 0xFFFF)
        {
            return AI = {enabled: false, value: 0}
        } else 
        {
            return AI = {enabled: true, value: val / 100}
        }
    }


    function readByte(bytes)
    {
        return bytes[0];
    }

    function readDO(bytes)
    {
        let val = bytes[0];
        if (val == 3)
        {
            return DO = {enabled: false, state: null};
        }
        else
        {
            return DO = {enabled: true, state: val};
        } 
    }
    
    var decoded = {
        NodeId: null, 
        MsgNum: null, 
        DigitalInput1: null, 
        DigitalInput2: null,       
        AnalogInput1: null,
        AnalogInput2: null,
        AnalogInput3: null,
        AnalogInput4: null,
        DigitalOutput: null
    };

    let dataLen = bytes.length;
    
    if (dataLen=== 0 || dataLen < 13 || dataLen > 13)
    {
        return decoded;
    }

    let NodeiD = bytes.slice(0, 3);
    let MsgNum = bytes.slice(2, 3);
    let DigitalInputs = bytes.slice(3, 4);
    let Analog1 = bytes.slice(4, 6);
    let Analog2 = bytes.slice(6, 8);
    let Analog3 = bytes.slice(8, 10);
    let Analog4 = bytes.slice(10, 12);
    let DigitalOutput = bytes.slice(12, 13);

    decoded.NodeId = ReadWarriotNode(NodeiD);
    decoded.MsgNum = readByte(MsgNum);
    decoded.DigitalInput1 = (DigitalInputs & 0xF0) >> 4;
    decoded.DigitalInput2 = DigitalInputs & 0x0F;
    decoded.AnalogInput1 =  readAI(Analog1)
    decoded.AnalogInput2 =  readAI(Analog2);
    decoded.AnalogInput3 =  readAI(Analog3);
    decoded.AnalogInput4 =  readAI(Analog4);
    decoded.DigitalOutput = readDO(DigitalOutput);
    return decoded;
}




function buildDownlink(device, endpoint, command, payload) 
{ 
	// This function allows you to convert a command from the platform 
	// into a payload to be sent to the device.
	// Learn more at https://wiki.cloud.studio/page/200

	// The parameters in this function are:
	// - device: object representing the device to which the command will
	//   be sent. 
	// - endpoint: endpoint object representing the endpoint to which the 
	//   command will be sent. May be null if the command is to be sent to 
	//   the device, and not to an individual endpoint within the device.
	// - command: object containing the command that needs to be sent. More
	//   information at https://wiki.cloud.studio/page/1195.

	// This example is written assuming a device that contains a single endpoint, 
	// of type appliance, that can be turned on, off, and toggled. 
	// It is assumed that a single byte must be sent in the payload, 
	// which indicates the type of operation.

/*
	 payload.port = 25; 	 	 // This device receives commands on LoRaWAN port 25 
	 payload.buildResult = downlinkBuildResult.ok; 

	 switch (command.type) { 
	 	 case commandType.onOff: 
	 	 	 switch (command.onOff.type) { 
	 	 	 	 case onOffCommandType.turnOn: 
	 	 	 	 	 payload.setAsBytes([30]); 	 	 // Command ID 30 is "turn on" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.turnOff: 
	 	 	 	 	 payload.setAsBytes([31]); 	 	 // Command ID 31 is "turn off" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.toggle: 
	 	 	 	 	 payload.setAsBytes([32]); 	 	 // Command ID 32 is "toggle" 
	 	 	 	 	 break; 
	 	 	 	 default: 
	 	 	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 	 	 break; 
	 	 	 } 
	 	 	 break; 
	 	 default: 
	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 break; 
	 }
*/

}