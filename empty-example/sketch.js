var sizeX = 64;
var sizeY = 64;
var using64 = true;
var using32;
var using16;
var using8;
var count = 6; // Count for the for loop of the drawing grass blade process
var xLoc = 0;
var yLoc = 0;
//var bladeSize = sizeX/8;
var bladeSize = (1/16) * sizeX;
//or we can determine bladeSize with 1/16 x blade size...
//If we do this, remove the bladeSize/2 we have on the flowers
var button; //Generating grass button
var recColor1Button;
var recColor2Button;
var recColor3Button;
let currentCanvasButton;


var usedPositions = []; // List of X positions of grass we've already used.

let green1, green2, green3;
let autumnBase, autumnLight, autumnDark;
let snowyBase, snowyLight, snowyDark;
let speckGreen, speckAutumn, speckSnowy;

let currentColorBG, currentColorGB, currentColorGS;
let currentColorSpeckGrass;
let currentColorPetal, currentColorPistil;

let displayCanvas;
var grassImage;
let grassImageElement; // To display the generated grass image in HTML
var rowCount = 0;
var yOffset = 200;
// Create an array to hold all grass image elements
let grassImageElements = [];
var grassImage;
var dataURL;

var savedGrass1;
var dataURL1;

var savedGrass2;
var dataURL2;
var savedGrass3;
var dataURL3;

let savedCopy1; //IMAGE ELEMENT FOR THE COPIES
let savedCopy2; //IMAGE ELEMENT FOR THE COPIES (2)
let savedCopy3; //IMAGE ELEMENT FOR THE COPIES (3)

let sprite;
let playerElement; // Variable to hold the player HTML image element
var playerX = 60;
var playerY = 393;
var playerSpeed = 3;
var keyMap = {}; // Object to keep track of key states
var isFacingRight;
var usingCurrentCanvas = true;

let input1, input2, input3;
let warningMessage;
var percentageValues;
var invalidPercentage = false;

var flowers = true;
var grassSpecks = true;
var empty = false;
var xOffset = 20;
var grassText;
var customTileOffset = 500;
var descriptionLabel;
var colorLabel;
var movementLabel;
var underscoreTag;
var customCanvasGuideTag;
var percentTag1;
var percentTag2;
var percentTag3;
var customTutorialTag;

function preload(){
  //Load all of our sprites
  sprite64 = loadImage("Player64x64Gif.gif");
  sprite32 = loadImage("Player32x32Gif.gif");
  sprite16 = loadImage("Player16x16Gif.gif");
}

