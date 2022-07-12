import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { LocalStorageService } from '../../services/local-storage.service';
import { HomePage } from '../home/home.page';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { Org } from '../../interfaces/interfaces';
import { HeaderComponent } from '../../components/header/header.component';
import { DonacionPage } from '../donacion/donacion.page';
import { CuentasPage } from '../cuentas/cuentas.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = {
    name: '',
    email: 'string',
    birthdate: 'string',
    dpi: 'string',
    password: 'string',
    location: 'string',
    verification: 'string',
    description: 'string',
    isUser: true,
  };

  bubbles = false;
  editPassword = false;
  alert = false;
  error = false;
  cambiarFoto = false;
  password: string;
  confirmPassword: string;
  message: string;
  imgPath: any;
  constructor(
    public alertController: AlertController,
    private storage: LocalStorageService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getcurrentUser();
  }
  getcurrentUser() {
    this.storage.getCurrentParticipant().then((user) => {
      this.user = user;
      console.log(this.user);
    });
  }
  doRefresh(event) {
    setTimeout(async () => {
      await this.getcurrentUser();

      this.bubbles = false;
      event.target.complete();
    }, 1500);
  }
  async openModalCuentas() {
    const modal = await this.modalCtrl.create({
      component: CuentasPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: DonacionPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }
}
