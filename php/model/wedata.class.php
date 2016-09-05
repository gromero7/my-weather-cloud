<?php

require_once "EntityInterface.php";

class WeDataClass implements EntityInterface{

  private $date;
  private $time;
  private $temp;
  private $hum;
  private $dew;
  private $wspeed;
  private $wlatest;
  private $bearing;
  private $rrate;
  private $rfall;
  private $press;
  private $currentwdir;
  private $beaufortnumber;
  private $windunit;
  private $tempunitnodeg;
  private $pressunit;
  private $rainunit;
  private $windrun;
  private $presstrendval;
  private $rmonth;
  private $ryear;
  private $rfallY;
  private $intemp;
  private $inhum;
  private $wchill;
  private $temptrend;
  private $tempTH;
  private $TtempTH;
  private $tempTL;
  private $TtempTL;
  private $windTM;
  private $TwindTM;
  private $wgustTM;
  private $TwgustTM;
  private $pressTH;
  private $TpressTH;
  private $pressTL;
  private $TpressTL;
  private $version;
  private $build;
  private $wgust;
  private $heatindex;
  private $humidex;
  private $UV;
  private $ET;
  private $SolarRad;
  private $avgbearing;
  private $rhour;
  private $forecastnumber;
  private $isdaylight;
  private $SensorContactLost;
  private $wdir;
  private $cloudbasevalue;
  private $cloudbaseunit;
  private $apptemp;
  private $SunshineHours;
  private $CurrentSolarMax;
  private $IsSunny;

  function __construct(){
  }

