const Thermostat = require('./thermostat');

describe('Thermostat', () => {

    const thermostat = new Thermostat();
    let defaultTemp;
    let minTemp;
    let powerSavingMax;
    let powerTempMax;
    let mediumEnergyTemp;
    let highEnergyTemp;

    beforeEach( () => {

    defaultTemp = thermostat.DEFAULT_TEMP;
    minTemp = thermostat.MIN_TEMP;
    powerSavingMax = thermostat.POWER_SAVING_MAX;
    powerTempMax = thermostat.POWER_TEMP_MAX;
    mediumEnergyTemp = thermostat.MEDIUM_ENERGY_TEMP;
    highEnergyTemp = thermostat.HIGH_ENERGY_TEMP;

    });

  describe("the initial thermostat state", () => {

    it("should be set to the default temperature of 20", () => {
       expect(thermostat.getTemperature()).toEqual(defaultTemp);
    });

    it('up temperature by 1', ()  => {
      thermostat.up(1);
      expect(thermostat.getTemperature()).toEqual(defaultTemp + 1);
    });
  
    it('down temperature by 1', ()  => {
      thermostat.down(1);
      expect(thermostat.getTemperature()).toEqual(defaultTemp);
    });

    it("should have powerSaving set to true and reach temperature of 25", () => {
        thermostat.up(powerSavingMax - thermostat.temperature + 1);
        expect(thermostat.getTemperature()).toEqual(powerSavingMax);
    });

  });

  it("does not go below 10 degrees", () => {
      thermostat.down(16);
      expect(thermostat.getTemperature()).toEqual(minTemp);
  });

  it("the reset function restores the default temperature", () => {
      thermostat.up(8);
      thermostat.reset();
      expect(thermostat.getTemperature()).toEqual(defaultTemp);
  });

  it("returns high energy usage level answer", () => {
    thermostat.temperature = (highEnergyTemp + 1);
    expect(thermostat.currentEnergyUsage()).toEqual("high");
  });

  it("returns medium energy usage level answer for one degree below high limit", () => {
      thermostat.up((highEnergyTemp - defaultTemp) - 1)
      expect(thermostat.currentEnergyUsage()).toEqual("medium");
  });

  it("returns medium energy usage level for lower medium limit", () => {
      thermostat.down(defaultTemp - mediumEnergyTemp);
      expect(thermostat.currentEnergyUsage()).toEqual("medium");
  });

  it("returns low energy usage level answer for one degree below the medium limit", () => {
    thermostat.down((highEnergyTemp - mediumEnergyTemp) - 1);
    expect(thermostat.currentEnergyUsage()).toEqual("low");
});

  describe("if the power saving mode is set to true", () => {
    it("does not go above the power saving maximum temperature", () => {
        thermostat.powerSavingOn();
        thermostat.up((powerSavingMax - thermostat.temperature) + 1);
        expect(thermostat.getTemperature()).toEqual(powerSavingMax);
    });
  });

  describe("if the power saving mode is set to false", () => {
    it("allows the temperature to go to above the power saving maximum temperature", () => {
        thermostat.powerSavingOff();
        thermostat.up((powerSavingMax - thermostat.temperature) + 1)
        expect(thermostat.getTemperature()).toEqual(powerSavingMax + 1);
    });

    it("does not go above power maximum temperature", () => {
        thermostat.powerSavingOff();
        thermostat.up((powerTempMax - thermostat.temperature) + 1)
        expect(thermostat.getTemperature()).toEqual(powerTempMax);
    });
  });

});