function setup() {
  
  displayCanvas = createCanvas(sizeX, sizeY);
  displayCanvas.position(xOffset, 20);
  button = createButton("Generate Grass!");
  button.position(xOffset, 100);

  customTutorialTag = createP("Click <br> 'Apply Current Canvas' <br> in the respective slot <br> to save this canvas that slot.");
  customTutorialTag.position(80 + xOffset, 20);
  recColor1Button = createButton("Standard Color");
  recColor1Button.position(800 + xOffset, 400);
  recColor2Button = createButton("Autumn Color");
  recColor2Button.position(1010 + xOffset, 400);
  recColor3Button = createButton("Winter Color");
  recColor3Button.position(1200 + xOffset, 400);
  
  button64 = createButton("Size: 64x64");
  button32 = createButton("Size: 32x32");
  button16 = createButton("Size: 16x16");
  button8 = createButton("Size: 8x8");
  
  buttonDownload = createButton("Download! (Current Canvas)");
  buttonDownload1 = createButton("Download!");
  buttonDownload2 = createButton("Download!");
  buttonDownload3 = createButton("Download!");
  
  saveButton1 = createButton("Apply Current Canvas!");
  saveButton2 = createButton("Apply Current Canvas!");
  saveButton3 = createButton("Apply Current Canvas!");
  
  currentCanvasButton = createButton('Using Current Canvas');
  currentCanvasButton.mousePressed(toggleState);
  
  applyButton = createButton("Apply!")
  
  flowersButton = createButton("Flowers? ☑");
  grassSpeckButton = createButton("Grass Specks? ☑");
  emptyButton = createButton("Empty? ☐");
  
  button64.position(0 + xOffset, 240); 
  button32.position(170 + xOffset, 240);
  button16.position(0 + xOffset, 280);
  button8.position(170 + xOffset, 280);
  
  buttonDownload.position(0 + xOffset, 160);
  buttonDownload1.position(420 + xOffset + customTileOffset, 105);
  buttonDownload2.position(420 + xOffset + customTileOffset, 205);
  buttonDownload3.position(420 + xOffset + customTileOffset, 305);
  
  saveButton1.position(300 + xOffset + customTileOffset, 70);
  saveButton2.position(300 + xOffset + customTileOffset, 170);
  saveButton3.position(300 + xOffset + customTileOffset, 270);
  
  currentCanvasButton.position(510 + xOffset + customTileOffset, 20);
  customCanvasGuideTag = createP("Create a more <br>varied grass canvas!");
  customCanvasGuideTag.position(790 + xOffset + customTileOffset, 10);
  
  applyButton.position(760 + xOffset + customTileOffset, 330);
  
 // Adjust Flowers, Grass Specks, and Empty buttons
  flowersButton.position(270 + xOffset, 460); // Align with Size: 64 button (x position)
  grassSpeckButton.position(270 + xOffset, 520); // Below Flowers button
  emptyButton.position(270 + xOffset, 580); // Below Grass Specks button

  underscoreTag = createP("-------------------------------------------------------------------------------------------");
  descriptionLabel = createP("Details");
  //colorLabel = createP("Recommended Colors");
  movementLabel = createP("Use WASD or <br>Arrow Keys to move!");
  underscoreTag.position(270 + xOffset, 360);
  descriptionLabel.position(270 + xOffset, 340);
  //colorLabel.position(800 + xOffset, 340);
  movementLabel.position(xOffset, 330);


   // Create number input elements with initial values
  input1 = createInput('33', 'number').attribute('min', 0).attribute('max', 100).position(670 + customTileOffset, 90);
  input2 = createInput('33', 'number').attribute('min', 0).attribute('max', 100).position(670 + customTileOffset, 190);
  input3 = createInput('34', 'number').attribute('min', 0).attribute('max', 100).position(670 + customTileOffset, 290);

  percentTag1 = createP("% Placement Rate");
  percentTag1.position(745 + customTileOffset, 85);
  percentTag2 = createP("% Placement Rate");
  percentTag2.position(745 + customTileOffset, 185);
  percentTag3 = createP("% Placement Rate");
  percentTag3.position(745 + customTileOffset, 285);
  
   // Create a warning message element
  warningMessage = createP('Percentages must sum up to 100!').style('color', 'red').position(450, 60);
  warningMessage.hide(); // Hide it initially
  
  input1.input(validateSum);
  input2.input(validateSum);
  input3.input(validateSum);
  
  percentageValues = getInputValues(); //Get initial values (May be redundant)
  
// Greens for vibrant grass
  green1 = color(100, 200, 70);    // Base grass green: vibrant and fresh
  green2 = color(140, 220, 100);   // Lighter green: brighter, almost neon
  green3 = color(80, 160, 60);     // Darker green for shading: rich and deep
  speckGreen = color(140, 235, 115); // Grass speck: slightly brighter green for contrast
  
// Autumn palette
  autumnBase = color(194, 120, 56);    // Orangey-brown for the base color
  autumnLight = color(224, 164, 107);  // Lighter pale brown
  autumnDark = color(156, 97, 48);     // Darker brown
  speckAutumn = color(240, 160, 80);   // Slightly darker reddish-brown for grass specks

// Winter palette
  snowyBase = color(200, 225, 255);    // Bright light blue, almost white
  snowyLight = color(230, 240, 255);   // Even lighter pale blue
  snowyDark = color(170, 200, 230);    // Darker light blue
  speckSnowy = color(255, 255, 255);   // Muted frosty green for grass speck
  
  currentColorBG = green1; // Assign default color
  currentColorGB = green2;
  currentColorGS = green3;
  currentColorSpeckGrass = speckGreen;
  currentColorPetal = color(225, 0, 10);
  currentColorPistil = color(255, 255, 0);

    //Grass text


    grassElement = select('#fake-button');
    grassElement.position(270 + xOffset, 395);
    
    //Create a color picker
    colorPicker1 = createColorPicker(green1);
    colorPicker1.position(560 + xOffset, 400);
    colorPicker2 = createColorPicker(green2);
    colorPicker2.position(620 + xOffset, 400);
    colorPicker3 = createColorPicker(green3); 
    colorPicker3.position(680 + xOffset, 400);
    
    colorPickerSpeck = createColorPicker(speckGreen);
    colorPickerSpeck.position(480 + xOffset, 525);
    
    colorPickerPetal = createColorPicker(currentColorPetal);
    colorPickerPetal.position(430 + xOffset, 465);
    colorPickerPistil = createColorPicker(currentColorPistil);
    colorPickerPistil.position(490 + xOffset, 465);

  // Assign functions to the buttons
  button.mousePressed(() => {
    drawGrass(); // Draw the grass
    usedPositions = []; // Reset used positions value
  });
  
  recColor1Button.mousePressed(() => setColor(green1, green2, green3, speckGreen));
  recColor2Button.mousePressed(() => setColor(autumnBase, autumnLight, autumnDark, speckAutumn));
  recColor3Button.mousePressed(() => setColor(snowyBase, snowyLight, snowyDark, speckSnowy));
  
  buttonDownload.mousePressed(() => {
    saveCanvas(displayCanvas, "grass_image", "png");
  });
  
  buttonDownload1.mousePressed(() => {
    if (savedGrass1) {
      save(savedGrass1, 'grass_image_1.png');
    } else {
      console.log('No image saved for Grass 1 yet');
    }
  });

  buttonDownload2.mousePressed(() => {
    if (savedGrass2) {
      save(savedGrass2, 'grass_image_2.png');
    } else {
      console.log('No image saved for Grass 2 yet');
    }
  });

  buttonDownload3.mousePressed(() => {
    if (savedGrass3) {
      save(savedGrass3, 'grass_image_3.png');
    } else {
      console.log('No image saved for Grass 3 yet');
    }
  });
  
  //Save button functionalities
  saveButton1.mousePressed(() => savedTile());
  saveButton2.mousePressed(() => savedTile2());
  saveButton3.mousePressed(() => savedTile3());
  
  buttonDownload2.mousePressed(() => {
    
  });
  
  
    // Add event listeners for each color picker
  colorPicker1.input(() => updateColor('bg'));
  colorPicker2.input(() => updateColor('gb'));
  colorPicker3.input(() => updateColor('gs'));
  colorPickerSpeck.input(() => updateColor('sg'));
  colorPickerPetal.input(() => updateColor('pe'));
  colorPickerPistil.input(() => updateColor('pi'));
  
  button64.mousePressed(() => {
    sizeX = 64;
    sizeY = 64; 
    bladeSize = (1/16) * sizeX;
    using64 = true;
    using32 = false;
    using16 = false;
    using8 = false;
    resizeCanvas(sizeX, sizeY);
  });
  button32.mousePressed(() => {
    sizeX = 32;
    sizeY = 32;  
    bladeSize = (1/16) * sizeX;
    using64 = false;
    using32 = true;
    using16 = false;
     using8 = false;
    resizeCanvas(sizeX, sizeY);
  });
  button16.mousePressed(() => {
    sizeX = 16;
    sizeY = 16; 
    bladeSize = (1/16) * sizeX;
    using64 = false;
    using32 = false;
    using16 = true;
    using8 = false;
    resizeCanvas(sizeX, sizeY);
  });
  button8.mousePressed(() => {
    sizeX = 8;
    sizeY = 8; 
    bladeSize = (1/16) * sizeX;
    using64 = false;
    using32 = false;
    using16 = false;
    using8 = true;
    resizeCanvas(sizeX, sizeY);
  });
  
  applyButton.mousePressed(() => {
    if(!usingCurrentCanvas){
      if(!invalidPercentage){
        customTile();
      }
    }
  });
  
  flowersButton.mousePressed(() => {
    toggleFlowers();
  });
  
  grassSpeckButton.mousePressed(() => {
    toggleGrassSpecks();
  });
  
  emptyButton.mousePressed(() => {
    toggleEmpty();
  });
  // Initialize usedPositions variable
  overlapCheck(50, 50);
  
  
  //Initial setup
  drawGrass();
  savedTile();
  savedTile2();
  savedTile3();
  
  applyButton.hide();
  buttonDownload1.hide();
  buttonDownload2.hide();
  buttonDownload3.hide();
  saveButton1.hide();
  saveButton2.hide();
  saveButton3.hide();
  input1.hide();
  input2.hide();
  input3.hide();
  savedCopy1.hide();
  savedCopy2.hide();
  savedCopy3.hide();
  percentTag1.hide();
  percentTag2.hide();
  percentTag3.hide();
  customTutorialTag.hide();
  
}

