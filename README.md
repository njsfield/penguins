# Overview

An looping SVG animation of three penguins making their way around a penguin slide, inspired by the original toy made popular in the early 90's.

# Technologies
[GSAPs TweenMax](https://greensock.com/gsap) client-side animation library implements three timeline loops to alter the position and z-index of several SVG parts. 

[Adobe Illustrator](https://adobe-illustrator.en.softonic.com/mac) was used for svg creation, which is comprised of 13 seperate parts- all layered using the CSS z-index property.

# How it works?

1. A single timeline is created to loop the escalator midsection- which is essentially a layer of stairs that alters position up and to the left every step (to simulate an escalator mechanism).
2. A points path is defined for each penguin to go around the slide- this path is exported with Illustrator, and is converted to bezier points with a helper function.
3. A timeline is composed for each penguin; first they make 12 up-and-to-the-left steps in sync with the esclator loop, then they follow the bezier points guide created by the helper function to simulate going down the slide. While descending the slide, their z-index is changed in real time so that their layer gos in front and behind the slide sections- simulating a 3d movement. At coordinated points their image is switched from one of three penguins 'views'; each representing a different facing angle.
4. Three of these timelines are inserted into the master timeline and each are offset, with a different penguin colour set. 
