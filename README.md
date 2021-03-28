# Fullstack Airbnb-Styled SOA Reviews Module

Service-Oriented Architecture app modeled from the Airbnb Reviews service, built to:
- seed and persist data (averages, users, and reviews) for 100 unique product IDs,
- run alongside other services via proxy server,
- display a full page of data per each unique product ID,
- run locally, or be deployed via Amazon EC2.

 Built with the MERN stack, React Styled-Components, and React Router DOM.

### Default view:
<p align="center">
<img src="screenshot1.png" width="600"/>
</p>

### Modal view:
<p align="center">
<img src="screenshot2.png" width="600"/>
</p>

## Setup on Local

1. `git clone`
1. install dependencies with `npm install`
1. seed database with `npm run seed`
1. start server with `npm run start`
1. build bundle with `npm run build`
1. verify app up and running at `localhost:3000/rooms/:id` (for id values 0-99)
1. for development, start webpack with `npm run react-dev`

## Setup on EC2

Complete local setup & [add ec2 readme]

## Setup with Proxy

Complete local and EC2 setup, and follow setup instructions for [proxy](link to proxy repo).

## Related Projects

  - [add link to proxy repo]
  - [add link to carousel repo]