function drawGrass() {
  background(currentColorBG); // Reset the background when drawing grass
  if(!empty){
    for (var i = 0; i < count; i++) {
      selectGrassBladeType();
    }
  }
 
  createGrassTiles();//CREATE THE TILESET ON THE BOTTOM OF THE SCREEN
  createPlayer();
  
  
}

function singleBlockGrassDetail() {
  //Create a single 1x1 grass block
  fill(currentColorGB);
  noStroke();
  square(xLoc, yLoc, bladeSize);
  usedPositions.push({ x: xLoc, y: yLoc }); // Add this pixel to used positions
  singleBlockShade();
}

function grassSpeck() {
  //Create a single 1x1 grass block
  fill(currentColorSpeckGrass);
  noStroke();
  square(xLoc, yLoc, bladeSize);
  usedPositions.push({ x: xLoc, y: yLoc }); // Add this pixel to used positions
}

function singleBlockShade(){
  //Create a single 1x1 grass block of a darker color
  fill(currentColorGS);
  noStroke();
  square(xLoc, yLoc + bladeSize, bladeSize);
  usedPositions.push({ x: xLoc, y: yLoc }); // Add this pixel to used positions
}
function rectangleGrassDetail() {
  //Create a rectangular grass blade
  fill(currentColorGB);
  noStroke();
  rect(xLoc, yLoc, bladeSize, bladeSize * 2);
  usedPositions.push({ x: xLoc, y: yLoc }); // Bottom part 
  usedPositions.push({ x: xLoc, y: yLoc + bladeSize }); // Middle part
  usedPositions.push({ x: xLoc, y: yLoc + bladeSize * 2 }); // Top part 
  rectangleGrassShade();
}
function rectangleGrassShade() {
  //Create a single square grass shader for the rectangular grass blade
  fill(currentColorGS);
  noStroke();
  square(xLoc, yLoc + (bladeSize * 2), bladeSize);
  usedPositions.push({ x: xLoc, y: yLoc + (bladeSize * 2)}); // Add this pixel to used positions
  
}

