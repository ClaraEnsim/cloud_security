import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {
    username: '',
    email: '',
    birthDate: null,
  };
  userHandicap = {
    disabilityRate: null,
    guardianName: '',
    guardianFirstName: '',
    guardianAddress: '',
    guardianPhone: '',
    guardianEmail: '',
    caregiverName: '',
    caregiverFirstName: '',
    caregiverAddress: '',
    caregiverPhone: '',
    caregiverEmail: '',
    healthProblem: ''
  };

  
  hasHandicap = false;
  hasDisabilityRate = false;
  underGuardianship = false;
  hasCaregiver = false;



  contractForm!: FormGroup;

  constructor(
    private userService: UserService, 
    private datePipe: DatePipe, 
    private fb: FormBuilder
  ) {
    // On récupère les informations de l'utilisateur
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    // Initialisation du formulaire des contrats
    this.contractForm = this.fb.group({
      isCdd: [false],
      isCdi: [false],
      isInterim: [false],
      contracts: this.fb.array([]) // Tableau des contrats
    });
  }

  get contracts(): FormArray {
    return this.contractForm.get('contracts') as FormArray;
  }

  // Ajouter un contrat
  addContract() {
    const contract = this.fb.group({
      isCdd: [this.contractForm.get('isCdd')?.value || false],
      isCdi: [this.contractForm.get('isCdi')?.value || false], 
      isInterim: [this.contractForm.get('isInterim')?.value || false],

      // CDD
      cddStartDate: ['', Validators.required],
      cddEndDate: ['', Validators.required],
      cddCompanyName: ['', Validators.required],
      cddBossName: ['', Validators.required],

      // CDI
      cdiStartDate: ['', Validators.required],
      cdiCompanyName: ['', Validators.required],
      cdiBossName: ['', Validators.required],

      // Intérim
      interimStartDate: ['', Validators.required],
      interimEndDate: ['', Validators.required],
      interimCompanyName: ['', Validators.required],
      interimBossName: ['', Validators.required]
    });

    this.contracts.push(contract);
  }

  // Supprimer un contrat
  removeContract(index: number) {
    this.contracts.removeAt(index);
  }

  onHandicapChange(): void {
    if (!this.hasHandicap) {
      // Si l'utilisateur décoche la case "Avoir un handicap", on réinitialise les autres champs
      this.hasDisabilityRate = false;
      this.underGuardianship = false;
      this.hasCaregiver = false;
      this.resetUserInfo();
    }
  }

  // Cette méthode réinitialise les informations de l'utilisateur pour effacer les champs
  resetUserInfo(): void {
    this.userHandicap.disabilityRate = null;
    this.userHandicap.guardianName = '';
    this.userHandicap.guardianFirstName = '';
    this.userHandicap.guardianAddress = '';
    this.userHandicap.guardianPhone = '';
    this.userHandicap.guardianEmail = '';
    this.userHandicap.caregiverName = '';
    this.userHandicap.caregiverFirstName = '';
    this.userHandicap.caregiverAddress = '';
    this.userHandicap.caregiverPhone = '';
    this.userHandicap.caregiverEmail = '';
  }

  // Sauvegarder les informations de l'utilisateur et les contrats
  onSave() {
    // Formate la date de naissance avant de sauvegarder
    if (this.user.birthDate) {
      this.user.birthDate = this.datePipe.transform(this.user.birthDate, 'dd/MM/yyyy');
    }

    // Sauvegarde les données de l'utilisateur
    this.userService.updateUser(this.user);

    // Sauvegarde les contrats
    const contracts = this.contractForm.value.contracts;
    console.log('Contrats enregistrés:', contracts);

    // Affiche un message de succès
    alert('Informations enregistrées avec succès');

    console.log('Form submitted', this.userHandicap);
    // Ici, vous pouvez ajouter la logique pour envoyer les données du formulaire à un serveur
  }
}