  function setDate($date) { $this->date = $date; }
  function getDate() { return $this->date; }
  function setTime($time) { $this->time = $time; }
  function getTime() { return $this->time; }
  function setTemp($temp) { $this->temp = $temp; }
  function getTemp() { return $this->temp; }
  function setHum($hum) { $this->hum = $hum; }
  function getHum() { return $this->hum; }
  function setDew($dew) { $this->dew = $dew; }
  function getDew() { return $this->dew; }
  function setWspeed($wspeed) { $this->wspeed = $wspeed; }
  function getWspeed() { return $this->wspeed; }
  function setWlatest($wlatest) { $this->wlatest = $wlatest; }
  function getWlatest() { return $this->wlatest; }
  function setBearing($bearing) { $this->bearing = $bearing; }
  function getBearing() { return $this->bearing; }
  function setRrate($rrate) { $this->rrate = $rrate; }
  function getRrate() { return $this->rrate; }
  function setRfall($rfall) { $this->rfall = $rfall; }
  function getRfall() { return $this->rfall; }
  function setPress($press) { $this->press = $press; }
  function getPress() { return $this->press; }
  function setCurrentwdir($currentwdir) { $this->currentwdir = $currentwdir; }
  function getCurrentwdir() { return $this->currentwdir; }
  function setBeaufortnumber($beaufortnumber) { $this->beaufortnumber = $beaufortnumber; }
  function getBeaufortnumber() { return $this->beaufortnumber; }
  function setWindunit($windunit) { $this->windunit = $windunit; }
  function getWindunit() { return $this->windunit; }
  function setTempunitnodeg($tempunitnodeg) { $this->tempunitnodeg = $tempunitnodeg; }
  function getTempunitnodeg() { return $this->tempunitnodeg; }
  function setPressunit($pressunit) { $this->pressunit = $pressunit; }
  function getPressunit() { return $this->pressunit; }
  function setRainunit($rainunit) { $this->rainunit = $rainunit; }
  function getRainunit() { return $this->rainunit; }
  function setWindrun($windrun) { $this->windrun = $windrun; }
  function getWindrun() { return $this->windrun; }
  function setPresstrendval($presstrendval) { $this->presstrendval = $presstrendval; }
  function getPresstrendval() { return $this->presstrendval; }
  function setRmonth($rmonth) { $this->rmonth = $rmonth; }
  function getRmonth() { return $this->rmonth; }
  function setRyear($ryear) { $this->ryear = $ryear; }
  function getRyear() { return $this->ryear; }
  function setRfallY($rfallY) { $this->rfallY = $rfallY; }
  function getRfallY() { return $this->rfallY; }
  function setIntemp($intemp) { $this->intemp = $intemp; }
  function getIntemp() { return $this->intemp; }
  function setInhum($inhum) { $this->inhum = $inhum; }
  function getInhum() { return $this->inhum; }
  function setWchill($wchill) { $this->wchill = $wchill; }
  function getWchill() { return $this->wchill; }
  function setTemptrend($temptrend) { $this->temptrend = $temptrend; }
  function getTemptrend() { return $this->temptrend; }
  function setTempTH($tempTH) { $this->tempTH = $tempTH; }
  function getTempTH() { return $this->tempTH; }
  function setTtempTH($TtempTH) { $this->TtempTH = $TtempTH; }
  function getTtempTH() { return $this->TtempTH; }
  function setTempTL($tempTL) { $this->tempTL = $tempTL; }
  function getTempTL() { return $this->tempTL; }
  function setTtempTL($TtempTL) { $this->TtempTL = $TtempTL; }
  function getTtempTL() { return $this->TtempTL; }
  function setWindTM($windTM) { $this->windTM = $windTM; }
  function getWindTM() { return $this->windTM; }
  function setTwindTM($TwindTM) { $this->TwindTM = $TwindTM; }
  function getTwindTM() { return $this->TwindTM; }
  function setWgustTM($wgustTM) { $this->wgustTM = $wgustTM; }
  function getWgustTM() { return $this->wgustTM; }
  function setTwgustTM($TwgustTM) { $this->TwgustTM = $TwgustTM; }
  function getTwgustTM() { return $this->TwgustTM; }
  function setPressTH($pressTH) { $this->pressTH = $pressTH; }
  function getPressTH() { return $this->pressTH; }
  function setTpressTH($TpressTH) { $this->TpressTH = $TpressTH; }
  function getTpressTH() { return $this->TpressTH; }
  function setPressTL($pressTL) { $this->pressTL = $pressTL; }
  function getPressTL() { return $this->pressTL; }
  function setTpressTL($TpressTL) { $this->TpressTL = $TpressTL; }
  function getTpressTL() { return $this->TpressTL; }
  function setVersion($version) { $this->version = $version; }
  function getVersion() { return $this->version; }
  function setBuild($build) { $this->build = $build; }
  function getBuild() { return $this->build; }
  function setWgust($wgust) { $this->wgust = $wgust; }
  function getWgust() { return $this->wgust; }
  function setHeatindex($heatindex) { $this->heatindex = $heatindex; }
  function getHeatindex() { return $this->heatindex; }
  function setHumidex($humidex) { $this->humidex = $humidex; }
  function getHumidex() { return $this->humidex; }
  function setUV($UV) { $this->UV = $UV; }
  function getUV() { return $this->UV; }
  function setET($ET) { $this->ET = $ET; }
  function getET() { return $this->ET; }
  function setSolarRad($SolarRad) { $this->SolarRad = $SolarRad; }
  function getSolarRad() { return $this->SolarRad; }
  function setAvgbearing($avgbearing) { $this->avgbearing = $avgbearing; }
  function getAvgbearing() { return $this->avgbearing; }
  function setRhour($rhour) { $this->rhour = $rhour; }
  function getRhour() { return $this->rhour; }
  function setForecastnumber($forecastnumber) { $this->forecastnumber = $forecastnumber; }
  function getForecastnumber() { return $this->forecastnumber; }
  function setIsdaylight($isdaylight) { $this->isdaylight = $isdaylight; }
  function getIsdaylight() { return $this->isdaylight; }
  function setSensorContactLost($SensorContactLost) { $this->SensorContactLost = $SensorContactLost; }
  function getSensorContactLost() { return $this->SensorContactLost; }
  function setWdir($wdir) { $this->wdir = $wdir; }
  function getWdir() { return $this->wdir; }
  function setCloudbasevalue($cloudbasevalue) { $this->cloudbasevalue = $cloudbasevalue; }
  function getCloudbasevalue() { return $this->cloudbasevalue; }
  function setCloudbaseunit($cloudbaseunit) { $this->cloudbaseunit = $cloudbaseunit; }
  function getCloudbaseunit() { return $this->cloudbaseunit; }
  function setApptemp($apptemp) { $this->apptemp = $apptemp; }
  function getApptemp() { return $this->apptemp; }
  function setSunshineHours($SunshineHours) { $this->SunshineHours = $SunshineHours; }
  function getSunshineHours() { return $this->SunshineHours; }
  function setCurrentSolarMax($CurrentSolarMax) { $this->CurrentSolarMax = $CurrentSolarMax; }
  function getCurrentSolarMax() { return $this->CurrentSolarMax; }
  function setIsSunny($IsSunny) { $this->IsSunny = $IsSunny; }
  function getIsSunny() { return $this->IsSunny; }




