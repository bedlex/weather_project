function farengheit(kelvin){
    let farengheit=(kelvin - 273)*9/5 + 32;
    return farengheit.toFixed(2)
}
function feets(meter){
    let feet = meter*3.281;
    return feet.toFixed(2)
}

function speed(meters){
    let miles = meters*2.237;
    return miles.toFixed(2)

}

function align(calend){
    var calend_txt = calend.toString()
    if (calend_txt.length<2){
        return "0"+calend_txt
    }
    else
    {
        return calend_txt
    }

}

function time(off){
    /*
    date = new Date(Date.UTC());
    time_zone = date.getTimezoneOffset();
    console.log("your timezone: " + time_zone)
   */
 
  off = off/60;
  var dt = new Date();
  var tz = dt.getTimezoneOffset();
  dt.setMinutes(dt.getMinutes()+tz+off)
  var year = dt.getFullYear()
  var month = dt.getMonth() + 1
  var day = dt.getDate()
  var hours = dt.getHours()
  var minutes = dt.getMinutes()
    if (hours>=0 && hours <5){
        document.body.className="body1";
    }
    else if (hours>=5 && hours <11){
        document.body.className="body2";
    }
    else if (hours>=11 && hours <17)
    {
        document.body.className="body3";
       
    }
    else if (hours >= 17 && hours < 21)
    {
        document.body.className="body4";
    }
    else{
        document.body.className="body1";
    }
    console.log(month)
  var time_str = align(hours)+":"+align(minutes)+"<br>"+align(day)+"/"+align(month)+"/"+year

  return time_str
}
function check(){
    let city = $("#weather_form input[name=city]").val();
    let country = $("#weather_form input[name=country]").val();
    console.log(city)
    console.log(country)
    key = '0ca6cfa9244fee0acae3bc9682129657'    
    $.ajax(
        {
            url:'https://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid='+key,
            type:'GET',
            success:function(s){
                $.get('https://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid='+key,function(data){
                    $("#city").text(data.name)                    
                    $("#temp").html(farengheit(data.main.temp)+" F<sup>o<sup>")                    
                    $("#pressure").html("Pressure: "+data.main.pressure+" Hpa")
                    $("#humidity").html("Humidity: "+data.main.humidity+' %')
                    $("#temp_min_text").html("Minimal Temperature: "+farengheit(data.main.temp_min)+" F<sup>o<sup>")
                    $("#temp_max_text").html("Maximal Temperature: " +farengheit(data.main.temp_max)+" F<sup>o<sup>")
                    $("#visibility_text").html("Visibility: " + feets(data.visibility)+ " feet")
                    $("#wind_speed_text").html("Wind Speed: " +speed(data.wind.speed)+" mph")   
                    $("#time").html(time(data.timezone))
    })
            },
            error:function(){
                alert("City is not exist in our database")
            }
        }
    )
 
}