function tallDiagonalGrassDetail(){
  //Create a rectangle grass blade with a diagonal single block grass tip
  fill(currentColorGB);
  noStroke();
  rect(xLoc, yLoc, bladeSize, bladeSize * 2);
  square(xLoc + bladeSize, yLoc - bladeSize, bladeSize);
  // Add the positions occupied by the rectangular part to usedPositions
  usedPositions.push({ x: xLoc, y: yLoc }); // Bottom part 
  usedPositions.push({ x: xLoc, y: yLoc + bladeSize }); // Middle part
  usedPositions.push({ x: xLoc, y: yLoc + bladeSize * 2 }); // Top part 
  usedPositions.push({ x: xLoc + bladeSize, y: yLoc - bladeSize }); // Diagonal tip
  rectangleGrassShade();
}

function flower(){
  //Create a flower, an arrangement 
  fill(currentColorPetal);
  noStroke();
  square(xLoc, yLoc, bladeSize); //Left Petal
  push();
  fill(currentColorPistil);
  square(xLoc + bladeSize, yLoc, bladeSize); //Middle Yellow Piece
  pop();
  square(xLoc + bladeSize + bladeSize, yLoc, bladeSize); //Right petal
  square(xLoc + bladeSize, yLoc + bladeSize, bladeSize); //Bottom Petal
  square(xLoc + bladeSize, yLoc - bladeSize, bladeSize); //Top petal
  
  //FLOWER SHADING
  fill(currentColorGS);
  square(xLoc, yLoc + bladeSize, bladeSize); //Left Petal
  square(xLoc + bladeSize + bladeSize, yLoc + bladeSize, bladeSize); //Right petal
  square(xLoc + bladeSize, yLoc + bladeSize + bladeSize, bladeSize); //Bottom Petal
  
  // Add the positions occupied by the rectangular part to usedPositions
  usedPositions.push({ x: xLoc, y: yLoc }); //
  usedPositions.push({x: xLoc + bladeSize, y:yLoc }); //
  usedPositions.push({x: xLoc + bladeSize + bladeSize, y:yLoc }); //
  usedPositions.push({x: xLoc + bladeSize, y:yLoc + bladeSize }); //
  usedPositions.push({x: xLoc + bladeSize, y:yLoc - bladeSize }); //
  usedPositions.push({x: xLoc, y:yLoc + bladeSize })
  usedPositions.push({x: xLoc + bladeSize + bladeSize, y:yLoc + bladeSize });
  usedPositions.push({x: xLoc + bladeSize, y:yLoc + bladeSize + bladeSize});
}

function randomizeLocation(objWidth, objHeight) {
  var attempts = 0;
  var maxAttempts = 100; // Adjust this based on the size of your canvas and grid
  var yOffset = objHeight; // Ensure there is at least a gap equal to the object's height from the top

  do {
    // Generate a random x-position for the object, ensuring it stays onscreen and aligns with the grid defined by bladeSize.
    xLoc = floor(random(0, (sizeX - objWidth) / bladeSize)) * bladeSize; 
    // Adjust the yLoc to ensure there's enough space above for the object's height.
    // Do the same for y-position
    yLoc = floor(random(yOffset / bladeSize, (sizeY - objHeight) / bladeSize)) * bladeSize;

    attempts++;

    // If the number of attempts exceeds maxAttempts, stop the loop and exit
    if (attempts > maxAttempts) {
      console.log("No more space to place new objects.");
      return; // Exit the function
    }

  } while (overlapCheck(xLoc, yLoc, objWidth, objHeight));

  // Store used positions to prevent overlap. Store the object's size to ensure proper checks.
  usedPositions.push({ x: xLoc, y: yLoc, width: objWidth, height: objHeight });
}

