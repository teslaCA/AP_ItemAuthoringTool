import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Item} from "../../services/item/item";
import {ItemService} from "../../services/item/item.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

enum AutoSaveMode {
  Changed,
  Saved,
  Saving
}

/**
 * Component that monitors changes to items and automatically saves them.  When a change to an item occurs the
 * updated item's state should be passed to onItemChange method.
 *
 * This component internally debounces the changes ensuring that the changes have stopped for a configurable amount
 * of time.  Only the last change received will be saved; all changes that arrived during the debounce period will be
 * discarded.
 */
@Component({
  selector: 'item-auto-save',
  templateUrl: './item-auto-save.component.html',
  styleUrls: ['./item-auto-save.component.less']
})
export class ItemAutoSaveComponent implements OnInit, OnDestroy {
  private mode = AutoSaveMode.Saved;
  private changesSubject = new Subject<Item>();
  private changesObservable: Observable<Item> = this.changesSubject.asObservable();

  /**
   * Will changes to the item be auto-saved?
   * @type {boolean} whether changes to the item will be auto-saved
   */
  @Input() enabled = true;

  /**
   * The number of milliseconds to wait after the last change before saving.  Any change arriving before this
   * period has passed will reset the time.  Only the last change received will be saved.
   * @type {number} number of milliseconds to wait after the last change before saving
   */
  @Input() debounceTimeMillis = 3000;

  /**
   * Return whether the item has changed since the last save.
   * @returns {boolean} whether the item has been changed since the last save
   */
  get changed() {
    return this.mode === AutoSaveMode.Changed;
  }

  /**
   * Return whether all changes have been saved (i.e. whether the item has not been changed since the last save).
   * @returns {boolean} whether all changes to this item have been saved
   */
  get saved() {
    return this.mode === AutoSaveMode.Saved;
  }

  /**
   * Return whether changes to this item are in the process of being saved.
   * @returns {boolean} whether changes to this item are in the process of being saved
   */
  get saving() {
    return this.mode === AutoSaveMode.Saving;
  }

  constructor(private itemService: ItemService) {
  }

  /**
   * Initialize the item change observable to trigger an item save after a debounce period whenever item changes
   * arrive.
   */
  ngOnInit() {
    // Subscribe to incoming item changes
    this.changesObservable
      .debounceTime(this.debounceTimeMillis)
      .subscribe(
        (item) => this.saveChanges(item)
      );
  }

  /**
   * Destroy the item change observable to prevent auto-save from running in the background.
   */
  ngOnDestroy() {
    // Destroy subject to prevent auto-save from running in the background
    this.changesSubject.complete();
  }

  /**
   * Enqueue item changes for saving after debounce period.
   * @param item to be saved
   */
  onItemChange(item: Item): void {
    if (this.enabled) {
      // Enqueue item to be saved after debounce period
      this.mode = AutoSaveMode.Changed;
      this.changesSubject.next(item);
    }
  }

  /**
   * Save item changes to the scratchpad branch.
   * @param item to be saved
   */
  private saveChanges(item: Item): void {
    this.mode = AutoSaveMode.Saving;
    this.itemService.updateTransaction(item.currentTransaction.transactionId, item, "Auto-save").subscribe(
      () => {
        // Item successfully saved
        this.mode = AutoSaveMode.Saved;
      },
      () => {
        // Re-enqueue for retry after debounce period
        this.changesSubject.next(item);
      }
    );
  }
}
