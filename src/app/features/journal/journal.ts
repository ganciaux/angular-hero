import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JournalService } from './journal.service';

@Component({
  selector: 'app-journal',
  imports: [DatePipe],
  templateUrl: './journal.html',
  styleUrl: './journal.scss',
})
export class Journal {
  protected journalService = inject(JournalService);
}
