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

![LandingPage2](https://github.com/Muguai/BoxinatorFrontEnd/assets/37656342/a663fb3e-1c3b-4e71-9d90-01e3030f4eba)

### Profile Page

![ProfilePage](https://github.com/Muguai/BoxinatorFrontEnd/assets/37656342/3d679a3b-0043-4599-8474-21dccc2cf973)

### Login Page

![login](https://github.com/Muguai/BoxinatorFrontEnd/assets/37656342/1fd74678-234a-439c-b3a0-e1fdfdb5b45b)

### Signout Page

![signin](https://github.com/Muguai/BoxinatorFrontEnd/assets/37656342/2152274f-0423-4b5c-a589-d599c13467cb)

### Checkout Page

![CheckoutPage](https://github.com/Muguai/BoxinatorFrontEnd/assets/37656342/246b99ec-4472-4527-8649-50960c1de212)

### Admin Page

![AdminPAge](https://github.com/Muguai/BoxinatorFrontEnd/assets/37656342/2adb3db7-35f1-4e6f-97ce-2eedb4bb3f5b)



