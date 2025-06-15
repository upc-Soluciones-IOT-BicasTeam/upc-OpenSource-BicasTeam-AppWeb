import { Component } from '@angular/core';
import {UserEntity} from "../../../iam/model/user.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileApiServiceService} from "../../../iam/services/profile-api.service.service";
import {IamApiService} from "../../../iam/services/iam-api.service.service";
import {ImageEntity} from "../../model/image.entity";
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
  image: ImageEntity = new ImageEntity();
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
  async onFileSelected(event: Event) {
    await this.idCredential();
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;

        const payload = new ImageEntity();
          payload.filename =  file.name;
          payload.contentType = file.type;
          payload.data = base64String;
          payload.idManager = this.profile.idCredential;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('extraData', 'valor');


        console.log("JSON enviado:", payload);
        this.imageApi.uploadImage(formData).subscribe(data => {console.log(data)});
      };
      reader.readAsDataURL(file);
    }
  }


  async idCredential(){
    try {
      const result:any = await firstValueFrom(this.profileApi.findUserById(this.user.id!));
      if (result) {
        this.profile = result[0];

      }
    } catch (error) {
      console.error('Error in idCredential having:', error);
    }
  }
}
