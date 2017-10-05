<!DOCTYPE html>
<html>
  <head>
    <title>Bounce[beta] : PlanetTech Labs</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <script src="../p5.min.js"></script>
    <script src="../p5.dom.min.js"></script>
    <script src="ball.js?v=<?php echo time(); ?>"></script>
    <script src="stick.js?v=<?php echo time(); ?>"></script>
    <script src="sketch.js?v=<?php echo time(); ?>"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-105237021-4"></script>
    <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)}; gtag('js', new Date()); gtag('config', 'UA-105237021-4');
    </script>
    <style>
      body{
        padding: 0em; 
        margin: 0;
        font-family: "Raleway", sans-serif;
        text-align: center;
        float: none!important;
        margin: auto!important;
        background-color: #EEEEEE;
      }
      .instructions{
        font-family: sans-serif;
      }
      h3{
        text-align: center;
        font-weight: normal;
      }
      #resetButton{
        border: none;
        outline: none;
        box-shadow: none;
        padding: 0.5em 2em;
        color: #333;
        font-weight: bold;
        background-color: rgb(255, 193, 7);
      }
    </style>
  </head>
  <body>
    <h3><b>Bounce</b><sup>[beta]</sup> by PlanetTech Labs</h3>
    <p class="instructions">
      <b>Instructions:</b> 1. Space to Jump 2. Press Control to Restart Game or click here
      <button id="resetButton" onclick="resetGame()">Reset Game</button>
    </p>  
    </div>
  </body>
</html>