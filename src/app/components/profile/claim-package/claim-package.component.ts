import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ShipmentService } from 'src/app/services/shipment-service/shipment.service';



@Component({
  selector: 'app-claim-package',
  templateUrl: './claim-package.component.html',
  styleUrls: ['./claim-package.component.scss']
})
export class ClaimPackageComponent {

  isLoading:boolean = false;
  constructor(
    private authService: AuthenticationService,
    private shipmentService: ShipmentService,
    private router: Router
  ) {}

  async claimShipments() {
    this.isLoading = true;
    try {
      const token = await this.authService.getToken();

      this.authService.currentUser$.subscribe({
        next: async (user: any) => {
          if (user.isAnonymous) {
            this.isLoading = false;

            return;
          }

          try {
            if (user.uid === null) {
              console.log("ERROR userId is null");
              this.isLoading = false;
              this.router.navigateByUrl('/');
              return;
            }
            this.shipmentService.updateShipmentsByUserEmail(token, user.uid).subscribe({
              next: (response:any) =>{
                this.isLoading = false;
                console.log(response);
                this.shipmentService.updateShipmentEmailComplete.emit();
              },
              error: (error: any) => {
                this.isLoading = false;
                console.log(error);
              },
            });
          } catch (error) {
            this.isLoading = false;
            console.log(error);
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          console.log(error);
        },
      });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }
}
