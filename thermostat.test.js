const Thermostat = require('./thermostat');
const Weather = require('./weatherapi');

describe('Thermostat', () => {

    // let defaultTemp;
    // let minTemp;
    // let powerSavingMax;
    // let powerTempMax;
    // let mediumEnergyTemp;
    // let highEnergyTemp;


    beforeEach( () => {

    const weather = new Weather();
    let thermostat = new Thermostat();
    defaultTemp = thermostat.DEFAULT_TEMP;
    minTemp = thermostat.MIN_TEMP;
    powerSavingMax = thermostat.POWER_SAVING_MAX;
    powerTempMax = thermostat.POWER_TEMP_MAX;
    mediumEnergyTemp = thermostat.MEDIUM_ENERGY_TEMP;
    highEnergyTemp = thermostat.HIGH_ENERGY_TEMP;

    });

  describe("the initial thermostat state", () => {

    it("should be set to the default temperature of 20", () => {
       const thermostat = new Thermostat;
       expect(thermostat.getTemperature()).toEqual(defaultTemp);
    });

    it('up temperature by 1', ()  => {
      const thermostat = new Thermostat;
      thermostat.up();
      expect(thermostat.getTemperature()).toEqual(21);
    });
  
    it('down temperature by 1', ()  => {
      const thermostat = new Thermostat;
      thermostat.down();
      expect(thermostat.getTemperature()).toEqual(19);
    });

    it("should have powerSaving set to true and reach temperature of 25", () => {
      const thermostat = new Thermostat;
      for(i = 0; i < 8; i++){ 
         thermostat.up();
      };
      expect(thermostat.getTemperature()).toEqual(powerSavingMax);
    });

  });

  it("does not go below 10 degrees", () => {
      const thermostat = new Thermostat;
      for(i = 0; i < 11; i++){ 
        thermostat.down();
      };
      expect(thermostat.getTemperature()).toEqual(minTemp);
  });

  it("the reset function restores the default temperature", () => {
      const thermostat = new Thermostat;  
      for(i = 0; i < 9; i++){ 
        thermostat.up();
      };
      thermostat.reset();
      expect(thermostat.getTemperature()).toEqual(defaultTemp);
  });

  it("returns high energy usage level answer", () => {
      const thermostat = new Thermostat;
      thermostat.powerSavingOff();
      for(i = 0; i < 6; i++){ 
        thermostat.up();
      };
      expect(thermostat.currentEnergyUsage()).toEqual("high");
  });

  it("returns medium energy usage level answer for one degree below high limit", () => {
      const thermostat = new Thermostat;  
      for(i = 0; i < 5; i++){ 
        thermostat.up();
      };
      expect(thermostat.currentEnergyUsage()).toEqual("medium");
  });

  it("returns medium energy usage level for lower medium limit of default temperature", () => {
      const thermostat = new Thermostat;
      expect(thermostat.currentEnergyUsage()).toEqual("medium");
  });

  it("returns low energy usage level answer if below the medium limit", () => {
      const thermostat = new Thermostat;
      for(i = 0; i < 4; i++){ 
        thermostat.down();
      };
      expect(thermostat.currentEnergyUsage()).toEqual("low");
});

  describe("if the power saving mode is set to true", () => {

    it("does not go above the power saving maximum temperature", () => {
      const thermostat = new Thermostat;
      thermostat.powerSavingOn();
      for(i = 0; i < 6; i++){ 
        thermostat.up();
      };
      expect(thermostat.getTemperature()).toEqual(powerSavingMax);
    });

  });

  describe("if the power saving mode is set to false", () => {
    it("allows the temperature to go to above the power saving maximum temperature", () => {
      const thermostat = new Thermostat;
      thermostat.powerSavingOff();
      for(i = 0; i < 6; i++){ 
        thermostat.up();
      };
      expect(thermostat.getTemperature()).toEqual(powerSavingMax + 1);
    });

    it("does not go above power maximum temperature", () => {
      const thermostat = new Thermostat;
      thermostat.powerSavingOff();
      for(i = 0; i < 13; i++){ 
        thermostat.up();
      };
      expect(thermostat.getTemperature()).toEqual(powerTempMax);
    });
  });

  // it("can update its temperature to the city in which it is located", () => {
  //   const weatherDouble = { fetchWeatherData: (city, callback) => 23.8 };
  //   const thermostat = new Thermostat(weatherDouble);
  //   thermostat.setCity("London");
  //   console.log(thermostat);
  //   expect(thermostat.getTemperature()).toEqual(23.8);
  // });

});
