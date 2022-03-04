const Thermostat = require('./thermostat');

const thermostat = new Thermostat(20);
this.POWER_SAVING_MAX = 25;
this.POWER_TEMP_MAX = 32;
this.MIN_TEMP = 10;

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Do ctrl c to exit
const cliprompt = () => {
    rl.question('Enter Command > ', (input) => {
      getInput(input)
      _cliResponse()
      cliprompt() 
    });
};
cliprompt()


const _getTemp = () => {
  console.log(`The temperature is now ${thermostat.getTemperature()}`)
}

const _max = () => {
  console.log(`The temperature is now ${thermostat.getTemperature()}: (maximum reached)`) 
}

const _min = () => {
  console.log(`The temperature is now ${thermostat.getTemperature()}: (minimum reached)`) 
}

const _cliResponse = () => {
  if (thermostat.getTemperature() === this.POWER_SAVING_MAX && thermostat._powerSaving === true) {
    _max() 
  } else if (thermostat.getTemperature() === this.POWER_TEMP_MAX && thermostat._powerSaving === false) {
    _max() 
  } 
  else if (thermostat.getTemperature() === this.MIN_TEMP) {
    _min() 
  } else {
    _getTemp()
  }
}

const getInput = (input) => {
  switch(input) {
    case('up'):
        thermostat.up(); 
        break;
    case('down'):
        thermostat.down();
        break;
    case('psm on'):
        thermostat.powerSavingOn(); 
        break;
    case('psm off'):
        thermostat.powerSavingOff(); 
  };
};