function selectGrassBladeType() {
  let valid = false; // Flag to determine if a valid type is found
  
  while (!valid) {
    let rng = floor(random(1, 6)); // Generates a random number, 1 to 5.

    if (rng === 1) {
      randomizeLocation(bladeSize, bladeSize * 2);
      singleBlockGrassDetail();
      valid = true; // Valid result found
    } else if (rng === 2) {
      randomizeLocation(bladeSize, bladeSize * 3);
      rectangleGrassDetail();
      valid = true; // Valid result found
    } else if (rng === 3) {
      randomizeLocation(bladeSize * 2, bladeSize * 4);
      tallDiagonalGrassDetail();
      valid = true; // Valid result found
    } else if (rng === 4) {
      if (flowers) {
        randomizeLocation(bladeSize * 3, bladeSize * 4);
        flower();
        valid = true; // Valid result found
      }
      // If flowers are not enabled, it will simply reroll
    } else if (rng === 5) { 
      if (grassSpecks) { 
        randomizeLocation(bladeSize, bladeSize); // Ensure you're passing valid arguments
        grassSpeck();
        valid = true; // Valid result found
      }
    }
  }
}

function overlapCheck(x, y) {
  // Define the buffer size 
  var buffer = bladeSize;

  // Checks if any generated shapes overlap or are within the buffer area of the current shape we're trying to generate
  for (var i = 0; i < usedPositions.length; i++) {
    var current = usedPositions[i];

    if (
      x < current.x + bladeSize + buffer &&
      x + bladeSize > current.x - buffer &&
      y < current.y + bladeSize + buffer &&
      y + bladeSize > current.y - buffer
    ) {
      return true; // Overlap or within buffer area
    }
  }
  return false; // No overlap found
}

function setColor(c1, c2, c3, c4){
  currentColorBG = c1;
  currentColorGB = c2;
  currentColorGS = c3;
  currentColorSpeckGrass = c4;
  
  // Convert p5 color objects to hex strings before assigning them to color pickers
  colorPicker1.value(c1.toString('#rrggbb'));
  colorPicker2.value(c2.toString('#rrggbb'));
  colorPicker3.value(c3.toString('#rrggbb'));
  colorPickerSpeck.value(c4.toString('#rrggbb'));
}

function updateColor(type) {
  if (type === "bg") {
    currentColorBG = color(colorPicker1.value());
  } else if (type === "gb") {
    currentColorGB = color(colorPicker2.value());
  } else if (type === "gs") {
    currentColorGS = color(colorPicker3.value());
  } else if (type === "sg"){
    currentColorSpeckGrass = color(colorPickerSpeck.value());
  } else if (type === "pe"){
    currentColorPetal = color(colorPickerPetal.value());
  } else if (type === "pi"){
    currentColorPistil = color(colorPickerPistil.value());
  }
  
}

function createGrassTiles() {
  if (usingCurrentCanvas) {
    // Clear any previous elements in case the button is clicked multiple times
    rowCount = 0;
    yOffset = 250;
    xOffset = 20;
    grassImageElements.forEach((element) => element.remove());
    grassImageElements = []; // Reset the array
    grassImage = get(0, 0, sizeX, sizeY); // Store the canvas in the image variable
    dataUrl = grassImage.canvas.toDataURL(); // Convert to data URL for reuse

    if (using64) {
      for (let i = 0; i < 16; i++) {
        let imgElement = createImg(dataUrl, ''); // Create a new image element
        if (rowCount % 4 == 0) {
          rowCount = 0;
          yOffset += 64;
        }
        imgElement.position(xOffset + rowCount * sizeX, 64 + yOffset); // Adjust the position as needed
        imgElement.size(sizeX, sizeY); // Set the size of the image element
        imgElement.show(); // Show the image element
        grassImageElements.push(imgElement); // Store it in the array for future use
        rowCount += 1;
      }
    }
    if (using32) {
      for (let i = 0; i < 64; i++) {
        let imgElement = createImg(dataUrl, ''); // Create a new image element
        if (rowCount % 8 == 0) {
          rowCount = 0;
          yOffset += 32;
        }
        imgElement.position(xOffset + rowCount * sizeX, sizeY + 64 + yOffset); // Adjust the position as needed
        imgElement.size(sizeX, sizeY); // Set the size of the image element
        imgElement.show(); // Show the image element
        grassImageElements.push(imgElement); // Store it in the array for future use
        rowCount += 1;
      }
    }
    if (using16) {
      for (let i = 0; i < 256; i++) {
        let imgElement = createImg(dataUrl, ''); // Create a new image element
        if (rowCount % 16 == 0) {
          rowCount = 0;
          yOffset += 16;
        }
        imgElement.position(xOffset + rowCount * sizeX, sizeY + sizeY + sizeY + 64 + yOffset); // Adjust the position as needed
        imgElement.size(sizeX, sizeY); // Set the size of the image element
        imgElement.show(); // Show the image element
        grassImageElements.push(imgElement); // Store it in the array for future use
        rowCount += 1;
      }
    }
    if (using8) {
      for (let i = 0; i < 1024; i++) {
        let imgElement = createImg(dataUrl, ''); // Create a new image element
        if (rowCount % 32 == 0) {
          rowCount = 0;
          yOffset += 8;
        }
        imgElement.position(xOffset+ rowCount * sizeX, sizeY + sizeY + sizeY + sizeY + sizeY + sizeY + sizeY + 64 + yOffset); // Adjust the position as needed
        imgElement.size(sizeX, sizeY); // Set the size of the image element
        imgElement.show(); // Show the image element
        grassImageElements.push(imgElement); // Store it in the array for future use
        rowCount += 1;
      }
    }
  }
}


