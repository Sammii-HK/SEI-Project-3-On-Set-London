# On Set London

NB: This project is now archived and unmaintained.

A full-stack application which indexes film set locations, with a React front-end and noSQL database using MongoDB. The application includes data schemas and a RESTful API framework. The app also utilises OpenCage to retrieve location co-ordinates.

## Details

### Timeframe

6 days

### Technologies Used

* React
* Webpack
* MongoDB/Mongoose
* Express
* Ajax
* JavaScript (ES6)
* HTML5
* Bulma (CSS framework)
* SCSS
* GitHub
* React Select
* ReactMapBox-GL
* OpenCage

### App Overview

At project initiation, we soon agreed that we would like to work with MapBox, a service which we had not covered during the course at General Assembly. From this came the idea to emulate Google Maps, but to list movie locations in London.

Our aim was to deliver a single page experience, integrating the ability for a user to add new locations and scene notes within the map environment.

![image](https://user-images.githubusercontent.com/40695746/57919387-a3c91980-7890-11e9-8ce1-8df3f62eeed0.png)

#### Development Process

The project was collaboration with [Violeta Paez](https://github.com/vpaez), [Sammii Kellow](https://github.com/Sammii-HK) and [Richard Yarwood](https://github.com/richyarwood) merging code from a single GitHub repository.

The application is deployed via Git on Heroku and can be found here: [On Set London](http://onsetlondon.herokuapp.com)

#### Functionality

##### Home.js component - the 'powerhouse parent'

The Home.js component is the parent of the other main components and sets the initial map coordinate state and passed this state and functions down to the children. In this manner we are able to minimise the number of api calls.

```javascript
constructor(){
  super()

  this.state = {
    locations: null,
    center: {
      lat: 51.515714,
      lng: -0.095843
    },
    toggleSidebar: false,
    toggleRightBar: false,
    activeLocation: null,
    markerClick: false
  }

  this.handleLocationClick = this.handleLocationClick.bind(this)
  this.toggleSidebarClick = this.toggleSidebarClick.bind(this)
  this.toggleRightBar = this.toggleRightBar.bind(this)
  this.toggleMarker = this.toggleMarker.bind(this)
  this.toggleActiveLocation = this.toggleActiveLocation.bind(this)
  this.updatePage = this.updatePage.bind(this)
  this.popUpShow = this.popUpShow.bind(this)
  this.getFilms = this.getFilms.bind(this)
  this.scrollLocationOnMarkerClick = this.scrollLocationOnMarkerClick.bind(this)
}

componentDidMount() {
  axios.get('/api/locations')
    .then(res => this.setState({ locations: res.data }))
    .catch(err => console.error(err))
}
```

##### Adding new locations

![image](https://user-images.githubusercontent.com/40695746/57920772-c14bb280-7893-11e9-939e-e70f8ad838ab.png)

We wanted to allow a user to add a scene note to a current film or add a new film. The application uses React Select to query our database and also create a new film.

A switch statement is used to collect the data in the relevant state:

```javascript
handleChange(e){
  let location = this.state.location
  let sceneNotes = []
  switch(true){
    case (e.name === 'areaOfLondon'):
      location = {...this.state.location, [e.name]: e.value}
      break
    case (!!e.target.dataset.sceneNotes):
      sceneNotes = []
      sceneNotes.push({...this.state.location.sceneNotes, [e.target.name]: e.target.value})
      location = {...this.state.location, sceneNotes}
      break
    default:
      location = {...this.state.location, [e.target.name]: e.target.value}
  }
  this.setState({ location })
}
```

On submit, OpenCageData is called to forward lookup the location address and return the correct latitude and longitude. Once this state is updated, the form data is submitted to both the Location and Film models.

```javascript
handleSubmit(e) {
  console.log(this.state.location)
  e.preventDefault()
  const token = Auth.getToken()
  axios.get('https://api.opencagedata.com/geocode/v1/json', {
    params: {
      key: process.env.OPENCAGE_API_TOKEN,
      q: this.state.location.streetAddress
    }
  })
    .then(res => {
      if(res.data.results[0]) {
        const location = {
          ...this.state.location,
          coordinates: {
            lng: res.data.results[0].geometry.lng,
            lat: res.data.results[0].geometry.lat
          }
        }
        this.setState({ location })
      } else {
        const errors = {...this.state.errors, invalidCoordinates: 'Please enter a valid address'}
        this.setState({ errors })
      }
    })
    .then(() => {
      return axios.post('api/locations', this.state.location, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    })
    .then(() => {
      this.setState({message: 'Location created'})
      setTimeout(() => {
        this.props.toggleRightBar()
        this.setState({ ...initialState})
      }, 2000)
    })
    .catch(err => {
      const errors = { ...this.state.errors, ...err.response.data.errors }
      this.setState({ errors })
    })
}
```

This process was one of our biggest challenges during the project.

##### Scrolling the Location Index and map focus

Clicking a location in the sidebar re-centres the map to that marker and also displays the films and scene notes within the sidebar.

Clicking a pop-up card scrolls the location in to view in the sidebar using this function:

```javascript
scrollLocationOnMarkerClick(){
  document.getElementById(this.state.activeLocation._id)
    .scrollIntoView({ behavior: 'smooth', block: 'start' })
}
```

##### Responsive design

We decided that having a good mobile experience was particularly important for this app as it's use would be one the move, walking round London visiting the locations.

Media queries are used to adjust the experience.

![image](https://user-images.githubusercontent.com/40695746/57921117-80a06900-7894-11e9-9342-bc50e9122d93.png)

### Challenges & Achievements

Having to apply form data input to search the OpenCageData API locations, to return lat and long co-ordinates for the location name supplied. Once co-ordinates have been retrieved, they are amended to the location form data on state and submitted to our API.

## Future enhancements

* Adding a lookup to the film database OMDB to populate new film images and film information.
* Make scene note editing inline rather than via a separate page.