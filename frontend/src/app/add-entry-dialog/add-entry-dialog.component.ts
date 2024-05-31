import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './add-entry-dialog.component.html',
  styleUrls: ['./add-entry-dialog.component.css']
})
export class AddEntryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
  }

  onSave(): void {
    this.data.date = new Date();
    this.data.heure = this.data.date.toLocaleTimeString();

    if (this.data.date) {
      this.data.date = this.datePipe.transform(this.data.date, 'dd.MM.yyyy');
    }
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
