# <img width="198" alt="Boxinator" src="https://github.com/Muguai/BoxinatorFrontEnd/src/assets/img/logo.png">
Boxinator is a software solution designed to revolutionize the world of logistics by shipping mystery boxes from the beautiful lands of Scandinavia to destinations around the globe.

## Features and Usage
A Boxinator user have three possible roles with varying features available:
- Guest
    - place order
    - register as user
- User
    - sign in
    - place order
    - view order history
    - save user details
- Admin
    - sign in
    - place order
    - view order history
    - save user details
    - view users
    - edit user active status
    - make users admin
    - (soft) delete users
    - restore users (within 10 seconds)
    - edit boxes info
    - view all orders
    - edit orders' statuses
    - edit shipping rates

## Installation and deployment
Clone to a local directory:  
```bash
git clone https://github.com/Muguai/BoxinatorFrontEnd
```

Thereafter run the following command to install the required packages:
```bash
npm install
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Requirements
This project uses [BoxinatorBackEnd](https://github.com/dennis-schill-experis/BoxinatorBackEnd) to handle data. For the full experience follow that guide and create your own back-end. When that is done go into *src/app/consts* folder (front-end project) and edit the *urls.ts* file and switch to your localhost url.

## Authors
- Elina Eriksson @ee223mz.
- Fredrik Hammar @Muguai.
- Dennis Schill @dennis-schill-experis.