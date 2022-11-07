import { Component, OnInit , OnDestroy} from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styles: [
  ]
})
export class BreadcumbsComponent implements OnDestroy {
  public titleSubs$  :Subscription;
  public title! : string;
  constructor(private router : Router) {
    this.titleSubs$ = this.getArgumentosRuta()
          .subscribe(({title}) => {
            this.title = title
            document.title = `AdminPro - ${title}`;
          })
   }
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  ngOnInit(): void {
    this.getArgumentosRuta();
  }

  getArgumentosRuta(){
    return this.router.events
        .pipe(
          filter((event: any)=>event instanceof ActivationEnd),
          filter((event : ActivationEnd) => event.snapshot.firstChild === null),
          map((event : ActivationEnd)  => event.snapshot.data)
        )

  }

}
