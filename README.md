# Attendant-Tracker

### User Story

The majority of people with disabilities are intelligent and hardworking but with physical limitations that prevent them from performing daily tasks that we able bodied people take for granted.  Cooking dinner, driving a car, getting out of bed in the morning--these simple tasks become issues for people with physical limitations.  The current solution is to hire a series of attendants that provide daily assistance.  Attendants are not usually medical professionals, but rather helpers and friends who assist the disabled part time or full time.  

When rigid schedules are kept, the system works pretty well.  A disabled person can hire someone to meet them at a specific time on a specific day and receive the care she needs.  But there are two huge problems that need solving.

1. Maintaining a system and schedule of attendants is incredibly time consuming
2. People's schedules are not rigid.  

The disabled commmunity describes managing attendant care as a part time job they have to perfrom on top of their regular job.  Attendant care involves hiring, firing, scheduling, and paying 10 or more employees while maintaining rigourous records for tax purposes and to be submitted to the government for assistance programs.  It is extremely hard, and there are no existing solutions that streamline this process.

Furthermore, any time a scheduling change occurs--an attendant gets sick, a disabled person has a business meeting run through a scheduled lunch--the system falls apart leaving someone without assistance for hours or a day or more.  Without a centralized communication platform, it is difficult to reach out to your network of attendants for last minute  and emergency needs.

Attendant Tracker is an app that will make all of this possible and easy.  It will allow for easy attendant scheduling and automatic calendar notification.  It will keep track of hours worked to facilitate paying attendants and printing and submitting records.  

Plus at the click of a button, someone can send a message to her entire network seeking last minute help.  That message will contain a link to a chat room only visible by the user and her network where she can discuss needs in real time and her attendants can communicate about their availability to help.

### Technologies:

- ES6
- React
- Redux
- Node
- Express
- PostgreSQL
- Sequelize
- Socket.io
- Twilio

### Installation

Dependencies:

- Node.js
- PostgreSQL

Steps to Install

1. Download or clone this repository
2. Run:
```
$ npm install
$ createdb attendant 
$ npm server/db/migrate.js
$ node server
 ```
 
 ## Problems Solved!
 
 #### Make a Dynamic Planner Style Calendar
 
 Users need to be able to see hourly details about their day, but also need to be able to cycle through days so they can plan out weeks in advance.  I researched several calendar packages, and could not find one that suited these needs adequately, so I decided to build one.  This presented several problems:
 
 - Calendar data needed to load from the database
 - Data need to be sorted into the proper days
 - Calander days needed to render dynamically allowing the user to cycle through days
 
The two functions below do the heavy lifting in this app, first filtering events by a given date, then creating an array of hours that is then fed to indivual calendar entry components.  This allows the user to view calendar entries on any date past or present.

```
  dateRangeMaker(events, i){
    let day = []
    let current = new Date(this.state.today)
    current.setDate(current.getDate() + this.state.currentDay + i)
    events.forEach((event)=>{
      let test = (new Date(event.date).toDateString())
      if (test == current.toDateString()){
        day.push(event)
      }
    })
    if (day.length === 0){
      day.push({date: current, attendant: {first_name: '', last_name: ''}, title: ''})
    }
    return this.dayBuilder(day)
  }

  dayBuilder(events) {
    let fullDay = []
    let daysEvents = {}
    for (let i = 0; i < events.length; i++){
      let time = (new Date(events[i].date)).getHours()
      daysEvents[time] = events[i]
    }
    for (let i = 5; i <=23; i ++){
      if (daysEvents[i]){
        fullDay.push({
          title: daysEvents[i].title,
          attendant: daysEvents[i].attendant,
          time: i
        })
      } else {
        fullDay.push({
          title: '',
          attendant: {"first_name": "",
          "last_name": ""},
          time: i
        })
      }
    }
    let dayIndex = (new Date(events[0].date)).getDay()
    fullDay.unshift(this.dayOfWeek[dayIndex])
    console.log(fullDay)
    return fullDay
  }
  ```
 
Link to your wireframes – sketches of major views / interfaces in your application.
Link to your entity relationship diagrams – plan out your data relationships before coding.
Descriptions of any unsolved problems or future features.

[link to the trello](https://trello.com/b/vwTcchqU/web-application)
