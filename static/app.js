var pollMembers = document.querySelectorAll('.poll-member')

    var members = ['Miguel de Cervantes', 'Charles Dickens', 'J.R.R. Tolkien', 'Antoine de Saint-Exuper']

    // Sets up click events for all the cards on the DOM
    pollMembers.forEach((pollMember, index) => {
      pollMember.addEventListener('click', (event) => {
        handlePoll(members[index])
      }, true)
    })

    // Sends a POST request to the server using axios
    var handlePoll = function(member) {
      axios.post('http://localhost:5000/vote', {member}).then((r) => console.log(r))
    }

    // Configure Pusher instance
    const pusher = new Pusher("9fc7a8619b99bccb89d9", {
      cluster:  "ap2",
      encrypted: true
    });

    // Subscribe to poll trigger
    var channel = pusher.subscribe('poll');

    // Listen to vote event
    channel.bind('vote', function(data) {
      for (i = 0; i < (data.length - 1); i++) { 
        var total = data[0].votes + data[1].votes + data[2].votes + data[3].votes
        document.getElementById(data[i].name).style.width = calculatePercentage(total, data[i].votes)
        document.getElementById(data[i].name).style.background = "#388e3c" 
      }
    });

    let calculatePercentage = function(total, amount) {
      return (amount / total) * 100 + "%"
    }
