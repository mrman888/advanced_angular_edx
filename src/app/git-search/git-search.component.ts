import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service'
import { GitSearch } from '../git-search'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { AdvancedSearchModel } from '../advanced-search-model'
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { UnifiedSearchService } from '../unified-search.service';
import { UnifiedSearch } from '../unified-search';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit { 
  searchResults: GitSearch;
  searchQuery: string;
  displayQuery: string;
  title: string;
  form: FormGroup;
  formControls = {};
  model = new AdvancedSearchModel('', '', '', null, null, '');
  modelKeys = Object.keys(this.model);

  noSpecialChars(c: FormControl) {
    let REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    return REGEXP.test(c.value) ? {
        validateEmail: {
        valid: false
        }
    } : null;
}

constructor(private route: ActivatedRoute, private router: Router , private UnifiedSearchService: UnifiedSearchService,) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.gitSearch();  
    })
    this.route.data.subscribe( (result) => {
      this.title = result.title
    });
  }

  gitSearch = () => {
    this.UnifiedSearchService.unifiedSearch(this.searchQuery).subscribe( (response: UnifiedSearch) => {
      console.log(response);
      this.searchResults = response.repositories;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  sendQuery = (f) => {
    console.log(f)
    this.searchResults = null;
    let search : string = this.model.q;
    let params : string = "";
    this.modelKeys.forEach(  (elem) => {
        if (elem === 'q') {
            return false;
        }
        if (this.model[elem]) {
            params += '+' + elem + ':' + this.model[elem];
        }
    })
    this.searchQuery = search;
    if (params !== '') {
        this.searchQuery = search + params;
    }
    this.displayQuery = this.searchQuery;
    this.gitSearch();
  }
}
