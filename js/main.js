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
    if (hours>=7 && hours <20){
        document.body.className="body3";
        document.getElementById("sky__object").className ="sun";
    }
    else{
        document.body.className="body1";
        document.getElementById("sky__object").className ="moon";
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
                    $("#description").html(data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1))                    
                    $("#pressure").html("Pressure: "+data.main.pressure+" Hpa")
                    $("#humidity").html("Humidity: "+data.main.humidity+' %')
                    $("#temp_min_text").html("Minimal Temperature: "+farengheit(data.main.temp_min)+" F<sup>o<sup>")
                    $("#temp_max_text").html("Maximal Temperature: " +farengheit(data.main.temp_max)+" F<sup>o<sup>")
                    $("#visibility_text").html("Visibility: " + feets(data.visibility)+ " feet")
                    $("#wind_speed_text").html("Wind Speed: " +speed(data.wind.speed)+" mph")   
                    $("#time").html(time(data.timezone))
                   /**  document.getElementById("cloud").className="cloud";
                    document.getElementById("bad__cloud").className="bad__cloud";
                    document.getElementById("precipitation1").className="snow1";
                    document.getElementById("precipitation2").className="snow2";
                    document.getElementById("precipitation3").className="snow3";*/
                    document.getElementById("cloud").className="";
                    document.getElementById("bad__cloud").className="";
                    document.getElementById("precipitation1").className="";
                    document.getElementById("precipitation2").className="";
                    document.getElementById("precipitation3").className="";
                    document.getElementById("thunderbolt").className="";
                    document.getElementById("table").className="";
                    if(data.weather[0].description == "mist"){
                        document.getElementById("table").className="mist"
                       
                    }
                    else if(data.weather[0].description == "few clouds"){
                        document.getElementById("cloud").className="cloud";
                       
                    }
                    else if(data.weather[0].description == "scattered clouds"){
                        document.getElementById("bad__cloud").className="bad__cloud";                  
                    }
                    else if(data.weather[0].description == "shower rain" || data.weather[0].description == "light rain"){
                        document.getElementById("cloud").className="cloud";
                        document.getElementById("bad__cloud").className="bad__cloud";
                        document.getElementById("precipitation1").className="rain1";
                        document.getElementById("precipitation2").className="rain2";
                        document.getElementById("precipitation3").className="rain3";
                        
                    }
                    else if(data.weather[0].description == "rain" || data.weather[0].description == "moderate rain"){
                        document.getElementById("cloud").className="cloud";
                        document.getElementById("bad__cloud").className="bad__cloud";
                        document.getElementById("precipitation1").className="rain1";
                        document.getElementById("precipitation2").className="rain2";
                        document.getElementById("precipitation3").className="rain3";
                   
                    }
                    else if(data.weather[0].description == "thunderstorm"){
                        document.getElementById("cloud").className="cloud";
                        document.getElementById("bad__cloud").className="bad__cloud";
                        document.getElementById("precipitation1").className="rain1";
                        document.getElementById("precipitation2").className="rain2";
                        document.getElementById("precipitation3").className="rain3";
                        document.getElementById("thunderbolt").className="bolt";
                    }
                    else if(data.weather[0].description == "snow" || data.weather[0].description == "light snow"){
                        document.getElementById("cloud").className="cloud";
                        document.getElementById("bad__cloud").className="bad__cloud";
                        document.getElementById("precipitation1").className="snow1";
                        document.getElementById("precipitation2").className="snow2";
                        document.getElementById("precipitation3").className="snow3";
                       
                    }
                    else if (data.weather[0].description == "broken clouds"){
                        document.getElementById("cloud").className="cloud";
                        document.getElementById("bad__cloud").className="bad__cloud";
                        document.getElementById("bad__cloud").className="bad__cloud";
                        
                    }
                    else if (data.weather[0].description == "overcast clouds"){
                        document.getElementById("cloud").className="cloud";
                        document.getElementById("bad__cloud").className="bad__cloud";
                    }
                   
    })
            },
            error:function(){
                alert("City is not exist in our database")
            }
        }
    )
 
}