import { Component, OnInit, Input } from '@angular/core';
import { GitCodeSearch } from '../git-code-search'
import { UnifiedSearchService } from '../unified-search.service';

@Component({
  selector: 'app-code-display',
  templateUrl: './code-display.component.html',
  styleUrls: ['./code-display.component.css']
})
export class CodeDisplayComponent implements OnInit {
  @Input() searchResults: GitCodeSearch;
  

  constructor(private UnifiedSearchService: UnifiedSearchService) { }

  ngOnInit() {
  }
}