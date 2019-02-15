import { Component, OnInit } from '@angular/core';


declare var google;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  fetchAccounts: any;
  constructor() { 
     
  }
  
 
  ngOnInit() {
    var map;
    var marker1;
    var marker2;
    var x;
    var y;
    var rectangle;
    var infowindow = new google.maps.InfoWindow();
    
    function initialize() {
     var mapOptions = {
         zoom: 11,
         center: new google.maps.LatLng(28.462677, 77.033383)
     };
     map = new google.maps.Map(document.getElementById('map-canvas'),
     mapOptions);
    
     marker1 = new google.maps.Marker({
         position: new google.maps.LatLng(28.343115132,77.14079),
         map: map,
         draggable: false,
         title: 'marker1'
     });
     google.maps.event.addListener(marker1, 'click', function (evt) {
         infowindow.setContent(marker1.getPosition().toUrlValue(6));
         infowindow.open(map, this);
     });
     marker2 = new google.maps.Marker({
         position: new google.maps.LatLng(28.543048,76.8536989),
         map: map,
         draggable: false,
         title: 'marker2'
     });
     google.maps.event.addListener(marker2, 'click', function (evt) {
         infowindow.setContent(marker1.getPosition().toUrlValue(6));
         infowindow.open(map, this);
     });
     rectangle = new google.maps.Rectangle({
         strokeColor: '#FFFFFF',
         strokeOpacity: 0.8,
         strokeWeight: 2,
         fillColor: '#ff69b4',
         fillOpacity: 0.35,
         map: map,
         
     });
    
     var leftSideDist = Math.round((marker2.getPosition().lng() - marker1.getPosition().lng()) * 10000) / 100;
     var belowSideDist = Math.round((marker2.getPosition().lat() - marker1.getPosition().lat()) * 10000) / 100;
    
     google.maps.event.addListener(marker1, 'dragend', function () {
    
         rectangle.setBounds(new google.maps.LatLngBounds(marker1.getPosition(), marker2.getPosition()));
         leftSideDist = Math.round((marker2.getPosition().lng() - marker1.getPosition().lng()) * 10000) / 100;
         makeGrid();
     });
    
     google.maps.event.addListener(marker2, 'dragend', function () {
    
         rectangle.setBounds(new google.maps.LatLngBounds(marker1.getPosition(), marker2.getPosition()));
         belowSideDist = Math.round((marker2.getPosition().lat() - marker1.getPosition().lat()) * 10000) / 100;
         makeGrid();
     });
     makeGrid();
    }
    
    var rectangleLat = [];
    var rectangleLng = [];
    
    function makeGrid() {
     for (x in rectangleLng) {
         for (y in rectangleLng[x]) {
             if (rectangleLng[x][y].setMap) {
                 rectangleLng[x][y].setMap(null)
                 rectangleLng[x][y] = null;
             }
         }
     }
     var leftSideDist = marker2.getPosition().lng() - marker1.getPosition().lng();
     var belowSideDist = marker2.getPosition().lat() - marker1.getPosition().lat();
    
     var dividerLat = 15;
     var dividerLng = 15; //ilerde kullanıcıdan alınacak
     var excLat = belowSideDist / dividerLat;
     var excLng = leftSideDist / dividerLng;
    
     var m1Lat = marker1.getPosition().lat();
     var m1Lng = marker1.getPosition().lng();
     var m2Lat = marker2.getPosition().lat();
     var m2Lng = marker2.getPosition().lng();
    //  document.getElementById('info').innerHTML += "dividerLat=" + dividerLat + ", excLat=" + excLat + "<br>";
    //  document.getElementById('info').innerHTML += "dividerLng=" + dividerLat + ", excLng=" + excLng + "<br>";
    //  document.getElementById('info').innerHTML += "m1=" + marker1.getPosition().toUrlValue(6) + "<br>";
    //  document.getElementById('info').innerHTML += "m2=" + marker2.getPosition().toUrlValue(6) + "<br>";
    
     for (var i = 0; i < dividerLat; i++) {
         if (!rectangleLng[i]) rectangleLng[i] = [];
         for (var j = 0; j < dividerLng; j++) {
             if (!rectangleLng[i][j]) rectangleLng[i][j] = {};
    
    
             rectangleLng[i][j] = new google.maps.Rectangle({
                 strokeColor: '#FFFFFF',
                 strokeOpacity: 0.8,
                 strokeWeight: 2,
                 fillColor: '#ff69b4',
                 fillOpacity: 0.1,
                 map: map,
                 bounds: new google.maps.LatLngBounds(
                 new google.maps.LatLng(m1Lat + (excLat * i), m1Lng + (excLng * j)),
                 new google.maps.LatLng(m1Lat + (excLat * (i+1) ), m1Lng + (excLng * (j-1))))
    
             });
           
    
         } //for j Lng
    
     } //for i Lat
    
    }
    
    google.maps.event.addDomListener(window, 'load', initialize);
     
  }

  refreshMapOnTabClick($event){
    if($event.index==0){
      window.location.reload()
    }
}

}
