import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import AnimalsDonation from './pages/ShowAnimalDonation';
import AnimalDonation from './pages/AnimalDonation';
import ShowAnimalLost from './pages/ShowAnimalLost';
import AnimalLost from './pages/AnimalLost';
import ShowAnimalFound from './pages/ShowAnimalFound';
import AnimalFound from './pages/AnimalFound';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectCreate from './pages/SelectCreate';
import CreateAnimalDonation from './pages/CreateAnimalDonation';
import AnimalDonationTest from './pages/AnimalDonationTest';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/app" component={OrphanagesMap}/>
                <Route path="/orphanages/create" component={CreateOrphanage}/>
                <Route path="/orphanages/:id" component={Orphanage}/>
                <Route path="/animalsdonationtest/:id" component={AnimalDonationTest}/>
                <Route path="/animalsdonation/create" component={CreateAnimalDonation}/>
                <Route path="/animalsdonation/:id" component={AnimalDonation}/>
                <Route path="/animalsdonation" component={AnimalsDonation}/>
                <Route path="/animalslost/:id" component={AnimalLost}/>
                <Route path="/animalslost" component={ShowAnimalLost}/>
                <Route path="/animalsfound/:id" component={AnimalFound}/>
                <Route path="/animalsfound" component={ShowAnimalFound}/>
                <Route path="/login/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/animalscreate" component={SelectCreate}/>
            </Switch>
        </BrowserRouter>
    );
}export default Routes;