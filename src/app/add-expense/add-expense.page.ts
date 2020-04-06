import { Component, OnInit, Output } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType, FilesystemDirectory, FilesystemEncoding  } from '@capacitor/core';
import { EventEmitter } from 'protractor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonList } from '@ionic/angular';
import { ResolveEnd } from '@angular/router';

let totalExpense = 0;
const { Toast } = Plugins;
const { Filesystem } = Plugins;

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage implements OnInit {
  expense: any = {};
  expList: string[] = [];  // This is just the list thats displayed on screen
  expListAmount: number[] = []; // This is just the list thats displayed on screen
  totalExpense: number;
  public date = new Date();
  public dateTime: number;
  public firstEx = true;
  image: string;

  constructor() {
    this.totalExpense = totalExpense;
    this.dateTime = this.date.getTime(); // returns unix time; used for filename of each individual expense claim

    this.mkdir(); // Make the dir where the expenses will be stored, if dir already exists nothing happens
    this.image = '';
  }

  ngOnInit() {

  }

  onImagePicked(imageData: string) {
    this.image = imageData;
    this.writeFile(); // Save image to the CSV file
    // The image will be saved to the CSV file as a Base64 Jpeg String, the image will also be saved to the phone
    // in the application Documents directory with a timestamp as it's file name.
  }

  clearList() {
    // Ask the user if they are sure first
    this.expList = [];
    this.expListAmount = [];
    totalExpense = 0;
    this.totalExpense = totalExpense;

  }
  addLine() {
    // Check to ensure that all fields have been filled out

    if (this.expense.Name === undefined || this.expense.Date === undefined ||
      this.expense.Reason === undefined || this.expense.Amount === undefined) {
        this.show('Ensure that you have entered Expense Name, Date on Receipt, Line Description and Amount');
      } else {
        // Add the expenses to the list
        this.expense.Reason = this.expense.Reason;
        this.expList.push(this.expense.Reason);

        totalExpense = totalExpense + this.expense.Amount;
        this.totalExpense = totalExpense;
        this.expense.Amount = '£' + this.expense.Amount;
        this.expListAmount.push(this.expense.Amount);

        // Now save to a CSV file
        // CSV Format NAME, RECEIPT DATE, EXP LINES, PHOTO LOCATION
        this.writeFile();

        // Clear the input boxes
        this.expense.Reason = undefined;
        this.expense.Amount = undefined;
      }



  }
  async show(message: string) {
    await Toast.show({
      text: message
    });
  }

    // IN REALITY THE DIRECTORY THAT HOLDS THE DATA WOULD BE THE DOCUMENT DIR FOR THE APP AND THE FILE WOULD BE ENCRYPTED IN CASE OF CYBER ATTACK
    // TO HELP DEBUGGING I HAVE PUT THE FILES IN THE PHONES DOCUMENTS DIR I.E. DOCUMENTS/EXPENSE_APP/  AND THEY ARE NOT ENCRYPTED.

    // Write all data to file in CSV format
    async writeFile() {
      let writtenData = this.expense.Name + ',' + this.expense.Date;
      for (let i = 0; i < this.expList.length; i++) {
        writtenData = writtenData + ',' + this.expList[i] + ',' + this.expListAmount[i];
      }
      writtenData = writtenData  + ',' + this.image;
      await Filesystem.writeFile({
        path: 'Expense_App/' + this.dateTime + '.txt',
        data: writtenData,
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      });
      this.show('Saved with new line');
    }

    async fileDelete() {
      await Filesystem.deleteFile({
        path: 'Expense_App/' + this.dateTime + '.txt',
        directory: FilesystemDirectory.Documents
      });
      this.expense.Name = '';
      this.expense.Date = '';
      this.expense.Reason = '';
      this.expense.Amount = '';
      this.expList = [];
      this.expListAmount = [];
      totalExpense = 0;
      this.totalExpense = totalExpense;
      this.show('Entry Deleted');
    }

    async mkdir() {
      try {
        let ret = await Filesystem.mkdir({
          path: 'Expense_App',
          directory: FilesystemDirectory.Documents,
          recursive: false // like mkdir -p
        });
      } catch(e) {
        console.error('Unable to make directory', e);
      }
    }
}


