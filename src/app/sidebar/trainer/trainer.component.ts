import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trainers } from 'src/app/core/interfaces/trainers';
import { TrainersService } from 'src/app/core/services/trainers.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  private trainerId!: number;
  public trainer!: Trainers;
  public isLoading: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private trainerService: TrainersService
  ) { }

  ngOnInit(): void {
    this.getIdFromParams()
    this.getTrainerById()
  }


  public getTrainerById(): void {
    this.trainerService.getTrainerById(this.trainerId).subscribe(res => {
      this.isLoading = false;
      this.trainer = res.data
    })
  }

  private getIdFromParams(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.trainerId = res.id
    })
  }

}
