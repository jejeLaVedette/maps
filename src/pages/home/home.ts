import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      draggable: true
    });
    let content = "<ion-header>  <ion-navbar>    <button ion-button menuToggle>          <ion-icon name=\"menu\"></ion-icon>      </button>    <ion-title>Profil</ion-title>  </ion-navbar></ion-header><ion-content padding>  <ion-card>    <img src=\"assets/img/user-icon-6.png\" />  </ion-card>  <form [formGroup]=\"profilForm\" (submit)=\"validate()\" novalidate #f=\"ngForm\">    <!-- TODO : enlever la VALUE de chaque champs : c'est en attendant la mise en place de la gestion des droits -->    <ion-item>      <ion-label stacked>Nom *</ion-label>      <ion-input formControlName=\"nom\" type=\"text\" placeholder=\"Nom\" value=\"John\"></ion-input>    </ion-item>    <ion-item class=\"error-message\" *ngIf=\"!profilForm.controls.nom.valid && f.submitted\">      <ion-label stacked color=\"danger\">Champ obligatoire</ion-label>    </ion-item>    <ion-item>      <ion-label stacked>Prenom *</ion-label>      <ion-input formControlName=\"prenom\" type=\"text\" placeholder=\"Prenom\" value=\"Smith\"></ion-input>    </ion-item>    <ion-item class=\"error-message\" *ngIf=\"!profilForm.controls.prenom.valid && f.submitted\">      <ion-label stacked color=\"danger\">Champ obligatoire</ion-label>    </ion-item>    <ion-item>      <ion-label stacked>Adresse mail *</ion-label>      <ion-input formControlName=\"mail\" type=\"text\" placeholder=\"Adresse mail\" value=\"john.smith@soprasteria.com\"></ion-input>    </ion-item>    <ion-item class=\"error-message\" *ngIf=\"!profilForm.controls.mail.valid && f.submitted\">      <ion-label stacked color=\"danger\">Champ obligatoire</ion-label>    </ion-item>    <ion-item>      <ion-label stacked>Mot de passe *</ion-label>      <ion-input formControlName=\"mdp\" type=\"password\" placeholder=\"Mot de passe\" value=\"azerty123\"></ion-input>    </ion-item>    <ion-item class=\"error-message\" *ngIf=\"!profilForm.controls.mdp.valid && f.submitted\">      <ion-label stacked color=\"danger\">Champ obligatoire</ion-label>    </ion-item>    <ion-item>      <ion-label stacked>Confirmer mot de passe</ion-label>      <ion-input formControlName=\"confirmer_mdp\" type=\"password\" placeholder=\"Confirmer mot de passe\"></ion-input>    </ion-item>  </form></ion-content><ion-footer no-border>  <ion-toolbar>    <div text-center>      <button ion-button (click)=\"validate()\" color=\"secondary\" [disabled]=\"!profilForm.valid\">Mettre a jour</button>    </div>  </ion-toolbar></ion-footer>";
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      // infoWindow.open(this.map, marker);
      let pageDetails = this.modalCtrl.create(HomePage);
         pageDetails.present();
    });

    google.maps.event.addListener(marker, 'dragend', () => {
      alert(marker.getPosition())
    });
  }
}