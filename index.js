const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json({extended: true}));
app.use(cors());
app.use(express.static(__dirname + '/dist/diamond'));

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/support-ticket-dashboard/index.html'));
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
  console.warn(`Listening on port ${port}`)
})


// Feeble™ Database

const exampleEvents = []

const exampleDomains = [
  {
    name: 'Maintenance',
    subDomains: [
      'Sub Maintain-A',
      'Sub Maintain-B',
      'Sub Maintain-C'
    ]
  },
  {
    name: 'Production',
    subDomains: [
      'Sub Prod-A',
      'Sub Prod-B',
      'Sub Prod-C'
    ]
  },
  {
    name: 'Software',
    subDomains: [
      'Sub Bug-A',
      'Sub Unexpected-B',
      'Sub Feature-C'
    ]
  },
  {
    name: 'Electrical',
    subDomains: [
      'Sub Switch-A',
      'Sub Switch-B',
      'Sub Switch-C'
    ]
  },
  {
    name: 'Mechanical',
    subDomains: [
      'Sub Gear-A',
      'Sub Gear-B',
      'Sub Gear-C'
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