function savedTile(){
    // Remove the existing saved copy if it exists
  if (savedCopy1) {
    savedCopy1.remove(); // Removes the previous image element from the DOM
  }
  
  savedGrass1 = get(0, 0, sizeX, sizeY); // Store the  canvas in the image variable
  dataUrl1 = savedGrass1.canvas.toDataURL(); // Convert to data URL for reuse
  
  savedCopy1 = createImg(dataUrl1, ''); // Create a new image element
  savedCopy1.position(600  + customTileOffset, 70); // Adjust the position as needed
  savedCopy1.size(sizeX, sizeY); // Set the size of the image element
  savedCopy1.show(); // Show the image element
  console.log("saved!")
}

function savedTile2(){
     // Remove the existing saved copy if it exists
  if (savedCopy2) {
    savedCopy2.remove(); // Removes the previous image element from the DOM
  }
  
  savedGrass2 = get(0, 0, sizeX, sizeY); // Store the  canvas in the image variable
  dataUrl2 = savedGrass2.canvas.toDataURL(); // Convert to data URL for reuse
  
  savedCopy2 = createImg(dataUrl2, ''); // Create a new image element
  savedCopy2.position(600 + customTileOffset, 170); // Adjust the position as needed
  savedCopy2.size(sizeX, sizeY); // Set the size of the image element
  savedCopy2.show(); // Show the image element
  console.log("saved!")
}

function savedTile3(){
     // Remove the existing saved copy if it exists
  if (savedCopy3) {
    savedCopy3.remove(); // Removes the previous image element from the DOM
  }
  
  savedGrass3 = get(0, 0, sizeX, sizeY); // Store the  canvas in the image variable
  dataUrl3 = savedGrass3.canvas.toDataURL(); // Convert to data URL for reuse
  
  savedCopy3 = createImg(dataUrl3, ''); // Create a new image element
  savedCopy3.position(600 + customTileOffset, 270); // Adjust the position as needed
  savedCopy3.size(sizeX, sizeY); // Set the size of the image element
  savedCopy3.show(); // Show the image element
  console.log("saved!")
}

