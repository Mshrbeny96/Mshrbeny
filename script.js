


let osm =  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

let mymap = L.map("mapid",{
    center:[25,26],
    zoom:5,
    layers:[osm],
    fullscreenControl: true

    
})
osm.addTo(mymap);
var cord;
var covid_data=[];
var total_confrimed;
var total_deaths;
var total_recovered;

fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations")
.then((response)=>{
    return response.json()
}).then((response_data)=>{
    console.log(response_data)

    let data = response_data.locations

    total_confrimed = response_data.latest.confirmed
    total_deaths = response_data.latest.deaths
    total_recovered =response_data.latest.recovered



    for (let index = 0; index < data.length; index++) {
        if(data[index].coordinates.latitude != "" && data[index].coordinates.longitude != "" ) {
            covid_data.push({
                id:data[index].id,
                country:data[index].country ,
                country_code:data[index].country_code ,
                country_population:data[index].country_population ,
                confirmed:data[index].latest.confirmed ,
                deaths:data[index].latest.deaths ,
                recovered:data[index].latest.recovered ,
                coordinates: [data[index].coordinates.latitude,data[index].coordinates.longitude],
                last_updated: data[index].last_updated
            })
    

        }
            
        
        
    }
    circle(covid_data)

    createTbl(data)
console.log( total_confrimed)

        document.getElementById("casnum").innerHTML=total_confrimed;
        document.getElementById("recnum").innerHTML=total_recovered;
        document.getElementById("deanum").innerHTML=total_deaths;






}

)

console.log(covid_data)

function circle(data){
    for (let index = 0; index < data.length; index++) {
        let color
        if(data[index].deaths < 3000){
            color = "#ff0000"
        }
        else{
            color = "#f00ac9"
        }
        let marker = L.circleMarker(data[index].coordinates,{
            fillColor: color,
            stroke :false,
            opacity:.9

        }
            
            )
            marker.bindPopup(
                `<table>
            
                        
                <tbody>
                    <tr>
                        <td>Country</td>
                        <td>${data[index].country}</td>
                    </tr>
                
                
                    <tr>
                        <td> Total Confirmed Cases</td>
                        <td>${ data[index].confirmed}</td>
                    </tr>
                    <tr>
                        <td>Total Recovered Cases</td>
                        <td>${ data[index].recovered}</td>
                    </tr>
                    <tr>
                        <td>Total Deaths Cases</td>
                        <td>${ data[index].deaths}</td>
                    </tr>
                </tbody>
            </table>`

            )
            


        marker.addTo(mymap  )
        
    }
}

console.log(covid_data)



function createTbl(data){
    var table="<table >";
    for (let index = 0; index <data.length; index++) {
        table+=`<tr onclick="func([${data[index].coordinates.latitude},${data[index].coordinates.longitude}])" >`
        table+=`<td style="color:#FF0000 "> Confrimed ${data[index].latest.confirmed}</td> <td style="color:#FFFFFF " > ${data[index].country}</td>`
        table+="</tr>"
        
        table+=`<tr onclick="func([${data[index].coordinates.latitude},${data[index].coordinates.longitude}])" >`
        table+=`<td  style="color:#FFFFFF " > Deaths ${data[index].latest.deaths}</td>`
        table+="</tr>"
        table+=`<tr onclick="func([${data[index].coordinates.latitude},${data[index].coordinates.longitude}])" >`
        table+=`<td style="color:#FFFFFF "  > Recovered ${data[index].latest.recovered}</td>`
        table+="</tr>"

        table+=`<tr onclick="func([${data[index].coordinates.latitude},${data[index].coordinates.longitude}])" >`
        table+=` <td bgcolor="#302f2f" style="line-height:20px;" colspan=3> &nbsp;</td>`
        table+="</tr>"
        
    }
    table+="</table>";
    document.getElementById("table").innerHTML=table;
}


function func(coordinate) {
    console.log(coordinate)

      
    mymap.flyTo(coordinate, 7);

  }




let mycurrentlocation = L.control.locate({position: "topright"})
mycurrentlocation.addTo(mymap);


var ctx = document.getElementById('canvas').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Cases', 'Recovered', 'Deaths' ],
        datasets: [{
            label: 'Total Cases of Last Week',
            data: [51.8, 47.7, 1.1],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',  
            
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
             
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



var ctx = document.getElementById('canvas2').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['19/7/2021', '20/7/2021', '21/7/2021', '22/7/2021', '23/7/2021', '24/7/2021'],
        datasets: [{
            label: 'Total Cases of Last Week',
            data: [125063879, 125377069, 125684228, 126002408, 126312199, 126665478],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',  
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});





  

/*Legend specific*/
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4> Classification Area </h4>";

  div.innerHTML += '<i style="background: #ff0000"></i><span> Minimum Areas < 3000 death cases </span><br>';
  div.innerHTML += '<i style="background: #f00ac9"></i><span>  Maxium Areas > 3000 death cases</span><br>';
  

  

  return div;
};

legend.addTo(mymap);
