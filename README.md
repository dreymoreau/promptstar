# Promptstar
This project is a journal blog to create public or private posts, using Google Authentication for Users.

Link to project: https://promptstar.up.railway.app↗
## How It's Made:

**Tech used:** JavaScript, CSS, Handlebars, Node, Express, MongoDB

I started by building out the desktop version first, which I will talk more in the Lessons Learned section. After building out the desktop 
version I built the responsive version. It was a journey of styling, responsiveness and implementing different functionality.

## Optimizations

Implement TailwindCSS to enhance design and styling.

## Lessons Learned:

I learned how to implement handlebars for the frontend, while using Node, Express, MongoDB for the backend. It allowed me to practice MVC design structure as
well as ensuring that the routes, controllers, models and middleware all communicated with each other properly. This project also uses Google Authentication 
which caused some issues at first. I was able to set it up so everytime I logged out from the dashboard and tried logging back in, it would bring me to the
Google Auth page to sign me back in, which it wasn't doing for some time and I couldn't figure out why, until I was able to.
