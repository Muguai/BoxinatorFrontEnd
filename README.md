# <img width="198" alt="Boxinator" src="https://github.com/Muguai/BoxinatorFrontEnd/blob/main/src/assets/img/logo.png">
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
    - claim packages
- Admin
    - sign in
    - place order
    - view order history
    - save user details
    - claim packages
    - view users
    - edit user active status
    - make users admin
    - (soft) delete users
    - restore users (within 10 seconds)
    - edit boxes info
    - view all orders
    - edit orders' statuses
    - edit shipping rates
 
  More information can be found in the user manual in the Documentation folder.

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

## Screenshots / Gifs

### Landing Page

![LandingPage2](https://github.com/Muguai/BoxinatorFrontEnd/assets/37656342/a5771c99-e86c-48e2-8dcf-cd32262e0023)

### Profile Page

![ProfilePage](https://github.com/Muguai/BoxinatorFrontEnd/assets/37656342/6a7cefba-535a-49e8-bebd-6bba79d3fa8d)

### Login Page

![login](https://github.com/Muguai/BoxinatorFrontEnd/assets/37656342/ef20b22f-6a31-4322-997e-631fa6db0a5e)

### Signout Page

![signin](https://github.com/Muguai/BoxinatorFrontEnd/assets/37656342/134ce64f-2a21-4337-8280-4b33083eed84)

### Checkout Page

![CheckoutPage](https://github.com/Muguai/BoxinatorFrontEnd/assets/37656342/0c72fe64-67b2-4acf-9134-a52fc5ae3fcc)

### Admin Page




