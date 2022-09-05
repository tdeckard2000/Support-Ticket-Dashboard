const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json({extended: true}));
app.use(cors());
app.use(express.static(__dirname + '/dist/diamond'));

app.get('/', function(req,res) {
    console.log("HERE")
  res.sendFile(path.join(__dirname+'/dist/diamond/index.html'));
  });

app.get('/api/events/', (req, res) => {
  res.send(exampleEvents)
})

app.get('/api/events/domains', (req, res) => {
  res.send(exampleDomains)
})

app.get('/api/people', (req, res) => {
  res.json(examplePeople)
})

app.post('/api/', (req, res) => {
  exampleEvents.push(req.body);
  console.log(exampleEvents)
  setTimeout(() => {
    // Simulate DB request wait
    res.json({successful: 'true'})
  }, 1500);
})

app.patch('/api/events/:id', (req, res) => {
  let successful = false;
  exampleEvents.forEach(event => {
    if(event._id == req.params.id && event.downtimeEvent === true) {
      event.downtimeEvent = false;
      successful = true;
      res.json({successful: true})
    }
  })
  if(!successful) {
    console.warn('Unable to modify downtime event for event id ', req.params.id)
    res.json({successful: false})
  }
})

app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${port}`)
})


// Feeble™ Database

const exampleEvents = [
  {
    _id: 74,
    domain: 'Maintenance',
    subDomain: 'Sub A',
    owners: [],
    description: 'This event is most important of all events.',
    downtimeEvent: false
  }
]

const exampleDomains = [
  {
    name: 'Maintenance',
    subDomains: [
      'Sub Phoenix-A',
      'Sub Phoenix-B',
      'Sub Phoenix-C'
    ]
  },
  {
    name: 'Production',
    subDomains: [
      'Sub Bill-A',
      'Sub Bill-B',
      'Sub Bill-C'
    ]
  },
  {
    name: 'Software',
    subDomains: [
      'Sub SLC-A',
      'Sub SLC-B',
      'Sub SLC-C'
    ]
  },
  {
    name: 'Electrical',
    subDomains: [
      'Sub Indianapolis-A',
      'Sub Indianapolis-B',
      'Sub Indianapolis-C'
    ]
  },
  {
    name: 'Mechanical',
    subDomains: [
      'Sub Z-A',
      'Sub Z-B',
      'Sub Z-C'
    ]
  }
]


const examplePeople = [
  {
    _id: 1,
    first: 'Jim',
    last: 'Varney'
  },
  {
    _id: 2,
    first: 'Jay',
    last: 'Z'
  },
  {
    _id: 3,
    first: 'David',
    last: 'Spade'
  },
  {
    _id: 4,
    first: 'Joe',
    last: 'Exotic'
  },
  {
    _id: 5,
    first: 'Brendan',
    last: 'Fraser'
  },
  {
    _id: 6,
    first: 'Timmy',
    last: 'Turner'
  }
]
