import {
  Unit,
  Ingredient as PrismaIngredient,
  IngredientInRecipe,
} from '@prisma/client';

// TODO: Remove once the convert-units logic is replaced.
// Adapted from https://github.com/ben-ng/convert-units
type UnitDistance = 'mm' | 'cm' | 'm' | 'km' | 'in' | 'ft-us' | 'ft' | 'mi'; // Distance
type UnitArea =
  | 'mm2'
  | 'cm2'
  | 'm2'
  | 'ha'
  | 'km2'
  | 'in2'
  | 'ft2'
  | 'ac'
  | 'mi2'; // Area
type UnitMass = 'mcg' | 'mg' | 'g' | 'kg' | 'oz' | 'lb' | 'mt' | 't'; // Mass
type UnitVolume =
  | 'mm3'
  | 'cm3'
  | 'ml'
  | 'l'
  | 'kl'
  | 'm3'
  | 'km3'
  | 'tsp'
  | 'Tbs'
  | 'in3'
  | 'fl-oz'
  | 'cup'
  | 'pnt'
  | 'qt'
  | 'gal'
  | 'ft3'
  | 'yd3'; // Volume
type UnitVolumeFlowRate =
  | 'mm3/s'
  | 'cm3/s'
  | 'ml/s'
  | 'cl/s'
  | 'dl/s'
  | 'l/s'
  | 'l/min'
  | 'l/h'
  | 'kl/s'
  | 'kl/min'
  | 'kl/h'
  | 'm3/s'
  | 'm3/min'
  | 'm3/h'
  | 'km3/s'
  | 'tsp/s'
  | 'Tbs/s'
  | 'in3/s'
  | 'in3/min'
  | 'in3/h'
  | 'fl-oz/s'
  | 'fl-oz/min'
  | 'fl-oz/h'
  | 'cup/s'
  | 'pnt/s'
  | 'pnt/min'
  | 'pnt/h'
  | 'qt/s'
  | 'gal/s'
  | 'gal/min'
  | 'gal/h'
  | 'ft3/s'
  | 'ft3/min'
  | 'ft3/h'
  | 'yd3/s'
  | 'yd3/min'
  | 'yd3/h'; // Volume Flow Rate
type UnitTemperature = 'C' | 'F' | 'K' | 'R'; // Temperature
type UnitTime =
  | 'ns'
  | 'mu'
  | 'ms'
  | 's'
  | 'min'
  | 'h'
  | 'd'
  | 'week'
  | 'month'
  | 'year'; // Time
type UnitFrequency =
  | 'Hz'
  | 'mHz'
  | 'kHz'
  | 'MHz'
  | 'GHz'
  | 'THz'
  | 'rpm'
  | 'deg/s'
  | 'rad/s'; // Frequency
type UnitSpeed = 'm/s' | 'km/h' | 'm/h' | 'knot' | 'ft/s'; // Speed
type UnitPace = 's/m' | 'min/km' | 's/ft' | 'min/km'; // Pace
type UnitPressure =
  | 'Pa'
  | 'hPa'
  | 'kPa'
  | 'MPa'
  | 'bar'
  | 'torr'
  | 'psi'
  | 'ksi'; // Pressure
type UnitDigital =
  | 'b'
  | 'Kb'
  | 'Mb'
  | 'Gb'
  | 'Tb'
  | 'B'
  | 'KB'
  | 'MB'
  | 'GB'
  | 'TB'; // Digital
type UnitIlluminance = 'lx' | 'ft-cd'; // Illuminance
type UnitPartsPer = 'ppm' | 'ppb' | 'ppt' | 'ppq'; // Parts-Per
type UnitVoltage = 'V' | 'mV' | 'kV'; // Voltage
type UnitCurrent = 'A' | 'mA' | 'kA'; // Current
type UnitPower = 'W' | 'mW' | 'kW' | 'MW' | 'GW';
type UnitApparentPower = 'VA' | 'mVA' | 'kVA' | 'MVA' | 'GVA'; // Apparent Power
type UnitReactivePower = 'VAR' | 'mVAR' | 'kVAR' | 'MVAR' | 'GVAR'; // Reactive Power
type UnitEnergy = 'Wh' | 'mWh' | 'kWh' | 'MWh' | 'GWh' | 'J' | 'kJ'; // Energy
type UnitReactiveEnergy = 'VARh' | 'mVARh' | 'kVARh' | 'MVARh' | 'GVARH'; // Reactive Energy
type UnitAngle = 'deg' | 'rad' | 'grad' | 'arcmin' | 'arcsec'; // Angle

export type ConvertUnit =
  | UnitDistance
  | UnitArea
  | UnitMass
  | UnitVolume
  | UnitVolumeFlowRate
  | UnitTemperature
  | UnitTime
  | UnitFrequency
  | UnitSpeed
  | UnitPace
  | UnitPressure
  | UnitDigital
  | UnitIlluminance
  | UnitPartsPer
  | UnitVoltage
  | UnitCurrent
  | UnitPower
  | UnitApparentPower
  | UnitReactivePower
  | UnitEnergy
  | UnitReactiveEnergy
  | UnitAngle;

export type ConvertMeasure =
  | 'length'
  | 'area'
  | 'mass'
  | 'volume'
  | 'volumeFlowRate'
  | 'temperature'
  | 'time'
  | 'frequency'
  | 'speed'
  | 'pace'
  | 'pressure'
  | 'ditgital'
  | 'illuminance'
  | 'partsPer'
  | 'voltage'
  | 'current'
  | 'power'
  | 'apparentPower'
  | 'reactivePower'
  | 'energy'
  | 'reactiveEnergy'
  | 'angle';

export type UnitSystem = 'metric' | 'imperial' | 'bits' | 'bytes';

export type RawIngredient = IngredientInRecipe & {
  ingredient: PrismaIngredient;
};

export type Ingredient = {
  id: number;
  count: number;
  unit?: Unit;
  title: string;
  amount: string;
  description?: string;
};