  public function getAll(){
    $data["date"] = $this->date;
    $data["time"] = $this->time;
    $data["temp"] = $this->temp;
    $data["hum"] = $this->hum;
    $data["dew"] = $this->dew;
    $data["wspeed"] = $this->wspeed;
    $data["wlatest"] = $this->wlatest;
    $data["bearing"] = $this->bearing;
    $data["rrate"] = $this->rrate;
    $data["rfall"] = $this->rfall;
    $data["press"] = $this->press;
    $data["currentwdir"] = $this->currentwdir;
    $data["beaufortnumber"] = $this->beaufortnumber;
    $data["windunit"] = $this->windunit;
    $data["tempunitnodeg"] = $this->tempunitnodeg;
    $data["pressunit"] = $this->pressunit;
    $data["rainunit"] = $this->rainunit;
    $data["windrun"] = $this->windrun;
    $data["presstrendval"] = $this->presstrendval;
    $data["rmonth"] = $this->rmonth;
    $data["ryear"] = $this->ryear;
    $data["rfallY"] = $this->rfallY;
    $data["intemp"] = $this->intemp;
    $data["inhum"] = $this->inhum;
    $data["wchill"] = $this->wchill;
    $data["temptrend"] = $this->temptrend;
    $data["tempTH"] = $this->tempTH;
    $data["TtempTH"] = $this->TtempTH;
    $data["tempTL"] = $this->tempTL;
    $data["TtempTL"] = $this->TtempTL;
    $data["windTM"] = $this->windTM;
    $data["TwindTM"] = $this->TwindTM;
    $data["wgustTM"] = $this->wgustTM;
    $data["TwgustTM"] = $this->TwgustTM;
    $data["pressTH"] = $this->pressTH;
    $data["TpressTH"] = $this->TpressTH;
    $data["pressTL"] = $this->pressTL;
    $data["TpressTL"] = $this->TpressTL;
    $data["version"] = $this->version;
    $data["build"] = $this->build;
    $data["wgust"] = $this->wgust;
    $data["heatindex"] = $this->heatindex;
    $data["humidex"] = $this->humidex;
    $data["UV"] = $this->UV;
    $data["ET"] = $this->ET;
    $data["SolarRad"] = $this->SolarRad;
    $data["avgbearing"] = $this->avgbearing;
    $data["rhour"] = $this->rhour;
    $data["forecastnumber"] = $this->forecastnumber;
    $data["isdaylight"] = $this->isdaylight;
    $data["SensorContactLost"] = $this->SensorContactLost;
    $data["wdir"] = $this->wdir;
    $data["cloudbasevalue"] = $this->cloudbasevalue;
    $data["cloudbaseunit"] = $this->cloudbaseunit;
    $data["apptemp"] = $this->apptemp;
    $data["SunshineHours"] = $this->SunshineHours;
    $data["CurrentSolarMax"] = $this->CurrentSolarMax;
    $data["IsSunny"] = $this->IsSunny;

    return $data;
  }

  public function setAll($arrayValues){
    $this->setDate($arrayValues[0]);
    $this->setTime($arrayValues[1]);
    $this->setTemp($arrayValues[2]);
    $this->setHum($arrayValues[3]);
    $this->setDew($arrayValues[4]);
    $this->setWspeed($arrayValues[5]);
    $this->setWlatest($arrayValues[6]);
    $this->setBearing($arrayValues[7]);
    $this->setRrate($arrayValues[8]);
    $this->setRfall($arrayValues[9]);
    $this->setPress($arrayValues[10]);
    $this->setCurrentwdir($arrayValues[11]);
    $this->setBeaufortnumber($arrayValues[12]);
    $this->setWindunit($arrayValues[13]);
    $this->setTempunitnodeg($arrayValues[14]);
    $this->setPressunit($arrayValues[15]);
    $this->setRainunit($arrayValues[16]);
    $this->setWindrun($arrayValues[17]);
    $this->setPresstrendval($arrayValues[18]);
    $this->setRmonth($arrayValues[19]);
    $this->setRyear($arrayValues[20]);
    $this->setRfallY($arrayValues[21]);
    $this->setIntemp($arrayValues[22]);
    $this->setInhum($arrayValues[23]);
    $this->setWchill($arrayValues[24]);
    $this->setTemptrend($arrayValues[25]);
    $this->setTempTH($arrayValues[26]);
    $this->setTtempTH($arrayValues[27]);
    $this->setTempTL($arrayValues[28]);
    $this->setTtempTL($arrayValues[29]);
    $this->setWindTM($arrayValues[30]);
    $this->setTwindTM($arrayValues[31]);
    $this->setWgustTM($arrayValues[32]);
    $this->setTwgustTM($arrayValues[33]);
    $this->setPressTH($arrayValues[34]);
    $this->setTpressTH($arrayValues[35]);
    $this->setPressTL($arrayValues[36]);
    $this->setTpressTL($arrayValues[37]);
    $this->setVersion($arrayValues[38]);
    $this->setBuild($arrayValues[39]);
    $this->setWgust($arrayValues[40]);
    $this->setHeatindex($arrayValues[41]);
    $this->setHumidex($arrayValues[42]);
    $this->setUV($arrayValues[43]);
    $this->setET($arrayValues[44]);
    $this->setSolarRad($arrayValues[45]);
    $this->setAvgbearing($arrayValues[46]);
    $this->setRhour($arrayValues[47]);
    $this->setForecastnumber($arrayValues[48]);
    $this->setIsdaylight($arrayValues[49]);
    $this->setSensorContactLost($arrayValues[50]);
    $this->setWdir($arrayValues[51]);
    $this->setCloudbasevalue($arrayValues[52]);
    $this->setCloudbaseunit($arrayValues[53]);
    $this->setApptemp($arrayValues[54]);
    $this->setSunshineHours($arrayValues[55]);
    $this->setCurrentSolarMax($arrayValues[56]);
    $this->setIsSunny($arrayValues[57]);
  }


}
?>
