const mongoose = require('mongoose')
const Film = require('./models/Film')
const Location = require('./models/Location')
const User = require('./models/User')
const { dbUri } = require('./config/environment')

mongoose.connect(dbUri, (err, db) => {

  db.dropDatabase()
  return User.create({
    username: 'violeta',
    email: 'violepaez@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass'
  })
    .then(user => {
      return Film.create([
        {
          title: 'The Elephant Man',
          image: 'https://m.media-amazon.com/images/M/MV5BMDVjNjIwOGItNDE3Ny00OThjLWE0NzQtZTU3YjMzZTZjMzhkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg'
        },
        {
          title: 'Lara Croft Tomb Raider',
          image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Lara_Croft_film.jpg/220px-Lara_Croft_film.jpg'
        },
        {
          title: 'V for Vendetta',
          image: 'https://static.tvtropes.org/pmwiki/pub/images/2006_v_for_vendetta_poster_004_7457.jpg'
        },
        {
          title: 'Lawrence of Arabia',
          image: 'https://fbwebsitedefaultstorage.blob.core.windows.net/film/6436/uk/lawrence-of-arabia-poster.jpg'
        },
        {
          title: 'Great Expectations',
          image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Great_expectations.jpg/220px-Great_expectations.jpg'
        },
        {
          title: 'The World Is Not Enough',
          image: 'https://www.dvdsreleasedates.com/posters/800/T/The-World-Is-Not-Enough-movie-poster.jpg'
        },
        {
          title: 'Harry Potter and the Philosopher\'s Stone',
          image: 'https://images-na.ssl-images-amazon.com/images/I/514TVV6S1ML._SY445_.jpg'
        },
        {
          title: 'The Black Windmill',
          image: 'https://images-na.ssl-images-amazon.com/images/I/51LuzkNGZvL._SY445_.jpg'
        },
        {
          title: 'The Day the Earth Caught Fire',
          image: 'https://images-na.ssl-images-amazon.com/images/I/516WAP63BBL._SY445_.jpg'
        },
        {
          title: 'Man Who Knew Too Much',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/The_Man_Who_Knew_Too_Much_%281956_film%29.jpg/220px-The_Man_Who_Knew_Too_Much_%281956_film%29.jpg'
        },
        {
          title: 'Four Weddings and a Funeral',
          image: 'http://t2.gstatic.com/images?q=tbn:ANd9GcQ0EyeiJvpPSe9al9KkATC9oumLrTib2-h9LyZOBnO07j2oPTsd'
        },
        {
          title: 'Bridget Jones Diary',
          image: 'https://images-na.ssl-images-amazon.com/images/I/51GAS3VCA2L._SY445_.jpg'
        },
        {
          title: 'East is East',
          image: 'http://www.gstatic.com/tv/thumb/v22vodart/23272/p23272_v_v8_aa.jpg'
        },
        {
          title: 'Golden Eye',
          image: 'http://www.gstatic.com/tv/thumb/v22vodart/17416/p17416_v_v8_aa.jpg'
        },
        {
          title: 'The Saint',
          image: 'http://www.gstatic.com/tv/thumb/v22vodart/19202/p19202_v_v8_ab.jpg'
        }
      ])
        .then(films => {

          const [ theElephantMan, laraCroft, vForVendetta, lawrenceOfArabia, greatExpectations, theWorldIsNotEnough, harryPotterPS, blackWindmill, earthCaughtFire, manTooMuch, fourWeddings, bDiary, eastEast, goldenEye, theSaint ] = films

          return Location.create([{
            name: 'Drapers Hall',
            image: 'https://live.staticflickr.com/5526/9985638493_8d2bb544f2_b.jpg',
            coordinates: {
              lat: '51.515091',
              lng: '-0.086330'
            },
            films: [goldenEye],
            areaOfLondon: 'The City of London',
            streetAddress: 'Throgmorton Ave',
            postCode: 'EC2N 2DQ',
            sceneNotes: [
              {
                createdBy: user,
                text: 'The interior was St Petersburg council where Ourumov learns that Natalya has survived the Golden Eye detonation',
                film: goldenEye
              },
              {
                createdBy: user,
                text: 'HQ for the Moscow based Tretiak Oil and Gas Industries.',
                film: theSaint
              }
            ]
          },{
            name: 'Royal Exchange Buildings',
            image: 'https://www.movie-locations.com/movies/b/Bridget-Joness-Diary-Cornhill.jpg',
            coordinates: {
              lat: '51.513411',
              lng: '-0.087469'
            },
            films: [bDiary, eastEast],
            areaOfLondon: 'The City of London',
            streetAddress: 'Cornhill',
            postCode: 'EC3V 3LR',
            sceneNotes: [
              {
                createdBy: user,
                text: 'In the quaint buildings on the southwest corner, Mark Darcy (Colin Firth) buys a new diary and Bridget Jones finally gets her clinch in the snow.',
                film: bDiary
              },
              {
                createdBy: user,
                text: 'The shops are converted in to Nazir\'s boutique hat shop, "Le Beau Chapeau"',
                film: eastEast
              }
            ]
          },{
            name: 'Highbury Terrace',
            image: 'https://www.movie-locations.com/movies/f/Four-Weddings-And-A-Funeral-Highbury-Terrace.jpg',
            coordinates: {
              lat: '51.551492',
              lng: '-0.102187'
            },
            films: [fourWeddings],
            areaOfLondon: 'Northeast London',
            streetAddress: '22 Highbury Terrace',
            postCode: 'N5 1UP',
            sceneNotes: [{
              createdBy: user,
              text: 'Hugh Grant and Andie McDowell finally get together in the famous rain scene at the end of the film.',
              film: fourWeddings
            }]
          },{
            name: 'London Hilton',
            image: 'http://modernarchitecturelondon.com/photos/hilton-parklane-1.jpg',
            coordinates: {
              lat: '51.505611',
              lng: '-0.150720'
            },
            films: [manTooMuch],
            areaOfLondon: 'Central London',
            streetAddress: '22 Park Ln, Mayfair',
            postCode: 'W1K 1BE',
            sceneNotes: [{
              createdBy: user,
              text: 'Doris Day hosts a party in Hitchcock\'s remake of his own 1934 film.',
              film: manTooMuch
            }]
          },{
            name: 'Daily Express Building',
            image: 'https://i.dailymail.co.uk/1s/2018/08/23/13/wire-4046154-1535025840-355_634x422.jpg',
            coordinates: {
              lat: '51.514351',
              lng: '-0.105452'
            },
            films: [earthCaughtFire],
            areaOfLondon: 'Central London',
            streetAddress: '120 Fleet St',
            postCode: 'EC4A 2BE',
            sceneNotes: [{
              createdBy: user,
              text: 'Val Guest\'s semi-documentary about impending world apocalypse was filmed in this building',
              film: earthCaughtFire
            }]
          },{
            name: 'Liverpool Street Station',
            image: 'https://cdn.networkrail.co.uk/wp-content/uploads/2017/04/Liverpool-street-station.jpg',
            coordinates: {
              lat: '51.523350',
              lng: '-0.077440'
            },
            films: [theElephantMan],
            areaOfLondon: 'East London',
            streetAddress: 'Liverpool St',
            postCode: 'EC2M 7QH',
            sceneNotes: [{
              createdBy: user,
              text: 'This is where John Merrick (John Hurt) arrives back in London and is chased by an angry mob down in to the toilets. Merrick famously shouts, "I am not an animal. I am being human"',
              film: theElephantMan
            }]
          },{
            name: 'Dominion Theatre',
            image: 'http://www.arthurlloyd.co.uk/DominionTheatre/Bat.jpg',
            coordinates: {
              lat: '51.516924',
              lng: '-0.129577'
            },
            films: [blackWindmill],
            areaOfLondon: 'Central London',
            streetAddress: 'Tottencourt Road',
            postCode: 'W1T 7AQ',
            sceneNotes: [{
              createdBy: user,
              text: 'Michael Caine plays on-the-run agent who is trying to track down his missing son. He meets his wife, played by Janet Suzman, outside the Dominion Theatre',
              film: blackWindmill
            }]
          },{
            name: 'The Glass House',
            image: 'https://www.movie-locations.com/movies/h/Harry-Potter-1-Leaky-Cauldron.jpg',
            coordinates: {
              lat: '51.512490',
              lng: '-0.084150'
            },
            films: [harryPotterPS],
            areaOfLondon: 'The City of London',
            streetAddress: '42 Bulls Head Passage',
            postCode: 'EC3V 1LU',
            sceneNotes: [{
              createdBy: user,
              text: 'The doorway of the Leaky Cauldron, which contains the entrance to Daigon Alley.',
              film: harryPotterPS
            }]
          },{
            name: 'Leadenhall Market',
            image: 'https://media.timeout.com/images/72169/630/472/image.jpg',
            coordinates: {
              lat: '51.512840',
              lng: '-0.083720'
            },
            films: [laraCroft],
            areaOfLondon: 'The City of London',
            streetAddress: 'Gracechurch St',
            postCode: 'EC3V 1LT',
            sceneNotes: [{
              createdBy: user,
              text: 'Lara Croft zooms through the market on a motorbike',
              film: laraCroft
            }]
          },{
            name: 'SIS Building',
            image: 'https://upload.wikimedia.org/wikipedia/commons/0/01/SIS_building_%2826327425611%29.jpg',
            coordinates: {
              lat: '51.490760',
              lng: '-0.122460'
            },
            films: [theWorldIsNotEnough],
            areaOfLondon: 'East London',
            streetAddress: '85 Albert Embankment, Vauxhall',
            postCode: 'SE1 7TW',
            sceneNotes: [{
              createdBy: user,
              text: 'The headquarters of MI6 is revealed in The World is Not Enough and we get to see Judy Dench as M for the first time',
              film: theWorldIsNotEnough
            }]
          },{
            name: 'St Paul\'s Cathedral',
            image: 'https://blog.londonpass.com/wp-content/uploads/2017/03/st-pauls-facts-3.jpg',
            coordinates: {
              lat: '51.513704',
              lng: '-0.098399'
            },
            films: [lawrenceOfArabia, greatExpectations],
            areaOfLondon: 'The City of London',
            streetAddress: 'St. Paul\'s Churchyard',
            postCode: 'EC4M 8AD',
            sceneNotes: [
              {
                createdBy: user,
                text: 'The film ends with a memorial service and characters are seen to be giving various opinions of TE Lawrence on the steps of the cathedral',
                film: lawrenceOfArabia
              },{
                createdBy: user,
                text: 'Pip arrives in London and sits on the steps of the Cathedral',
                film: greatExpectations
              }
            ]
          },{
            name: 'The Old Bailey',
            image: 'https://www.barleystudio.co.uk/wp-content/uploads/2018/01/oldbailey1.jpg',
            coordinates: {
              lat: '51.515483',
              lng: '-0.101822'
            },
            films: [vForVendetta],
            areaOfLondon: 'The City of London',
            streetAddress: 'The Old Bailey',
            postCode: 'EC4M 7EH',
            sceneNotes: [{

              text: 'The Old Bailey is blown up in the dramatic start of V for Vendetta. Masked terrorist V watches on to the sound of Tchaikovsky\'s 1812 Overture',
              film: vForVendetta
            }]
          }])
        })

        .then(() => mongoose.connection.close())
        .catch(err => {
          console.log(err)
          mongoose.connection.close()
        })
    })
})
