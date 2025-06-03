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
  // Listado completo y filtrado
  shipmentsAll: ShipmentEntity[] = [];
  filteredShipments: ShipmentEntity[] = [];

  // Filtros
  statuses = ['En Progreso', 'Pending', 'In Transit', 'Delivered', 'Cancelled'];
  filterStatus = '';
  searchTerm = '';

  // Ordenación por fecha
  sortDirection: 'asc' | 'desc' = 'desc';

  // Formulario reactivo para create/edit
  shipmentForm: FormGroup;
  isFormOpen = false;
  isEditMode = false;
  selectedShipment: ShipmentEntity | null = null;

  // Confirmación de borrado
  showConfirmModal = false;
  shipmentToDelete: ShipmentEntity | null = null;

  // ID de usuario leído de la ruta (si aplica)
  private userId: number;

  constructor(
    private route: ActivatedRoute,
    private shipmentApi: ShipmentApiService,
    private fb: FormBuilder,
  ) {
    // Extraemos userId de la ruta (p.ej. /shipments/:id)
    const param = this.route.snapshot.paramMap.get('id');
    this.userId = param !== null ? Number(param) : NaN;

    // Inicializamos el formulario (sin status; se agrega solo en edición)
    this.shipmentForm = this.fb.group({
      destiny: ['', Validators.required],
      description: ['', Validators.required],
      driverName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadShipments();
  }

  /** Carga envíos: por usuario si hay userId válido, o todos */
  private loadShipments(): void {
    const fetch$ = !isNaN(this.userId)
      ? this.shipmentApi.getShipmentsByUserId(this.userId)
      : this.shipmentApi.getAllShipments();

    fetch$.subscribe(
      (list) => {
        this.shipmentsAll = list;
        this.applyFilters();
      },
      (err) => console.error('Error fetching shipments:', err),
    );
  }

  /** Aplica filtros de estado, búsqueda y orden por fecha */
  applyFilters(): void {
    this.filteredShipments = this.shipmentsAll
      .filter((s) => !this.filterStatus || s.status === this.filterStatus)
      .filter(
        (s) =>
          !this.searchTerm ||
          s.destiny.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          s.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          s.driverName.toLowerCase().includes(this.searchTerm.toLowerCase()),
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

  /** Cambia la dirección de orden y reaplica filtros */
  onSortDirectionChange(direction: 'asc' | 'desc'): void {
    this.sortDirection = direction;
    this.applyFilters();
  }

  /** Alterna la dirección de orden */
  toggleSortOrder(): void {
    this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
    this.applyFilters();
  }

  /** Abre el modal para crear o editar */
  openForm(shipment?: ShipmentEntity): void {
    this.isFormOpen = true;

    if (shipment) {
      // —— Modo edición ——
      this.isEditMode = true;
      this.selectedShipment = shipment;

      // Aseguramos que el control 'status' exista y tenga validación
      if (!this.shipmentForm.contains('status')) {
        this.shipmentForm.addControl(
          'status',
          new FormControl(shipment.status, Validators.required),
        );
      }

      this.shipmentForm.patchValue(shipment);
    } else {
      // —— Modo creación ——
      this.isEditMode = false;
      this.selectedShipment = null;
      this.shipmentForm.reset();

      // Eliminamos el control 'status' si estuviera presente
      if (this.shipmentForm.contains('status')) {
        this.shipmentForm.removeControl('status');
      }
    }
  }

  /** Cierra el modal y resetea el formulario */
  closeForm(): void {
    this.isFormOpen = false;
    this.shipmentForm.reset();
    this.selectedShipment = null;
  }

  /** Crea o actualiza un envío */
  onSubmit(): void {
    if (this.shipmentForm.invalid) return;

    const formValue = this.shipmentForm.value as Partial<ShipmentEntity>;

    if (this.isEditMode && this.selectedShipment) {
      // —— Actualización ——
      this.shipmentApi
        .updateShipment(this.selectedShipment.id, formValue)
        .subscribe(
          (updated) => {
            const idx = this.shipmentsAll.findIndex((s) => s.id === updated.id);
            this.shipmentsAll[idx] = updated;
            this.applyFilters();
            this.closeForm();
          },
          (err) => console.error('Error updating shipment:', err),
        );
    } else {
      // —— Creación ——
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
        status: 'En Progreso', // ← estado por defecto
        driverName: formValue.driverName!,
      };

      this.shipmentApi.addShipment(payload).subscribe(
        () => {
          this.shipmentsAll.push(payload as ShipmentEntity);
          this.applyFilters();
          this.closeForm();
        },
        (err) => console.error('Error adding shipment:', err),
      );
    }
  }

  /** Abre el diálogo de confirmación de borrado */
  openDeleteConfirm(sh: ShipmentEntity): void {
    this.shipmentToDelete = sh;
    this.showConfirmModal = true;
  }

  /** Cancela el diálogo de borrado */
  cancelDelete(): void {
    this.shipmentToDelete = null;
    this.showConfirmModal = false;
  }

  /** Borra tras confirmar y actualiza la lista */
  confirmDelete(): void {
    if (!this.shipmentToDelete) return;
    this.shipmentApi.deleteShipment(this.shipmentToDelete.id).subscribe(
      () => {
        this.shipmentsAll = this.shipmentsAll.filter(
          (s) => s.id !== this.shipmentToDelete!.id,
        );
        this.applyFilters();
        this.cancelDelete();
      },
      (err) => console.error('Error deleting shipment:', err),
    );
  }
}
