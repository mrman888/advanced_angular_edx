import { Injectable } from '@angular/core';
import { UnifiedSearch } from './unified-search';
import { Observable } from 'rxjs/Rx';
import { GitSearchService } from './git-search.service';
import { GitCodeSearchService } from './git-code-search.service';
import { GitSearch } from './git-search';
import { GitCodeSearch } from './git-code-search';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';

@Injectable()
export class UnifiedSearchService {

    constructor(private searchService : GitSearchService, private codeSearchService : GitCodeSearchService) { }
    
    unifiedSearch : Function = (query: string): Observable<UnifiedSearch> => {
        return Observable.concat<GitSearch, GitCodeSearch>(this.searchService.gitSearch(query), this.codeSearchService.codeSearch(query))
        .toArray()
        .map( (response) => {
          return {
            repositories : response[0] as GitSearch,
            code: response[1] as GitCodeSearch
          }
        })
      } 
  }