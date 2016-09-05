function weatherDataObj() {
    this.date;
    this.time;
    this.temp;
    this.hum;
    this.dew;
    this.wspeed;
    this.wlatest;
    this.bearing;
    this.rrate;
    this.rfall;
    this.press;
    this.currentwdir;
    this.beaufortnumber;
    this.windunit;
    this.tempunitnodeg;
    this.pressunit;
    this.rainunit;
    this.windrun;
    this.presstrendval;
    this.rmonth;
    this.ryear;
    this.rfallY;
    this.intemp;
    this.inhum;
    this.wchill;
    this.temptrend;
    this.tempTH;
    this.TtempTH;
    this.tempTL;
    this.TtempTL;
    this.windTM;
    this.TwindTM;
    this.wgustTM;
    this.TwgustTM;
    this.pressTH;
    this.TpressTH;
    this.pressTL;
    this.TpressTL;
    this.version;
    this.build;
    this.wgust;
    this.heatindex;
    this.humidex;
    this.UV;
    this.ET;
    this.SolarRad;
    this.avgbearing;
    this.rhour;
    this.forecastnumber;
    this.isdaylight;
    this.SensorContactLost;
    this.wdir;
    this.cloudbasevalue;
    this.cloudbaseunit;
    this.apptemp;
    this.SunshineHours;
    this.CurrentSolarMax;
    this.IsSunny;

    this.construct = function(date,
        time,
        temp,
        hum,
        dew,
        wspeed,
        wlatest,
        bearing,
        rrate,
        rfall,
        press,
        currentwdir,
        beaufortnumber,
        windunit,
        tempunitnodeg,
        pressunit,
        rainunit,
        windrun,
        presstrendval,
        rmonth,
        ryear,
        rfallY,
        intemp,
        inhum,
        wchill,
        temptrend,
        tempTH,
        TtempTH,
        tempTL,
        TtempTL,
        windTM,
        TwindTM,
        wgustTM,
        TwgustTM,
        pressTH,
        TpressTH,
        pressTL,
        TpressTL,
        version,
        build,
        wgust,
        heatindex,
        humidex,
        UV,
        ET,
        SolarRad,
        avgbearing,
        rhour,
        forecastnumber,
        isdaylight,
        SensorContactLost,
        wdir,
        cloudbasevalue,
        cloudbaseunit,
        apptemp,
        SunshineHours,
        CurrentSolarMax,
        IsSunny) {
        this.setDate(date);
        this.setTime(time);
        this.setTemp(temp);
        this.setHum(hum);
        this.setDew(dew);
        this.setWspeed(wspeed);
        this.setWlatest(wlatest);
        this.setBearing(bearing);
        this.setRrate(rrate);
        this.setRfall(rfall);
        this.setPress(press);
        this.setCurrentwdir(currentwdir);
        this.setBeaufortnumber(beaufortnumber);
        this.setWindunit(windunit);
        this.setTempunitnodeg(tempunitnodeg);
        this.setPressunit(pressunit);
        this.setRainunit(rainunit);
        this.setWindrun(windrun);
        this.setPresstrendval(presstrendval);
        this.setRmonth(rmonth);
        this.setRyear(ryear);
        this.setRfallY(rfallY);
        this.setIntemp(intemp);
        this.setInhum(inhum);
        this.setWchill(wchill);
        this.setTemptrend(temptrend);
        this.setTempTH(tempTH);
        this.setTtempTH(TtempTH);
        this.setTempTL(tempTL);
        this.setTtempTL(TtempTL);
        this.setWindTM(windTM);
        this.setTwindTM(TwindTM);
        this.setWgustTM(wgustTM);
        this.setTwgustTM(TwgustTM);
        this.setPressTH(pressTH);
        this.setTpressTH(TpressTH);
        this.setPressTL(pressTL);
        this.setTpressTL(TpressTL);
        this.setVersion(version);
        this.setBuild(build);
        this.setWgust(wgust);
        this.setHeatindex(heatindex);
        this.setHumidex(humidex);
        this.setUV(UV);
        this.setET(ET);
        this.setSolarRad(SolarRad);
        this.setAvgbearing(avgbearing);
        this.setRhour(rhour);
        this.setForecastnumber(forecastnumber);
        this.setIsdaylight(isdaylight);
        this.setSensorContactLost(SensorContactLost);
        this.setWdir(wdir);
        this.setCloudbasevalue(cloudbasevalue);
        this.setCloudbaseunit(cloudbaseunit);
        this.setApptemp(apptemp);
        this.setSunshineHours(SunshineHours);
        this.setCurrentSolarMax(CurrentSolarMax);
        this.setIsSunny(IsSunny);
    }

    this.setDate = function(date){
      this.date = date;
    }
    this.getDate = function(){
      return this.date;
    }

    this.setTime = function(time) {
        this.time = time;
    }
    this.getTime = function() {
        return this.time;
    }
    this.setTemp = function(temp) {
        this.temp = temp;
    }
    this.getTemp = function() {
        return this.temp;
    }
    this.setHum = function(hum) {
        this.hum = hum;
    }
    this.getHum = function() {
        return this.hum;
    }
    this.setDew = function(dew) {
        this.dew = dew;
    }
    this.getDew = function() {
        return this.dew;
    }
    this.setWspeed = function(wspeed) {
        this.wspeed = wspeed;
    }
    this.getWspeed = function() {
        return this.wspeed;
    }
    this.setWlatest = function(wlatest) {
        this.wlatest = wlatest;
    }
    this.getWlatest = function() {
        return this.wlatest;
    }
    this.setBearing = function(bearing) {
        this.bearing = bearing;
    }
    this.getBearing = function() {
        return this.bearing;
    }
    this.setRrate = function(rrate) {
        this.rrate = rrate;
    }
    this.getRrate = function() {
        return this.rrate;
    }
    this.setRfall = function(rfall) {
        this.rfall = rfall;
    }
    this.getRfall = function() {
        return this.rfall;
    }
    this.setPress = function(press) {
        this.press = press;
    }
    this.getPress = function() {
        return this.press;
    }
    this.setCurrentwdir = function(currentwdir) {
        this.currentwdir = currentwdir;
    }
    this.getCurrentwdir = function() {
        return this.currentwdir;
    }
    this.setBeaufortnumber = function(beaufortnumber) {
        this.beaufortnumber = beaufortnumber;
    }
    this.getBeaufortnumber = function() {
        return this.beaufortnumber;
    }
    this.setWindunit = function(windunit) {
        this.windunit = windunit;
    }
    this.getWindunit = function() {
        return this.windunit;
    }
    this.setTempunitnodeg = function(tempunitnodeg) {
        this.tempunitnodeg = tempunitnodeg;
    }
    this.getTempunitnodeg = function() {
        return this.tempunitnodeg;
    }
    this.setPressunit = function(pressunit) {
        this.pressunit = pressunit;
    }
    this.getPressunit = function() {
        return this.pressunit;
    }
    this.setRainunit = function(rainunit) {
        this.rainunit = rainunit;
    }
    this.getRainunit = function() {
        return this.rainunit;
    }
    this.setWindrun = function(windrun) {
        this.windrun = windrun;
    }
    this.getWindrun = function() {
        return this.windrun;
    }
    this.setPresstrendval = function(presstrendval) {
        this.presstrendval = presstrendval;
    }
    this.getPresstrendval = function() {
        return this.presstrendval;
    }
    this.setRmonth = function(rmonth) {
        this.rmonth = rmonth;
    }
    this.getRmonth = function() {
        return this.rmonth;
    }
    this.setRyear = function(ryear) {
        this.ryear = ryear;
    }
    this.getRyear = function() {
        return this.ryear;
    }
    this.setRfallY = function(rfallY) {
        this.rfallY = rfallY;
    }
    this.getRfallY = function() {
        return this.rfallY;
    }
    this.setIntemp = function(intemp) {
        this.intemp = intemp;
    }
    this.getIntemp = function() {
        return this.intemp;
    }
    this.setInhum = function(inhum) {
        this.inhum = inhum;
    }
    this.getInhum = function() {
        return this.inhum;
    }
    this.setWchill = function(wchill) {
        this.wchill = wchill;
    }
    this.getWchill = function() {
        return this.wchill;
    }
    this.setTemptrend = function(temptrend) {
        this.temptrend = temptrend;
    }
    this.getTemptrend = function() {
        return this.temptrend;
    }
    this.setTempTH = function(tempTH) {
        this.tempTH = tempTH;
    }
    this.getTempTH = function() {
        return this.tempTH;
    }
    this.setTtempTH = function(TtempTH) {
        this.TtempTH = TtempTH;
    }
    this.getTtempTH = function() {
        return this.TtempTH;
    }
    this.setTempTL = function(tempTL) {
        this.tempTL = tempTL;
    }
    this.getTempTL = function() {
        return this.tempTL;
    }
    this.setTtempTL = function(TtempTL) {
        this.TtempTL = TtempTL;
    }
    this.getTtempTL = function() {
        return this.TtempTL;
    }
    this.setWindTM = function(windTM) {
        this.windTM = windTM;
    }
    this.getWindTM = function() {
        return this.windTM;
    }
    this.setTwindTM = function(TwindTM) {
        this.TwindTM = TwindTM;
    }
    this.getTwindTM = function() {
        return this.TwindTM;
    }
    this.setWgustTM = function(wgustTM) {
        this.wgustTM = wgustTM;
    }
    this.getWgustTM = function() {
        return this.wgustTM;
    }
    this.setTwgustTM = function(TwgustTM) {
        this.TwgustTM = TwgustTM;
    }
    this.getTwgustTM = function() {
        return this.TwgustTM;
    }
    this.setPressTH = function(pressTH) {
        this.pressTH = pressTH;
    }
    this.getPressTH = function() {
        return this.pressTH;
    }
    this.setTpressTH = function(TpressTH) {
        this.TpressTH = TpressTH;
    }
    this.getTpressTH = function() {
        return this.TpressTH;
    }
    this.setPressTL = function(pressTL) {
        this.pressTL = pressTL;
    }
    this.getPressTL = function() {
        return this.pressTL;
    }
    this.setTpressTL = function(TpressTL) {
        this.TpressTL = TpressTL;
    }
    this.getTpressTL = function() {
        return this.TpressTL;
    }
    this.setVersion = function(version) {
        this.version = version;
    }
    this.getVersion = function() {
        return this.version;
    }
    this.setBuild = function(build) {
        this.build = build;
    }
    this.getBuild = function() {
        return this.build;
    }
    this.setWgust = function(wgust) {
        this.wgust = wgust;
    }
    this.getWgust = function() {
        return this.wgust;
    }
    this.setHeatindex = function(heatindex) {
        this.heatindex = heatindex;
    }
    this.getHeatindex = function() {
        return this.heatindex;
    }
    this.setHumidex = function(humidex) {
        this.humidex = humidex;
    }
    this.getHumidex = function() {
        return this.humidex;
    }
    this.setUV = function(UV) {
        this.UV = UV;
    }
    this.getUV = function() {
        return this.UV;
    }
    this.setET = function(ET) {
        this.ET = ET;
    }
    this.getET = function() {
        return this.ET;
    }
    this.setSolarRad = function(SolarRad) {
        this.SolarRad = SolarRad;
    }
    this.getSolarRad = function() {
        return this.SolarRad;
    }
    this.setAvgbearing = function(avgbearing) {
        this.avgbearing = avgbearing;
    }
    this.getAvgbearing = function() {
        return this.avgbearing;
    }
    this.setRhour = function(rhour) {
        this.rhour = rhour;
    }
    this.getRhour = function() {
        return this.rhour;
    }
    this.setForecastnumber = function(forecastnumber) {
        this.forecastnumber = forecastnumber;
    }
    this.getForecastnumber = function() {
        return this.forecastnumber;
    }
    this.setIsdaylight = function(isdaylight) {
        this.isdaylight = isdaylight;
    }
    this.getIsdaylight = function() {
        return this.isdaylight;
    }
    this.setSensorContactLost = function(SensorContactLost) {
        this.SensorContactLost = SensorContactLost;
    }
    this.getSensorContactLost = function() {
        return this.SensorContactLost;
    }
    this.setWdir = function(wdir) {
        this.wdir = wdir;
    }
    this.getWdir = function() {
        return this.wdir;
    }
    this.setCloudbasevalue = function(cloudbasevalue) {
        this.cloudbasevalue = cloudbasevalue;
    }
    this.getCloudbasevalue = function() {
        return this.cloudbasevalue;
    }
    this.setCloudbaseunit = function(cloudbaseunit) {
        this.cloudbaseunit = cloudbaseunit;
    }
    this.getCloudbaseunit = function() {
        return this.cloudbaseunit;
    }
    this.setApptemp = function(apptemp) {
        this.apptemp = apptemp;
    }
    this.getApptemp = function() {
        return this.apptemp;
    }
    this.setSunshineHours = function(SunshineHours) {
        this.SunshineHours = SunshineHours;
    }
    this.getSunshineHours = function() {
        return this.SunshineHours;
    }
    this.setCurrentSolarMax = function(CurrentSolarMax) {
        this.CurrentSolarMax = CurrentSolarMax;
    }
    this.getCurrentSolarMax = function() {
        return this.CurrentSolarMax;
    }
    this.setIsSunny = function(IsSunny) {
        this.IsSunny = IsSunny;
    }
    this.getIsSunny = function() {
        return this.IsSunny;
    }


}
