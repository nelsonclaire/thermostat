class Thermostat{
  _powerSaving;

  constructor(){
  this.DEFAULT_TEMP = 20;
  this.temperature = this.DEFAULT_TEMP;
  this._powerSaving = true;
  this.POWER_SAVING_MAX = 25;
  this.POWER_TEMP_MAX = 32;
  this.MIN_TEMP = 10;
  this.MEDIUM_ENERGY_TEMP = 18;
  this.HIGH_ENERGY_TEMP = 25;
  };

  getTemperature() {
    return this.temperature;
  }

  up() {
    this.temperature++;  
    if (this._powerSaving) {
      if (this.temperature > this.POWER_SAVING_MAX) {
          this.temperature = this.POWER_SAVING_MAX;
      }
    } else {
      if (this.temperature > this.POWER_TEMP_MAX) {
          this.temperature = this.POWER_TEMP_MAX;
      }
    }
  };

  down() {
    this.temperature--;
    if (this.temperature < this.MIN_TEMP) {
      this.temperature = this.MIN_TEMP;
    }
  };

  reset() {
    this.temperature = this.DEFAULT_TEMP;
  };
  
  powerSavingOff() {
    this._powerSaving = false;
  };

  powerSavingOn() {
    this._powerSaving = true;
  };

  currentEnergyUsage() {
    if (this.temperature < this.MEDIUM_ENERGY_TEMP) {
      return "low";
    } else if (this.temperature <= this.HIGH_ENERGY_TEMP) {
      return "medium";
    } else {
      return "high";
    }
  };

}

module.exports = Thermostat;