function createPlayer(){
  
  if (playerElement) {
    playerElement.remove(); // Remove the existing player
  }
  
  if(using16){
    // Create the player element using `createImg`
    playerElement = createImg('Player16x16Gif.gif', 'Player');       
    //Scale the player sprite
  }
  else if(using32){
    playerElement = createImg('Player32x32Gif.gif', 'Player');       
  }
  else if(using64){
    playerElement = createImg('Player64x64Gif.gif', 'Player');       
  }
  if(using8){
     playerElement = createImg('Player16x16Gif.gif', 'Player');
  }
  
}
function playerMovement() {
  let moveX = 0;
  let moveY = 0;

  // Check for key presses and adjust movement values accordingly
  if (keyMap[LEFT_ARROW] || keyMap['a']) {
    moveX -= playerSpeed; // Move left
    isFacingRight = false;
  }
  if (keyMap[RIGHT_ARROW] || keyMap['d']) {
    moveX += playerSpeed; // Move right
    isFacingRight = true;
  }
  if (keyMap[UP_ARROW] || keyMap['w']) {
    moveY -= playerSpeed; // Move up
  }
  if (keyMap[DOWN_ARROW] || keyMap['s']) {
    moveY += playerSpeed; // Move down
  }

  // Normalize diagonal movement
  let totalMovement = sqrt(moveX * moveX + moveY * moveY);
  if (totalMovement > playerSpeed) {
    moveX = (moveX / totalMovement) * playerSpeed;
    moveY = (moveY / totalMovement) * playerSpeed;
  }

  // Update player position
  playerX += moveX;
  playerY += moveY;
  
   // Clamp positions to prevent movement outside boundaries
  //Player boundaries change for each size, so I have to do one for each...
  if(using64){
    
  
  if (playerX >= 196 + xOffset) { //Added x offset
    playerX = 196 + xOffset;
    moveX = 0;
  }
  if (playerX <= xOffset) {
    playerX = xOffset;
    moveX = 0;
  }
  if (playerY <= 365) { //Added 100
    playerY = 365;
    moveY = 0;
  }
  if (playerY >= 580) { //Added 100
    playerY = 580;
    moveY = 0;
  }
  }
  if(using32){
  if (playerX >= 226 + xOffset) {
    playerX = 226 + xOffset;
    moveX = 0;
  }
  if (playerX <= xOffset) {
    playerX = xOffset;
    moveX = 0;
  }
  if (playerY <= 375) {
    playerY = 375;
    moveY = 0;
  }
  if (playerY >= 600) {
    playerY = 600;
    moveY = 0;
  }
  }
  if(using16){
  if (playerX >= 240 + xOffset) {
    playerX = 240 + xOffset;
    moveX = 0;
  }
  if (playerX <= xOffset) {
    playerX = xOffset;
    moveX = 0;
  }
  if (playerY <= 380) {
    playerY = 380;
    moveY = 0;
  }
  if (playerY >= 620) {
    playerY = 620;
    moveY = 0;
  }
  }
  if(using8){
  if (playerX >= 240 + xOffset) {
    playerX = 240 + xOffset;
    moveX = 0;
  }
  if (playerX <= xOffset) {
    playerX = xOffset;
    moveX = 0;
  }
  if (playerY <= 380) {
    playerY = 380;
    moveY = 0;
  }
  if (playerY >= 620) {
    playerY = 620;
    moveY = 0;
  }
  }
}

function keyPressed(){
  keyMap[key] = true;
  keyMap[keyCode] = true;
}

function keyReleased(){
  delete keyMap[key];
  delete keyMap[keyCode];
}

function toggleState() {
  // Flip the toggle state
  usingCurrentCanvas = !usingCurrentCanvas;

  // Update the button's label based on the state
  if (usingCurrentCanvas) {
    currentCanvasButton.html('Using Current Canvas'); 
    applyButton.hide();
    buttonDownload1.hide();
    buttonDownload2.hide();
    buttonDownload3.hide();
    saveButton1.hide();
    saveButton2.hide();
    saveButton3.hide();
    input1.hide();
    input2.hide();
    input3.hide();
    savedCopy1.hide();
    savedCopy2.hide();
    savedCopy3.hide();
    percentTag1.hide();
    percentTag2.hide();
    percentTag3.hide();
    customTutorialTag.hide();
    customCanvasGuideTag.html("Create a more <br>varied grass canvas!");
    
  } else {
    currentCanvasButton.html('Using Custom Canvas'); 
    applyButton.show();
    buttonDownload1.show();
    buttonDownload2.show();
    buttonDownload3.show();
    saveButton1.show();
    saveButton2.show();
    saveButton3.show();
    input1.show();
    input2.show();
    input3.show();
    savedCopy1.show();
    savedCopy2.show();
    savedCopy3.show();
    percentTag1.show();
    percentTag2.show();
    percentTag3.show();
    customTutorialTag.show();
    customCanvasGuideTag.html("Choose your placement <br>percentages and apply!");
    
  }
}

function toggleFlowers(){
  if(!empty){
    flowers = !flowers;
    if(flowers){
      flowersButton.html("Flowers? ☑");
    }else{
      flowersButton.html("Flowers? ☐")
    }
  }
  
}

function toggleGrassSpecks(){
  if(!empty){
    grassSpecks = !grassSpecks;
    if(grassSpecks){
      grassSpeckButton.html("Grass Specks? ☑");
    }else{
      grassSpeckButton.html("Grass Specks? ☐")
    }
  }
  
}

function toggleEmpty(){
  empty = !empty;
  
  if(empty){
    emptyButton.html("Empty? ☑");
    flowersButton.html("Flowers? ☐");
    grassSpeckButton.html("Grass Specks? ☐");
    flowers = false;
    grassSpecks = false;
    
  }else{
    emptyButton.html("Empty? ☐")
  }
}

function validateSum() {
  // Parse input values, default to 0 if not a number
  let val1 = parseInt(input1.value()) || 0;
  let val2 = parseInt(input2.value()) || 0;
  let val3 = parseInt(input3.value()) || 0;

  let total = val1 + val2 + val3;

  // Display or hide the warning message based on total
  if (total !== 100) {
    invalidPercentage = true;
    warningMessage.show();
    percentageValues = getInputValues();
  } else {
    invalidPercentage = false;
    warningMessage.hide();
  }
}

