/* eslint-disable */
/*
  
  export const displayMap = (locations) => {
    ================Creating your access Token from mapbox ======================

    mapbox.accessToken = 'pk.eyJ1IjoiampuYXNzY2htZWR0bWFubiIsImEioiJjam54ZmM5N3gwZjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rt9Z1A';
      var map = new mapboxgl.map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      scrollZoom: false,
      center: [-118.113491, 34.1117451],
      zoom: 10,
      interactive: false     
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        //  Create marker
      const el = document.createElement('div');
      el.className = 'marker';
      
      //  Add marker

      new mapboxgl.marker({
        element: el,
        anchor: 'bottom',
      })
      .setLngLat(loc.coordinates)
      .addTo(map);
    
      // Add Popup
      new mapboxgl.Popup({
        offset: 30
      })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description} </p>`)
      .appTo(map);
    
      // Extends map bounds to include current location
      bounds.extend(loc.coordinates);
});

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
      }
    });
  }
*/

  

