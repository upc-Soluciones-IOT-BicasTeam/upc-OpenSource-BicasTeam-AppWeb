import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IamApiService } from "../../../iam/services/iam-api.service.service";
import { UserEntity } from "../../../iam/model/user.entity";

@Component({
  selector: 'app-sidebar-public',
  templateUrl: './sidebar-public.component.html',
  styleUrls: ['./sidebar-public.component.css']
})
export class SidebarPublicComponent implements OnInit {
  user: UserEntity = {} as UserEntity;
  name: string = '';
  lastName: string = '';
  type: string = '';
  visible: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: IamApiService
  ) {
    this.user.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.api.findUserById(this.user.id!).subscribe(
      (data: UserEntity) => {
        this.type = data.type;
        this.name = data.name;
        this.lastName = data.lastName;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  getUserImage(type: string): string {
    if (type === 'Gerente') {
      return 'https://www.capitalcoahuila.com.mx/wp-content/uploads/2022/11/CARL-e1669117013260.jpeg';
    } else if (type === 'Transportista') {
      return 'https://img.freepik.com/fotos-premium/conductor-entregas-usando-tableta-furgoneta-paquetes_1004054-19689.jpg';
    } else {
      return 'https://via.placeholder.com/150'; // Imagen por defecto si el tipo no coincide
    }
  }

  goToHome(): void {
    if (this.type === 'Gerente') {
      this.router.navigate([this.user.id, `home-businessman`]);
    } else {
      this.router.navigate([this.user.id, `home-carrier`]);
    }
  }

  goToProfile(): void {
    this.router.navigate([this.user.id, `profile`]);
  }

  goTologout(): void {
    this.router.navigate([`login`]);
  }

  goToVehicles(): void {
    if (this.type === 'Gerente') {
      this.router.navigate([this.user.id, `vehicles-businessman`]);
    } else {
      this.router.navigate([this.user.id, `vehicles-carrier`]);
    }
  }

  goToReports(): void {
    if (this.type === 'Gerente') {
      this.router.navigate([this.user.id, `report-businessman`]);
    } else {
      this.router.navigate([this.user.id, `report-carrier`]);
    }
  }

  goToShipments(): void {
    if (this.type === 'Gerente') {
      this.router.navigate([this.user.id, `shipment-businessman`]);
    } else {
      this.router.navigate([this.user.id, `shipment-carrier`]);
    }
  }

  goToDrivers(): void {
    if (this.type === 'Gerente') {
      this.router.navigate([this.user.id, 'driver-registration']);
    }
  }

}
