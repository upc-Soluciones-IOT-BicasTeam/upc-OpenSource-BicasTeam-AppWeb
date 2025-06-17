import { Component } from '@angular/core';
import {UserEntity} from "../../../iam/model/user.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileApiServiceService} from "../../../iam/services/profile-api.service.service";
import {IamApiService} from "../../../iam/services/iam-api.service.service";
import {SubsData} from "../../model/image.entity";
import {firstValueFrom} from "rxjs";
import {ProfileEntity} from "../../../iam/model/profile.entity";
import {SubsApiService} from "../../services/subs-api.service";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {
  user: UserEntity = new UserEntity();
  profile: ProfileEntity = new ProfileEntity();
  subscription: SubsData = new SubsData();
  showModal = false;
  constructor(private route: ActivatedRoute, private profileApi: ProfileApiServiceService, private imageApi: SubsApiService, private router: Router,private iamApi: IamApiService) {
    this.user.id = this.route.snapshot.params['id'];
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  async sendUrl() {
    try {
      await this.idCredential();
      this.subscription.userId = this.profile.idCredential ;
      this.subscription.paymentDate = new Date().toISOString();
      this.subscription.state = "PENDIENTE";

      console.log("Enviando SubsData con URL:", this.subscription);

      this.imageApi.uploadImage(this.subscription).subscribe({
        next: response => {
          console.log("Respuesta del backend:", response);
          this.closeModal();
        },
        error: err => {
          console.error("Error al enviar URL:", err);
        }
      });
    } catch (err) {
      console.error("Error al preparar envío:", err);
    }
  }


  async idCredential(){
    try {
      const result:any = await firstValueFrom(this.profileApi.findUserById(this.user.id!));
      if (result) {
        this.profile = result;

      }
    } catch (error) {
      console.error('Error in idCredential having:', error);
    }
  }
}
