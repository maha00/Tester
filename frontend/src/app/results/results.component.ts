import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DataService} from '../data.service';
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {Router} from "@angular/router";
import {AddEntryDialogComponent} from "../add-entry-dialog/add-entry-dialog.component";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'heure', 'testCourtCircuit', 'testFuiteTension', 'edit'];
  dataSource: any;

  constructor(private router: Router, private dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.dataService.getData().subscribe(data => {
      this.dataSource = data.map((item: { [x: string]: string; date: any; heure: any; }) => ({
        date: item.date,
        heure: item.heure,
        testCourtCircuit: item["testCourtCircuit"],
        testFuiteTension: item["testFuiteTension"]
      }));
      console.log(data)
    });
  }

  openDialog(element: any): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: {...element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed', result);
        this.updateElement(result);
      }
    });
  }

  updateElement(updatedElement: any): void {
    this.dataService.updateData(updatedElement).subscribe(response => {
      console.log('Update response:', response);
      const index = this.dataSource.findIndex((item: any) =>
        item.date === updatedElement.date && item.heure === updatedElement.heure);

      if (index !== -1) {
        this.dataSource = [
          ...this.dataSource.slice(0, index),
          updatedElement,
          ...this.dataSource.slice(index + 1)
        ];
      }
    }, error => {
      console.error('Failed to update:', error);
    });
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEntryDialogComponent, {
      width: '400px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with data:', result);
        this.addData(result);
      }
    });
  }

  addData(newData: any): void {
    this.dataService.addData(newData).subscribe(response => {
      console.log('Add response:', response);
      this.dataSource.push(newData);
      this.dataSource = [...this.dataSource];
    }, error => {
      console.error('Failed to add data:', error);
    });
  }


  logout() {

    this.router.navigate(['/login']);

  }
}