function getInputValues() {
  // Get the values as integers
  let val1 = parseInt(input1.value()) || 0;
  let val2 = parseInt(input2.value()) || 0;
  let val3 = parseInt(input3.value()) || 0;

  // Return the values as an array or use them directly
  return [val1, val2, val3];
}

function chooseRandomElement() {
  // Get the input values (assumes they sum to 100)
  let percentages = getInputValues(); 
  
  // Generate a random number between 1 and 100
  let randomRoll = Math.floor(Math.random() * 100) + 1;
  let cumulativeSum = 0;

  // Find which percentage range the random number falls into
  for (let i = 0; i < percentages.length; i++) {
    cumulativeSum += percentages[i];
    if (randomRoll <= cumulativeSum) {
      console.log(`Selected element index: ${i}`);
      return i; // Return the index of the chosen element
    }
  }
}

function customTile(){
    rowCount = 0;
    yOffset = 250;
    grassImageElements.forEach((element) => element.remove());
    grassImageElements = []; // Reset the array
    grassImage = get(0, 0, sizeX, sizeY); // Store the canvas in the image variable
    dataUrl = grassImage.canvas.toDataURL(); // Convert to data URL for reuse
    let imgElement;
    
    if(using64){
      for (let i = 0; i < 16; i++) {
        rng = chooseRandomElement();
        if(rng == 0){
          imgElement = createImg(dataUrl1, '')
        }
        if(rng == 1){
          imgElement = createImg(dataUrl2, '')
        }
        if(rng == 2){
          imgElement = createImg(dataUrl3, '')
        }
        if (rowCount % 4 == 0) {
          rowCount = 0;
          yOffset += 64;
        }
        
        imgElement.position(xOffset + rowCount * sizeX, 64 + yOffset); // Adjust the position as needed
        imgElement.size(sizeX, sizeY); // Set the size of the image element
        imgElement.show(); // Show the image element
        grassImageElements.push(imgElement); // Store it in the array for future use
        rowCount += 1;
      }
    }
    if(using32){
      for (let i = 0; i < 64; i++) {
        rng = chooseRandomElement();
        if(rng == 0){
          imgElement = createImg(dataUrl1, '')
        }
        if(rng == 1){
          imgElement = createImg(dataUrl2, '')
        }
        if(rng == 2){
          imgElement = createImg(dataUrl3, '')
        }
        if (rowCount % 8 == 0) {
          rowCount = 0;
          yOffset += 32;
        }
        
        imgElement.position(xOffset + rowCount * sizeX, sizeY + 64 + yOffset); // Adjust the position as needed
        imgElement.size(sizeX, sizeY); // Set the size of the image element
        imgElement.show(); // Show the image element
        grassImageElements.push(imgElement); // Store it in the array for future use
        rowCount += 1;
    }
  }if(using16){
    for (let i = 0; i < 256; i++) {
        rng = chooseRandomElement();
        if(rng == 0){
          imgElement = createImg(dataUrl1, '')
        }
        if(rng == 1){
          imgElement = createImg(dataUrl2, '')
        }
        if(rng == 2){
          imgElement = createImg(dataUrl3, '')
        }
        if (rowCount % 16 == 0) {
          rowCount = 0;
          yOffset += 16;
        }
        
        imgElement.position(xOffset + rowCount * sizeX, sizeY + sizeY + sizeY + 64 + yOffset); // Adjust the position as needed
        imgElement.size(sizeX, sizeY); // Set the size of the image element
        imgElement.show(); // Show the image element
        grassImageElements.push(imgElement); // Store it in the array for future use
        rowCount += 1;
  }
  }if(using8){
    for (let i = 0; i < 1024; i++) {
        rng = chooseRandomElement();
        if(rng == 0){
          imgElement = createImg(dataUrl1, '')
        }
        if(rng == 1){
          imgElement = createImg(dataUrl2, '')
        }
        if(rng == 2){
          imgElement = createImg(dataUrl3, '')
        }
        if (rowCount % 32 == 0) {
          rowCount = 0;
          yOffset += 8;
        }
        
        imgElement.position(xOffset + rowCount * sizeX, sizeY + sizeY + sizeY + sizeY + sizeY + sizeY + sizeY + 64 + yOffset); // Adjust the position as needed
        imgElement.size(sizeX, sizeY); // Set the size of the image element
        imgElement.show(); // Show the image element
        grassImageElements.push(imgElement); // Store it in the array for future use
        rowCount += 1;
  }
  
}
    createPlayer();
}

function draw(){
  playerMovement();
  playerElement.position(playerX, playerY); // Set the position
  // Flip sprite depending on movement direction
  if (!isFacingRight) {
    playerElement.style('transform', 'scaleX(1)');
  } else {
    playerElement.style('transform', 'scaleX(-1)');
  }

  
}