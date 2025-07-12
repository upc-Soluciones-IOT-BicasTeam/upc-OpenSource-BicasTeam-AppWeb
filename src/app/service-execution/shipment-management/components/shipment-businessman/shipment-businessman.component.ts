import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ShipmentApiService } from '../../services/shipment-api.service';
import { ShipmentEntity } from '../../model/shipment.entity';

@Component({
  selector: 'app-shipment-businessman',
  templateUrl: './shipment-businessman.component.html',
  styleUrls: ['./shipment-businessman.component.css'],
})
export class ShipmentBusinessmanComponent implements OnInit {
  shipmentsAll: ShipmentEntity[] = [];
  filteredShipments: ShipmentEntity[] = [];

  statuses = ['pending', 'in-progress', 'in-transit', 'delivered', 'cancelled'];
  filterStatus = '';
  searchTerm = '';

  sortDirection: 'asc' | 'desc' = 'desc';

  shipmentForm: FormGroup;
  isFormOpen = false;
  selectedShipment: ShipmentEntity | null = null;

  showConfirmModal = false;
  shipmentToDelete: ShipmentEntity | null = null;

  private userId: number;

  constructor(
    private route: ActivatedRoute,
    private shipmentApi: ShipmentApiService,
    private fb: FormBuilder
  ) {
    const param = this.route.snapshot.paramMap.get('id');
    this.userId = param !== null ? Number(param) : NaN;
    this.shipmentForm = this.fb.group({
      destiny: ['', Validators.required],
      description: ['', Validators.required],
      driverName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadShipments();
  }

  private loadShipments(): void {
    const fetch$ = !isNaN(this.userId)
      ? this.shipmentApi.getShipmentsByUserId(this.userId)
      : this.shipmentApi.getAllShipments();

    fetch$.subscribe(
      (list) => {
        this.shipmentsAll = list;
        this.applyFilters();
      },
      (err) => console.error('Error fetching shipments:', err)
    );
  }

  applyFilters(): void {
    this.filteredShipments = this.shipmentsAll
      .filter((s) => !this.filterStatus || s.status === this.filterStatus)
      .filter(
        (s) =>
          !this.searchTerm ||
          s.destiny.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          s.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          s.driverName.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return this.sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }

  onStatusChange(status: string): void {
    this.filterStatus = status;
    this.applyFilters();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  onSortDirectionChange(direction: 'asc' | 'desc'): void {
    this.sortDirection = direction;
    this.applyFilters();
  }

  toggleSortOrder(): void {
    this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
    this.applyFilters();
  }

  openForm(): void {
    this.isFormOpen = true;
    this.selectedShipment = null;
    this.shipmentForm.reset();
  }

  closeForm(): void {
    this.isFormOpen = false;
    this.shipmentForm.reset();
    this.selectedShipment = null;
  }

  onSubmit(): void {
    if (this.shipmentForm.invalid) return;

    const formValue = this.shipmentForm.value as Partial<ShipmentEntity>;

    const nextId = this.shipmentsAll.length
      ? Math.max(...this.shipmentsAll.map((s) => s.id)) + 1
      : 1;
    const now = new Date();

    const payload: Partial<ShipmentEntity> = {
      id: nextId,
      userId: !isNaN(this.userId) ? this.userId : 0,
      createdAt: now,
      destiny: formValue.destiny!,
      description: formValue.description!,
      status: 'pending', 
      driverName: formValue.driverName!,
    };

    this.shipmentApi.addShipment(payload).subscribe(
      () => {
        this.shipmentsAll.push(payload as ShipmentEntity);
        this.applyFilters();
        this.closeForm();
      },
      (err) => console.error('Error adding shipment:', err)
    );
  }

  openDeleteConfirm(sh: ShipmentEntity): void {
    this.shipmentToDelete = sh;
    this.showConfirmModal = true;
  }

  cancelDelete(): void {
    this.shipmentToDelete = null;
    this.showConfirmModal = false;
  }

  confirmDelete(): void {
    if (!this.shipmentToDelete) return;
    this.shipmentApi.deleteShipment(this.shipmentToDelete.id).subscribe(
      () => {
        this.shipmentsAll = this.shipmentsAll.filter(
          (s) => s.id !== this.shipmentToDelete!.id
        );
        this.applyFilters();
        this.cancelDelete();
      },
      (err) => console.error('Error deleting shipment:', err)
    );
  }

  getStatusTranslation(status: string): string {
    const translations: any = {
      pending: 'Pendiente',
      'in-progress': 'En Progreso',
      'in-transit': 'En Tránsito',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
    };
    return translations[status] || status;
  }
}
