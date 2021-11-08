# Title
Mod 2  Fitlit
Project Manager: Nik Seif

## Table of Contents
  - [Abstract](#abstract)
  - [Technologies](#technologies)
  - [Illustrations](#illustrations)
  - [Install + Setup](#set-up)
  - [View Application](#view-application)
  - [Contributors](#contributors)
	- [Wins](#wins)
	- [Challenges + Improvements](#challenges-+-Improvements)
  - [Project Specs](#project-specs)

## Abstract
	This was a group project to build an activity tracker for many users over many days. Our goal was to present a useful dashboard for a user to view and see their latest activity data, goals, and milestones as well as add new data to each category.

## Technologies
  - Javascript
  - eslint
  - html
  - css
  - node
  - Atom
	- WebPack
	- API
  - Chart.js
  - Figma

## Illustrations
  On page load a random user's information will be displayed on the dashboard. Each color block contains a different category for specific set of tracked data. In the top right corner of the dashboard, the date for the latest user data is displayed.

  ![updated_dashboard](https://user-images.githubusercontent.com/83175748/140667512-d44dc890-65da-41cb-9c0b-beb8ad983c65.png)

  The left-hand sidebar contains more detailed information about the current user on display. There is space above the user's information for a profile picture to be added.

  ![Screen Shot 2021-11-07 at 2 06 13 PM](https://user-images.githubusercontent.com/83175748/140661900-08dd4890-d079-414c-bc27-304a9e4643fc.png)

  When you click the button labeled `Today` a drop down menu will appear, allowing you to choose different date ranges to view a user's data for a `week` or for `all time`.

  ![sleep_dropdown](https://user-images.githubusercontent.com/83175748/138778301-c3324b1a-446d-4a16-ab18-9a342f5913c3.png)

  <img width="596" alt="sleep_hydration_charts" src="https://user-images.githubusercontent.com/83175748/138776187-520c7695-6233-4de1-8d0b-dc6d8101b8f5.png">


  In addition to being able to see existing data for the three separate activities, sleep, hydration, and activity, users can now add new data for each category. By selecting the `Add Data` button a user can fill out the form and hit the `submit` button to add new information to a chosen category.

  ![empty_form](https://user-images.githubusercontent.com/83175748/140662367-4c84c20f-98bc-42a6-905f-1bf97cedc7c5.png)

  A user will not be able to submit a form that is not completed. The `submit` button will remained grayed out until each field within the form has been filled out. Invalid characters cannot be added to any fields so only valid data is added to the user's saved data.

  ![filled_in_form](https://user-images.githubusercontent.com/83175748/140662372-0238070a-452e-485d-b655-9ff7e8cc9e65.png)



## Install + Setup
  - clone down the repository
  - npm Install
  - npm install -g sass
  - npm install sass-loader sass webpack --save-dev
  - npm install chart.js
  - npm start
  - run local server
  - copy URL into browser to view page

## View Application
  Click this [link](https://augustreid.github.io/fitlit/) to view the Fitlit page.


## Contributors
  - [August Reid](https://github.com/augustreid)
  - [Eric Wang](https://github.com/ewang0)
  - [Ivonne Hernandez](https://github.com/ivonne-hernandez)
  - [Jessica Organ](https://github.com/Jorgan612)

## Wins
	- Successfully add new data to the activity data sets using POST requests.
  - Continued to maintained consistency with workflow, pull requests, and communication throughout the project.
  - Refactored project files to organize scripts and DOM updates into separate files.
  - Successfully refactored the project's css file to utilize SASS.
	- Learned new techniques such as utilizing POST requests, additional input field types, SASS.
  - Ensured the project exceeded accessibility standards by utilizing Aria to maintain a Lighthouse audit above 90%.

## Challenges + Improvements
  - Increased complexity over all throughout project spec.
  - Delegation of work division between multiple team members.
  - Technical challenges with POST requests.
  - Challenges with posting correct date format when adding new data to the existing dataset.
  - Challenges refactoring project to organize code in scripts.js for DOM functionality and domUpdates.js for DOM manipulation.  

## Project Specs
  - [Part One!](https://frontend.turing.edu/projects/Fitlit-part-one.html)
  - [Part Two!](https://frontend.turing.edu/projects/Fitlit-part-two.html)
