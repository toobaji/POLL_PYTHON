var dataPoints = [
    { label: "Miguel de Cervantes", y: 0 },
    { label: "Charles Dickens", y: 0 },
    { label: "J.R.R. Tolkien", y: 0 },
    { label: "Antoine de Saint-Exuper", y: 0 },
  ]

  var chartContainer = document.querySelector('#chartContainer');

  if (chartContainer) {
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "theme2",
      data: [
        {
          type: "column",
          dataPoints: dataPoints
        }
      ]
    });

    chart.render();
  }

  Pusher.logToConsole = true;

  // Configure Pusher instance
  const pusher = new Pusher("9fc7a8619b99bccb89d9", {
    cluster:  "ap2",
    encrypted: true
  });

  // Subscribe to poll trigger
  var channel = pusher.subscribe('poll');

  // Listen to vote event
  channel.bind('vote', function(data) {
    dataPoints = dataPoints.map(dataPoint => {
      if(dataPoint.label == data[4].name[0]) {
        dataPoint.y += 10;
      }

      return dataPoint
    });

    // Re-render chart
    chart.render()
  });