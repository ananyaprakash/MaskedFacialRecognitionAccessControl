// import logo from './logo.svg'; https://www.youtube.com/watch?v=1hVDOLY4aco
// import React from 'react';
import React, { useState } from 'react';
// import {connect} from 'react-redux';
// import {Field, reduxForm, formValueSelector} from 'redux-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Webcam from 'webcam-easy';
// import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { createMuiTheme } from '@material-ui/core/styles';
// import { detectTest} from './test'

const primary_color = '#212121'
const secondary_color= '#536dfe'
const useStyles = makeStyles((theme) => ({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#536dfe',
    },
  },
  root: {
    flexGrow: 1,
    // backgroundColor:'rgba(52, 52, 52, 0.8)'//theme.palette.background.paper,
  
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    WebkitTextFillColor: 'white',
    backgroundColor: 'transparent',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

var counter=1;




function Enroll() {
	const [playing, setPlaying] = useState(false);
  const classes = useStyles();
	const HEIGHT = 500;
  const WIDTH = 500;
	const startVideo = () => {
    setPlaying(true);
		navigator.getUserMedia(
			{
				video: true,
			},
			(stream) => {
				let video = document.getElementsByClassName('app__videoFeed')[0];
				if (video) {
          video.srcObject = stream;
          // takePhoto();

          // imageCapture=  new ImageCapture(video); 
				}
			},
			(err) => console.error(err)
		);
	};

	const stopVideo = () => {
		setPlaying(false);
		let video = document.getElementsByClassName('app__videoFeed')[0];
    document.querySelector('video').srcObject.getVideoTracks()[0].stop();
    


	};

  async function handleSubmit(event){
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    var fn= document.getElementById("firstName").value;
    var ln= document.getElementById("lastName").value;
    // console.log(fn)
    
    var fileName= fn+ln;
    const data = { fileName };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    
    console.log('file name=',fileName);
    counter++;
    const response = await axios.post('http://localhost:5000/enroll', {'username':fileName});
    if(response.status==200){
      console.log(' image saved')
        // const tracks = document.querySelector("video").srcObject.getTracks();
        // tracks.forEach(function(track) {
        // 	track.stop();
        // });
      };
    counter=0;
    // document.getElementById("firstName").value
  }
  
	return (
		
    <Container component="main" maxWidth="sm" style={{ backgroundColor: 'transparent'}}>
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5" >
          Enroll User
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            
            <Grid>
            <video
              height={HEIGHT}
              width={WIDTH}
              muted
              autoPlay
              // className="app__videoFeed"
            > </video>
            
   			
        </Grid >
          
        
          <div className="app__input">
          <Grid container spacing={3}> 
          
          <Grid item xs>
          {/* {6} sm={4}> */}
          <Button variant="contained"
          color="primary"  onClickCapture={onGetUserMediaButtonClick}>Start</Button>
          </Grid>


          <Grid item xs>
            {/* ={6} sm={4}> */}
          
            <Button  variant="contained"
          color="primary"
           onClick={onTakePhotoButtonClick}
           >Click</Button>
            </Grid>
          {/* { playing ? ( */}
          < Grid item xs>
           {/* ={6} sm={4}> */}
            <Button
          // type="submit"
          halfWidth
          variant="contained"
          color="primary"
          // className={classes.submit}
          onClick= {stopVideo}
          >
            Done
          </Button> 
          </Grid>
          < Grid item xs>
           {/* ={6} sm={4}> */}
            <Button
          type="submit"
          halfWidth
          variant="contained"
          color="primary"
          // className={classes.submit}
          onClick= {handleSubmit}
          >
            Submit
          </Button> 
          </Grid>
          </Grid> 

        </div>
        </Grid>
        </form>
        
      </div>
      <canvas id='takePhotoCanvas'></canvas>
   
    </Container>

	);
}

// export default App;


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

//################
var imageCapture;

function onGetUserMediaButtonClick() {
  navigator.mediaDevices.getUserMedia({video: true})
  .then(mediaStream => {
    document.querySelector('video').srcObject = mediaStream;
    
    const track = mediaStream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
  })
  .catch(error => console.error(error));
}

// function onGrabFrameButtonClick() {
//   imageCapture.grabFrame()
//   .then(imageBitmap => {
//     const canvas = document.querySelector('#grabFrameCanvas');
//     drawCanvas(canvas, imageBitmap);
//   })
//   .catch(error => console.error(error));
// }

// function download(){
//   var download = document.getElementById("download");
//   var image = document.getElementById("CANVAS").toDataURL("image/png")
//                   .replace("image/jpg", "image/octet-stream");
//       //download.setAttribute("href", image);
//       download.setAttribute("download","archive.png");
// }



function onTakePhotoButtonClick() {
//    for(var i=1;i<=5;i++){
//     await photo(i);
    
//   }
//   // photo(1)
// }

// async function photo(i) { 
    var canvas = document.querySelector('#takePhotoCanvas');
    var fn= document.getElementById("firstName").value;
    var ln= document.getElementById("lastName").value;
    // console.log(fn)
    
    var fileName= fn+ln;
    imageCapture.takePhoto()
  .then(blob => createImageBitmap(blob))
  .then(imageBitmap => {

    canvas= drawCanvas(canvas, imageBitmap,fileName);
    submitToServer(fileName,canvas);
  }
    )
  .catch(error => console.error(error))

  }

  async function submitToServer(fileName,canvas){
    const image64 = canvas.toDataURL();
    // var name= fileName;
    fileName= fileName+counter;
    const data = { fileName, image64 };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    console.log(image64);
    console.log('file name=',fileName);
    counter++;
    const response = await axios.post('http://localhost:5000/register', {'image64':image64, 'username':fileName});
    if(response.status==200){
      console.log(' image saved')
        // const tracks = document.querySelector("video").srcObject.getTracks();
        // tracks.forEach(function(track) {
        // 	track.stop();
        // });
      };
  }
  

// }
/* Utils */

function drawCanvas(canvas, img) {
  
  canvas.width = getComputedStyle(canvas).width.split('px')[0];
  canvas.height = getComputedStyle(canvas).height.split('px')[0];
  let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
  let x = (canvas.width - img.width * ratio) / 2;
  let y = (canvas.height - img.height * ratio) / 2;
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
      x, y, img.width * ratio, img.height * ratio);
 
  return canvas;
}

  if(document.querySelector('video')){
    document.querySelector('video').addEventListener('play', function() {
    // document.querySelector('#grabFrameButton').disabled = false;
    document.querySelector('#takePhotoButton').disabled = false;
});
  }





//#################

function TestUser(){
  const [playing, setPlaying] = useState(false);
  const classes = useStyles();
	const HEIGHT = 500;
  const WIDTH = 500;
  const [valid, setValid] = useState(false);
  const [alerts,setAlerts]=useState(false);
  const [identity, setIdentity] = useState('')
  
	const startVideo = () => {
    setPlaying(true);
		navigator.getUserMedia(
			{
				video: true,
			},
			(stream) => {
				let video = document.getElementsByClassName('app__videoFeed')[0];
				if (video) {
          video.srcObject = stream;
          
				}
			},
			(err) => console.error(err)
		);
	};

	const stopVideo = () => {
		setPlaying(false);
		let video = document.getElementsByClassName('app__videoFeed')[0];
    // video.srcObject.getTracks()[0].stop();
    // const track = mediaStream.getVideoTracks()[0]
    document.querySelector('video').srcObject.getVideoTracks()[0].stop();
    


  };
  
  function onClick() {
    //    for(var i=1;i<=5;i++){
    //     await photo(i);
        
    //   }
    //   // photo(1)
    // }
    
    // async function photo(i) { 
        var canvas = document.querySelector('#takePhotoCanvas');
        
        imageCapture.takePhoto()
      .then(blob => createImageBitmap(blob))
      .then(imageBitmap => {
    
        canvas= drawCanvas(canvas, imageBitmap);
        recog(canvas);
        
      }
        )
      .catch(error => console.error(error))
    
      }

  async function recog(canvas){
    const image64 = canvas.toDataURL();
    const data = { image64 };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await axios.post('http://localhost:5000/verify', {'image64':image64});
    console.log(response.data.identity);
    // identity = response.data.identity;
    if(response.data.identity){
      stopVideo();
      setValid(true);
      // identity=response.data.identity;
      // setAlerts(true);
      // console.log(identity);
      setIdentity(response.data.identity);
      setAlerts(true);
      
    }
    // // this.setState({
    // //   verify:true,
    // // identity=response.data.identity
    // // }
    else {
      stopVideo();
      setValid(false);
      setAlerts(true);
      // alert("Not a registered user!")
      // this.props.backhome();
    }
    
}
  function handleSubmit(event){
    // alert('A name was submitted: ' + this.state.value);
    // recog(document.getElementsByClassName('app__videoFeed')[0]);
    event.preventDefault();
  };
  const Overlay = () => (
    <div className="overlay">
      <img src="data:image/jpeg;base64,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" />
    </div>
  );



  if(!alerts){
    return(
    
    <Container component="main" maxWidth="sm" style={{ backgroundColor: 'transparent'}}>
    <CssBaseline />
    <div className={classes.paper}>
   
      <Typography component="h1" variant="h5" >
        Test User
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={1}>

          
          <Grid>
          <video
            height={HEIGHT}
            width={WIDTH}
            muted
            autoPlay
            // className="app__videoFeed"
          >
             <Overlay></Overlay>
            </video>
           
       
      </Grid >
        
      
        <div className="app__input">
        <Grid container spacing={3}> 
        
        <Grid item xs>
        {/* {6} sm={4}> */}
        <Button variant="contained"
        color="primary"  onClick={onGetUserMediaButtonClick}>Start</Button>
        </Grid>
  
  
        <Grid item xs>
          {/* ={6} sm={4}> */}
        
          <Button  variant="contained"
        color="primary"
         onClick={onClick}
         >Recognize</Button>
          </Grid>
          
        
        
       
        </Grid> 
  
        </div>
        </Grid> 
      </form>
      
    
    <canvas id='takePhotoCanvas'></canvas>
    </div>
  </Container> 
  
  
  
  );
}
  else{
    if(valid){
      return(
      <Container>
      <Grid>
        <Alert iconMapping={{ success: <CheckCircleOutlineIcon fontSize="inherit" /> }}>
        <h1>Acces Granted! Welcome, {identity} .</h1> 
      </Alert>
      </Grid>
      </Container>
    );
    }
    else{

    return(
      <Container>
      <Grid>
      <Alert severity="error">
       
        User not identified — <strong>Acces Denied.</strong>
      </Alert>
    
      
      </Grid>
      </Container>
    
    );
  }
}  
}   

// async function recog(video){
//   const track = mediaStream.getVideoTracks()[0];
//   imageCapture = new ImageCapture(track);
//   console.log(imageCapture.takePhoto);
//   const image64 = imageCapture.takePhoto(). toDataURL();
//   console.log(image64)
//   const data = { image64 };
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   };
//   const response = await axios.post('http://localhost:5000/verify', {'image64':image64});
//   console.log(response.data.identity);
// }
export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const HEIGHT = 500;
  const WIDTH = 500;

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };
  
  return (
    
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Enroll"  href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Test" href="/trash" {...a11yProps(1)} />
          {/* <LinkTab label="Page Three" href="/spam" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <div style={{ 
      backgroundImage: `url("https://i.pinimg.com/originals/6f/64/99/6f6499a403cf64afea180b6419def4ef.jpg")` 
    }}>
      <TabPanel value={value} index={0}>
        {/* Page One */}

       <Enroll></Enroll>
       </TabPanel>
       {/* </div>  */}
       {/* <div style={{ 
      backgroundImage: `url("https://i.pinimg.com/originals/6f/64/99/6f6499a403cf64afea180b6419def4ef.jpg")` 
    }}> */}
      
      <TabPanel value={value} index={1}>
         <TestUser></TestUser> 
        
      </TabPanel>
      </div>
    </div>
  );
}
