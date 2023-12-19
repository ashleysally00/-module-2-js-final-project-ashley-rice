# Devlog

#### Ashley Rice

###### This FP began as: Speed Typing Car Race Game,Edited version is Let’s Go Driving! Quote Typing Game

\*because the car just drives, it does not race

https://github.com/ashleysally00/module-2-js-final-project-ashley-rice
\
\
\
**8 Tuesday Dec 5,**
I was trying to figure out what my project would be for the first entries.

**7:00AM-8:00AM,**

Brainstormed project topics, watched videos on simple JS apps.

https://youtu.be/be9sHQ7xqo0?si=tmvvjyGfmR9nqnK3

<br>

**Wednesday Dec 6,**

**6:30PM-7:30PM:**

Class groups.
My first 3 ideas were Netflix for dogs using OMDB key, todo list app, CLI game.
Was browsing JS games to code.

Decided on speed typing game,

Found tutorials, thought about it.
In my game, when you get a certain score, messages pop up.
There might be 3 messages for 3 levels.
Talked to people about ideas again.
<br>
\
\

**Thursday, Dec. 7,**

**5:00PM-6:30PM,**

Set up files. Researched WPM functions and math. Researched how to make messages pop up based on scores.
Am going to make it one player.
\
\
\
\
\
**Friday, Dec. 8,**

**2:00PM-5:00PM,**

Watched tutorials, https://www.youtube.com/watch?v=R-7eQIHRszQ.
I tried coding the basics of some things to see how they work and if I understand them or if I don’t. I read MDN, googled, researched, talked to AI.

You can use calc() to match alignment between elements in the box.
I need to review promises, async and await.
Need to look at the Fetch function.
\
\
**Monday, Dec. 11,**

**5:30-7:30PM,**

Watched people present.
Did more research, thinking.
Should I put an array of quotes inside my code to pull quotes instead of using the external site link?
<br>

**Tuesday, Dec. 12,**

Didn’t work on FP today. Worked on Udemy and FCC.
<br>
\
\
**Thursday, Dec 14,**

**11:00am - 12:30pm,**

Researched, tried different things.

The car might need to be moving at a certain speed at the start.

What happens when the carDiv gets to the right side of the screen?
Does it need a scrolling road?

**2:00PM-3:00PM,**

Wrote the code in plain words to think it through.

**4:00PM-5:00PM,**

Added to that.

When the player completes accurately typing a quote,
And adds a period…
you need to calculate and return the speed of accuracy
by counting the number of characters from the quote that the player typed in 60 seconds…

note: you need to have an event listener waiting for when the timer hits 60 seconds so it can trigger the function that calculates the WPM
….and dividing it by 5 (average size of a word, so all 5 characters in a row will count as a word).

you need to count the characters in the string that the user typed in 60 seconds:
you can do that using the length property
does the length property work on strings as well as arrays?
It does.

const wordString = “ “;
console.log(wordString.length)
return wordString.length
Are spaces counted in strings?
Everything is counted.
<br>
\
\
**Thursday, Dec 15,**

**2::00PM - 2:45pm,**

Function for when the whole quote is typed in correctly:

```
//to render a new quote if (correct) renderNewQuote(); // I need to add another function to: if(correct) bc if the statement / is correct that means the player has finished typing //make a function to count the characters in the quote that //was rendered //then divide by 5 to get number of typed words // then divide by 60 to get WPM //;
```

It will include white spaces
Or change to regex.
<br>
\
\
**Friday, Dec 15,**

**3:00PM-7PM,**

Working on formatting first few Drive docs, uploaded them thru Learn Worlds so that I can meet deadline
.
Worked on coding functions for different parts of the game but it’s kind of a major mess (it feels like!).
<br>
\
\
**Sunday, Dec 17,**

**7:00AM-9:00AM,**

Got a car ( words representing a car for now) to move.

```
<!DOCTYPE html>
<html>
<head>
<style> #car { position: relative; width: 200px; height: 200px; }
 </style>
</head>
<body> <div id="car">This is my car!</div>
<script> var interval = setInterval(function () { var div = document.getElementById("car"); div.style.top = div.offsetTop + 1 + "px"; div.style.left = div.offsetLeft + 1 + "px"; }, 1000);
</script> </body>
```

Based on how to move a div using JS:

https://www.tutorialspoint.com/how-to-create-a-moving-div-using-javascript#:~:text=We%20will%20use%20the%20setInterval,to%20move%20our%20div%20around.

(My code is all tangled up, been trying to untangle it, the car was not moving).

**12:00PM-1:40PM,**

The car div needs to be moving based on + adding player’s typing speed to starting speed

Need to add in function to calculate player’s typing speed:
Player’s typing speed is words per minute:
Need to calculate the number of words:

Need to calculate number of characters in the quote:
Need to not count spaces

Here is what I did:

```
const numberOfCharacters =
const numberOfCharacters = quoteInputElement.value.trim().split(/\s+/).length;
const numberOfWords = numberOfCharacters / 5;
```

Need to integrate the timing:
how long it took the player to finish the quote = endTime-startTime

let startTime;
The following I got from webdev simplified youtube video:

```
function startTimer() {
 timerElement.innerText = 0;
startTime = new Date();
 setInterval(() => {
timer.innerText = getTimerTime();
}, 1000);
}
function getTimerTime() {
return Math.floor((new Date() - startTime) / 1000);
```

This takes care of the timer on the screen and makes it show the correct count
As a whole number and start over (web dev simplified video)
But need to get the end time;

```
startTime - timerTime = timeDiff;

const WPM = numberOfWords / timeDiff;
If player types 120 words in 60 seconds their WPM = 2
If player types 95 words in 20 seconds their WPM = 4.75
The above will get you the player’s WPM

//Get distance you want to add to the car ‘s location to speed it up/move it right:

distanceToAdd = WPM/5
//This will get you the car:
const carDiv = document.getElementById("car")

//This will take the car from the left side of the screen and add the distance you determined based on player’s speed in pixels to move the car right:
parseInt() parses a string and returns an integer
The radix parameter is pixels,“px”:
distanceToAdd = WPM/5
carDiv.style.left = (parseInt(carDiv.style.left) || 0) + distanceToAdd + "px"; }
```

**4:00PM-5:00PM,**

Got help from asking AI a ton of questions. Got order of functions in the right place. It took a long while.
Car moved once. Then the interval was not updating.
Then it did not move again.
Working on debugging. Typing speed logs to console.
Moving car logs to console.

**6:00PM-7:30PM,**

Found the culprit. The move left was not moving left. If I typed it in manually in the console and increased the value for left, the car div moved. AI gave me that suggestion.

It also helped me update my function to calculate and account for the new left value. I did some more debugging,
The car is moving.
It is updating.
<br>
\
\
**Tuesday, Dec 19,**
**5:00AM,**

Medium article to make a scrolling road:
https://eleftheriabatsou.medium.com/css-tutorial-create-an-infinite-scrolling-background-923c3139f4a5
Helicopter

Background animation, car:
https://www.youtube.com/watch?v=j23vJuc-fV4

**7:00AM - 10:00AM, off and on,**
**more later, off and on**

I learned to make a scrolling road from the videos. I made a road
and some scenery on Canva then uploaded it to my project. I got
a car image from Canva and repositioned and resized it so that it
was not floating in the sky above the road.

I played around with the speed but realized that this for now will just be a driving game, not a racing game.

I got a lot of help from the videos I mentioned both in this devlog and inside the code. They were very helpful and great.

-
